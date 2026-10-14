"use client";

import { motion } from "motion/react";
import Link from "next/link"
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { IconType } from "react-icons";
import { PiBookOpenText, PiFlame, PiFlowerLotus, PiHandHeart, PiHeart, PiSun, PiUsersThree } from "react-icons/pi";

type IconName = "truth" | "compassion" | "seva" | "wisdom" | "unity" | "discipline" | "leaf";

const iconMap: Record<IconName, IconType> = {
    truth: PiSun,
    compassion: PiHeart,
    seva: PiHandHeart,
    wisdom: PiBookOpenText,
    unity: PiUsersThree,
    discipline: PiFlame,
    leaf: PiFlowerLotus,
};

function Icon({ name, className }: { name: IconName; className?: string }) {
    const Component = iconMap[name];
    return <Component className={className} aria-hidden="true" />;
}

const values = [
    { icon: "truth" as const, title: "Satya", desc: "Truth as the foundation of every word and action." },
    { icon: "compassion" as const, title: "Karuna", desc: "Compassion for all beings, without condition." },
    { icon: "seva" as const, title: "Seva", desc: "Selfless service as a form of worship." },
    { icon: "wisdom" as const, title: "Gyaan", desc: "Wisdom drawn from scripture and lived experience." },
    { icon: "unity" as const, title: "Ekta", desc: "Unity across communities, backgrounds and beliefs." },
    { icon: "discipline" as const, title: "Tapas", desc: "Discipline in practice, patience in growth." },
];

const ourWork = [
    {
        title: "Charitable Activities & Community Service",
        desc: "We support initiatives that address society's pressing needs — from educational programs to healthcare services — aligning our efforts with the timeless principles of Sanatana Dharma to make a meaningful impact on communities.",
    },
    {
        title: "Spiritual Education",
        desc: "We host workshops, seminars and lectures led by esteemed scholars and spiritual leaders who share their insights into Hindu philosophy and practices, deepening understanding of our heritage.",
    },
    {
        title: "Pilgrimages To Holy Cities",
        desc: "We encourage and facilitate pilgrimages to holy cities integral to the Sanatana Dharma tradition, blending spiritual exploration with community service projects at these sacred locations.",
    },
    {
        title: "Community Engagement",
        desc: "Through Facebook, Instagram and X, we reach a broader audience with content reflecting the essence of Sanatana Dharma — enlightening articles, live discussions, and an invitation to join the journey.",
    },
];

const aims = [
    "Encourages individuals to live ethically and fulfill their duties in accordance with their position in life (varnas and ashramas).",
    "Acknowledges the importance of desires and pleasures, encouraging their fulfillment in a balanced and ethical manner.",
    "Encourages practices such as meditation, yoga, devotion (bhakti), and knowledge (jnana) to realize one's divine nature.",
    "Regular rituals, pujas (worship ceremonies), and festivals that honor various deities and aspects of the divine.",
    "Recognizes the validity of multiple paths to the divine and respects different religious and spiritual traditions.",
];

const leadership = [
    {
        role: "Founder & Spiritual Guide",
        desc: "Mahamandaleshwar Shri Shri 1008 Anant Shri Vibhushit Swami Narayan Giriji Maharaj sets the spiritual direction of the Foundation.",
    },
    {
        role: "Executive Director",
        desc: "Oversees the Foundation's programs, partnerships and day-to-day operations.",
    },
    {
        role: "Program Lead",
        desc: "Designs and runs the Foundation's cultural, educational and community initiatives.",
    },
    {
        role: "Volunteer Coordinator",
        desc: "Connects volunteers with the initiatives where their time makes the most difference.",
    },
];

