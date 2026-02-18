"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navLinkKeys = [
    { key: "nav.menu", href: "#menu" },
    { key: "nav.reservation", href: "#reservation" },
];

function RollingLangToggle({
    currentLang,
    onToggle,
    className = "",
}: {
    currentLang: string;
    onToggle: () => void;
    className?: string;
}) {
    const otherLang = currentLang === "my" ? "EN" : "MY";
    const displayLang = currentLang.toUpperCase();

    return (
        <button
            onClick={onToggle}
            className={`relative overflow-hidden flex items-center justify-center cursor-pointer ${className}`}
            style={{ height: "1.5em" }}
        >
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative flex flex-col items-center justify-start w-full"
            >
                <div style={{ overflow: "hidden" }}>
                    <motion.div
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {displayLang}
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-0 left-0 w-full text-center"
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    {otherLang}
                </motion.div>
            </motion.div>
        </button>
    );
}

function NavRollingText({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="relative overflow-hidden flex items-center justify-center"
            style={{ height: "1.5em" }}
        >
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative flex flex-col items-center justify-start w-full"
            >
                <div style={{ overflow: "hidden" }}>
                    <motion.div
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {children}
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-0 left-0 w-full text-center"
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function NavBar() {
    gsap.registerPlugin(ScrollTrigger);
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

        const initScrollTriggers = () => {
            // Use ScrollTrigger to detect sections for NavBar style changes
            // Matches the logic in page.tsx for background color
            const lightSections = ["#story", "#experience"];
            const triggers: ScrollTrigger[] = [];

            lightSections.forEach((id) => {
                const section = document.querySelector(id);
                if (section) {
                    const st = ScrollTrigger.create({
                        trigger: section,
                        start: "top 50px", // Offset for NavBar height
                        end: "bottom 50px",
                        onEnter: () => setIsLightSection(true),
                        onLeave: () => setIsLightSection(false),
                        onEnterBack: () => setIsLightSection(true),
                        onLeaveBack: () => setIsLightSection(false),
                    });
                    triggers.push(st);
                }
            });

            // Cleanup function for these specific triggers
            return () => {
                triggers.forEach(t => t.kill());
            };
        };

        let cleanupTriggers: (() => void) | undefined;

        // If already ready (e.g. on navigation back to home or refresh where preloader matches fast)
        if (document.body.classList.contains("theme-ready")) {
            cleanupTriggers = initScrollTriggers();
        }

        const handleThemeReady = () => {
            if (cleanupTriggers) cleanupTriggers();
            cleanupTriggers = initScrollTriggers();
        };

        window.addEventListener("takana-theme-ready", handleThemeReady);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("takana-theme-ready", handleThemeReady);
            if (cleanupTriggers) cleanupTriggers();
            ScrollTrigger.getAll().forEach((t) => t.kill());
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

    const toggleLang = () => setLang(lang === "my" ? "en" : "my");

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? scrolledBg
                : "bg-transparent border-b border-transparent"
                } py-5`}
        >
            <div className="w-full px-8 md:px-12 flex items-center justify-between">
                <a
                    href="/"
                    className={`block transition-colors duration-300 w-20 group hover:text-gold`}
                >
                    <svg
                        id="Takana_Juo_Nav"
                        data-name="Takana Juo"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 375.385"
                        className="w-full h-auto"
                    >
                        <defs>
                            <linearGradient
                                id="nav-new-gradient"
                                x1="384.299"
                                y1="-33.291"
                                x2="615.702"
                                y2="198.113"
                                gradientTransform="matrix(1, 0, 0, -1, 0, 378)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stopColor="#e3a42d" />
                                <stop offset="1" stopColor="#ffdd03" />
                            </linearGradient>
                            <linearGradient
                                id="nav-new-gradient-2"
                                x1="599.162"
                                y1="91.145"
                                x2="810.142"
                                y2="302.125"
                                xlinkHref="#nav-new-gradient"
                            />
                            <linearGradient
                                id="nav-new-gradient-3"
                                x1="664.671"
                                y1="-74.372"
                                x2="1068.23"
                                y2="329.186"
                                xlinkHref="#nav-new-gradient"
                            />
                            <linearGradient
                                id="nav-new-gradient-4"
                                x1="224.499"
                                y1="125.791"
                                x2="366.191"
                                y2="267.483"
                                xlinkHref="#nav-new-gradient"
                            />
                            <linearGradient
                                id="nav-new-gradient-5"
                                x1="33.328"
                                y1="64.526"
                                x2="196.432"
                                y2="227.63"
                                xlinkHref="#nav-new-gradient"
                            />
                        </defs>
                        <path
                            fill={isLightSection ? "black" : "white"}
                            d="M521.8,160.208a542.705,542.705,0,0,1-20.65-89.515c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.705,542.705,0,0,1-20.65,89.515C452.728,239.049,409.623,310.85,350.035,373.64l-1.663,1.724L500,375.282l151.628.082-1.663-1.724C590.377,310.85,547.272,239.049,521.8,160.208Z"
                        />
                        <path
                            fill={isLightSection ? "black" : "white"}
                            d="M756.579,271.05l.287-.206.082-.348c7-25.679,13.342-51.912,18.884-77.959C784.679,150.971,791.74,108.5,796.81,66.32l.411-3.366-2.2,2.566a355.654,355.654,0,0,1-116.363,89.187A350.82,350.82,0,0,1,558.13,187.446l-1.375.123.513,1.273a511,511,0,0,0,30.81,64.432,513.836,513.836,0,0,0,48.3,70.713l.41.493.616-.144a316,316,0,0,0,65.7-21.9A315.375,315.375,0,0,0,756.579,271.05Z"
                        />
                        <path
                            fill={isLightSection ? "black" : "white"}
                            d="M1000,0l-3.079,4.085A393.558,393.558,0,0,1,905.62,91.9a393.121,393.121,0,0,1-89.207,46l-.575.2q-12.562,74.971-25.1,149.944a355.488,355.488,0,0,1-69.5,31.344,353.476,353.476,0,0,1-72.108,15.5l-1.95.225,34.3,39.9.308.37,223.035-.056Z"
                        />
                        <path
                            fill={isLightSection ? "black" : "white"}
                            d="M224.168,192.537c5.542,26.047,11.884,52.28,18.884,77.959l.082.348.287.206a315.224,315.224,0,0,0,53.471,31.384,316.016,316.016,0,0,0,65.7,21.9l.616.144.41-.493a513.836,513.836,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.432l.513-1.273-1.375-.123a350.814,350.814,0,0,1-120.531-32.739A355.67,355.67,0,0,1,204.976,65.52l-2.2-2.566.411,3.366C208.26,108.5,215.321,150.971,224.168,192.537Z"
                        />
                        <path
                            fill={isLightSection ? "black" : "white"}
                            d="M352.826,335.112l-1.95-.225a353.476,353.476,0,0,1-72.108-15.5,355.488,355.488,0,0,1-69.5-31.344Q196.7,213.073,184.162,138.1l-.575-.2a393.121,393.121,0,0,1-89.207-46A393.552,393.552,0,0,1,3.08,4.09L0,0,95.184,375.329l223.035.056.308-.37Z"
                        />
                    </svg>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinkKeys.map((link) => (
                        <a
                            key={link.key}
                            href={link.href}
                            className={`${textColorClass} hover:text-gold font-heading text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative group`}
                        >
                            <NavRollingText>
                                {t(link.key)}
                            </NavRollingText>
                        </a>
                    ))}

                    {/* Language Toggle — right after Events */}
                    <RollingLangToggle
                        currentLang={lang}
                        onToggle={toggleLang}
                        className={`${textColorClass} hover:text-gold font-heading text-xs uppercase tracking-[0.2em] transition-colors duration-300`}
                    />

                    {/* Open/Closed Status */}
                    <div
                        className={`ml-2 px-6 py-2.5 border ${desktopStatusClass} font-heading text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
                    >
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`}
                        />
                        {statusLabel}
                    </div>
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

                    {/* Mobile Language Toggle — right after Events */}
                    <RollingLangToggle
                        currentLang={lang}
                        onToggle={toggleLang}
                        className="text-cream/60 hover:text-gold font-heading text-sm uppercase tracking-[0.2em] transition-colors duration-300"
                    />

                    {/* Mobile Status */}
                    <div
                        className={`mt-2 px-8 py-3.5 border ${mobileStatusClass} font-heading text-sm uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
                    >
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`}
                        />
                        {statusLabel}
                    </div>
                </div>
            </div>
        </nav>
    );
}
