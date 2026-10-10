"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import Link from "next/link";

const stats = [
    { target: 12000, suffix: "+", label: "People Served" },
    { target: 85, suffix: "+", label: "Initiatives" },
    { target: 40, suffix: "+", label: "Communities Reached" },
    { target: 2500, suffix: "+", label: "Volunteers" },
];

function Counter({
    target,
    suffix,
    start,
}: {
    target: number;
    suffix: string;
    start: boolean;
}) {
    const count = useMotionValue(0);
    const formatted = useTransform(count, (value) => Math.round(value).toLocaleString() + suffix);

    useEffect(() => {
        if (!start) return;
        const controls = animate(count, target, { duration: 2, ease: "easeOut" });
        return () => controls.stop();
    }, [start, target, count]);

    return <motion.span>{formatted}</motion.span>;
}

export default function Impact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            className="bg-background px-8 py-16 text-center md:px-16 md:py-24"
        >
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm font-semibold uppercase tracking-[0.35em] text-accent"
            >
                Impact
            </motion.span>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <p className="font-heading text-3xl text-primary-text sm:text-5xl md:text-6xl">
                            <Counter target={stat.target} suffix={stat.suffix} start={isInView} />
                        </p>

                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-20"
            >
                <Link
                    href="/contact"
                    className="cursor-pointer rounded-full border border-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-background"
                >
                    Join the Movement
                </Link>
            </motion.div>
        </section>
    );
}
