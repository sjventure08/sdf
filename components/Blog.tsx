"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export default function Blog() {
    return (
        <section className="bg-background px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-2xl text-center"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                    From The Journal
                </span>

                <h2 className="mt-6 font-heading text-4xl leading-[1.1] text-primary-text md:text-5xl">
                    Stories & Reflections
                </h2>

                <p className="mx-auto mt-6 max-w-md text-base leading-7 text-secondary-text">
                    Readings on culture, scripture, and the Foundation&apos;s work — for
                    anyone curious about Sanatana Dharma.
                </p>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
                {blogPosts.map((post, index) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
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
                            <h3 className="font-heading text-xl leading-[1.25] text-primary-text">
                                {post.title}
                            </h3>

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
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
