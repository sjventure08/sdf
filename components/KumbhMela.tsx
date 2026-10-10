"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";

const items = [
    {
        id: "sacred-celebration",
        image: "/Kumbhmela1.webp",
        category: "Maha Kumbh Mela 2025",
        title: "A Sacred Celebration",
        subtitle:
            "CM Yogi Adityanath and Mahamandelshwar Narayanand Giri Maharaj lead the preparations.",
        body: "In Prayagraj, governance and spirituality unite to welcome devotees from around the world. Under the guidance of Sri Sri Sri Mahamandelshwar Narayanand Giri Maharaj, preparations are in full swing for a seamless celebration of Sanatana Dharma.",
    },
    {
        id: "preparations",
        image: "/kumbhmela2.jpg",
        category: "Preparations Of Maha Kumbh Mela 2025",
        title: "Flag-Hoisting Ceremony",
        subtitle:
            "The Sanatana Dharma Foundation and Akhada Society begin preparations.",
        body: "On November 23, 2024, the Foundation and Akhada Society raised the flag in Prayagraj — marking the start of preparations for Mahakumbh Mela 2025, a symbol of unity, faith, and tradition.",
    },
];

export default function KumbhMela() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = items.find((item) => item.id === selectedId) ?? null;

    return (
        <section className="bg-background px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16 max-w-2xl"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-highlight">
                    Maha Kumbh Mela 2025
                </span>

                <h2 className="mt-6 font-heading text-4xl leading-[1.1] text-primary-text md:text-5xl">
                    A sacred gathering, in preparation
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {items.map((item, index) => (
                    <motion.button
                        type="button"
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative block h-70 cursor-pointer overflow-hidden rounded-3xl text-left sm:h-90 md:h-105"
                    >
                        <motion.div layoutId={`image-${item.id}`} className="absolute inset-0 text-white">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </motion.div>

                        <div className="absolute inset-0 bg-linear-to-t from-[#211A16] via-[#211A16]/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                        <div className="absolute inset-x-0 bottom-0 p-8 transition-opacity duration-300 group-hover:opacity-0">
                            <motion.span
                                layoutId={`category-${item.id}`}
                                className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight"
                            >
                                {item.category}
                            </motion.span>

                            <motion.h3
                                layoutId={`title-${item.id}`}
                                className="mt-3 font-heading text-2xl text-[#FFF8EA] md:text-3xl"
                            >
                                {item.title}
                            </motion.h3>
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-[100] cursor-pointer bg-[#211A16]/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        />

                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
                            <motion.div
                                layoutId={`card-${selected.id}`}
                                onClick={() => setSelectedId(null)}
                                className="relative flex max-h-full w-full max-w-3xl cursor-pointer flex-col overflow-y-hidden rounded-3xl bg-secondary"
                            >
                                <motion.div layoutId={`image-${selected.id}`} className="relative h-[45vh] w-full shrink-0">
                                    <Image
                                        src={selected.image}
                                        alt={selected.title}
                                        fill
                                        sizes="(min-width: 768px) 768px, 100vw"
                                        className="object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(null)}
                                        aria-label="Close"
                                        className="absolute right-6 top-6 z-10 cursor-pointer text-4xl text-white"
                                    >
                                        ×
                                    </button>
                                </motion.div>

                                <div className="p-8 md:p-10">
                                    <motion.span
                                        layoutId={`category-${selected.id}`}
                                        className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight"
                                    >
                                        {selected.category}
                                    </motion.span>

                                    <motion.h3
                                        layoutId={`title-${selected.id}`}
                                        className="mt-3 font-heading text-3xl text-primary-text md:text-4xl"
                                    >
                                        {selected.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="mt-4 text-sm font-medium text-secondary-text"
                                    >
                                        {selected.subtitle}
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-6 text-base leading-8 text-secondary-text"
                                    >
                                        {selected.body}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
