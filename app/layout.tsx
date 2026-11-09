import type { Metadata } from "next";
import { Maname } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrishulBadge from "../components/TrishulBadge";
import { cn } from "@/lib/utils";

const maname = Maname({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-maname",
});

export const metadata: Metadata = {
  title: "Sanatana Dharma Foundation",
  description:
    "Preserving timeless wisdom, empowering communities, and turning Dharma into action.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", maname.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <TrishulBadge />
      </body>
    </html>
  );
}
