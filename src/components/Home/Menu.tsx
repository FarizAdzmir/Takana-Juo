"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import MenuCard, { MenuCategoryData } from "@/components/UI/MenuCard";
import MenuCarousel, { MenuItem } from "@/components/UI/MenuCarousel";

const menuItems: MenuItem[] = [
    { id: 1, main: "Nasi Goreng", sub: "Biasa", price: "RM 4.00", image: "/images/Menu/01NGB.png" },
    { id: 2, main: "Nasi Goreng", sub: "Telur", price: "RM 6.00", image: "/images/Menu/02NGT.png" },
    { id: 3, main: "Nasi Goreng", sub: "Daging", price: "RM 7.00", image: "/images/Menu/03NGD.png" },
    { id: 4, main: "Nasi Goreng", sub: "Ayam", price: "RM 9.00", image: "/images/Menu/04NGA.png" },
    { id: 5, main: "Nasi Goreng", sub: "Daging Telur", price: "RM 8.00", image: "/images/Menu/05NGDT.png" },
    { id: 6, main: "Nasi Goreng", sub: "Ayam Telur", price: "RM 10.00", image: "/images/Menu/06NGAT.png" },
    { id: 7, main: "Nasi Goreng", sub: "Ayam Daging", price: "RM 11.00", image: "/images/Menu/07NGAD.png" },
    { id: 8, main: "Nasi Goreng", sub: "Special", price: "RM 12.00", image: "/images/Menu/08NGS.png" },
];

// Duplicate items for the infinite loop effect
// By doubling the track, we can instantly jump the user back to the beginning seamlessly
const extendedItems = [...menuItems, ...menuItems];

