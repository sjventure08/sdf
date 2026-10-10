"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";

type IconName = "mail" | "phone" | "pin" | "clock";

function Icon({ name, className }: { name: IconName; className?: string }) {
    const common = {
        viewBox: "0 0 24 24",
        fill: "none" as const,
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        className,
    };

    switch (name) {
        case "mail":
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                </svg>
            );
        case "phone":
            return (
                <svg {...common}>
                    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z" />
                </svg>
            );
        case "pin":
            return (
                <svg {...common}>
                    <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
            );
        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                </svg>
            );
    }
}

const presenceCities = ["Delhi", "Mumbai", "Hyderabad", "Indore", "Chennai"];

const contactDetails = [
    { icon: "mail" as const, label: "Email", value: "tailnext@gmail.com", href: "mailto:tailnext@gmail.com" },
    { icon: "phone" as const, label: "Phone", value: "+1 (123) 456-7890", href: "tel:+1 (123) 456-7890" },
    { icon: "pin" as const, label: "Address", value: "601 Kailash building Katurba Gandi marg\n\nNew Delhi 110001", href: undefined },
    { icon: "clock" as const, label: "Office Hours", value: "Mon–Sat, 10am–60pm", href: undefined },
];

type Inputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactContent() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        setSubmitted(true);
        reset();
    };

    return (
        <>
            {/* Contact info + form */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Info */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                            Get In Touch
                        </span>

                        <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                            Reach Out Anytime
                        </h2>

                        <p className="mt-4 text-base leading-7 text-secondary-text">
                            Questions about our programs, want to volunteer, or just want to
                            say hello? We&apos;d love to hear from you.
                        </p>

                        <div className="mt-10 flex flex-col gap-6">
                            {contactDetails.map((detail) => (
                                <div key={detail.label} className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent">
                                        <Icon name={detail.icon} className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                                            {detail.label}
                                        </p>
                                        {detail.href ? (
                                            <a
                                                href={detail.href}
                                                className="mt-1 block text-sm text-secondary-text transition-colors hover:text-primary-text"
                                            >
                                                {detail.value}
                                            </a>
                                        ) : (
                                            <p className="mt-1 text-sm text-secondary-text">
                                                {detail.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-2xl border border-accent/15 bg-secondary/30 p-6 md:p-8"
                    >
                        {submitted ? (
                            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                                <p className="font-heading text-xl uppercase text-accent">Thank You</p>
                                <p className="mt-2 text-sm leading-6 text-secondary-text">
                                    We&apos;ve received your message and will be in touch soon.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-accent underline underline-offset-4"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-lg border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                        {...register("name", { required: "Please share your name" })}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-highlight">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-lg border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                        {...register("email", {
                                            required: "Please share your email",
                                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-highlight">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        placeholder="What's this about?"
                                        className="mt-2 w-full rounded-lg border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                        {...register("subject", { required: "Please add a subject" })}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-highlight">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder="Tell us how we can help"
                                        className="mt-2 w-full rounded-lg border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                        {...register("message", { required: "Please add a message" })}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-highlight">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-lg border border-accent bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message →"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Map */}

            <section className="bg-secondary/40 px-8 pb-16 md:px-16 md:pb-24">
                <div className="mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                    >
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                            Where We Work
                        </span>
                        <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                            Our Presence Across India
                        </h2>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {presenceCities.map((city, index) => {
                            const query = encodeURIComponent(`${city}, India`);
                            return (
                                <motion.div
                                    key={city}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden rounded-2xl border border-accent/15 bg-background"
                                >
                                    <iframe
                                        title={`Map of ${city}`}
                                        src={`https://www.google.com/maps?q=${query}&output=embed`}
                                        className="h-48 w-full border-0"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    <div className="flex items-center justify-between px-5 py-4">
                                        <span className="flex items-center gap-2 text-sm font-semibold text-primary-text">
                                            <Icon name="pin" className="h-4 w-4 text-accent" />
                                            {city}
                                        </span>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold uppercase tracking-[0.15em] text-accent underline underline-offset-4"
                                        >
                                            Directions
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
