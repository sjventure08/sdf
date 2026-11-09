import "server-only";

import { createSign } from "node:crypto";
import type { MembershipInput } from "./validation";

// Talks to the Google Sheets API with a service account. Runs only on the
// server: credentials come from environment variables and never reach the browser.
//
// Sheet columns (row 1 is the header row, see docs/MEMBERSHIP_SETUP.md):
//   A Application ID | B Registration Date | C Full Name | D Phone | E Email
//   F Address | G Comments | H Payment Status | I Transaction Reference
//   J Payment Verified On | K Verified By | L Submission Key

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TIMEOUT_MS = 10_000;

export class SheetsNotConfiguredError extends Error {}
export class SheetsRequestError extends Error {}

type SheetsConfig = {
    clientEmail: string;
    privateKey: string;
    sheetId: string;
    tab: string;
};

function getConfig(): SheetsConfig {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
        throw new SheetsNotConfiguredError("Google Sheets environment variables are missing.");
    }

    return {
        clientEmail,
        // Hosting dashboards usually store the key on one line with literal "\n".
        privateKey: privateKey.replace(/\\n/g, "\n"),
        sheetId,
        tab: process.env.GOOGLE_SHEET_TAB || "Registrations",
    };
}

// ---------- Auth ----------

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64url(value: string): string {
    return Buffer.from(value).toString("base64url");
}

async function getAccessToken(config: SheetsConfig): Promise<string> {
    if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
        return cachedToken.token;
    }

    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claims = base64url(
        JSON.stringify({
            iss: config.clientEmail,
            scope: SCOPE,
            aud: TOKEN_URL,
            iat: now,
            exp: now + 3600,
        }),
    );

    let signature: string;
    try {
        const signer = createSign("RSA-SHA256");
        signer.update(`${header}.${claims}`);
        signature = signer.sign(config.privateKey).toString("base64url");
    } catch {
        throw new SheetsNotConfiguredError("GOOGLE_PRIVATE_KEY could not be read.");
    }

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: `${header}.${claims}.${signature}`,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
        throw new SheetsRequestError(`Google auth failed with status ${response.status}.`);
    }

    const json = (await response.json()) as { access_token: string; expires_in: number };
    cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
    return json.access_token;
}

// ---------- Sheets helpers ----------

async function sheetsRequest<T>(
    config: SheetsConfig,
    path: string,
    init: { method?: string; body?: unknown } = {},
): Promise<T> {
    const token = await getAccessToken(config);
    const response = await fetch(`${SHEETS_URL}/${encodeURIComponent(config.sheetId)}${path}`, {
        method: init.method ?? "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: init.body === undefined ? undefined : JSON.stringify(init.body),
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
        if (response.status === 401) cachedToken = null;
        throw new SheetsRequestError(`Google Sheets request failed with status ${response.status}.`);
    }

    return (await response.json()) as T;
}

/** Builds an A1 range such as 'Registrations'!A2:A, quoting the tab name safely. */
function range(config: SheetsConfig, cells: string): string {
    return encodeURIComponent(`'${config.tab.replace(/'/g, "''")}'!${cells}`);
}

/** Current date/time in India, e.g. "2026-10-26 14:05:09 IST". */
function nowInIndia(): { stamp: string; year: string } {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23",
        })
            .formatToParts(new Date())
            .map((part) => [part.type, part.value]),
    );

    return {
        stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} IST`,
        year: parts.year,
    };
}

// Matches the current format (SDF260001) and the older one (SDF-2026-0001),
// so numbering keeps counting up from rows already in the sheet.
const ID_PATTERN = /^SDF(?:\d{2}|-\d{4}-)(\d+)$/;

function formatId(year: string, sequence: number): string {
    return `SDF${year.slice(-2)}${String(sequence).padStart(4, "0")}`;
}

// ---------- Public API ----------

export type SaveResult = { applicationId: string; alreadySaved: boolean };

/**
 * Appends a registration as a new row with payment status PENDING and returns
 * its application ID. Calling it again with the same submission key returns
 * the existing ID instead of adding a second row.
 */
export async function saveRegistration(
    data: MembershipInput,
    submissionKey: string,
): Promise<SaveResult> {
    const config = getConfig();

    // 1. Read existing IDs (column A) and submission keys (column L).
    const existing = await sheetsRequest<{ valueRanges: { values?: string[][] }[] }>(
        config,
        `/values:batchGet?majorDimension=COLUMNS&ranges=${range(config, "A2:A")}&ranges=${range(config, "L2:L")}`,
    );
    const ids = existing.valueRanges[0]?.values?.[0] ?? [];
    const keys = existing.valueRanges[1]?.values?.[0] ?? [];

    const usedSequences = new Set<number>();
    let maxSequence = 0;
    for (const id of ids) {
        const match = ID_PATTERN.exec(id ?? "");
        if (match) {
            const sequence = Number(match[1]);
            usedSequences.add(sequence);
            maxSequence = Math.max(maxSequence, sequence);
        }
    }

    const { stamp, year } = nowInIndia();

    function pickId(row: number): string {
        // Row 2 → 0001, row 3 → 0002 ... Falls back to max + 1 if rows were deleted.
        const sequence = usedSequences.has(row - 1) ? maxSequence + 1 : row - 1;
        return formatId(year, sequence);
    }

    async function writeId(row: number, applicationId: string) {
        await sheetsRequest(config, `/values/${range(config, `A${row}`)}?valueInputOption=RAW`, {
            method: "PUT",
            body: { values: [[applicationId]] },
        });
    }

    // 2. Already saved with this key? Return that row's ID.
    const existingIndex = keys.indexOf(submissionKey);
    if (existingIndex !== -1) {
        const row = existingIndex + 2;
        let applicationId = ids[existingIndex];
        if (!applicationId) {
            // An earlier attempt added the row but failed before writing the ID.
            applicationId = pickId(row);
            await writeId(row, applicationId);
        }
        return { applicationId, alreadySaved: true };
    }

    // 3. Append the row. RAW stops Sheets from treating input like "=..." as a formula.
    const appended = await sheetsRequest<{ updates?: { updatedRange?: string } }>(
        config,
        `/values/${range(config, "A:L")}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
        {
            method: "POST",
            body: {
                values: [
                    [
                        "", // Application ID — filled in below once we know the row
                        stamp,
                        data.fullName,
                        data.phone,
                        data.email,
                        data.address,
                        data.comments,
                        "PENDING", // Always PENDING; only an SDF admin changes this.
                        "",
                        "",
                        "",
                        submissionKey,
                    ],
                ],
            },
        },
    );

    const rowMatch = /![A-Z]+(\d+)/.exec(appended.updates?.updatedRange ?? "");
    if (!rowMatch) {
        throw new SheetsRequestError("Google Sheets did not report where the row was added.");
    }
    const row = Number(rowMatch[1]);

    // 4. Write the application ID into column A of the new row.
    const applicationId = pickId(row);
    await writeId(row, applicationId);

    return { applicationId, alreadySaved: false };
}
