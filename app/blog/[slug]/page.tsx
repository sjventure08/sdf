import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-posts";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
    params,
}: PageProps<"/blog/[slug]">) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

    return (
        <main className="bg-background px-8 py-16 md:px-16 md:py-24">
            <article className="mx-auto max-w-3xl">
                <Link
                    href="/"
                    className="text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:text-highlight"
                >
                    ← Back to Journal
                </Link>

                <h1 className="mt-6 font-heading text-4xl leading-[1.1] text-primary-text md:text-5xl">
                    {post.title}
                </h1>

                <p className="mt-6 text-lg leading-8 text-secondary-text">
                    {post.description}
                </p>

                <div className="relative mt-10 h-72 w-full overflow-hidden rounded-2xl md:h-96">
                    <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                    />
                </div>

                {post.sections.length === 0 ? (
                    <p className="mt-10 text-base leading-7 text-secondary-text">
                        Full article coming soon.
                    </p>
                ) : (
                    <div className="mt-10 space-y-10">
                        {post.sections.map((section) => (
                            <section key={section.heading}>
                                <h2 className="font-heading text-2xl leading-[1.2] text-primary-text md:text-3xl">
                                    {section.heading}
                                </h2>

                                {section.intro && (
                                    <p className="mt-4 text-base leading-7 text-secondary-text">
                                        {section.intro}
                                    </p>
                                )}

                                <div className="mt-6 space-y-6">
                                    {section.paragraphs.map((paragraph) => (
                                        <div key={paragraph.subheading ?? paragraph.text}>
                                            {paragraph.subheading && (
                                                <h3 className="font-heading text-lg text-primary-text">
                                                    {paragraph.subheading}
                                                </h3>
                                            )}
                                            <p className="mt-2 text-base leading-7 text-secondary-text">
                                                {paragraph.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}

                        {post.conclusion && (
                            <section>
                                <h2 className="font-heading text-2xl leading-[1.2] text-primary-text md:text-3xl">
                                    Conclusion
                                </h2>
                                <p className="mt-4 text-base leading-7 text-secondary-text">
                                    {post.conclusion}
                                </p>
                            </section>
                        )}
                    </div>
                )}
            </article>

            {otherPosts.length > 0 && (
                <div className="mx-auto mt-24 max-w-5xl">
                    <h2 className="font-heading text-2xl leading-[1.2] text-primary-text md:text-3xl">
                        More from the Journal
                    </h2>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {otherPosts.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/blog/${other.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-accent/15 bg-secondary/40 transition-colors hover:border-accent/40"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={other.img}
                                        alt={other.title}
                                        fill
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="font-heading text-lg leading-[1.25] text-primary-text">
                                        {other.title}
                                    </h3>

                                    <p className="mt-3 flex-1 text-sm leading-6 text-secondary-text">
                                        {other.description}
                                    </p>

                                    <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors group-hover:text-highlight">
                                        {other.buttonText} →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
