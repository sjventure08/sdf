"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaOm } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { PiBookOpenText, PiFlame, PiFlowerLotus, PiHandshake, PiHeart, PiInfinity, PiLeaf, PiSparkle, PiSun } from "react-icons/pi";

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
    | "lotus"
    | "om";

const iconMap: Record<IconName, IconType> = {
    diamond: PiSparkle,
    infinity: PiInfinity,
    leaf: PiLeaf,
    heart: PiHeart,
    meditate: GiMeditation,
    diya: PiFlame,
    book: PiBookOpenText,
    handshake: PiHandshake,
    sun: PiSun,
    lotus: PiFlowerLotus,
    om: FaOm,
};

function Icon({ name, className }: { name: IconName; className?: string }) {
    const Component = iconMap[name];
    return <Component className={className} aria-hidden="true" />;
}

const traits = [
    { icon: "infinity" as const, label: "Eternal", desc: "Not bound by time" },
    { icon: "leaf" as const, label: "Universal", desc: "For every age, every soul" },
    { icon: "heart" as const, label: "Harmonious", desc: "Connects you with life and existence" },
    { icon: "om" as const, label: "Transformative", desc: "From within, for a better world" },
];

const offers = [
    {
        image: "/SacredPooja/sacredpooja-11.webp",
        title: "Discover Yourself",
        desc: "Understand the true nature of who you are beyond the body and mind.",
    },
    {
        image: "/SpiritualEvents/spiritualevents-11.webp",
        title: "Live With Purpose",
        desc: "Align your thoughts, words and actions with dharma and higher values.",
    },
    {
        image: "/SpiritualEvents/spiritualevents-20.webp",
        title: "Grow In Wisdom",
        desc: "Explore ancient wisdom that answers life's deepest questions.",
    },
    {
        image: "/SocialActivity/socialactivity-09.webp",
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
                                <Icon name={trait.icon} className="h-7 w-7 text-accent" />

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
