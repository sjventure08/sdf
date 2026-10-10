import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
    title: "Journal | Sanatana Dharma Foundation",
    description:
        "Readings on culture, scripture and the Foundation's work — for anyone curious about Sanatana Dharma.",
};

export default function BlogIndexPage() {
    return (
        <main>
            <PageHero
                eyebrow="From The Journal"
                title="Stories & Reflections"
                description="Readings on culture, scripture, and the Foundation's work — for anyone curious about Sanatana Dharma."
                backgroundImage="/herobg.png"
            />

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    {blogPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="flex flex-col overflow-hidden rounded-2xl border border-accent/15 bg-secondary/40"
                        >
                            <div className="relative h-56 w-full">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h2 className="font-heading text-xl leading-[1.25] text-primary-text">
                                    {post.title}
                                </h2>

                                <p className="mt-3 flex-1 text-sm leading-6 text-secondary-text">
                                    {post.description}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:text-highlight"
                                >
                                    {post.buttonText} →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
