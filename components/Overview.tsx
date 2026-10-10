"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type IconName =
    | "diamond"
    | "infinity"
    | "leaf"
    | "heart"
    | "meditate"
    | "diya"
    | "book"
    | "handshake"
    | "sun"
    | "lotus";

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
        case "diamond":
            return (
                <svg {...common}>
                    <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" />
                </svg>
            );
        case "infinity":
            return (
                <svg {...common}>
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                </svg>
            );
        case "leaf":
            return (
                <svg {...common}>
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
            );
        case "heart":
            return (
                <svg {...common}>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
            );
        case "meditate":
            return (
                <svg {...common}>
                    <circle cx="12" cy="6" r="2.25" />
                    <path d="M7 20c0-2 1-4 2-5l1.5-3h3L15 15c1 1 2 3 2 5" />
                    <path d="M9 12h6" />
                </svg>
            );
        case "diya":
            return (
                <svg {...common}>
                    <path d="M4 15c0 3 3.5 5 8 5s8-2 8-5" />
                    <path d="M4 15c0-1 3.5-2 8-2s8 1 8 2" />
                    <path d="M12 10c-1.5-1.5-1.5-3.5 0-5 1.5 1.5 1.5 3.5 0 5z" />
                </svg>
            );
        case "book":
            return (
                <svg {...common}>
                    <path d="M12 6c-2-1.5-4.5-2-7-2v13c2.5 0 5 .5 7 2 2-1.5 4.5-2 7-2V4c-2.5 0-5 .5-7 2Z" />
                    <path d="M12 6v13" />
                </svg>
            );
        case "handshake":
            return (
                <svg {...common}>
                    <path d="M2 11l4-4 4 1 3 3-3 3-2-2" />
                    <path d="M22 11l-4-4-4 1" />
                    <path d="M11 11l2-2 4 4a1.5 1.5 0 0 1-2 2Z" />
                    <path d="M13 13l1.5 1.5a1.5 1.5 0 0 1-2 2L11 15" />
                </svg>
            );
        case "sun":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            );
        case "lotus":
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

const traits = [
    { icon: "infinity" as const, label: "Eternal", desc: "Not bound by time" },
    { icon: "leaf" as const, label: "Universal", desc: "For every age, every soul" },
    { icon: "heart" as const, label: "Harmonious", desc: "Connects you with life and existence" },
    { icon: "om" as const, label: "Transformative", desc: "From within, for a better world" },
];

const offers = [
    {
        image: "/meditating.png",
        title: "Discover Yourself",
        desc: "Understand the true nature of who you are beyond the body and mind.",
    },
    {
        image: "/livingwithpurpose.png",
        title: "Live With Purpose",
        desc: "Align your thoughts, words and actions with dharma and higher values.",
    },
    {
        image: "/growinwisdom.png",
        title: "Grow In Wisdom",
        desc: "Explore ancient wisdom that answers life's deepest questions.",
    },
    {
        image: "/serving.png",
        title: "Serve Selflessly",
        desc: "Make a positive impact and become a source of meaning for others.",
    },
];

export default function Overview() {
    return (
        <section className="bg-background px-8 py-16 md:px-16 md:py-24">
            {/* Header + intro */}

            <div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-heading text-5xl leading-[1.05] text-primary-text md:text-6xl">
                        Sanatana Dharma
                    </h2>

                    <p className="mt-3 text-lg font-semibold uppercase tracking-[0.2em] text-accent md:text-xl">
                        The Eternal Way of Living
                    </p>

                    <div className="mt-8 border-l-2 border-accent/40 pl-6">
                        <p className="text-base leading-8 text-secondary-text md:text-lg">
                            Sanatana Dharma is not just a religion. It&apos;s a timeless way of
                            life, a science of the soul that helps us live with purpose, in
                            harmony with ourselves, others and the universe.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {traits.map((trait) => (
                            <div key={trait.label}>
                                {trait.icon === "om" ? (
                                    <span className="block text-2xl text-accent">ॐ</span>
                                ) : (
                                    <Icon name={trait.icon} className="h-7 w-7 text-accent" />
                                )}

                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary-text">
                                    {trait.label}
                                </p>

                                <p className="mt-1 text-xs leading-5 text-secondary-text">
                                    {trait.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Section header */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16 flex items-center justify-center gap-4 md:mt-20"
            >
                <span className="h-px w-10 bg-accent/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent md:text-sm">
                    At its heart, it offers
                </span>
                <span className="h-px w-10 bg-accent/40" />
            </motion.div>

            {/* Offers grid + curious panel */}

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 ">
                {offers.map((offer, index) => (
                    <motion.div
                        key={offer.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative h-80 overflow-hidden rounded-2xl border border-accent/15 lg:col-span-1 bg-accent/5"
                    >
                        {/* Image */}
                        <Image
                            src={offer.image}
                            alt={offer.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-6 transition-all duration-500 group-hover:bg-black/60">
                            <div className="translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                                    {offer.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-white/80">
                                    {offer.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start rounded-2xl p-6 sm:col-span-2 lg:col-span-1 bg-accent/5"
                >
                    <Icon name="sun" className="h-6 w-6 text-accent" />

                    <span className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                        Curious?
                    </span>

                    <h3 className="mt-3 font-heading text-xl leading-[1.2] text-primary-text">
                        There is so much more to explore.
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-secondary-text">
                        Begin your journey into the timeless wisdom of Sanatana Dharma.
                    </p>

                    <Icon name="lotus" className="mt-6 h-8 w-8 text-accent/50" />
                </motion.div>
            </div>

            {/* CTA */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16 flex flex-col items-center gap-6 text-center"
            >
                <Link
                    href="/sanatana-dharma"
                    className="cursor-pointer rounded-full border border-[#E87516] px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_0_24px_rgba(184,137,46,0.25)] transition-colors hover:bg-[#E87516] hover:text-background"
                >
                    Know More →
                </Link>
            </motion.div>
        </section>
    );
}
