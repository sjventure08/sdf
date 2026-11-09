"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PiFlowerLotus } from "react-icons/pi";

// Key under which the form saves the member's name just before redirecting,
// so the card can show it without putting personal details in the URL.
export const MEMBER_NAME_STORAGE_KEY = "sdf-membership-name";

// Application number, membership card preview and next steps, shown on /membership/success.
export default function MembershipConfirmation({ applicationId, fee }: { applicationId: string; fee?: string | null }) {
    const [memberName, setMemberName] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(MEMBER_NAME_STORAGE_KEY) ?? "null") as
                | { id: string; name: string }
                | null;
            if (saved?.id === applicationId && saved.name) setMemberName(saved.name);
        } catch {
            // Storage unavailable — the card shows without a name.
        }
    }, [applicationId]);

    async function copyId() {
        try {
            await navigator.clipboard.writeText(applicationId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked — the number is still visible to copy by hand.
        }
    }

    const year = applicationId.split("-")[1];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
            role="status"
        >
            <p className="font-heading text-2xl text-accent">Registration Successful</p>
            <p className="mt-2 text-sm leading-6 text-secondary-text">
                Thank you{memberName ? `, ${memberName}` : ""}. Your membership application has been received.
            </p>

            {/* Application number */}
            <div className="mt-8 rounded-xl border border-gold/40 bg-background/40 px-4 py-5">
                <p className="form-label">Your Application Number</p>
                <p className="mt-2 font-heading text-3xl tracking-wide text-primary-text">{applicationId}</p>
                <button
                    type="button"
                    onClick={copyId}
                    className="mt-3 cursor-pointer text-xs font-semibold uppercase tracking-[0.15em] text-accent"
                >
                    {copied ? "Copied ✓" : "Copy number"}
                </button>
                <p className="mt-3 text-xs text-tertiary-text">
                    Please note this number or take a screenshot. Quote it whenever you contact us.
                </p>
            </div>

            {/* Membership card preview */}
            <div className="mt-10">
                <p className="form-label">Your Membership Card</p>
                <div className="relative mx-auto mt-4 aspect-[1.586/1] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-highlight p-5 text-left text-white shadow-xl sm:p-6">
                    <PiFlowerLotus
                        className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 text-white/10"
                        aria-hidden="true"
                    />
                    <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-white p-1">
                                <Image src="/sdflogo.png" alt="" width={40} height={40} className="h-8 w-8 object-contain sm:h-10 sm:w-10" />
                            </div>
                            <div>
                                <p className="font-heading text-sm leading-tight sm:text-base">Sanatana Dharma Foundation</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">Membership Card</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Member</p>
                            <p className="font-heading text-lg leading-tight sm:text-2xl">{memberName ?? "SDF Member"}</p>
                        </div>

                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Application No.</p>
                                <p className="font-mono text-sm tracking-wider sm:text-base">{applicationId}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Since</p>
                                <p className="font-mono text-sm sm:text-base">{year}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-3 text-xs text-tertiary-text">
                    Preview only. Your official membership card will be sent by post.
                </p>
            </div>

            {/* Next steps */}
            <div className="mt-10 space-y-4 text-left">
                <div className="rounded-xl border border-accent/30 bg-background/40 px-5 py-4">
                    <p className="card-title text-primary-text">1. Payment is made offline</p>
                    <p className="mt-2 text-sm leading-6 text-secondary-text">
                        No payment is taken on this website. Please pay the membership fee{fee ? <> of <strong>{fee}</strong></> : null} offline. Our team
                        will contact you on the phone number or email you gave us with the payment details.
                        Please mention your application number <strong>{applicationId}</strong> when you pay.
                    </p>
                </div>
                <div className="rounded-xl border border-accent/30 bg-background/40 px-5 py-4">
                    <p className="card-title text-primary-text">2. Your card is sent by post</p>
                    <p className="mt-2 text-sm leading-6 text-secondary-text">
                        Once your payment is confirmed, your membership card will be sent by post to the
                        residential address you gave in the form.
                    </p>
                </div>
            </div>

            <p className="mt-8 text-sm text-secondary-text">
                Questions?{" "}
                <Link href="/contact" className="text-accent underline underline-offset-4">Contact us</Link>{" "}
                with your application number.
            </p>

            <Link href="/membership#register" className="mt-6 inline-block text-link underline underline-offset-4">
                Register another member
            </Link>
        </motion.div>
    );
}
