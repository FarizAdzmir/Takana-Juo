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
    title: "Takana Juo",
    description:
        "Nasi Goreng Minang",
    openGraph: {
        title: "Takana Juo",
        description:
            "Nasi Goreng Minang",
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

