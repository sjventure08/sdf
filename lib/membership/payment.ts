import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

export type PaymentDetails = {
    /** Formatted fee such as "₹1,100", or null if not configured. */
    fee: string | null;
    /** Path of the static UPI QR image in /public, or null if not uploaded yet. */
    qrSrc: string | null;
    /** UPI ID shown under the QR, or null. */
    upiId: string | null;
};

// The client's static UPI QR code. Drop the image at public/membership/upi-qr.png.
const QR_PUBLIC_PATH = "/membership/upi-qr.png";

// Membership fee in rupees. MEMBERSHIP_FEE_INR overrides it without a code change.
const DEFAULT_FEE_INR = 999;

export function getPaymentDetails(): PaymentDetails {
    const feeNumber = Number(process.env.MEMBERSHIP_FEE_INR || DEFAULT_FEE_INR);
    const fee =
        Number.isFinite(feeNumber) && feeNumber > 0
            ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(feeNumber)
            : null;

    const qrExists = existsSync(path.join(process.cwd(), "public", QR_PUBLIC_PATH));

    return {
        fee,
        qrSrc: qrExists ? QR_PUBLIC_PATH : null,
        upiId: process.env.MEMBERSHIP_UPI_ID?.trim() || null,
    };
}
