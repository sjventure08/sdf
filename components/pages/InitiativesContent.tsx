"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ProgramGallery from "@/components/ProgramGallery";
import type { Program } from "@/lib/programs";

const gurujiMeetings: Program = {
    folder: "GurujiMeetings",
    title: "Guruji's Meetings",
    desc: "Gatherings and darshans with Guruji — moments of guidance, blessing and connection with the community.",
    images: [
        {
            src: "/guruji-meeting-mohan-bhagwat-02.jpeg",
            title: "Guruji with Dr. Mohan Bhagwat",
            description: "Dr. Mohan Bhagwat, Sarsanghchalak (Chief) of the RSS.",
        },
        {
            src: "/guruji-meeting-mohan-bhagwat-01.jpeg",
            title: "Guruji with Dr. Mohan Bhagwat",
            description: "Dr. Mohan Bhagwat, Sarsanghchalak (Chief) of the RSS.",
        },
        {
            src: "/sdf (71).webp",
            title: "Guruji with Shri Gajendra Singh Shekhawat",
            description: "Union Cabinet Minister, Government of India",
        },
        {
            src: "/sdf (68).webp",
            title: "Guruji with Shri Rajendra Vishwanath Arlekar",
            description: "Governor of Tamil Nadu, at Raj Bhavan.",
        },
        {
            src: "/sdf (25).webp",
            title: "Guruji with Shri Rajendra Vishwanath Arlekar",
            description: "Governor of Tamil Nadu, at Raj Bhavan.",
        },
        {
            src: "/sdf (3).webp",
            title: "Guruji with Shri Rajendra Vishwanath Arlekar",
            description: "Governor of Tamil Nadu, at Raj Bhavan.",
        },
        {
            src: "/sdf (2).webp",
            title: "Guruji with Shri Rajendra Vishwanath Arlekar",
            description: "Governor of Tamil Nadu, at Raj Bhavan.",
        },
        {
            src: "/sdf (69).webp",
            title: "Guruji with Shri Ramdas Athawale",
            description: "Union Minister of State for Social Justice and Empowerment",
        },
        {
            src: "/sdf (73).webp",
            title: "Guruji with Shri Brajesh Pathak",
            description: "Deputy Chief Minister and Minister for Medical Health & Family Welfare, Uttar Pradesh",
        },
        {
            src: "/sdf (5).webp",
            title: "Guruji with Shri Alok Kumar",
            description: "Shri Alok Kumar, the International President of the Vishva Hindu Parishad (VHP).",
        },
        {
            src: "/sdf (48).webp",
            title: "Guruji with Shri Alok Kumar",
            description: "Shri Alok Kumar, the International President of the Vishva Hindu Parishad (VHP).",
        },
        {
            src: "/sdf (39).webp",
            title: "Guruji with Shri Alok Kumar",
            description: "Shri Alok Kumar, the International President of the Vishva Hindu Parishad (VHP).",
        },
    ],
};

const ravindraPuriMeetings: Program = {
    folder: "GurujiWithRavindraPuriJiMaharaj",
    title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
    desc: "Moments from Guruji's meetings with Ravindra Puri Ji Maharaj.",
    images: [
        {
            src: "/sdf (4).webp",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment from Guruji's meeting with Ravindra Puri Ji Maharaj.",
        },
        {
            src: "/sdf (75).webp",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A gathering with Guruji and fellow saints.",
        },
        {
            src: "/sdf-1(14).webp",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A spiritual gathering with Guruji and fellow saints.",
        },
        {
            src: "/ravindra-puri-meeting-04.jpeg",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment shared by Guruji and Ravindra Puri Ji Maharaj.",
        },
        {
            src: "/ravindra-puri-meeting-05.jpeg",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment shared by Guruji and Ravindra Puri Ji Maharaj.",
        },
        {
            src: "/ravindra-puri-meeting-07.jpeg",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment shared by Guruji and Ravindra Puri Ji Maharaj.",
        },
        {
            src: "/ravindra-puri-meeting-08.jpeg",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment shared by Guruji and Ravindra Puri Ji Maharaj.",
        },
        {
            src: "/ravindra-puri-meeting-09.jpeg",
            title: "Guruji with Mahant Ravindra Puri Ji Maharaj",
            description: "A moment shared by Guruji and Ravindra Puri Ji Maharaj.",
        },
    ],
};

