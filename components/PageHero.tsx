"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type PageHeroProps = {
    eyebrow: string;
    title: ReactNode;
    description?: string;
    backgroundImage?: string;
};

export default function PageHero({
    eyebrow,
    title,
    description,
    backgroundImage,
}: PageHeroProps) {
    return (
        <section
            className={`relative overflow-hidden px-8 pb-16 pt-36 text-center md:px-16 md:pb-24 md:pt-44 ${
                backgroundImage ? "bg-cover bg-center bg-no-repeat" : "bg-secondary"
            }`}
            style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
        >
            {backgroundImage && (
                <div className="absolute inset-0 bg-[#211A16]/70" />
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-3xl"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                    {eyebrow}
                </span>

                <h1
                    className={`mt-6 font-heading text-4xl leading-[1.1] md:text-6xl ${
                        backgroundImage ? "text-[#FFF8EA]" : "text-primary-text"
                    }`}
                >
                    {title}
                </h1>

                {description && (
                    <p
                        className={`mx-auto mt-6 max-w-2xl text-base leading-7 md:text-lg ${
                            backgroundImage ? "text-[#E8CFA5]" : "text-secondary-text"
                        }`}
                    >
                        {description}
                    </p>
                )}
            </motion.div>
        </section>
    );
}
