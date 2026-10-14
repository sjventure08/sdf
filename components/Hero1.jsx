"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/SpiritualEvents/spiritualevents-25.webp",
    eyebrow: "Sanatana Dharma Foundation",
    title: "What if your roots could shape your future?",
    description:
      "Find your place in a community that believes spirituality is not only something we learn, but something we live.",
    ctaLabel: "Join the Seva",
    ctaHref: "/contact",
  },
  {
    image: "/KumbhMela/kumbhmela1.webp",
    eyebrow: "Kumbh Mela",
    title: "Walk the world's largest gathering of faith.",
    description:
      "Join millions on the banks of the sacred rivers as tradition, devotion, and community come together.",
    ctaLabel: "Explore More About Sanatana Dharma",
    ctaHref: "/sanatana-dharma",
  },
  {
    image: "/SpiritualEvents/spiritiualevents1.webp",
    eyebrow: "Spiritual Events",
    title: "Gather, reflect, and grow together.",
    description:
      "From satsangs to festivals, our events bring timeless wisdom into everyday life.",
    ctaLabel: "Join the Seva",
    ctaHref: "/contact",
  },
  {
    image: "/SacredPooja/sacredpooja-04.webp",
    eyebrow: "Sanatana Dharma",
    title: "Discover a tradition older than time itself.",
    description:
      "Explore the philosophy, scriptures, and practices that have guided seekers for millennia.",
    ctaLabel: "Explore More About Sanatana Dharma",
    ctaHref: "/sanatana-dharma",
  },
];

const AUTOPLAY_DELAY = 6000;

export default function Hero1() {
  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();

    return () => api.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    const play = () => {
      stop();
      autoplayRef.current = setInterval(() => api.scrollNext(), AUTOPLAY_DELAY);
    };

    play();
    api.on("pointerDown", stop);
    api.on("pointerUp", play);

    return () => {
      stop();
      api.off("pointerDown", stop);
      api.off("pointerUp", play);
    };
  }, [api]);

  const scrollTo = useCallback((index) => api && api.scrollTo(index), [api]);
  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api && api.scrollNext(), [api]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#211A16]">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="h-full [&_[data-slot=carousel-content]]:h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.image} className="relative h-full basis-full pl-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211A16]/90 via-[#211A16]/40 to-[#211A16]/20" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Text content — crossfades independently of the image slide track */}

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="w-full px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-highlight">
                  {slides[selectedIndex].eyebrow}
                </span>

                <h1 className="mt-4 font-heading text-3xl leading-[1.15] text-white lg:text-6xl">
                  {slides[selectedIndex].title}
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/80 lg:text-lg lg:leading-8">
                  {slides[selectedIndex].description}
                </p>

                <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-6">
                  <Link
                    href={slides[selectedIndex].ctaHref}
                    className="rounded-sm bg-[#E87516] border border-[#B8892E] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 lg:px-8 lg:py-4 lg:text-sm"
                  >
                    {slides[selectedIndex].ctaLabel} →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Arrows */}

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20 lg:left-6 lg:p-3"
      >
        <PiCaretLeft className="h-5 w-5 text-white" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20 lg:right-6 lg:p-3"
      >
        <PiCaretRight className="h-5 w-5 text-white" aria-hidden="true" />
      </button>

      {/* Dots */}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-10">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-8 bg-highlight" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
