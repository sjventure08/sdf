import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
    title: "Contact | Sanatana Dharma Foundation",
    description:
        "Get in touch with the Sanatana Dharma Foundation — for questions, volunteering, partnerships or general inquiries.",
};

export default function ContactPage() {
    return (
        <main>
            <PageHero
                eyebrow="Contact"
                title="We'd Love To Hear From You"
                description="Whether it's a question, a partnership, or just a hello — reach out and we'll get back to you soon."
                backgroundImage="/herobg.png"
            />
            <ContactContent />
        </main>
    );
}
