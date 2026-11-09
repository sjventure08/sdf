# Membership Registration — Setup & Admin Guide

The `/membership` page lets visitors register as SDF members. Each registration
is saved as a new row in a private Google Sheet with payment status `PENDING`.
The visitor then sees the SDF UPI QR code and their application ID
(e.g. `SDF260001`). An SDF admin checks the bank/UPI statement and marks the
row `PAID` by hand.

There is no payment gateway. The website never marks anyone as paid.

## How it works

| Piece | File |
| --- | --- |
| Page | `app/membership/page.tsx` |
| Form + payment screen (browser) | `components/membership/MembershipForm.tsx` |
| API endpoint `POST /api/membership` | `app/api/membership/route.ts` |
| Google Sheets code (server only) | `lib/membership/google-sheets.ts` |
| Validation rules (shared by form and server) | `lib/membership/validation.ts` |

Security notes:

- Google credentials are read only on the server from environment variables. They
  are not `NEXT_PUBLIC_` variables, so they never reach the browser bundle.
- The server re-checks every field, whatever the browser sent.
- Payment status is always written as `PENDING` by the server. Nothing the visitor
  sends can change it.
- Each form attempt carries a random submission key. If the same attempt is sent
  twice (double-click, retry after a network error), the server finds the
  existing row and returns the same application ID instead of adding a second row.
- Text is written with `RAW` input mode, so something like `=HYPERLINK(...)` typed
  into the form is stored as plain text, not run as a formula.
- Simple per-IP rate limit (8 attempts per 15 minutes per server instance), a
  hidden spam-trap field, a same-origin check and a 10 KB size limit.
- The visitor only sees "Registration Received" after Google confirms the row was
  saved. If saving fails they see an error and can retry safely.
- Aadhaar is **not** collected. See "Aadhaar" at the end before adding it.

## 1. Create the Google Sheet

1. Create a new Google Sheet, e.g. **SDF Membership Register**. Keep it private.
2. Rename the first tab to `Registrations` (or set `GOOGLE_SHEET_TAB` to your tab name).
3. Put these headers in row 1, columns A–L, exactly in this order:

   | A | B | C | D | E | F | G | H | I | J | K | L |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | Application ID | Registration Date | Full Name | Phone | Email | Address | Comments | Payment Status | Transaction Reference | Payment Verified On | Verified By | Submission Key |

   Column L is used by the website to stop duplicate rows. Hide it if you like,
   but don't delete or edit it. You can add your own columns after L (e.g. M "Admin Notes").

4. Recommended: select column H → **Data → Data validation** → Dropdown with
   `PENDING`, `PAID`, `REJECTED`, `CANCELLED`.
5. Recommended: **Data → Protect sheets and ranges** → protect columns A–G and L
   so only the owner can edit them. Admins then only edit H–K.
6. Freeze row 1 (**View → Freeze → 1 row**).

## 2. Create a Google service account

1. Go to <https://console.cloud.google.com/> and create (or pick) a project.
2. **APIs & Services → Library** → enable **Google Sheets API**.
3. **IAM & Admin → Service Accounts → Create service account**. Name it e.g.
   `sdf-membership`. It needs no project roles.
4. Open the service account → **Keys → Add key → Create new key → JSON**. A
   JSON file downloads. Treat it like a password: don't email it, don't commit it.
5. In the Google Sheet, click **Share** and add the service account's email
   (`...@...iam.gserviceaccount.com`) as **Editor**. Untick "Notify people".

## 3. Set environment variables

Copy `.env.example` to `.env.local` for local development, and add the same
variables in your hosting provider's settings (e.g. Vercel → Project → Settings →
Environment Variables) for production.

| Variable | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON file |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON file, kept on one line with `\n` |
| `GOOGLE_SHEET_ID` | The ID in the sheet URL: `docs.google.com/spreadsheets/d/<ID>/edit` |
| `GOOGLE_SHEET_TAB` | Tab name, default `Registrations` |
| `MEMBERSHIP_FEE_INR` | Optional. Fee in rupees, numbers only. Empty = the default ₹999 (set in `lib/membership/payment.ts`) |
| `MEMBERSHIP_UPI_ID` | Optional. UPI ID shown under the QR code |

