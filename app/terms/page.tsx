import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
    title: "Terms of Use | Sanatana Dharma Foundation",
    description: "The terms that govern use of the Sanatana Dharma Foundation website.",
};

const sections = [
    {
        heading: "Acceptance of Terms",
        body: "By accessing and using this website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use this site.",
    },
    {
        heading: "Use of This Site",
        body: "This site is provided for informational purposes about the Sanatana Dharma Foundation and its programs. You agree to use it only for lawful purposes and not to interfere with its operation.",
    },
    {
        heading: "Intellectual Property",
        body: "All content on this site — including text, images, logos and design — is the property of the Sanatana Dharma Foundation unless otherwise noted, and may not be reproduced without permission.",
    },
    {
        heading: "Donations & Contributions",
        body: "Donations made through this site or in connection with our programs are voluntary and, except where required by law, non-refundable.",
    },
    {
        heading: "Third-Party Links",
        body: "This site may link to third-party websites. We are not responsible for the content or practices of any linked sites.",
    },
    {
        heading: "Limitation of Liability",
        body: "The Foundation makes reasonable efforts to keep this site accurate and up to date, but makes no warranties as to its completeness or reliability, and is not liable for any damages arising from its use.",
    },
    {
        heading: "Changes to These Terms",
        body: "We may revise these Terms of Use at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
    },
    {
        heading: "Contact Us",
        body: "Questions about these terms can be directed to us through our Contact page.",
    },
];

export default function TermsPage() {
    return (
        <main>
            <PageHero
                eyebrow="Legal"
                title="Terms of Use"
                description="Last updated: August 2026"
                backgroundImage="/herobg.png"
            />

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <div className="mx-auto flex max-w-3xl flex-col gap-10">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="font-heading text-xl text-primary-text md:text-2xl">
                                {section.heading}
                            </h2>
                            <p className="mt-3 text-base leading-7 text-secondary-text">
                                {section.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
