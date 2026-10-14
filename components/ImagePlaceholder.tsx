import { PiImage } from "react-icons/pi";

type ImagePlaceholderProps = {
    label?: string;
    className?: string;
};

// Stand-in for an image slot that hasn't been uploaded yet. Swap the
// parent element for a Next <Image> once the real asset is in /public.
export default function ImagePlaceholder({
    label = "Image coming soon",
    className = "",
}: ImagePlaceholderProps) {
    return (
        <div
            className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-accent/25 bg-accent/5 ${className}`}
        >
            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <PiImage className="h-8 w-8 text-accent/40" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent/50">
                    {label}
                </span>
            </div>
        </div>
    );
}
