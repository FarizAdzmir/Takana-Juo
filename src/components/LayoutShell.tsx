"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/UI/NavBar";
import Footer from "@/components/UI/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    // Dashboard: no NavBar, Footer, or SmoothScroll
    if (isDashboard) {
        return <>{children}</>;
    }

    // All other pages: full site shell with language support
    return (
        <LanguageProvider>
            <SmoothScroll>
                <div className="relative z-10 bg-cream">
                    <NavBar />
                    <main>{children}</main>
                </div>
                <Footer />
            </SmoothScroll>
        </LanguageProvider>
    );
}
