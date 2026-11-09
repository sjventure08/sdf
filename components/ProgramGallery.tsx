
"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Program } from "@/lib/programs";

type ProgramGalleryProps = {
    program: Program | null;
    onClose: () => void;
};

export default function ProgramGallery({
    program,
    onClose,
}: ProgramGalleryProps) {
    const [index, setIndex] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);

    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIndex(0);
    }, [program?.folder]);

    useEffect(() => {
        if (!program) return;

        const measure = () =>
            setTrackWidth(trackRef.current?.offsetWidth ?? 0);

        measure();

        window.addEventListener("resize", measure);

        return () => window.removeEventListener("resize", measure);
    }, [program]);

    useEffect(() => {
        if (!program) return;

        const count = program.images.length;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();

            if (e.key === "ArrowRight") {
                setIndex((i) => Math.min(i + 1, count - 1));
            }

            if (e.key === "ArrowLeft") {
                setIndex((i) => Math.max(i - 1, 0));
            }
        };

        window.addEventListener("keydown", onKey);

        return () => window.removeEventListener("keydown", onKey);
    }, [program, onClose]);

    if (!program) return null;

    const { images, title } = program;

    const count = images.length;
    const currentImage = images[index];

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const threshold = Math.max(trackWidth * 0.2, 40);

        if (
            (info.offset.x < -threshold || info.velocity.x < -500) &&
            index < count - 1
        ) {
            setIndex((i) => i + 1);
        } else if (
            (info.offset.x > threshold || info.velocity.x > 500) &&
            index > 0
        ) {
            setIndex((i) => i - 1);
        }
    };

    return (
        <AnimatePresence>
            {program && (
                <>
                    {/* Background overlay */}
                    <motion.div
                        className="fixed inset-0 z-100 bg-primary-text/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Gallery popup */}
                    <div
                        className="fixed inset-0 z-110 flex items-center justify-center p-4 md:p-10"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white"
                        >
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close gallery"
                                className="absolute right-5 top-5 z-20 cursor-pointer text-4xl leading-none text-white drop-shadow-lg"
                            >
                                ×
                            </button>

                            {/* Image slider */}
                            <div
                                ref={trackRef}
                                className="relative h-[min(70vh,700px)] w-full shrink-0 overflow-hidden bg-primary-text"
                            >
                                {count > 0 ? (
                                    <motion.div
                                        className="flex h-full cursor-grab active:cursor-grabbing"
                                        drag={count > 1 ? "x" : false}
                                        dragConstraints={{
                                            left: -(count - 1) * trackWidth,
                                            right: 0,
                                        }}
                                        dragElastic={0.1}
                                        onDragEnd={handleDragEnd}
                                        animate={{
                                            x: -index * trackWidth,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {images.map((image, i) => (
                                            <div
                                                key={image.src}
                                                className="relative h-full w-full shrink-0"
                                            >
                                                <Image
                                                    src={image.src}
                                                    alt={
                                                        image.title ||
                                                        `${title} photo ${i + 1}`
                                                    }
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

                                {/* Previous button */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIndex((i) => i - 1)
                                        }
                                        aria-label="Previous image"
                                        className="absolute left-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex md:left-5 md:h-16 md:w-16"
                                    >
                                        <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.5} aria-hidden="true" />
                                    </button>
                                )}

                                {/* Next button */}
                                {index < count - 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIndex((i) => i + 1)
                                        }
                                        aria-label="Next image"
                                        className="absolute right-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex md:right-5 md:h-16 md:w-16"
                                    >
                                        <ChevronRight className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.5} aria-hidden="true" />
                                    </button>
                                )}

                                {/* Image progress indicators */}
                                {count > 1 && (
                                    <div className="absolute inset-x-0 top-4 flex justify-center gap-1.5 px-4">
                                        {images.map((image, i) => (
                                            <span
                                                key={image.src}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    i === index
                                                        ? "w-5 bg-white"
                                                        : "w-1.5 bg-white/40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Image title and description */}
                            <div className="flex flex-col gap-5 p-6 md:p-8">

                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                                            {title}
                                        </span>

                                        <h3 className="mt-2 font-heading text-xl leading-snug text-primary-text md:text-2xl">
                                            {currentImage?.title || title}
                                        </h3>

                                        {currentImage?.description && (
                                            <p className="mt-3 text-sm leading-7 text-secondary-text">
                                                {currentImage.description}
                                            </p>
                                        )}

                                        {count > 0 && (
                                            <p className="mt-3 text-xs font-medium tracking-wide text-secondary-text/70">
                                                {index + 1} / {count} PHOTOS
                                            </p>
                                        )}
                                    </div>

                                    <a
                                        href="/contact"
                                        className="btn btn-sm btn-primary shrink-0"
                                    >
                                        Get Involved
                                    </a>
                                </div>

                                {/* Mobile navigation */}
                                {count > 1 && (
                                    <div className="flex items-center justify-between border-t border-accent/15 pt-4 sm:hidden">
                                        <button
                                            type="button"
                                            disabled={index === 0}
                                            onClick={() =>
                                                setIndex((i) =>
                                                    Math.max(i - 1, 0)
                                                )
                                            }
                                            className="text-sm font-medium text-primary-text disabled:opacity-30"
                                        >
                                            ← Previous
                                        </button>

                                        <button
                                            type="button"
                                            disabled={index === count - 1}
                                            onClick={() =>
                                                setIndex((i) =>
                                                    Math.min(i + 1, count - 1)
                                                )
                                            }
                                            className="text-sm font-medium text-primary-text disabled:opacity-30"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
