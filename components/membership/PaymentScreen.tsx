"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { PaymentDetails } from "@/lib/membership/payment";

// Application ID + UPI payment instructions, shown on /membership/success.
export default function PaymentScreen({
    applicationId,
    payment,
}: {
    applicationId: string;
    payment: PaymentDetails;
}) {
    const [copied, setCopied] = useState(false);

    async function copyId() {
        try {
            await navigator.clipboard.writeText(applicationId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked — the ID is still visible to copy by hand.
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-accent/30 bg-background/40 px-6 py-10 text-center sm:px-10"
            role="status"
        >
            <p className="font-heading text-2xl text-accent">Registration Received</p>
            <p className="mt-2 text-sm leading-6 text-secondary-text">
                Your details have been saved. Your membership will be confirmed once
                SDF verifies your payment.
            </p>

            <div className="mt-8 rounded-xl border border-gold/40 bg-white px-4 py-5">
                <p className="form-label">Your Application ID</p>
                <p className="mt-2 font-heading text-3xl tracking-wide text-primary-text">{applicationId}</p>
                <button type="button" onClick={copyId} className="mt-3 cursor-pointer text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                    {copied ? "Copied ✓" : "Copy ID"}
                </button>
                <p className="mt-3 text-xs text-tertiary-text">
                    Please note this down or take a screenshot of this page.
                </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text">
                <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                Payment status: Pending verification
            </div>

            <div className="mt-8">
                <p className="card-title text-primary-text">Pay the Membership Fee</p>
                {payment.fee && (
                    <p className="mt-2 text-lg text-secondary-text">
                        Amount: <span className="font-semibold text-primary-text">{payment.fee}</span>
                    </p>
                )}

                {payment.qrSrc ? (
                    <div className="mx-auto mt-5 w-56 rounded-xl border border-accent/20 bg-white p-3 sm:w-64">
                        <Image
                            src={payment.qrSrc}
                            alt="SDF UPI payment QR code"
                            width={512}
                            height={512}
                            className="h-auto w-full"
                        />
                    </div>
                ) : (
                    <p className="mx-auto mt-5 max-w-sm rounded-xl border border-dashed border-accent/40 px-4 py-6 text-sm text-secondary-text">
                        The payment QR code isn&apos;t available here yet. Please{" "}
                        <Link href="/contact" className="text-accent underline underline-offset-4">contact us</Link>{" "}
                        with your application ID for payment details.
                    </p>
                )}

                {payment.upiId && (
                    <p className="mt-3 text-sm text-secondary-text">
                        UPI ID: <span className="font-semibold text-primary-text">{payment.upiId}</span>
                    </p>
                )}
            </div>

            <ol className="mx-auto mt-8 max-w-sm list-decimal space-y-2 pl-5 text-left text-sm leading-6 text-secondary-text">
                <li>Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, BHIM…).</li>
                <li>Pay{payment.fee ? ` ${payment.fee}` : " the membership fee"}. Payment is made separately in your UPI app, not on this website.</li>
                <li>If your app allows a note, add your application ID <strong>{applicationId}</strong>.</li>
                <li>SDF will check the payment against our bank records and confirm your membership.</li>
            </ol>

            <p className="mt-6 text-xs leading-5 text-tertiary-text">
                Scanning the code or returning to this page does not confirm payment.
                Your membership becomes active only after SDF has verified it.
            </p>

            <Link href="/membership#register" className="mt-8 inline-block text-link underline underline-offset-4">
                Register another member
            </Link>
        </motion.div>
    );
}
