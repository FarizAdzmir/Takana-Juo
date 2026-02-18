import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Takana Juo — Authentic Minangkabau Cuisine",
    description:
        "Experience the bold, rich flavors of Minangkabau cuisine at Takana Juo. Traditional recipes passed down through generations, served with warmth and elegance.",
    openGraph: {
        title: "Takana Juo — Authentic Minangkabau Cuisine",
        description:
            "Experience the bold, rich flavors of Minangkabau cuisine at Takana Juo.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body className="antialiased">
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    );
}

