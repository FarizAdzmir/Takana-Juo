"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RollingText from "./RollingText";
import { useLanguage } from "@/context/LanguageContext";

const navLinkKeys = [
    { key: "nav.story", href: "#story" },
    { key: "nav.menu", href: "#menu" },
    { key: "nav.experience", href: "#experience" },
    { key: "nav.events", href: "#events" },
];

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLightSection, setIsLightSection] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();

    // Fetch status from API on mount, then poll every 60s
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch("/api/status");
                const data = await res.json();
                setIsOpen(data.isOpen);
            } catch {
                setIsOpen(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60_000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const observerOptions = {
            root: null,
            rootMargin: "-10% 0px -90% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === "story" || id === "experience") {
                        setIsLightSection(true);
                    } else {
                        setIsLightSection(false);
                    }
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    // Derived classes
    const textColorClass = isLightSection ? "text-charcoal" : "text-cream";
    const scrolledBg = isLightSection
        ? "bg-cream/80 backdrop-blur-xl border-b border-charcoal/5 shadow-sm"
        : "bg-charcoal/80 backdrop-blur-xl border-b border-white/10 shadow-lg";

    const statusLabel = isOpen ? t("nav.open") : t("nav.closed");

    const desktopStatusClass = isOpen
        ? "border-gold text-gold"
        : isLightSection
            ? "border-charcoal/30 text-charcoal"
            : "border-cream/30 text-cream";

    const mobileStatusClass = isOpen
        ? "border-gold text-gold"
        : "border-cream/30 text-cream";

    // Language toggle
    const toggleLang = () => setLang(lang === "my" ? "en" : "my");
    const langLabel = lang.toUpperCase();

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? scrolledBg
                : "bg-transparent border-b border-transparent"
                } py-5`}
        >
            <div className="w-full px-8 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <svg
                        id="Takana_Juo"
                        data-name="Takana Juo"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 375.385"
                        className={`h-8 w-auto fill-current transition-colors duration-500 ${textColorClass}`}
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                    >
                        <path
                            d="M521.8,472.515A542.6,542.6,0,0,1,501.149,383c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.6,542.6,0,0,1-20.65,89.515c-25.473,78.842-68.578,150.643-128.166,213.433l-1.663,1.724L500,687.59l151.628.082-1.663-1.724C590.377,623.158,547.272,551.357,521.8,472.515Z"
                            transform="translate(0 -312.308)"
                        />
                        <path
                            d="M756.579,583.357l.287-.2.082-.349c7-25.678,13.342-51.911,18.884-77.959,8.847-41.566,15.908-84.034,20.978-126.216l.411-3.366-2.2,2.566a355.663,355.663,0,0,1-116.363,89.186,350.791,350.791,0,0,1-120.531,32.74l-1.375.123.513,1.272a513.052,513.052,0,0,0,79.109,135.146l.41.492.616-.143a314.574,314.574,0,0,0,119.176-53.287Z"
                            transform="translate(0 -312.308)"
                        />
                        <path
                            d="M1000,312.308l-3.079,4.084A393.106,393.106,0,0,1,816.413,450.2l-.575.206q-12.562,74.971-25.1,149.944a354.473,354.473,0,0,1-141.61,46.841l-1.95.226,34.3,39.9.308.369,223.035-.055Z"
                            transform="translate(0 -312.308)"
                        />
                        <path
                            d="M224.168,504.844c5.542,26.048,11.884,52.281,18.884,77.959l.082.349.287.2A314.574,314.574,0,0,0,362.6,636.644l.616.143.41-.492a513.919,513.919,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.433l.513-1.272-1.375-.123a350.791,350.791,0,0,1-120.531-32.74,355.663,355.663,0,0,1-116.363-89.186l-2.2-2.566.411,3.366C208.26,420.81,215.321,463.278,224.168,504.844Z"
                            transform="translate(0 -312.308)"
                        />
                        <path
                            d="M352.826,647.42l-1.95-.226a354.473,354.473,0,0,1-141.61-46.841q-12.562-74.971-25.1-149.944l-.575-.206A393.106,393.106,0,0,1,3.079,316.392L0,312.308,95.184,687.637l223.035.055.308-.369Z"
                            transform="translate(0 -312.308)"
                        />
                    </svg>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinkKeys.map((link) => (
                        <a
                            key={link.key}
                            href={link.href}
                            className={`${textColorClass} hover:text-gold font-heading text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative group`}
                        >
                            <RollingText height="1.5em">
                                {t(link.key)}
                            </RollingText>
                        </a>
                    ))}

                    {/* Open/Closed Status */}
                    <div
                        className={`ml-2 px-6 py-2.5 border ${desktopStatusClass} font-heading text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
                    >
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`}
                        />
                        {statusLabel}
                    </div>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLang}
                        className={`${textColorClass} hover:text-gold font-heading text-xs uppercase tracking-[0.15em] transition-colors duration-300 flex items-center gap-1`}
                    >
                        {langLabel}
                        <svg
                            className="w-3 h-3 opacity-60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 group"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-[2px] ${isLightSection ? "bg-charcoal" : "bg-cream"} transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-[5px]" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] ${isLightSection ? "bg-charcoal" : "bg-cream"} transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] ${isLightSection ? "bg-charcoal" : "bg-cream"} transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-lg border-t border-gold/10 transition-all duration-500 overflow-hidden ${isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col items-center gap-6 py-8">
                    {navLinkKeys.map((link) => (
                        <a
                            key={link.key}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-cream/80 hover:text-gold font-heading text-lg uppercase tracking-[0.2em] transition-colors duration-300"
                        >
                            {t(link.key)}
                        </a>
                    ))}

                    {/* Mobile Status */}
                    <div
                        className={`mt-2 px-8 py-3.5 border ${mobileStatusClass} font-heading text-sm uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
                    >
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`}
                        />
                        {statusLabel}
                    </div>

                    {/* Mobile Language Toggle */}
                    <button
                        onClick={toggleLang}
                        className="text-cream/60 hover:text-gold font-heading text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-1.5"
                    >
                        {langLabel}
                        <svg
                            className="w-3 h-3 opacity-60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
