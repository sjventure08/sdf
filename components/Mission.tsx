"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type IconName = "lotus" | "scroll" | "meditateRays" | "handsHeart" | "chevronDown";

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
        case "lotus":
            return (
                <svg {...common}>
                    <path d="M12 21c-4-1-6-4-6-7 2 1 4 1 6-1 2 2 4 2 6 1 0 3-2 6-6 7Z" />
                    <path d="M12 14V4" />
                    <path d="M8 8c1 2 2 4 4 4" />
                    <path d="M16 8c-1 2-2 4-4 4" />
                </svg>
            );
        case "scroll":
            return (
                <svg {...common}>
                    <path d="M6 4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h1V4Z" />
                    <path d="M6 20a2 2 0 0 1-2-2 2 2 0 0 1 2-2h1v4Z" />
                    <rect x="7" y="4" width="11" height="16" rx="1" />
                    <path d="M10 9h5M10 13h3" />
                </svg>
            );
        case "meditateRays":
            return (
                <svg {...common}>
                    <circle cx="12" cy="7" r="2" />
                    <path d="M8.5 19c0-1.5.8-3 2-4l.5-2h2l.5 2c1.2 1 2 2.5 2 4" />
                    <path d="M9.5 13.5h5" />
                    <path d="M12 2v1.2M6.5 4.2l.7.7M17.5 4.2l-.7.7M4 9.5h1.2M18.8 9.5H20" />
                </svg>
            );
        case "handsHeart":
            return (
                <svg {...common}>
                    <path d="M4 14c0 3 2 5 4 5M20 14c0 3-2 5-4 5" />
                    <path d="M4 14c0-2 1-4 3-4M20 14c0-2-1-4-3-4" />
                    <path d="M12 15.5c-2-1.5-4-3-4-5.2A2.8 2.8 0 0 1 12 8a2.8 2.8 0 0 1 4 2.3c0 2.2-2 3.7-4 5.2Z" />
                </svg>
            );
        case "chevronDown":
            return (
                <svg {...common}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            );
    }
}

const missionSteps = [
    {
        number: "01",
        icon: "scroll" as const,
        title: "Preserve",
        subtitle: "Keep the wisdom alive.",
        desc: "Protect and share the knowledge, traditions, culture, and practices passed through generations.",
        active: true,
    },
    {
        number: "02",
        icon: "meditateRays" as const,
        title: "Empower",
        subtitle: "Help people discover their path.",
        desc: "Create spaces for learning, reflection, spiritual growth, and meaningful community.",
        active: false,
    },
    {
        number: "03",
        icon: "handsHeart" as const,
        title: "Serve",
        subtitle: "Let Dharma become seva.",
        desc: "Turn compassion into action by serving people, communities, and society.",
        active: false,
    },
];

export default function Mission() {
    return (
        <section className="bg-background px-8 py-16 md:px-16 md:py-24">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                {/* Left column */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="text-center lg:text-left">
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                            Our Mission
                        </span>

                        <div className="mt-3 flex items-center justify-center gap-3 lg:justify-start">
                            <span className="h-px w-8 bg-accent/40" />
                            <Icon name="lotus" className="h-4 w-4 text-accent" />
                            <span className="h-px w-8 bg-accent/40" />
                        </div>

                        <h2 className="mt-6 font-heading text-4xl uppercase leading-[1.1] text-primary-text md:text-5xl">
                            Turning <span className="text-accent">Dharma</span>
                            <br />
                            Into Action.
                        </h2>

                        <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
                            <span className="h-px w-8 bg-accent/40" />
                            <Icon name="lotus" className="h-4 w-4 text-accent" />
                            <span className="h-px w-8 bg-accent/40" />
                        </div>

                        <p className="mx-auto mt-6 max-w-sm text-base leading-7 text-secondary-text lg:mx-0">
                            To preserve timeless wisdom, nurture communities, and make the values of Sanatana Dharma meaningful in everyday life.
                        </p>
                    </div>

                    {/* Timeline */}

                    <div className="relative mt-12 flex flex-col gap-10">
                        <span className="absolute left-6 top-6 bottom-6 w-px  " />

                        {missionSteps.map((step) => (
                            <div key={step.number} className="relative flex items-start gap-5">
                                <div
                                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-sm text-accent ${
                                        step.active
                                            ? "border-accent shadow-[0_0_16px_rgba(184,137,46,0.5)]"
                                            : "border-accent/30"
                                    }`}
                                >
                                    {step.number}
                                </div>

                                <Icon name={step.icon} className="mt-2 h-6 w-6 shrink-0 text-accent" />

                                <div>
                                    <h3 className="font-heading text-lg uppercase tracking-wide text-accent">
                                        {step.title}
                                    </h3>

                                    <p className="mt-1 text-sm font-semibold text-primary-text">
                                        {step.subtitle}
                                    </p>

                                    <p className="mt-1 max-w-sm text-sm leading-6 text-secondary-text">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right column */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-l-[100px] md:rounded-l-[200px]">
                        <Image
                            src="/missionimage.webp"
                            alt="Hands joined together in unity"
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="mt-10 text-center">
                        <span className="font-heading text-4xl text-accent">❝</span>

                        <p className="mt-2 font-heading text-xl uppercase leading-[1.3] text-primary-text md:text-2xl">
                            Wisdom becomes meaningful
                            <br />
                            <span className="text-accent">when it becomes action.</span>
                        </p>

                        <div className="mt-4 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-accent/40" />
                            <Icon name="lotus" className="h-4 w-4 text-accent" />
                            <span className="h-px w-8 bg-accent/40" />
                        </div>

                        <Link
                            href="/initiatives"
                            className="mt-8 inline-block cursor-pointer rounded-full border border-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-background"
                        >
                            Discover Our Initiatives →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
