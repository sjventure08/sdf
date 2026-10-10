import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

function getFolderImages(folder: string): string[] {
    const dir = path.join(process.cwd(), "public", folder);

    let files: string[];
    try {
        files = fs.readdirSync(dir);
    } catch {
        return [];
    }

    return files
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => `/${folder}/${file}`);
}

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
        folder: "presidentOfIskcon",
        title: "President of ISKCON",
        desc: "Meetings and collaborations with the President of ISKCON in service of a shared dharmic vision.",
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

export type Program = {
    folder: string;
    title: string;
    desc: string;
    images: string[];
};

export function getPrograms(): Program[] {
    return PROGRAM_META.map((meta) => ({
        ...meta,
        images: getFolderImages(meta.folder),
    }));
}
