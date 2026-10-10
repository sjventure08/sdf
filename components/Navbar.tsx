"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay, { menuItems } from "./MenuOverlay";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Hide the nav bar while scrolling down (so the logo doesn't sit
    // on top of image content), reveal it again when scrolling up.
    useEffect(() => {
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            setHidden(scrollingDown && currentScrollY > 100);
            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                animate={{ y: hidden ? "-100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-8 md:px-12"
            >

                {/* Logo */}

                <Link href="/">
                    <Image
                        src="/sdflogo.png"
                        alt="Sanatana Dharma Foundation"
                        width={60}
                        height={60}
                        priority
                    />
                </Link>

                {/* Desktop — full menu inline */}

                <div className="hidden items-center gap-8 lg:flex">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-highlight ${
                                pathname === item.href ? "text-highlight" : "text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Om — mobile/tablet menu trigger */}

                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    className="cursor-pointer text-2xl text-accent transition-transform duration-300 hover:scale-110 lg:hidden"
                >
                    ॐ
                </button>

            </motion.nav>

            <MenuOverlay
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
}