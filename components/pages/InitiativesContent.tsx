"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ProgramGallery from "@/components/ProgramGallery";
import type { Program } from "@/lib/programs";

type InitiativesContentProps = {
    programs: Program[];
};

export default function InitiativesContent({ programs }: InitiativesContentProps) {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const selected = programs.find((program) => program.folder === selectedFolder) ?? null;

    return (
        <>
            {/* Programs grid */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                        Our Programs
                    </span>

                    <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                        Where Dharma Meets Action
                    </h2>
                </motion.div>

                <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.folder}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden rounded-2xl border border-accent/15 bg-secondary/40"
                        >
                            {program.images[0] ? (
                                <div className="relative aspect-16/10 w-full">
                                    <Image
                                        src={program.images[0]}
                                        alt={program.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <ImagePlaceholder label="Program photo" className="aspect-16/10 w-full rounded-none border-0" />
                            )}

                            <div className="p-6">
                                <h3 className="font-heading text-lg text-primary-text">
                                    {program.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-secondary-text">
                                    {program.desc}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSelectedFolder(program.folder)}
                                    className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:text-highlight"
                                >
                                    Get Involved →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <ProgramGallery program={selected} onClose={() => setSelectedFolder(null)} />
        </>
    );
}
