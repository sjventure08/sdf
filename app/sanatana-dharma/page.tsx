import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SanatanaDharmaContent from "@/components/pages/SanatanaDharmaContent";

export const metadata: Metadata = {
    title: "Sanatana Dharma | Sanatana Dharma Foundation",
    description:
        "Explore the core principles, sacred texts and practices of Sanatana Dharma — the eternal way of living.",
};

export default function SanatanaDharmaPage() {
    return (
        <main>
            <PageHero
                eyebrow="Sanatana Dharma"
                title="The Eternal Way Of Living"
                description="Not just a religion — a timeless science of the soul that helps us live with purpose, in harmony with ourselves, others and the universe."
                backgroundImage="/herobg.png"
            />
            <SanatanaDharmaContent />
        </main>
    );
}
