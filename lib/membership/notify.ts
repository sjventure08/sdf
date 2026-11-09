import "server-only";

import nodemailer from "nodemailer";
import type { MembershipInput } from "./validation";

// Tells the SDF admin about a new registration by WhatsApp (CallMeBot) and
// email (Gmail). Both are optional: each one runs only when its environment
// variables are set. A failure is logged and never affects the registration.
//
// Privacy: the applicant's full details live only in the Google Sheet. The
// WhatsApp alert carries just the application ID (it passes through a third
// party), and the email adds only the applicant's name.

const TIMEOUT_MS = 10_000;

function sheetLink(): string | null {
    const id = process.env.GOOGLE_SHEET_ID;
    return id ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(id)}/edit` : null;
}

async function sendWhatsApp(applicationId: string): Promise<void> {
    const phone = process.env.CALLMEBOT_PHONE;
    const apiKey = process.env.CALLMEBOT_API_KEY;
    if (!phone || !apiKey) return;

    const text = `New SDF membership registration: ${applicationId}. Details are in the Google Sheet.`;

    // CallMeBot only accepts GET requests with everything in the query string.
    const url = new URL("https://api.callmebot.com/whatsapp.php");
    url.searchParams.set("phone", phone);
    url.searchParams.set("text", text);
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!response.ok) throw new Error(`CallMeBot responded with ${response.status}`);
}

async function sendEmail(data: MembershipInput, applicationId: string): Promise<void> {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass: pass.replace(/\s+/g, "") }, // App passwords are shown with spaces.
        connectionTimeout: TIMEOUT_MS,
        socketTimeout: TIMEOUT_MS,
    });

    const link = sheetLink();
    const text = [
        "A new membership registration was received.",
        "",
        `Application ID: ${applicationId}`,
        `Name: ${data.fullName}`,
        "",
        "Contact details and address are in the Google Sheet (sign in to view):",
        link ?? "(Google Sheet)",
        "",
        "Payment status: PENDING. Check the bank/UPI statement and update the sheet once paid.",
    ].join("\n");

    await transporter.sendMail({
        from: `SDF Website <${user}>`,
        to: process.env.NOTIFY_EMAIL_TO || user,
        subject: `New membership registration: ${applicationId} (${data.fullName})`,
        text,
    });
}

/** Sends both notifications. Never throws. */
export async function notifyNewRegistration(data: MembershipInput, applicationId: string): Promise<void> {
    const results = await Promise.allSettled([
        sendWhatsApp(applicationId),
        sendEmail(data, applicationId),
    ]);
    const channels = ["WhatsApp", "email"];
    results.forEach((result, i) => {
        if (result.status === "rejected") {
            const reason = result.reason instanceof Error ? result.reason.message : "unknown error";
            console.error(`[membership] ${channels[i]} notification failed:`, reason);
        }
    });
}
