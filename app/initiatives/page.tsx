import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InitiativesContent from "@/components/pages/InitiativesContent";
import Impact from "@/components/Impact";

export const metadata: Metadata = {
    title: "Our Initiatives | Sanatana Dharma Foundation",
    description:
        "See how the Sanatana Dharma Foundation turns dharma into action — through cultural preservation, education, seva and sacred gatherings.",
};

export default function InitiativesPage() {

    return (
        <main>
            <PageHero
                eyebrow="Our Initiatives"
                title="Turning Dharma Into Action"
                description="Every program we run traces back to the same purpose: preserving timeless wisdom and putting it to work for real communities."
                backgroundImage="/herobg.png"
            />
            <InitiativesContent />
            <Impact />
        </main>
    );
}