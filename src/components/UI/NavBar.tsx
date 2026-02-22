"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavCapsule from "./NavBar/NavCapsule";
import RollingText from "./NavBar/RollingText";

function RollingLangToggle({ currentLang }: { currentLang: string }) {
    const displayLang = currentLang.toUpperCase();
    const otherLang = currentLang === "my" ? "EN" : "MY";

    return (
        <div className="relative overflow-hidden flex items-center justify-center cursor-pointer group" style={{ height: "1.5em" }}>
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
                        className="opacity-80 transition-opacity"
                    >
                        {displayLang}
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-0 left-0 w-full text-center text-gold"
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    {otherLang}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function NavBar() {
    gsap.registerPlugin(ScrollTrigger);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLightSection, setIsLightSection] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();

    const [isLogoHovered, setIsLogoHovered] = useState(false);

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
            const lightSections = ["#story"];
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

            return () => {
                triggers.forEach(t => t.kill());
            };
        };

        let cleanupTriggers: (() => void) | undefined;

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

    const toggleLang = () => setLang(lang === "my" ? "en" : "my");

    const statusLabel = isOpen ? t("nav.open") : t("nav.closed");

    // Theme adaptations
    const textColor = isLightSection ? "text-charcoal" : "text-cream";
    const backdropClass = isLightSection ? "bg-cream/80" : "bg-black/80";
    const borderColor = isLightSection ? "border-charcoal/10" : "border-white/10";

    // Status color overrides
    const statusTextColor = isOpen ? "text-green-500" : isLightSection ? "text-charcoal/80" : "text-cream/80";

    return (
        <AnimatePresence>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-[100] pt-5 px-5 md:px-10 flex justify-center items-center pointer-events-none"
            >
                {/* Center Cluster */}
                <div className="flex justify-center items-center gap-0 pointer-events-auto max-w-full overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0">

                    {/* [LOGO] Capsule */}
                    <motion.div layout transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.5 }} className="flex z-10">
                        <NavCapsule
                            className={`min-w-[48px] md:min-w-[64px] h-10 md:h-12 cursor-pointer transition-colors duration-300 ${isLightSection ? "hover:bg-charcoal/5" : "hover:bg-white/10"}`}
                            glowSize={70}
                            textColor={textColor}
                            backdropClass={backdropClass}
                            borderColor={borderColor}
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                            onClick={() => window.location.href = "/"}
                        >
                            <motion.div
                                animate={{ scale: isLogoHovered ? 1.05 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center"
                            >
                                <svg
                                    id="Takana_Juo_Nav"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 1000 859.54"
                                    className="w-full h-auto drop-shadow-sm"
                                >
                                    <defs>
                                        <linearGradient
                                            id="nav-linear-gradient"
                                            x1="806.82"
                                            y1="-67.77"
                                            x2="806.82"
                                            y2="505.3"
                                            gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#d4af37" />
                                            <stop offset="0.55" stopColor="#eabf47" />
                                            <stop offset="1" stopColor="#ffd38e" />
                                        </linearGradient>
                                        <linearGradient
                                            id="nav-linear-gradient-2"
                                            x1="500"
                                            y1="59.79"
                                            x2="500"
                                            y2="791.77"
                                            gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#d4af37" />
                                            <stop offset="0.29" stopColor="#eabf47" />
                                            <stop offset="1" stopColor="#ffd38e" />
                                        </linearGradient>
                                        <linearGradient
                                            id="nav-linear-gradient-3"
                                            x1="193.18"
                                            y1="-67.77"
                                            x2="193.18"
                                            y2="505.3"
                                            xlinkHref="#nav-linear-gradient"
                                        />
                                    </defs>
                                    <g id="Logo_Nav">
                                        <path
                                            d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z"
                                            style={{ fill: "url(#nav-linear-gradient)" }}
                                        />
                                        <path
                                            d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z"
                                            style={{ fill: "url(#nav-linear-gradient-2)" }}
                                        />
                                        <path
                                            d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z"
                                            style={{ fill: "url(#nav-linear-gradient-3)" }}
                                        />
                                    </g>
                                </svg>
                            </motion.div>
                        </NavCapsule>
                    </motion.div>

                    {/* [STATUS] Capsule */}
                    <motion.div layout transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.5 }} className="flex z-10">
                        <NavCapsule
                            className="px-4 md:px-6 h-10 md:h-12 whitespace-nowrap -ml-[1px]"
                            textColor={statusTextColor}
                            backdropClass={backdropClass}
                            borderColor={borderColor}
                            contentClassName="gap-2"
                        >
                            <span
                                className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" : "bg-theme-red"}`}
                            />
                            <RollingText>{statusLabel}</RollingText>
                        </NavCapsule>
                    </motion.div>

                    {/* [MENU] & [RESERVATION] Capsules (Animate out when scrolled) */}
                    <AnimatePresence>
                        {!isScrolled && (
                            <motion.div
                                key="menu-capsule"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.5 }}
                                className="overflow-hidden flex"
                            >
                                <NavCapsule
                                    className={`px-4 md:px-6 h-10 md:h-12 cursor-pointer transition-colors duration-300 group whitespace-nowrap -ml-[1px] ${isLightSection ? "hover:bg-charcoal/5" : "hover:bg-white/10"}`}
                                    textColor={textColor}
                                    backdropClass={backdropClass}
                                    borderColor={borderColor}
                                    onClick={() => window.location.href = "#menu"}
                                >
                                    <RollingText className="opacity-80 group-hover:opacity-100 group-hover:text-gold transition-all">
                                        {t("nav.menu")}
                                    </RollingText>
                                </NavCapsule>
                            </motion.div>
                        )}
                        {!isScrolled && (
                            <motion.div
                                key="reservation-capsule"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.5 }}
                                className="overflow-hidden flex"
                            >
                                <NavCapsule
                                    className={`px-4 md:px-6 h-10 md:h-12 cursor-pointer transition-colors duration-300 group whitespace-nowrap -ml-[1px] ${isLightSection ? "hover:bg-charcoal/5" : "hover:bg-white/10"}`}
                                    textColor={textColor}
                                    backdropClass={backdropClass}
                                    borderColor={borderColor}
                                    onClick={() => window.location.href = "#reservation"}
                                >
                                    <RollingText className="opacity-80 group-hover:opacity-100 group-hover:text-gold transition-all">
                                        {t("nav.reservation")}
                                    </RollingText>
                                </NavCapsule>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* [LANGUAGE] Capsule */}
                    <motion.div layout transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.5 }} className="flex">
                        <NavCapsule
                            className={`min-w-[48px] md:min-w-[64px] h-10 md:h-12 cursor-pointer transition-colors duration-300 group -ml-[1px] ${isLightSection ? "hover:bg-charcoal/5" : "hover:bg-white/10"}`}
                            textColor={textColor}
                            backdropClass={backdropClass}
                            borderColor={borderColor}
                            onClick={toggleLang}
                        >
                            <RollingLangToggle currentLang={lang} />
                        </NavCapsule>
                    </motion.div>

                </div>
            </motion.nav>
        </AnimatePresence>
    );
}
