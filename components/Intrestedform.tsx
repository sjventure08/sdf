"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import { PiFlowerLotus } from "react-icons/pi";

type Inputs = {
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message?: string;
};

const interestOptions = [
    "Volunteering",
    "Programs & Events",
    "General Inquiry",
];

export default function InterestedForm() {
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
        <section className="bg-white px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-xl text-center"
            >
                <span className="eyebrow text-accent">
                    Get Involved
                </span>

                <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-accent/40" />
                    <PiFlowerLotus className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="h-px w-8 bg-accent/40" />
                </div>

                <h2 className="mt-6 section-title text-primary-text">
                    Join Us <span className="text-accent">on the Path</span>
                </h2>

                <p className="mx-auto mt-6 max-w-sm text-base leading-7 text-secondary-text">
                    Tell us how you&apos;d like to be involved and we&apos;ll reach out with next steps.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-12 max-w-xl"
            >
                {submitted ? (
                    <div className="rounded-2xl border border-accent/30 bg-background/40 px-6 py-10 text-center">
                        <p className="font-heading text-xl text-accent">Thank You</p>
                        <p className="mt-2 text-sm leading-6 text-secondary-text">
                            We&apos;ve received your message and will be in touch soon.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="mt-6 cursor-pointer text-link underline underline-offset-4"
                        >
                            Submit another response
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="form-label"
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
                                className="form-label"
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
                                htmlFor="phone"
                                className="form-label"
                            >
                                Phone <span className="normal-case text-tertiary-text">(optional)</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="+91 00000 00000"
                                className="mt-2 w-full rounded-lg border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                {...register("phone")}
                            />
                        </div>
                        
                        <div>
                            <label
                                htmlFor="message"
                                className="form-label"
                            >
                                Message <span className="normal-case text-tertiary-text">(optional)</span>
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="Share anything that will help us connect you to the right initiative"
                                className="mt-2 w-full rounded-2xl border border-accent/30 bg-background px-5 py-3 text-sm text-primary-text placeholder:text-tertiary-text focus:border-accent focus:outline-none"
                                {...register("message")}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 btn btn-primary"
                        >
                            {isSubmitting ? "Sending..." : "Submit Interest →"}
                        </button>
                    </form>
                )}
            </motion.div>
        </section>
    );
}
