"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";


type IconName = "dharma" | "karma" | "ahimsa" | "seva" | "satya" | "moksha";

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
        case "dharma":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3 12h18" />
                </svg>
            );
        case "karma":
            return (
                <svg {...common}>
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                </svg>
            );
        case "ahimsa":
            return (
                <svg {...common}>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
            );
        case "seva":
            return (
                <svg {...common}>
                    <path d="M2 11l4-4 4 1 3 3-3 3-2-2" />
                    <path d="M22 11l-4-4-4 1" />
                    <path d="M11 11l2-2 4 4a1.5 1.5 0 0 1-2 2Z" />
                    <path d="M13 13l1.5 1.5a1.5 1.5 0 0 1-2 2L11 15" />
                </svg>
            );
        case "satya":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            );
        case "moksha":
            return (
                <svg {...common}>
                    <path d="M12 21c-4-1-6-4-6-7 2 1 4 1 6-1 2 2 4 2 6 1 0 3-2 6-6 7Z" />
                    <path d="M12 14V4" />
                    <path d="M8 8c1 2 2 4 4 4" />
                    <path d="M16 8c-1 2-2 4-4 4" />
                </svg>
            );
    }
}

const principles = [
    { icon: "dharma" as const, title: "Dharma", desc: "Righteous duty — living in alignment with truth and one's responsibilities." },
    { icon: "karma" as const, title: "Karma", desc: "Every action carries a consequence; conscious living shapes the future." },
    { icon: "ahimsa" as const, title: "Ahimsa", desc: "Non-violence in thought, word and deed toward every living being." },
    { icon: "seva" as const, title: "Seva", desc: "Selfless service offered without expectation of return." },
    { icon: "satya" as const, title: "Satya", desc: "Truthfulness as the foundation of a meaningful life." },
    { icon: "moksha" as const, title: "Moksha", desc: "Liberation — freedom from the cycle of birth and rebirth." },
];

const texts = [
    { title: "The Vedas", desc: "The oldest scriptures — hymns, rituals and philosophy revealed to ancient sages.", img: "/vedas.png" },
    { title: "The Upanishads", desc: "Philosophical texts exploring the self, the ultimate reality, and liberation.", img: "/Upanishads.png" },
    { title: "The Bhagavad Gita", desc: "Krishna's dialogue with Arjuna on duty, devotion and the nature of reality.", img: "/bagvadgita.png" },
    { title: "The Ramayana", desc: "The epic of Prince Rama — a story of virtue, duty and devotion.", img: "/ramayana.png" },
];

const practices = [
    { title: "Meditation & Reflection", desc: "Quiet daily practice to still the mind and turn attention inward." },
    { title: "Festivals & Rituals", desc: "Communal celebrations that mark the rhythm of the spiritual year." },
    { title: "Pilgrimage", desc: "Sacred journeys — from local temples to gatherings like the Kumbh Mela." },
    { title: "Selfless Service", desc: "Seva offered to community as a living expression of dharma." },
];

const faqs = [
    {
        q: "Is Sanatana Dharma the same as Hinduism?",
        a: "Sanatana Dharma is the traditional name for what is commonly called Hinduism today. It translates roughly to \"the eternal way\" and refers to a way of living rather than a fixed religious institution.",
    },
    {
        q: "Do I need to be born into it to follow it?",
        a: "No. Sanatana Dharma welcomes sincere seekers regardless of background. Its practices and principles are offered as a path anyone can walk.",
    },
    {
        q: "How can I start learning more?",
        a: "Read our Journal for articles on scripture and practice, attend a satsang, or reach out through our Contact page — we're glad to guide you to a starting point.",
    },
];

export default function SanatanaDharmaContent() {
    return (
        <>
            {/* Intro */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-3xl"
                >
                    <p className="text-base leading-8 text-secondary-text md:text-lg">
                        Sanatana Dharma is not a religion in the sense of a fixed doctrine —
                        it is a timeless way of life, a science of the soul that has guided
                        seekers for thousands of years. It offers a path to understand who
                        we are, how to live rightly, and how to relate to the world around
                        us with wisdom and compassion.
                    </p>

                    <p className="mt-6 text-base leading-8 text-secondary-text md:text-lg">
                        At its heart are a handful of enduring principles — dharma, karma,
                        ahimsa, seva, satya and moksha — that continue to offer guidance for
                        living well, no matter the age.
                    </p>
                </motion.div>
            </section>

            {/* Core Principles */}

            <section className="bg-secondary/40 px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                        Foundations
                    </span>

                    <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Core Principles
                    </h2>
                </motion.div>

                <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-center"
                        >
                            <Icon name={principle.icon} className="mx-auto h-7 w-7 text-accent" />
                            <p className="mt-4 font-heading text-lg text-primary-text">
                                {principle.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-secondary-text">
                                {principle.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sacred Texts */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                        Sacred Wisdom
                    </span>

                    <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Scriptures & Texts
                    </h2>
                </motion.div>

                <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {texts.map((text, index) => (
                        <motion.div
                            key={text.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="relative aspect-[1] w-full overflow-hidden rounded-2xl bg-secondary/30">
                                <Image
                                    src={text.img}
                                    alt={text.title}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                                    loading="eager"
                                    className="object-fit object-center"
                                />
                            </div>
                            <p className="mt-4 font-heading text-base text-primary-text">
                                {text.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-secondary-text">
                                {text.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blog/hindu-religious-texts-and-scriptures"
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:text-highlight"
                    >
                        Read the Full Journal Entry →
                    </Link>
                </div>
            </section>

            {/* Practices */}

            <section className="bg-secondary/40 px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                        Living The Practice
                    </span>

                    <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Practices & Traditions
                    </h2>
                </motion.div>

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {practices.map((practice, index) => (
                        <motion.div
                            key={practice.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-2xl border border-accent/15 bg-background p-6"
                        >
                            <p className="font-heading text-base text-primary-text">
                                {practice.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-secondary-text">
                                {practice.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                        Questions
                    </span>

                    <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Frequently Asked
                    </h2>
                </motion.div>

                <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.q}
                            className="group rounded-2xl border border-accent/15 bg-secondary/30 p-6 open:bg-secondary/50"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base text-primary-text marker:content-none">
                                {faq.q}
                                <span className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-4 text-sm leading-6 text-secondary-text">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}

            <section className="bg-secondary px-8 py-16 text-center md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Continue The Journey
                    </h2>

                    <p className="mx-auto mt-4 max-w-md text-base leading-7 text-secondary-text">
                        Explore how this wisdom becomes action in our initiatives, or read
                        more in the Journal.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href="/initiatives"
                            className="cursor-pointer rounded-full border border-accent bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-accent"
                        >
                            Our Initiatives →
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-semibold uppercase tracking-[0.15em] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                        >
                            Visit the Journal
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
