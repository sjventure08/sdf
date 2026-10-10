"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// Wraps Next.js's <Link> so it can take Motion's animation props
// (initial/animate/exit/whileHover) while keeping client-side navigation.
const MotionLink = motion.create(Link);

type MenuOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const menuItems = [
    { number: "01", label: "Home", href: "/" },
    { number: "02", label: "About Us", href: "/about" },
    { number: "03", label: "Sanatana Dharma", href: "/sanatana-dharma" },
    { number: "04", label: "Our Initiatives", href: "/initiatives" },
    { number: "05", label: "Contact", href: "/contact" },
];

// Rolling-text hover: current label slides down and out, a duplicate
// slides down from above to take its place.
const rollOutVariants = {
    rest: { y: "0%" },
    active: { y: "100%" },
};

const rollInVariants = {
    rest: { y: "-100%" },
    active: { y: "0%" },
};

const rollTransition = {
    duration: 0.3,
    ease: [0.338, 0.015, 0.395, 0.959] as const,
};

export default function MenuOverlay({
    isOpen,
    onClose,
}: MenuOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                >
                    {/* Close Button */}

                    <motion.button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="absolute right-5 top-5 z-10 cursor-pointer text-3xl text-primary-text sm:right-8 sm:top-6 sm:text-4xl"
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ delay: 0.3 }}
                    >
                        ×
                    </motion.button>

                    {/* Menu */}

                    <div className="flex h-full items-center justify-center px-6 sm:px-8">
                        <nav className="flex w-full max-w-5xl flex-col">
                            {menuItems.map((item, index) => (
                                <MotionLink
                                    key={item.label}
                                    href={item.href}
                                    onClick={onClose}
                                    className="group flex items-center gap-4 border-b border-accent/20 py-4 sm:gap-8 sm:py-5"
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -20,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.1 + index * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {/* Number */}

                                    <span className="w-6 text-xs text-accent sm:w-10 sm:text-sm">
                                        {item.number}
                                    </span>

                                    {/* Menu text — rolling hover effect */}

                                    <motion.span
                                        className="relative block overflow-hidden whitespace-nowrap text-3xl font-light leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                                        initial="rest"
                                        whileHover="active"
                                    >
                                        <motion.span
                                            className="block leading-none text-primary-text"
                                            variants={rollOutVariants}
                                            transition={rollTransition}
                                        >
                                            {item.label}
                                        </motion.span>
                                        <motion.span
                                            className="absolute inset-0 block leading-none text-accent"
                                            variants={rollInVariants}
                                            transition={rollTransition}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </motion.span>
                                </MotionLink>
                            ))}
                        </nav>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}