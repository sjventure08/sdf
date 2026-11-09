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
        <footer className="bg-primary-text px-8 pb-8 pt-16 text-cream md:px-16 md:pt-24">
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

                    <p className="mt-5 max-w-xs text-sm leading-6 text-sand">
                        Preserving timeless wisdom, empowering communities, and turning
                        Dharma into action — together.
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:text-accent"
                            >
                                <SocialIcon name={social.name} className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore */}

                <div>
                    <span className="eyebrow text-gold">
                        Explore
                    </span>

                    <nav className="mt-5 flex flex-col gap-3">
                        {exploreLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="w-fit text-sm text-sand transition-colors hover:text-cream"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Connect */}

                <div>
                    <span className="eyebrow text-gold">
                        Connect
                    </span>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-sand">
                        <a href="mailto:support@sanatanadharmafoundation.co" className="transition-colors hover:text-cream">
                            support@sanatanadharmafoundation.co
                        </a>
                        <span>Regd -214 Patparganj industrial area New Delhi 110072

</span>
                    </div>
                </div>

                {/* Newsletter */}

                <div>
                    <span className="eyebrow text-gold">
                        Stay Connected
                    </span>

                    <p className="mt-5 text-sm leading-6 text-sand">
                        Get updates on programs, events, and ways to get involved.
                    </p>

                    {subscribed ? (
                        <p className="mt-4 text-sm font-semibold text-accent">
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
                                className="w-full min-w-0 rounded-full border border-gold/30 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-sand/60 focus:border-gold focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="btn btn-sm shrink-0 border-gold bg-gold text-primary-text hover:bg-transparent hover:text-gold"
                            >
                                Join
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Bottom bar */}

            <div className="mt-16 flex flex-col items-center gap-4 border-t border-gold/15 pt-8 text-center text-xs text-sand/70 md:flex-row md:justify-between md:text-left">
                <p>
                    © {new Date().getFullYear()} Sanatana Dharma Foundation. All rights
                    reserved.
                </p>

                <div className="flex items-center gap-6">
                    <Link href="/privacy-policy" className="transition-colors hover:text-cream">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="transition-colors hover:text-cream">
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}