const kumbhMela: Program = {
    folder: "KumbhMela",
    title: "Kumbh Mela",
    desc: "Moments and activities from the Kumbh Mela.",
    images: [
        {
            src: "/kumbhmela-01.webp",
            title: "Guruji with Swami Kailashanand Giri Ji",
            description: "At the Kumbh Mela.",
        },
        {
            src: "/parishad-06.webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji and fellow saints at a Kumbh Mela gathering.",
        },
        {
            src: "/parishad-07.webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji and fellow saints at a Kumbh Mela gathering.",
        },
        {
            src: "/sdf-1(14).webp",
            title: "Kumbh Mela Procession",
            description: "Saints and devotees gathered at the Kumbh Mela.",
        },
        {
            src: "/sdf-1(18).webp",
            title: "Kumbh Mela Gathering",
            description: "A gathering of saints at the Kumbh Mela.",
        },
        {
            src: "/sdf-1(24).webp",
            title: "Kumbh Mela Gathering",
            description: "A spiritual gathering with Guruji and fellow saints.",
        },
        {
            src: "/sdf-1(25).webp",
            title: "Kumbh Mela Gathering",
            description: "",
        },
        {
            src: "/sdf-1(28).webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji with Acharya Lokesh Muni Ji and Swami Kailashanand Giri Ji.",
        },
        {
            src: "/sdf-1(21).webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji with Acharya Lokesh Muni Ji, Mahant Ravindra Puri Ji Maharaj and Swami Balkanand Giri Ji.",
        },
        {
            src: "/sdf-1(32).webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji meeting with fellow saints at the Kumbh Mela.",
        },
        {
            src: "/sdf-1(35).webp",
            title: "Kumbh Mela Gathering",
            description: "Guruji with fellow saints at the Kumbh Mela.",
        },
        {
            src: "/sdf-1(38).webp",
            title: "Guruji at the Kumbh Mela",
            description: "A moment with Guruji at the Kumbh Mela.",
        },
        {
            src: "/sdf-1(45).webp",
            title: "Kumbh Mela Gathering",
            description: "Saints gathered with Guruji at the Kumbh Mela.",
        },
    ],
};

const oneNationOneElectionUttarakhand: Program = {
    folder: "OneNationOneElectionUttarakhand",
    title: "One Nation One Election — Uttarakhand",
    desc: "Moments from the One Nation One Election initiative in Uttarakhand.",
    images: [
        {
            src: "/one-nation-one-election-uttarakhand-01.jpg",
            title: "Sant Samagam",
            description: "One Nation, One Election — Uttarakhand.",
        },
        {
            src: "/one-nation-one-election-uttarakhand-02.jpg",
            title: "Sant Samagam",
            description: "One Nation, One Election — Uttarakhand.",
        },
        {
            src: "/one-nation-one-election-uttarakhand-03.jpg",
            title: "Sant Samagam",
            description: "One Nation, One Election — Uttarakhand.",
        },
        {
            src: "/one-nation-one-election-uttarakhand-04.jpg",
            title: "Sant Samagam",
            description: "One Nation, One Election — Uttarakhand.",
        },
    ],
};