/* ─── Main Menu Component ─── */
export default function Menu() {
    const { t } = useLanguage();
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullSetWidth, setFullSetWidth] = useState(0);
    const [viewMode, setViewMode] = useState<"carousel" | "card">("carousel");
    const x = useMotionValue(0);

    /* Dynamic Card width + gap calculation based on clean breakpoints */
    const getScrollAmount = () => {
        if (typeof window === "undefined") return 304;
        const w = window.innerWidth;
        if (w >= 1280) return 360; // 320px + gap-10(40px)
        if (w >= 1024) return 332; // 300px + gap-8(32px)
        if (w >= 768) return 254; // 230px + gap-6(24px)
        return 304; // 280px + gap-6(24px)
    };

    /* Measure pure container aperture so we can instantly math fractional cards */
    useEffect(() => {
        const updateMeasurements = () => {
            const scrollAmount = getScrollAmount();
            setFullSetWidth(scrollAmount * menuItems.length);
        };

        window.addEventListener("resize", updateMeasurements);
        updateMeasurements();

        return () => {
            window.removeEventListener("resize", updateMeasurements);
        };
    }, []);

    const scrollBy = (dir: number) => {
        const scrollAmount = getScrollAmount();
        const currentX = x.get();
        // Move by one card width
        const newX = currentX - (dir * scrollAmount);
        animate(x, newX, { type: "tween", ease: "easeInOut", duration: 0.5 });
    };

    // Infinite Loop Logic & Active Index Tracker
    useEffect(() => {
        const unsub = x.on("change", (latestX) => {
            if (!fullSetWidth) return;

            // Infinite Loop Jump Component
            if (latestX <= -fullSetWidth) {
                x.jump(latestX + fullSetWidth);
            }
            else if (latestX > 0) {
                x.jump(latestX - fullSetWidth);
            }

            // Update Dot Indicator Index (modulo by length so it wraps 0-7)
            const scrollAmount = getScrollAmount();
            const rawIndex = Math.round(Math.abs(x.get()) / scrollAmount);
            const normalizedIndex = rawIndex % menuItems.length;

            setActiveIndex((prev) => (prev !== normalizedIndex ? normalizedIndex : prev));
        });
        return unsub;
    }, [x, fullSetWidth]);

    // Cleanup physics on drag release
    const handleDragEnd = (event: any, info: PanInfo) => {
        const scrollAmount = getScrollAmount();
        const currentX = x.get();
        // Project velocity
        const projectedX = currentX + info.velocity.x * 0.2;

        // Snap to nearest card
        const targetIndex = Math.round(Math.abs(projectedX) / scrollAmount);
        const targetX = -(targetIndex * scrollAmount);

        animate(x, targetX, { type: "spring", stiffness: 400, damping: 40 });
    };

    return (
        <section id="menu" className={`relative w-full py-32 md:py-40 overflow-hidden flex flex-col justify-center items-center min-h-screen transition-colors duration-700 ${viewMode === "carousel" ? "bg-[#EFEFEF]" : "bg-charcoal"}`}>

            {/* Header Area */}
            <div className="text-center mb-16 space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-[1px] bg-gold" />
                    <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold">
                        {t("menu.label")}
                    </span>
                    <div className="w-12 h-[1px] bg-gold" />
                </div>
                <h2 className={`font-trajan-bold text-[1.8rem] sm:text-3xl md:text-4xl lg:text-5xl transition-colors duration-700 ${viewMode === "carousel" ? "text-charcoal" : "text-white"}`}>
                    {t("menu.heading")} <span className="text-gold font-normal">{t("menu.headingAccent")}</span>
                </h2>

                {/* View Mode Toggle */}
                <div className="flex justify-center pt-8 relative">
                    {/* SVG Gradient Definition */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <linearGradient id="gold-gradient-toggle" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFD38E" />
                                <stop offset="50%" stopColor="#EABF47" />
                                <stop offset="100%" stopColor="#D4AF37" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className={`inline-flex items-center w-[120px] md:w-[140px] h-12 backdrop-blur-xl border relative transition-colors duration-700 shadow-[0_8px_30px_rgba(0,0,0,0.1)] ${viewMode === "carousel" ? "bg-white/50 border-black/5" : "bg-white/5 border-white/10"}`}>
                        {/* Sliding Background */}
                        <div
                            className={`absolute top-0 bottom-0 left-0 w-1/2 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${viewMode === "carousel" ? "translate-x-0 bg-white/40 border-r border-black/5 shadow-sm" : "translate-x-full bg-white/10 border-l border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"}`}
                        />

                        <button
                            onClick={() => setViewMode("carousel")}
                            className={`relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-300 ${viewMode === "carousel" ? "text-charcoal" : "text-white/40 hover:text-white/60"}`}
                            aria-label="View as Carousel"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
                        </button>
                        <button
                            onClick={() => setViewMode("card")}
                            className={`relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-300 ${viewMode === "card" ? "text-transparent" : "text-charcoal/40 hover:text-charcoal/60"}`}
                            aria-label="View as Cards"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={viewMode === "card" ? "url(#gold-gradient-toggle)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M7 8h10" />
                                <path d="M7 12h10" />
                                <path d="M7 16h10" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === "carousel" ? (
                <>
                    {/* Horizontal Slider Area */}
                    <div className="relative w-full xl:max-w-[1700px] mx-auto flex items-center justify-between xl:px-8 group/slider">

                        {/* Left Arrow */}
                        <div className="hidden xl:flex flex-shrink-0 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => scrollBy(-1)}
                                className="w-14 h-14 rounded-full bg-black hover:bg-gradient-to-r hover:from-[#FFD38E] hover:via-[#EABF47] hover:to-[#D4AF37] text-white flex items-center justify-center shadow-lg transition-all duration-300"
                                aria-label="Scroll left"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                        </div>

                        {/* Full-bleed track container with exact mathematical centering padding */}
                        <div className="w-full xl:max-w-[1480px] mx-auto py-12 pt-0 md:pt-12">
                            <div ref={carouselRef} className="overflow-hidden w-full px-[calc(50vw-140px)] md:px-[calc(50vw-115px)] lg:px-[calc(50vw-150px)] xl:px-10">
                                <motion.div
                                    ref={trackRef}
                                    drag="x"
                                    dragElastic={0}
                                    onDragEnd={handleDragEnd}
                                    style={{ x }}
                                    className="flex gap-6 md:gap-6 lg:gap-8 xl:gap-10 w-max cursor-grab active:cursor-grabbing"
                                >
                                    {extendedItems.map((item, idx) => (
                                        <MenuCarousel key={`infinite-${item.id}-${idx}`} item={item} />
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <div className="hidden xl:flex flex-shrink-0 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => scrollBy(1)}
                                className="w-14 h-14 rounded-full bg-black hover:bg-gradient-to-r hover:from-[#FFD38E] hover:via-[#EABF47] hover:to-[#D4AF37] text-white flex items-center justify-center shadow-lg transition-all duration-300"
                                aria-label="Scroll right"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Elegant Black/Gold Dot Indicators */}
                    <div className="flex justify-center items-center gap-3 mt-4 z-20">
                        {menuItems.map((item, idx) => (
                            <button
                                key={`dot-${item.id}`}
                                aria-label={`Go to menu item ${idx + 1}`}
                                className={`transition-all duration-300 rounded-full border border-black/20 ${idx === activeIndex
                                    ? "w-2.5 h-2.5 bg-gradient-to-r from-[#FFD38E] via-[#EABF47] to-[#D4AF37] border-none shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                    : "w-2.5 h-2.5 bg-black/10 hover:bg-black/30"
                                    }`}
                                onClick={() => {
                                    const scrollAmount = getScrollAmount();
                                    const currentX = x.get();
                                    const rawIndex = Math.round(Math.abs(currentX) / scrollAmount);
                                    const currentCycleOffset = Math.floor(rawIndex / menuItems.length) * menuItems.length;
                                    const targetIdx = currentCycleOffset + idx;
                                    const newX = -(targetIdx * scrollAmount);
                                    animate(x, newX, { type: "tween", ease: "easeInOut", duration: 0.5 });
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[40vh] mt-4 ">
                    <div className="w-full max-w-[1700px] mx-auto">
                        <MenuCard />
                    </div>
                </div>
            )}

        </section>
    );
}
