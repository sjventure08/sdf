"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import { PiCaretDown, PiCompass, PiFlowerLotus, PiHandHeart, PiScroll } from "react-icons/pi";

type IconName = "lotus" | "scroll" | "meditateRays" | "handsHeart" | "chevronDown";

const iconMap: Record<IconName, IconType> = {
    lotus: PiFlowerLotus,
    scroll: PiScroll,
    meditateRays: PiCompass,
    handsHeart: PiHandHeart,
    chevronDown: PiCaretDown,
};

function Icon({ name, className }: { name: IconName; className?: string }) {
    const Component = iconMap[name];
    return <Component className={className} aria-hidden="true" />;
}

const missionSteps = [
    {
        number: "01",
        icon: "scroll" as const,
        title: "Preserve",
        subtitle: "Keep the wisdom alive.",
        desc: "Protect and share the knowledge, traditions, culture, and practices passed through generations.",
        image: "/SpiritualEvents/spiritualevents-32.webp",
        alt: "Saints and devotees offering aarti together at the spiritual festival",
    },
    {
        number: "02",
        icon: "meditateRays" as const,
        title: "Empower",
        subtitle: "Help people discover their path.",
        desc: "Create spaces for learning, reflection, spiritual growth, and meaningful community.",
        image: "/SpiritualEvents/spiritualevents-17.webp",
        alt: "Guruji delivering a discourse at the Vedarth Vigyan Sangoshti",
    },
    {
        number: "03",
        icon: "handsHeart" as const,
        title: "Serve",
        subtitle: "Let Dharma become seva.",
        desc: "Turn compassion into action by serving people, communities, and society.",
        image: "/SocialActivity/socialactivity-06.webp",
        alt: "Volunteers serving food to devotees",
    },
];

export default function Mission() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStep = missionSteps[activeIndex];

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

                    <div role="tablist" aria-label="Our mission" className="relative mt-12 flex flex-col gap-4">
                        {missionSteps.map((step, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={step.number}
                                    type="button"
                                    role="tab"
                                    id={`mission-tab-${index}`}
                                    aria-selected={isActive}
                                    aria-controls="mission-panel"
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex cursor-pointer items-start gap-5 rounded-3xl border p-4 text-left transition-all duration-300 ${
                                        isActive
                                            ? "border-accent/30 bg-secondary/60 shadow-[0_8px_30px_rgba(184,137,46,0.12)]"
                                            : "border-transparent opacity-60 hover:bg-secondary/30 hover:opacity-100"
                                    }`}
                                >
                                    <div
                                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-all duration-300 ${
                                            isActive
                                                ? "border-accent bg-accent text-background shadow-[0_0_16px_rgba(184,137,46,0.5)]"
                                                : "border-accent/30 bg-background text-accent"
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
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Right column */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div
                        id="mission-panel"
                        role="tabpanel"
                        aria-labelledby={`mission-tab-${activeIndex}`}
                        className="relative aspect-4/3 w-full overflow-hidden rounded-l-[100px] bg-secondary/40 md:rounded-l-[200px]"
                    >
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={activeStep.image}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src={activeStep.image}
                                    alt={activeStep.alt}
                                    fill
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
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