const goaSpiritualFestival: Program = {
    folder: "GoaSpiritualFestival",
    title: "Goa Spiritual Festival",
    desc: "Scenes from the Goa Spiritual Festival, bringing the community together by the sea.",
    images: [
        {
            src: "/goa-spiritual-festival-01.jpeg",
            title: "Goa Spiritual Festival",
            description: "A gathering of devotees by the shore in Goa.",
        },
        {
            src: "/goa-spiritual-festival-02.jpeg",
            title: "Goa Spiritual Festival",
            description: "Devotees gather for the spiritual festival in Goa.",
        },
        {
            src: "/goa-spiritual-festival-03.jpeg",
            title: "Goa Spiritual Festival",
            description: "A view of the festival gathering in Goa.",
        },
        {
            src: "/goa-spiritual-festival-04.jpeg",
            title: "Goa Spiritual Festival",
            description: "The festival gathering along the Goa coastline.",
        },
        {
            src: "/goa-spiritual-festival-05.jpeg",
            title: "Goa Spiritual Festival",
            description: "Festival scenes by the sea in Goa.",
        },
        {
            src: "/goa-spiritual-festival-06.jpeg",
            title: "Goa Spiritual Festival",
            description: "Devotees gathered for the spiritual festival.",
        },
        {
            src: "/goa-spiritual-festival-07.jpeg",
            title: "Goa Spiritual Festival",
            description: "Aerial view of the gathering on the shore.",
        },
        {
            src: "/goa-spiritual-festival-08.jpeg",
            title: "Goa Spiritual Festival",
            description: "Aerial scenes from the Goa Spiritual Festival.",
        },
        {
            src: "/goa-spiritual-festival-09.jpeg",
            title: "Goa Spiritual Festival",
            description: "The community gathered at the festival in Goa.",
        },
        {
            src: "/sacredpooja-14.webp",
            title: "Goa Spiritual Festival",
            description: "A sacred gathering during the Goa Spiritual Festival.",
        },
        {
            src: "/sacredpooja-11.webp",
            title: "Goa Spiritual Festival",
            description: "A devotional moment from the Goa Spiritual Festival.",
        },
        {
            src: "/sacredpooja-12.webp",
            title: "Goa Spiritual Festival",
            description: "A moment of blessing during the Goa Spiritual Festival.",
        },
        {
            src: "/sacredpooja-13.webp",
            title: "Goa Spiritual Festival",
            description: "A sacred ritual during the Goa Spiritual Festival.",
        },
    ],
};

const jawaharSinghBedhamMeeting: Program = {
    folder: "JawaharSinghBedhamMeeting",
    title: "A special meeting with Shri Jawahar Singh Bedham",
    desc: "Moments from a special meeting with Shri Jawahar Singh Bedham.",
    images: [
        {
            src: "/parishad-01.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
        {
            src: "/parishad1.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
        {
            src: "/parishad-02.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
        {
            src: "/parishad-03.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
        {
            src: "/parishad-04.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
        {
            src: "/parishad-05.webp",
            title: "A special meeting with Shri Jawahar Singh Bedham",
            description: "A special meeting with Shri Jawahar Singh Bedham.",
        },
    ],
};



const categories = [
    gurujiMeetings,
    ravindraPuriMeetings,
    kumbhMela,
    oneNationOneElectionUttarakhand,
    goaSpiritualFestival,
    jawaharSinghBedhamMeeting,
];

export default function InitiativesContent() {
    const [selectedCategory, setSelectedCategory] = useState<Program | null>(null);

    return (
        <>
            <section className="bg-background px-8 py-16 md:px-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="eyebrow text-accent">Our Programs</span>
                    <h2 className="mt-4 section-title text-primary-text">
                        Where Dharma Meets Action
                    </h2>
                </motion.div>

                <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
                    {categories.map((category, index) => (
                        <motion.article
                            key={category.folder}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden rounded-3xl border border-accent/20 bg-white"
                        >
                            {category.images[0] ? (
                                <div className="relative aspect-16/10 w-full bg-primary-text/5">
                                    <Image
                                        src={category.images[0].src}
                                        alt={category.images[0].title}
                                        fill
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <ImagePlaceholder
                                    label="Photos coming soon"
                                    className="aspect-16/10 w-full rounded-none border-0"
                                />
                            )}

                            <div className="min-h-60 p-7 md:p-8">
                                <h3 className="font-heading text-2xl text-primary-text">
                                    {category.title}
                                </h3>
                                <p className="mt-4 text-base leading-7 text-secondary-text">
                                    {category.desc}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                    className="mt-6 cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-highlight"
                                >
                                    Get Involved →
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

            </section>

            <ProgramGallery
                program={selectedCategory}
                onClose={() => setSelectedCategory(null)}
            />
        </>
    );
}
