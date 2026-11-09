import { after, NextResponse, type NextRequest } from "next/server";
import { notifyNewRegistration } from "@/lib/membership/notify";
import {
    saveRegistration,
    SheetsNotConfiguredError,
    type SaveResult,
} from "@/lib/membership/google-sheets";
import { SUBMISSION_KEY_PATTERN, validateMembership } from "@/lib/membership/validation";

// POST /api/membership — validates a registration and saves it to Google Sheets.
// Payment status is always set to PENDING on the server; anything the client
// sends about payment is ignored.

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { max: 8, windowMs: 15 * 60 * 1000 };

// Best-effort, per server instance. Stops casual abuse; not a full anti-bot system.
const attempts = new Map<string, { count: number; resetAt: number }>();
// Two identical requests arriving together share one save instead of racing.
const inFlight = new Map<string, Promise<SaveResult>>();

function error(status: number, message: string, fieldErrors?: Record<string, string>) {
    return NextResponse.json({ ok: false, error: message, fieldErrors }, { status });
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    if (attempts.size > 5000) {
        for (const [key, entry] of attempts) if (entry.resetAt < now) attempts.delete(key);
    }
    const entry = attempts.get(ip);
    if (!entry || entry.resetAt < now) {
        attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
        return false;
    }
    entry.count += 1;
    return entry.count > RATE_LIMIT.max;
}

function isSameOrigin(request: NextRequest): boolean {
    const origin = request.headers.get("origin");
    if (!origin) return true; // Non-browser clients; other checks still apply.
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    try {
        return new URL(origin).host === host;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    if (!request.headers.get("content-type")?.includes("application/json")) {
        return error(415, "Unsupported request format.");
    }
    if (!isSameOrigin(request)) {
        return error(403, "This request is not allowed.");
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
        return error(429, "Too many attempts. Please wait a few minutes and try again.");
    }

    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
        return error(413, "The submission is too large.");
    }

    let body: Record<string, unknown>;
    try {
        body = JSON.parse(text);
    } catch {
        return error(400, "The submission could not be read.");
    }

    // Hidden "website" field: people never see it, bots tend to fill it in.
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return error(400, "The submission could not be accepted.");
    }

    const submissionKey = typeof body.submissionKey === "string" ? body.submissionKey : "";
    if (!SUBMISSION_KEY_PATTERN.test(submissionKey)) {
        return error(400, "The submission could not be read. Please refresh the page and try again.");
    }

    const result = validateMembership(body);
    if (!result.ok) {
        return error(400, "Please correct the highlighted fields.", result.errors);
    }

    let pending = inFlight.get(submissionKey);
    const startedSave = !pending;
    if (!pending) {
        pending = saveRegistration(result.data, submissionKey);
        inFlight.set(submissionKey, pending);
        pending.finally(() => inFlight.delete(submissionKey)).catch(() => {});
    }

    try {
        const saved = await pending;
        if (startedSave && !saved.alreadySaved) {
            // Runs after the response is sent, so the applicant never waits on it.
            const data = result.data;
            after(() => notifyNewRegistration(data, saved.applicationId));
        }
        return NextResponse.json({ ok: true, applicationId: saved.applicationId });
    } catch (err) {
        // Log the reason only — never the applicant's personal details.
        console.error("[membership] save failed:", err instanceof Error ? err.message : "unknown error");
        if (err instanceof SheetsNotConfiguredError) {
            return error(503, "Membership registration is not available right now. Please try again later or contact us.");
        }
        return error(502, "We couldn't save your registration. Please try again in a moment.");
    }
}
