"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function TrishulIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 21V10" />
            <path d="M12 10V2" />
            <path d="M12 10C9.5 10 7.3 7.8 6.2 3" />
            <path d="M12 10C14.5 10 16.7 7.8 17.8 3" />
            <path d="M7.5 8.5H16.5" />
        </svg>
    );
}

export default function TrishulBadge() {
    const [scrollingDown, setScrollingDown] = useState(true);
    const [atBottom, setAtBottom] = useState(false);

    // Faces down while the user scrolls down, flips to face up the
    // moment they scroll up, and also flips up once they hit the
    // bottom of the page — signalling the badge can carry them back up.
    useEffect(() => {
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            if (currentScrollY !== lastScrollY) {
                setScrollingDown(currentScrollY > lastScrollY);
                lastScrollY = currentScrollY;
            }

            const scrolledToBottom =
                window.innerHeight + currentScrollY >=
                document.documentElement.scrollHeight - 4;
            setAtBottom(scrolledToBottom);
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const facingUp = atBottom || !scrollingDown;

    return (
        <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            animate={{ rotate: facingUp ? 0 : 180 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed bottom-8 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary-text/30 bg-background text-primary-text shadow-lg transition-transform hover:scale-110 lg:bottom-10 lg:right-10"
        >
            <TrishulIcon className="h-6 w-6" />
        </motion.button>
    );
}
