import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
    title: "Privacy Policy | Sanatana Dharma Foundation",
    description: "How the Sanatana Dharma Foundation collects, uses and protects your information.",
};

const sections = [
    {
        heading: "Information We Collect",
        body: "When you fill out a form on this site — such as the interest form, contact form or newsletter sign-up — we collect the information you provide, which may include your name, email address, phone number and any message you share with us.",
    },
    {
        heading: "How We Use Your Information",
        body: "We use the information you provide to respond to your inquiries, keep you updated on programs and events you've expressed interest in, and to improve the services we offer. We do not sell your personal information to third parties.",
    },
    {
        heading: "Cookies",
        body: "This site may use cookies and similar technologies to remember your preferences and understand how visitors use our site. You can control cookies through your browser settings.",
    },
    {
        heading: "Third-Party Links",
        body: "Our site may contain links to external websites, including social media platforms. We are not responsible for the privacy practices of those sites.",
    },
    {
        heading: "Data Security",
        body: "We take reasonable measures to protect the information you share with us, but no method of transmission over the internet is completely secure.",
    },
    {
        heading: "Children's Privacy",
        body: "Our site is not directed at children under 13, and we do not knowingly collect personal information from children.",
    },
    {
        heading: "Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
    },
    {
        heading: "Contact Us",
        body: "If you have questions about this Privacy Policy, please reach out through our Contact page.",
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main>
            <PageHero
                eyebrow="Legal"
                title="Privacy Policy"
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
