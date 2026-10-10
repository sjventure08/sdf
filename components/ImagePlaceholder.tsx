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
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-accent/40"
                >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="8.5" cy="9.5" r="1.5" />
                    <path d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L4 19" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent/50">
                    {label}
                </span>
            </div>
        </div>
    );
}
