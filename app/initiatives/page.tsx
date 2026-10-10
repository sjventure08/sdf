import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InitiativesContent from "@/components/pages/InitiativesContent";
import KumbhMela from "@/components/KumbhMela";
import Impact from "@/components/Impact";
import { getPrograms } from "@/lib/programs";

export const metadata: Metadata = {
    title: "Our Initiatives | Sanatana Dharma Foundation",
    description:
        "See how the Sanatana Dharma Foundation turns dharma into action — through cultural preservation, education, seva and sacred gatherings.",
};

export default function InitiativesPage() {
    const programs = getPrograms();

    return (
        <main>
            <PageHero
                eyebrow="Our Initiatives"
                title="Turning Dharma Into Action"
                description="Every program we run traces back to the same purpose: preserving timeless wisdom and putting it to work for real communities."
                backgroundImage="/herobg.png"
            />
            <InitiativesContent programs={programs} />
            <KumbhMela />
            <Impact />
        </main>
    );
}
