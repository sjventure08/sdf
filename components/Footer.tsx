"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { PiFacebookLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";

const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Sanatana Dharma", href: "/sanatana-dharma" },
    { label: "Our Initiatives", href: "/initiatives" },
    { label: "Contact", href: "/contact" },
];

type SocialName = "instagram" | "facebook" | "youtube";

const socialLinks: { name: SocialName; href: string; label: string }[] = [
    { name: "instagram", href: "https://www.instagram.com/narayananandgiri_official/", label: "Instagram" },
    { name: "facebook", href: "#", label: "Facebook" },
    { name: "youtube", href: "#", label: "YouTube" },
];

const socialIconMap: Record<SocialName, IconType> = {
    instagram: PiInstagramLogo,
    facebook: PiFacebookLogo,
    youtube: PiYoutubeLogo,
};

function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
    const Component = socialIconMap[name];
    return <Component className={className} aria-hidden="true" />;
}

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        console.log({ email });
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="bg-[#211A16] px-8 pb-8 pt-16 text-[#FFF8EA] md:px-16 md:pt-24">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
                {/* Brand */}

                <div>
                    <Link href="/" className="inline-block">
                        <Image
                            src="/sdflogo.png"
                            alt="Sanatana Dharma Foundation"
                            width={50}
                            height={50}
                        />
                    </Link>

                    <p className="mt-5 max-w-xs text-sm leading-6 text-[#E8CFA5]">
                        Preserving timeless wisdom, empowering communities, and turning
                        Dharma into action — together.
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8892E]/30 text-[#B8892E] transition-colors hover:border-[#B8892E] hover:text-[#E87516]"
                            >
                                <SocialIcon name={social.name} className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore */}

                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892E]">
                        Explore
                    </span>

                    <nav className="mt-5 flex flex-col gap-3">
                        {exploreLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="w-fit text-sm text-[#E8CFA5] transition-colors hover:text-[#FFF8EA]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Connect */}

                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892E]">
                        Connect
                    </span>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-[#E8CFA5]">
                        <a href="mailto:tailnext@gmail.com" className="transition-colors hover:text-[#FFF8EA]">
                            tailnext@gmail.com
                        </a>
                        <a href="tel:+1 (123) 456-7890" className="transition-colors hover:text-[#FFF8EA]">
                            +1 (123) 456-7890
                        </a>
                        <span>Regd -214 Patparganj industrial area New Delhi 110072

</span>
                    </div>
                </div>

                {/* Newsletter */}

                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8892E]">
                        Stay Connected
                    </span>

                    <p className="mt-5 text-sm leading-6 text-[#E8CFA5]">
                        Get updates on programs, events, and ways to get involved.
                    </p>

                    {subscribed ? (
                        <p className="mt-4 text-sm font-semibold text-[#E87516]">
                            Thank you for subscribing.
                        </p>
                    ) : (
                        <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className="w-full min-w-0 rounded-full border border-[#B8892E]/30 bg-transparent px-4 py-2.5 text-sm text-[#FFF8EA] placeholder:text-[#E8CFA5]/60 focus:border-[#B8892E] focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="shrink-0 cursor-pointer rounded-full border border-[#B8892E] bg-[#B8892E] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-[#211A16] transition-colors hover:bg-transparent hover:text-[#B8892E]"
                            >
                                Join
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Bottom bar */}

            <div className="mt-16 flex flex-col items-center gap-4 border-t border-[#B8892E]/15 pt-8 text-center text-xs text-[#E8CFA5]/70 md:flex-row md:justify-between md:text-left">
                <p>
                    © {new Date().getFullYear()} Sanatana Dharma Foundation. All rights
                    reserved.
                </p>

                <div className="flex items-center gap-6">
                    <Link href="/privacy-policy" className="transition-colors hover:text-[#FFF8EA]">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="transition-colors hover:text-[#FFF8EA]">
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}
