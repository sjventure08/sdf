
import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".avif",
]);

// Individual image titles and descriptions
const IMAGE_CAPTIONS: Record<
    string,
    { title: string; description: string }
> = {
    "Gurujimeetings/01.jpg": {
        title: "Guruji with Gajendra Singh Shekhawat",
        description:
            "A meeting with Union Minister Gajendra Singh Shekhawat.",
    },

    "Gurujimeetings/02.jpg": {
        title: "Guruji's Meeting",
        description:
            "An interaction with distinguished guests.",
    },

    "Gurujimeetings/03.jpg": {
        title: "Spiritual Gathering",
        description:
            "A gathering of devotees and spiritual leaders.",
    },

    "Gurujimeetings/04.jpg": {
        title: "A Special Meeting",
        description:
            "A memorable interaction with distinguished guests.",
    },

    "Gurujimeetings/05.jpg": {
        title: "Meeting with Spiritual Leaders",
        description:
            "An interaction with respected members of the spiritual community.",
    },

    "Gurujimeetings/06.jpg": {
        title: "Guruji's Guidance",
        description:
            "Sharing wisdom and guidance with visitors.",
    },

    "Gurujimeetings/07.jpg": {
        title: "An Auspicious Gathering",
        description:
            "A gathering centred around Dharma and spiritual values.",
    },

    "Gurujimeetings/08.jpg": {
        title: "Community Interaction",
        description:
            "Guruji engaging with guests and well-wishers.",
    },

    "Gurujimeetings/09.jpg": {
        title: "A Special Interaction",
        description:
            "A meaningful moment from Guruji's meetings.",
    },

    "Gurujimeetings/10.jpg": {
        title: "Moments with Guruji",
        description:
            "A memorable moment from Guruji's engagements.",
    },

    // =====================================
    // KUMBH MELA
    // =====================================

    "KumbhMela/01.jpg": {
        title: "Maha Kumbh Mela",
        description:
            "A glimpse of the sacred Maha Kumbh Mela.",
    },

    "KumbhMela/02.jpg": {
        title: "Sacred Gathering",
        description:
            "Devotees coming together for a spiritual gathering.",
    },

    // Add more Kumbh Mela captions here

    // =====================================
    // PARISHAD
    // =====================================

    "Parishad/01.jpg": {
        title: "Parishad Gathering",
        description:
            "A gathering dedicated to discussions and collective initiatives.",
    },

    // Add more Parishad captions here

    // =====================================
    // SACRED POOJA
    // =====================================

    "SacredPooja/01.jpg": {
        title: "Sacred Pooja",
        description:
            "Traditional rituals performed with devotion and reverence.",
    },

    // Add more Sacred Pooja captions here

    // =====================================
    // SOCIAL ACTIVITY
    // =====================================

    "SocialActivity/01.jpg": {
        title: "A Gesture of Seva",
        description:
            "An initiative dedicated to serving and supporting the community.",
    },

    // Add more Social Activity captions here

    // =====================================
    // SPIRITUAL EVENTS
    // =====================================

    "SpiritualEvents/01.jpg": {
        title: "Spiritual Gathering",
        description:
            "A gathering celebrating spiritual wisdom and devotion.",
    },

    // Add more Spiritual Events captions here
};

// Image type
export type ProgramImage = {
    src: string;
    title: string;
    description: string;
};

// Automatically read images from folders
function getFolderImages(folder: string): ProgramImage[] {
    const dir = path.join(process.cwd(), "public", folder);

    let files: string[];

    try {
        files = fs.readdirSync(dir);
    } catch {
        return [];
    }

    return files
        .filter((file) =>
            IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b))
        .map((file) => {
            const caption = IMAGE_CAPTIONS[`${folder}/${file}`];

            return {
                src: `/${folder}/${file}`,
                title: caption?.title || "Untitled",
                description: caption?.description || "",
            };
        });
}

// Program information
const PROGRAM_META = [
    {
        folder: "Gurujimeetings",
        title: "Guruji's Meetings",
        desc: "Gatherings and darshans with Guruji — moments of guidance, blessing and connection with the community.",
    },
    {
        folder: "KumbhMela",
        title: "Kumbh Mela",
        desc: "Supporting the Maha Kumbh Mela with logistics, hospitality and coordination for devotees from around the world.",
    },
    {
        folder: "Parishad",
        title: "Parishad",
        desc: "Assemblies and councils where the community gathers to deliberate, plan and carry forward the Foundation's mission.",
    },
    {
        folder: "SacredPooja",
        title: "Sacred Pooja",
        desc: "Traditional poojas and rituals performed with devotion, preserving sacred practice for every generation.",
    },
    {
        folder: "SocialActivity",
        title: "Social Activity",
        desc: "On-the-ground seva — food, relief and community support delivered where it's needed most.",
    },
    {
        folder: "SpiritualEvents",
        title: "Spiritual Events",
        desc: "Satsangs, discourses and spiritual events that bring scripture and practice to life for every seeker.",
    },
] as const;

// Program type
export type Program = {
    folder: string;
    title: string;
    desc: string;
    images: ProgramImage[];
};

// Get all programs and their images
export function getPrograms(): Program[] {
    return PROGRAM_META.map((meta) => ({
        ...meta,
        images: getFolderImages(meta.folder),
    }));
}
