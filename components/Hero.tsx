"use client";

import {motion,useScroll,useTransform,useSpring,type MotionValue,} from "motion/react";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const organizationWords = ["Learn", "Practice", "Serve", "Grow"];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooths out raw scroll input (mouse-wheel steps, trackpad jitter)
    // so every transform below tracks scroll with inertia instead of
    // snapping frame to frame.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        mass: 0.8,
        restDelta: 0.001,
    });

    /*
     * HOOK
     *
     * Visible as soon as the hero loads, before any scrolling.
     * Holds briefly, then slides out to the right while the
     * Organization content slides in over the SAME range — a true
     * crossfade, so there's never a stretch of scroll with nothing
     * legible on screen.
     */
    const hookX = useTransform(smoothProgress, [0, 0.03, 0.09], ["0vw", "0vw", "60vw"]);
    const hookOpacity = useTransform(smoothProgress, [0, 0.03, 0.09], [1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-[800vh] bg-[#ffffff]"
        >
            <div
                className="sticky top-0 h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/herobg.png')" }}
            >

                {/* Background atmosphere */}

                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#211A16]/10 blur-[150px]" />
                </div>

                {/* IMAGE — anchored to the bottom so it blends into the section's end */}

                <div
                    className="
            absolute
            bottom-0
            left-1/2
            z-20
            h-[32vh]
            w-[60vw]
            min-w-0
            -translate-x-1/2
            lg:left-[8vw]
            lg:h-[70vh]
            lg:w-[42vw]
            lg:min-w-[420px]
            lg:translate-x-0
          "
                >
                    <ImageWithFlower />
                </div>

                {/* HOOK — Frame 1 */}

                <motion.div
                    style={{ x: hookX, opacity: hookOpacity }}
                    className="
            absolute
            left-1/2
            top-28
            z-10
            w-[88vw]
            -translate-x-1/2
            text-center
            lg:left-[53vw]
            lg:top-1/2
            lg:w-[38vw]
            lg:-translate-y-1/2
            lg:translate-x-0
            lg:text-left
          "
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-highlight">
                        Sanatana Dharma Foundation
                    </span>

                    <h1 className="mt-4 font-heading text-xl leading-[1.2] text-primary-text lg:mt-6 lg:text-6xl">
                        What if your roots<br />could shape your future?
                          
                    </h1>

                </motion.div>



                {/* Scroll 3 — the organization */}

                <OrganizationContent scrollYProgress={smoothProgress} />

                {/* Final — conversion */}

                <CtaContent scrollYProgress={smoothProgress} />

            </div>
        </section>
    );
}

function ImageWithFlower() {
    return (
        <div className="relative h-full w-full">
            {/* Rotating flower/mandala backdrop — sits behind the photo, larger than the frame */}

            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <Image
                    src="/flower.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 42vw, 60vw"
                    aria-hidden="true"
                    loading= "eager"
                    className="object-contain"
                />
            </motion.div>

            {/* Photo — stays still, clipped to a clean frame */}

            <div className="absolute inset-0 overflow-hidden rounded-sm">
                <Image
                    src="/guruji.png"
                    alt="Guruji"
                    className="h-full w-full object-contain object-center"
                    fill
                    sizes="(min-width: 1024px) 42vw, 60vw"
                />
            </div>
        </div>
    );
}


function OrganizationContent({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const x = useTransform(
        scrollYProgress,
        [0.03, 0.09, 0.55, 0.61],
        ["100vw", "0vw", "0vw", "-40vw"]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0.03, 0.09, 0.55, 0.61],
        [0, 1, 1, 0]
    );

    return (
        <motion.div
            style={{ x, opacity }}
            className="
        absolute
        left-1/2
        top-28
        z-10
        w-[88vw]
        -translate-x-1/2
        text-center
        lg:left-[53vw]
        lg:top-1/2
        lg:w-[38vw]
        lg:-translate-y-1/2
        lg:translate-x-0
        lg:text-left
      "
        >
            <h2 className="mb-4 font-heading text-xl leading-[1.2] text-primary-text lg:mb-6 lg:text-4xl">
                Discover Sanatana Dharma.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent lg:justify-start lg:gap-x-3 lg:text-xl">
                {organizationWords.map((word, index) => (
                    <WordReveal
                        key={word}
                        word={word}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        showArrow={index < organizationWords.length - 1}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function WordReveal({
    word,
    index,
    scrollYProgress,
    showArrow,
}: {
    word: string;
    index: number;
    scrollYProgress: MotionValue<number>;
    showArrow: boolean;
}) {
    const start = 0.11 + index * 0.07;
    const end = start + 0.03;
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const y = useTransform(scrollYProgress, [start, end], [10, 0]);

    return (
        <span className="flex items-center gap-3">
            <motion.span style={{ opacity, y }}>{word}</motion.span>
            {showArrow && <span className="text-secondary-text/50">→</span>}
        </span>
    );
}

function CtaContent({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const x = useTransform(
        scrollYProgress,
        [0.55, 0.61, 1],
        ["100vw", "0vw", "0vw"]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0.55, 0.61, 1],
        [0, 1, 1]
    );

    return (
        <motion.div
            style={{ x, opacity }}
            className="
        absolute
        left-1/2
        top-28
        z-10
        w-[88vw]
        -translate-x-1/2
        text-center
        lg:left-[53vw]
        lg:top-1/2
        lg:w-[38vw]
        lg:-translate-y-1/2
        lg:translate-x-0
        lg:text-left
      "
        >
            <h2 className="mb-3 font-heading text-xl leading-[1.2] text-primary-text lg:mb-6 lg:text-4xl">
                Your journey can begin here.
            </h2>

            <p className="mb-5 max-w-xl text-xs leading-5 text-secondary-text lg:mb-10 lg:text-lg lg:leading-8">
                Find your place in a community that believes spirituality is not only something we learn, but something we live.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <Link
                    href="/contact"
                    className="rounded-sm bg-[#E87516] border border-[#B8892E] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90 lg:px-8 lg:py-4 lg:text-sm"
                >
                    Join the Seva →
                </Link>

                <Link
                    href="/sanatana-dharma"
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-text underline decoration-primary-text/30 underline-offset-4 transition-colors hover:decoration-primary-text lg:text-sm"
                >
                    Explore Sanatana Dharma
                </Link>
            </div>
        </motion.div>
    );
}
