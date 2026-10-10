import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
    title: "About Us | Sanatana Dharma Foundation",
    description:
        "Learn about the Sanatana Dharma Foundation's story, values and the people preserving and sharing the wisdom of Sanatana Dharma.",
};

export default function AboutPage() {
    return (
        <main>
            <PageHero
                eyebrow="About Us"
                title="Rooted In Wisdom, Working For Today"
                description="The Sanatana Dharma Foundation exists to preserve timeless wisdom and turn it into meaningful action — for individuals, communities and the world."
                backgroundImage="/herobg.png"
            />
            <AboutContent />
        </main>
    );
}
