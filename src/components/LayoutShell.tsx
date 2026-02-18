"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/UI/NavBar";
import Footer from "@/components/UI/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import Noise from "@/components/UI/Noise";

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    // Admin: no NavBar, Footer, or SmoothScroll
    if (isAdmin) {
        return <>{children}</>;
    }

    // All other pages: full site shell with language support
    return (
        <LanguageProvider>
            <div className="fixed inset-0 z-[9999] pointer-events-none">
                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={15}
                />
            </div>
            <SmoothScroll>
                <div className="relative z-10">
                    <NavBar />
                    <main>{children}</main>
                </div>
                <Footer />
            </SmoothScroll>
        </LanguageProvider>
    );
}
