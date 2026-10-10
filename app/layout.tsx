import type { Metadata } from "next";
import { Merriweather, Open_Sans, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrishulBadge from "../components/TrishulBadge";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
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
      className={cn("h-full", "antialiased", merriweather.variable, openSans.variable, "font-sans", geist.variable)}
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
