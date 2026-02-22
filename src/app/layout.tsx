import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
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

const trajanProRegular = localFont({
    src: "./fonts/TrajanPro-Regular.ttf",
    variable: "--font-trajan-regular",
    display: "swap",
});

const trajanProBold = localFont({
    src: "./fonts/TrajanPro-Bold.otf",
    variable: "--font-trajan-bold",
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
        <html lang="en" className={`${playfair.variable} ${inter.variable} ${trajanProRegular.variable} ${trajanProBold.variable}`}>
            <body className="antialiased">
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    );
}

