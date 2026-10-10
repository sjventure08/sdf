

"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Program } from "@/lib/programs";

type ProgramGalleryProps = {
    program: Program | null;
    onClose: () => void;
};

export default function ProgramGallery({ program, onClose }: ProgramGalleryProps) {
    const [index, setIndex] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIndex(0);
    }, [program?.folder]);

    useEffect(() => {
        if (!program) return;

        const measure = () => setTrackWidth(trackRef.current?.offsetWidth ?? 0);
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [program]);

    useEffect(() => {
        if (!program) return;

        const count = program.images.length;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, count - 1));
            if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [program, onClose]);

    if (!program) return null;

    const { images, title } = program;
    const count = images.length;

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const threshold = Math.max(trackWidth * 0.2, 40);
        if ((info.offset.x < -threshold || info.velocity.x < -500) && index < count - 1) {
            setIndex((i) => i + 1);
        } else if ((info.offset.x > threshold || info.velocity.x > 500) && index > 0) {
            setIndex((i) => i - 1);
        }
    };

    return (
        <AnimatePresence>
            {program && (
                <>
                    <motion.div
                        className="fixed inset-0 z-100 bg-[#211A16]/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div
                        className="fixed inset-0 z-110 flex items-center justify-center p-4 md:p-10"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-secondary"
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute right-5 top-5 z-20 cursor-pointer text-4xl leading-none text-white drop-shadow-lg"
                            >
                                ×
                            </button>

                            <div
                                ref={trackRef}
                                className="relative aspect-4/5 w-full overflow-hidden bg-[#211A16] sm:aspect-square"
                            >
                                {count > 0 ? (
                                    <motion.div
                                        className="flex h-full cursor-grab active:cursor-grabbing"
                                        drag={count > 1 ? "x" : false}
                                        dragConstraints={{ left: -(count - 1) * trackWidth, right: 0 }}
                                        dragElastic={0.1}
                                        onDragEnd={handleDragEnd}
                                        animate={{ x: -index * trackWidth }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {images.map((src, i) => (
                                            <div key={src} className="relative h-full w-full shrink-0">
                                                <Image
                                                    src={src}
                                                    alt={`${title} photo ${i + 1}`}
                                                    fill
                                                    sizes="(min-width: 640px) 576px, 100vw"
                                                    className="pointer-events-none object-cover"
                                                    draggable={false}
                                                    priority={i === 0}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
                                        Photos coming soon
                                    </div>
                                )}

                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setIndex((i) => i - 1)}
                                        aria-label="Previous image"
                                        className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:flex"
                                    >
                                        ‹
                                    </button>
                                )}
                                {index < count - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setIndex((i) => i + 1)}
                                        aria-label="Next image"
                                        className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:flex"
                                    >
                                        ›
                                    </button>
                                )}

                                {count > 1 && (
                                    <div className="absolute inset-x-0 top-4 flex justify-center gap-1.5 px-4">
                                        {images.map((_, i) => (
                                            <span
                                                key={i}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-4 p-6 md:p-8">
                                <div>
                                    <h3 className="font-heading text-xl text-primary-text md:text-2xl">
                                        {title}
                                    </h3>
                                    {count > 0 && (
                                        <p className="mt-1 text-sm text-secondary-text">
                                            {index + 1} / {count}
                                        </p>
                                    )}
                                </div>
                                <a
                                    href="/contact"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-highlight"
                                >
                                    Get Involved
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