export default function AboutContent() {
    return (
        <>
            {/* Our Story */}

            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="order-2 lg:order-1"
                    >
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                            Our Story
                        </span>

                        <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                            A revered non-profit dedicated to Sanatana Dharma
                        </h2>

                        <p className="mt-6 text-base leading-7 text-secondary-text">
                            The Sanatana Dharma Foundation is dedicated to the propagation
                            and preservation of Sanatana Dharma, often known as Hinduism.
                            Grounded in the profound wisdom of ancient Indian traditions, our
                            foundation embodies the aims articulated in our Trust Deed —
                            promoting a renaissance of religious and cultural values across
                            communities while nurturing a deeper understanding of Hindu
                            philosophy.
                        </p>

                        <p className="mt-4 text-base leading-7 text-secondary-text">
                            At our heart lies the concept of the social reincarnation of
                            Sanatana Dharma. Our mission is to provide a contemporary
                            approach to religious and ethical training, tailored to the
                            evolving needs of our society, rooted in the liberal, wide and
                            unsectarian nature of Sanatana Dharma. We welcome anyone who
                            holds their national identity in high regard and takes pride in
                            being a follower of Sanatana Dharma.
                        </p>

                        <p className="mt-4 text-base leading-7 text-secondary-text">
                            In recent years, we have witnessed an erosion of Indian culture
                            under the overwhelming influence of the West. Elements that were
                            once a perennial source of pride for all Indians have faced
                            marginalization — particularly the deep-rooted values of
                            Sanatana Dharma. As a foundation, we are profoundly committed to
                            reviving this ancient world Dharma.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative order-1 aspect-4/3 w-full lg:order-2"
                    >
                        <Image
                            src="/aboutimage.webp"
                            alt="Sanatana Dharma Foundation"
                            fill
                            sizes="(min-width: 1024px) 42vw, 60vw"
                            loading="eager"
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}

            <section className="bg-secondary/40 px-8 py-16 md:px-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl text-center"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                    Our Vision & Mission
                </span>

                <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                    A contemporary platform for ancient wisdom
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-secondary-text">
                    We aim to create a contemporary platform that nurtures spiritual
                    education and awareness of Indian traditions. Our religious trust
                    focuses on charitable endeavors that uplift communities, enhance
                    social welfare, and provide vital resources for those in need. We
                    strive to cultivate a network of spiritual seekers and practitioners
                    dedicated to revitalizing Sanatana Dharma in today&apos;s world —
                    guided by Mahamandaleshwar Shri Shri 1008 Anant Shri Vibhushit Swami
                    Narayan Giriji Maharaj, who leads us in cultivating cultural
                    consciousness, spiritual development, and social welfare.
                </p>
            </motion.div>
        </section >

            {/* Values */ }

            < section className = "bg-secondary/40 px-8 py-16 md:px-16 md:py-24" >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                                What Guides Us
                            </span>

                            <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                                Our Core Values
                            </h2>
                        </motion.div>

                        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="text-center"
                                >
                                    <Icon name={value.icon} className="mx-auto h-7 w-7 text-accent" />
                                    <p className="mt-4 font-heading text-lg text-primary-text">
                                        {value.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-secondary-text">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section >

        {/* Our Work */ }

        < section className = "bg-background px-8 py-16 md:px-16 md:py-24" >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                                What We Do
                            </span>

                            <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                                Our Work
                            </h2>
                        </motion.div>

                        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2">
                            {ourWork.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <p className="font-heading text-lg text-primary-text">
                                        {item.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-secondary-text">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section >

        {/* Aims & Objectives */ }

        < section className = "bg-secondary/40 px-8 py-16 md:px-16 md:py-24" >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                                Aims & Objectives
                            </span>

                            <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                                Aims Of Sanatana Dharma
                            </h2>
                        </motion.div>

                        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-6">
                            {aims.map((aim, index) => (
                                <motion.div
                                    key={aim}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="flex items-start gap-4"
                                >
                                    <Icon name="leaf" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                                    <p className="text-base leading-7 text-secondary-text">{aim}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section >

        {/* Leadership */ }

        < section className = "bg-background px-8 py-16 md:px-16 md:py-24" >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                                Our People
                            </span>

                            <h2 className="mt-4 font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                                Leadership
                            </h2>
                        </motion.div>

                        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {leadership.map((person, index) => (
                                <motion.div
                                    key={person.role}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <ImagePlaceholder label="Portrait" className="aspect-square w-full" />
                                    <p className="mt-4 font-heading text-base text-primary-text">
                                        {person.role}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-secondary-text">
                                        {person.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section >

        {/* CTA */ }

        < section className = "bg-secondary px-8 py-16 text-center md:px-16 md:py-24" >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 className="font-heading text-3xl leading-[1.15] text-primary-text md:text-4xl">
                    Join Us In Our Mission
                </h2>

                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-secondary-text">
                    Whether through our charitable programs, educational workshops, or
                    following us online, there are many ways to get involved. Together,
                    we can work towards a future that honors our ancient philosophies
                    while addressing contemporary challenges.
                </p>

                <Link
                    href="/contact"
                    className="mt-8 inline-block cursor-pointer rounded-full border border-accent bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-accent"
                >
                    Join Us →
                </Link>
            </motion.div>
                    </section >
                </>
                );
}
