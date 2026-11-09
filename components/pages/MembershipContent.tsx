"use client";

import { motion } from "motion/react";

const benefits = [
    {
        title: "Community",
        desc: "Connect with like-minded members at satsangs, festivals and gatherings throughout the year.",
    },
    {
        title: "Learning",
        desc: "Get early access to workshops, talks and study circles on scripture, philosophy and practice.",
    },
    {
        title: "Seva",
        desc: "Take part in our service programs and see first-hand the impact your support makes.",
    },
];

export default function MembershipContent() {
    return (
        <section className="bg-background px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-2xl text-center"
            >
                <span className="eyebrow text-accent">Why Join</span>

                <h2 className="mt-4 section-title text-primary-text">
                    What Membership Means
                </h2>
            </motion.div>

            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-2xl border border-accent/15 bg-white p-8"
                    >
                        <h3 className="card-title text-primary-text">{benefit.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-secondary-text">
                            {benefit.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