`MEMBERSHIP_FEE_INR` and `MEMBERSHIP_UPI_ID` are read when the site is built, so
redeploy after changing them. After setting all variables, delete the downloaded
JSON file from your computer or store it in a password manager.

If the Google variables are missing, the form shows "Membership registration is
not available right now" and nothing is saved.

## 4. Add the UPI QR code

Save the existing SDF static UPI QR image as:

```
public/membership/upi-qr.png
```

Use a clear PNG, at least 512×512 px. Until the file exists, the payment screen
asks members to contact SDF for payment details instead. Redeploy after adding it.

## 5. Admin: verifying payments

1. Check the SDF bank account / UPI app for incoming payments.
2. Match each payment to a row (by amount, name, phone, or the application ID if
   the member added it as a note).
3. Only after you have seen the money in the account, update the row:
   - **Payment Status** → `PAID`
   - **Transaction Reference** → the UPI transaction / UTR number
   - **Payment Verified On** → today's date
   - **Verified By** → your name
4. If a payment never arrives, leave it `PENDING`, or mark it `CANCELLED`.

Please don't delete rows. Mark them `CANCELLED` instead, so application IDs stay
unique and the register keeps a full history.

### Counting members

Add a second tab called `Summary` with:

| Label | Formula |
| --- | --- |
| Total registrations | `=COUNTA(Registrations!A2:A)` |
| Paid members | `=COUNTIF(Registrations!H2:H,"PAID")` |
| Pending payment | `=COUNTIF(Registrations!H2:H,"PENDING")` |
| Rejected / cancelled | `=COUNTIF(Registrations!H2:H,"REJECTED")+COUNTIF(Registrations!H2:H,"CANCELLED")` |

You can also use **Data → Create a filter** on column H to show only `PAID` or `PENDING` rows.

## Application IDs

IDs look like `SDF260001`: the last two digits of the registration year, then a running number.
The number is based on the row the registration lands in, so it keeps counting
up across years (it does not restart at 0001 each January). If rows were deleted,
the website skips numbers already in use.

## Limits to know about

- The rate limit lives in server memory. On serverless hosting with several
  instances it is per instance, so it slows down abuse but is not a hard limit.
  Add CAPTCHA (e.g. Cloudflare Turnstile) if spam becomes a problem.
- Google Sheets is fine for a few thousand members. If the register grows much
  larger, or several people need different access levels, move to a database.
- Anyone with edit access to the sheet can see every member's personal details.
  Share it only with the people who verify payments, and review access regularly.

## Aadhaar

Aadhaar is not collected. Under the Aadhaar Act and UIDAI rules, organisations
may not collect or store Aadhaar numbers unless a law requires it, and should
not store full numbers in a spreadsheet at all. If SDF needs Aadhaar for a legal
reason (for example a specific donation-receipt requirement), do not add it to
this form or this sheet. Instead:

- Collect only what the law requires, ideally the last 4 digits or a masked number.
- Store any full number only in an encrypted database with restricted access,
  separate from this sheet, with a written retention period after which it is deleted.
- Get explicit consent stating why it is collected, and update the privacy policy.
- Get legal advice first.

## New-registration alerts (WhatsApp and email)

Each new registration sends you a WhatsApp message and an email with the
application ID, name, phone and email (the email also has the address and
comments). Both are free and optional: leave a channel's variables empty to
turn it off. Alerts are sent after the applicant sees the success page, so a
failed alert never affects the registration. Failures show up in the server logs.

### WhatsApp (CallMeBot)

1. Save **+34 644 51 95 23** in your phone's contacts (check
   https://www.callmebot.com/blog/free-api-whatsapp-messages/ for the current number).
2. From WhatsApp, send it: `I allow callmebot to send me messages`
3. It replies with your API key.
4. Set `CALLMEBOT_PHONE` (your number with country code, e.g. `+919876543210`)
   and `CALLMEBOT_API_KEY`.

### Email (Gmail)

1. Turn on 2-Step Verification on the Gmail account that will send the alerts.
2. Create an App Password: Google Account → Security → App passwords.
3. Set `GMAIL_USER` (that Gmail address) and `GMAIL_APP_PASSWORD` (the 16-character code).
4. Optional: set `NOTIFY_EMAIL_TO` to send alerts to a different inbox.
   Replying to the alert email replies to the applicant.

After changing these values, restart the dev server (or redeploy).
