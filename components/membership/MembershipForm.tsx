"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import { PiFlowerLotus } from "react-icons/pi";
import { MEMBER_NAME_STORAGE_KEY } from "@/components/membership/MembershipConfirmation";
import { LIMITS, validators, type FieldErrors, type MembershipField } from "@/lib/membership/validation";

type Inputs = {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    comments: string;
    consent: boolean;
    website: string; // hidden spam trap
};

const inputClass =
    "mt-2 w-full rounded-lg border bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none";

function newSubmissionKey(): string {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function Required() {
    return <span className="text-accent" aria-hidden="true"> *</span>;
}

function Optional() {
    return <span className="normal-case tracking-normal text-tertiary-text"> (optional)</span>;
}

export default function MembershipForm() {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({ mode: "onTouched" });

    const router = useRouter();
    // Stays true while the success page loads, so the button can't be pressed again.
    const [redirecting, setRedirecting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    // One key per registration. Retries and double-clicks reuse it, so the
    // server recognises the repeat and never saves the same person twice.
    const [submissionKey] = useState(newSubmissionKey);
    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        setFormError(null);

        try {
            const response = await fetch("/api/membership", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: values.fullName,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    comments: values.comments,
                    consent: values.consent === true,
                    website: values.website,
                    submissionKey,
                }),
            });

            const result = (await response.json().catch(() => null)) as
                | { ok: true; applicationId: string }
                | { ok: false; error: string; fieldErrors?: FieldErrors }
                | null;

            if (response.ok && result?.ok) {
                setRedirecting(true);
                try {
                    sessionStorage.setItem(
                        MEMBER_NAME_STORAGE_KEY,
                        JSON.stringify({ id: result.applicationId, name: values.fullName.trim() }),
                    );
                } catch {
                    // Storage unavailable — the card just won't show the name.
                }
                router.push(`/membership/success?id=${encodeURIComponent(result.applicationId)}`);
                return;
            }

            if (result && !result.ok && result.fieldErrors) {
                for (const [field, message] of Object.entries(result.fieldErrors)) {
                    if (message) setError(field as keyof Inputs, { message });
                }
            }
            setFormError(result && !result.ok ? result.error : "Something went wrong. Please try again.");
        } catch {
            setFormError(
                "We couldn't reach the server. Please check your connection and try again — you won't be registered twice.",
            );
        }
    };

    const commentsLength = useWatch({ control, name: "comments" })?.length ?? 0;

    return (
        <section id="register" className="scroll-mt-24 bg-white px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-xl text-center"
            >
                <span className="eyebrow text-accent">Register</span>

                <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-accent/40" />
                    <PiFlowerLotus className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="h-px w-8 bg-accent/40" />
                </div>

                <h2 className="mt-6 section-title text-primary-text">
                    Become an <span className="text-accent">SDF Member</span>
                </h2>

                <p className="mx-auto mt-6 max-w-md text-base leading-7 text-secondary-text">
                    Fill in your details below. After registering you&apos;ll be taken
                    to a page with your application number and membership card details.
                </p>
            </motion.div>

            <div className="mx-auto mt-12 max-w-xl">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                    <p className="text-xs text-tertiary-text">
                        Fields marked <span className="text-accent">*</span> are required.
                    </p>

                    <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
                        <input
                            id="fullName"
                            type="text"
                            autoComplete="name"
                            maxLength={LIMITS.fullName}
                            placeholder="Your full name"
                            aria-invalid={!!errors.fullName}
                            className={`${inputClass} ${errors.fullName ? "border-highlight" : "border-accent/30"}`}
                            {...register("fullName", { validate: validators.fullName })}
                        />
                    </Field>

                    <Field id="phone" label="Phone Number" required error={errors.phone?.message}>
                        <input
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            maxLength={LIMITS.phone}
                            placeholder="+91 98765 43210"
                            aria-invalid={!!errors.phone}
                            className={`${inputClass} ${errors.phone ? "border-highlight" : "border-accent/30"}`}
                            {...register("phone", { validate: validators.phone })}
                        />
                    </Field>

                    <Field id="email" label="Email Address" required error={errors.email?.message}>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            maxLength={LIMITS.email}
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                            className={`${inputClass} ${errors.email ? "border-highlight" : "border-accent/30"}`}
                            {...register("email", { validate: validators.email })}
                        />
                    </Field>

                    <Field id="address" label="Residential Address" required error={errors.address?.message}>
                        <textarea
                            id="address"
                            rows={3}
                            autoComplete="street-address"
                            maxLength={LIMITS.address}
                            placeholder="House / street, city, state, PIN code"
                            aria-invalid={!!errors.address}
                            className={`${inputClass} rounded-2xl ${errors.address ? "border-highlight" : "border-accent/30"}`}
                            {...register("address", { validate: validators.address })}
                        />
                    </Field>

                    <Field id="comments" label="Comments" error={errors.comments?.message}>
                        <textarea
                            id="comments"
                            rows={3}
                            maxLength={LIMITS.comments}
                            placeholder="Anything you'd like us to know"
                            aria-invalid={!!errors.comments}
                            className={`${inputClass} rounded-2xl ${errors.comments ? "border-highlight" : "border-accent/30"}`}
                            {...register("comments", { validate: validators.comments })}
                        />
                        <p className="mt-1 text-right text-xs text-tertiary-text">
                            {commentsLength}/{LIMITS.comments}
                        </p>
                    </Field>

                    {/* Spam trap — hidden from people and screen readers */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label htmlFor="website">Website</label>
                        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                    </div>

                    <div>
                        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-secondary-text">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 shrink-0 accent-accent"
                                aria-invalid={!!errors.consent}
                                {...register("consent", {
                                    required: "Please agree so we can store your details for your membership.",
                                })}
                            />
                            <span>
                                I agree that the Sanatana Dharma Foundation may store these details to
                                process my membership and contact me about it. See our{" "}
                                <Link href="/privacy-policy" className="text-accent underline underline-offset-4">
                                    privacy policy
                                </Link>
                                .<Required />
                            </span>
                        </label>
                        {errors.consent && (
                            <p role="alert" className="mt-1 text-xs text-highlight">{errors.consent.message}</p>
                        )}
                    </div>

                    {formError && (
                        <p role="alert" className="rounded-lg border border-highlight/40 bg-highlight/5 px-4 py-3 text-sm text-secondary-text">
                            {formError}
                        </p>
                    )}

                    <button type="submit" disabled={isSubmitting || redirecting} aria-busy={isSubmitting || redirecting} className="mt-2 btn btn-primary">
                        {isSubmitting || redirecting ? "Registering…" : "Register →"}
                    </button>
                </form>
            </div>
        </section>
    );
}

function Field({
    id,
    label,
    required,
    error,
    children,
}: {
    id: MembershipField;
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="form-label">
                {label}
                {required ? <Required /> : <Optional />}
            </label>
            {children}
            {error && (
                <p role="alert" className="mt-1 text-xs text-highlight">{error}</p>
            )}
        </div>
    );
}
