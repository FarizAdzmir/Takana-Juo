"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealText } from "../UI/Reveal";
import MenuCard from "@/components/UI/MenuCard";
import MenuCarousel, { MenuItem } from "@/components/UI/MenuCarousel";
import useEmblaCarousel from "embla-carousel-react";

// Removed static menuItems; now fetching from Supabase

/* ─── Main Menu Component ─── */
export default function Menu() {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState<"carousel" | "card">("carousel");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Database Items
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('/api/menu');
                if (!response.ok) throw new Error('Failed to fetch menu');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error loading menu:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenu();
    }, []);

    // Explicitly reset to carousel on any page reload or boundary mount
    useEffect(() => {
        setViewMode("carousel");
    }, []);

    // Embla Carousel Setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        duration: 35, // Buttery smooth snap speed
    });

    // Re-initialize Embla once async data arrives
    useEffect(() => {
        if (emblaApi && !isLoading && menuItems.length > 0) {
            emblaApi.reInit();
        }
    }, [emblaApi, isLoading, menuItems]);

    // Disable dragging on Desktop
    useEffect(() => {
        if (!emblaApi) return;
        const toggleDrag = () => {
            if (window.innerWidth >= 1280) { // xl breakpoint (Desktop)
                emblaApi.reInit({ watchDrag: false });
            } else {
                emblaApi.reInit({ watchDrag: true });
            }
        };
        toggleDrag();
        window.addEventListener('resize', toggleDrag);
        return () => window.removeEventListener('resize', toggleDrag);
    }, [emblaApi]);

    // Disable wheel scroll hijacking on mobile so page scrolls freely
    const emblaViewportRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = emblaViewportRef.current;
        if (!el) return;
        const blockWheelOnMobile = (e: WheelEvent) => {
            if (window.innerWidth < 1280) e.stopPropagation();
        };
        el.addEventListener('wheel', blockWheelOnMobile, { passive: true });
        return () => el.removeEventListener('wheel', blockWheelOnMobile);
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollToIndex = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setActiveIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setActiveIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Dispatch custom event when viewMode changes so wrapper can react
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("menu-theme-change", {
            detail: { theme: viewMode === "carousel" ? "light" : "dark" }
        }));
    }, [viewMode]);

    const headerContent = (
        <div className="relative z-20 text-center mb-6 md:mb-8 space-y-4 pointer-events-auto">
            <RevealText className="flex items-center justify-center gap-3">
                <div className={`w-12 h-[1px] ${viewMode === "carousel" ? "bg-gold-light" : "bg-gold-dark"}`} />
                <span className={`text-xs uppercase tracking-[0.4em] font-bold ${viewMode === "carousel" ? "text-gold-light" : "text-gold-dark"}`}>
                    {t("menu.label")}
                </span>
                <div className={`w-12 h-[1px] ${viewMode === "carousel" ? "bg-gold-light" : "bg-gold-dark"}`} />
            </RevealText>
            <RevealText delay={0.1}>
                <h2 className={`font-trajan-bold text-[1.8rem] sm:text-3xl md:text-4xl lg:text-5xl transition-colors duration-0 ${viewMode === "carousel" ? "text-charcoal" : "text-white"}`}>
                    {t("menu.heading")} <span className={`font-normal ${viewMode === "carousel" ? "text-gold-light" : "text-gold-dark"}`}>{t("menu.headingAccent")}</span>
                </h2>
            </RevealText>

            {/* View Mode Toggle */}
            <div className="flex justify-center pt-6 relative">
                {/* SVG Gradient Definition */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="gold-gradient-toggle" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#EABF47" />
                            <stop offset="100%" stopColor="#EABF47" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className={`inline-flex items-center w-[120px] md:w-[140px] h-12 backdrop-blur-xl border relative transition-colors duration-0 shadow-[0_8px_30px_rgba(0,0,0,0.1)] ${viewMode === "carousel" ? "bg-white/50 border-black/5" : "bg-white/5 border-white/10"}`}>
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
    );

    return (
        <section
            id="menu"
            data-theme={viewMode === "carousel" ? "light" : "dark"}
            className={`relative w-full transition-colors duration-0 bg-[var(--background-color)] min-h-screen py-32 overflow-hidden flex flex-col justify-center items-center`}
        >
            {viewMode === "carousel" ? (
                <>
                    {headerContent}

                    {/* Horizontal Slider Area (Framer Drag Physics) */}
                    <div className="relative w-full xl:max-w-[1700px] mx-auto flex items-center group/slider">

                        {/* Left Arrow */}
                        <div className="hidden xl:flex absolute left-4 flex-shrink-0 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={scrollPrev}
                                className="w-14 h-14 rounded-full bg-black hover:bg-gradient-to-r hover:from-[#D1A61C] hover:to-[#B18700] text-white flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-30"
                                aria-label="Scroll left"
                                disabled={!emblaApi?.canScrollPrev()}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                        </div>

                        {/* Viewport wrapper without ugly scrollbars */}
                        <div
                            className="w-full xl:max-w-[1500px] mx-auto relative cursor-grab active:cursor-grabbing overflow-hidden pt-[160px] -mt-[160px] pb-12 z-10"
                            ref={(node) => {
                                emblaRef(node);
                                emblaViewportRef.current = node;
                            }}
                            data-lenis-prevent-touch
                        >
                            <div className="flex backface-hidden touch-pan-y touch-pinch-zoom">
                                {isLoading ? (
                                    // Skeletons while fetching database
                                    [...Array(4)].map((_, i) => (
                                        <div key={`skel-${i}`} className="flex-[0_0_100%] md:flex-[0_0_33.333333%] xl:flex-[0_0_25%] min-w-0 flex justify-center py-4 px-4 sm:px-0">
                                            <div className="w-full max-w-[340px] aspect-[4/5] bg-black/5 rounded-[40px] animate-pulse" />
                                        </div>
                                    ))
                                ) : (
                                    menuItems.map((item, index) => (
                                        <div
                                            key={`slide-${index}-${item.id}`}
                                            className="flex-[0_0_100%] md:flex-[0_0_33.333333%] xl:flex-[0_0_25%] min-w-0 flex justify-center py-4 px-4 sm:px-0"
                                        >
                                            <div className="w-full max-w-[340px]">
                                                <MenuCarousel item={item} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <div className="hidden xl:flex absolute right-4 flex-shrink-0 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={scrollNext}
                                className="w-14 h-14 rounded-full bg-black hover:bg-gradient-to-r hover:from-[#D1A61C] hover:to-[#B18700] text-white flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-30"
                                aria-label="Scroll right"
                                disabled={!emblaApi?.canScrollNext()}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Elegant Black/Gold Dot Indicators */}
                    <div className="flex justify-center items-center gap-3 mt-0 z-20">
                        {menuItems.map((item, idx) => (
                            <button
                                key={`dot-${item.id}`}
                                aria-label={`Go to menu item ${idx + 1}`}
                                className={`transition-all duration-300 rounded-full border border-black/20 ${idx === activeIndex
                                    ? "w-2.5 h-2.5 bg-gradient-to-r from-[#D1A61C] to-[#B18700] border-none shadow-[0_0_10px_rgba(209,166,28,0.4)]"
                                    : "w-2.5 h-2.5 bg-black/10 hover:bg-black/30"
                                    }`}
                                onClick={() => scrollToIndex(idx)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                /* Card List View (Standard vertical scroll) */
                <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[40vh] mt-4 px-6">
                    {headerContent}
                    <div className="w-full max-w-[1700px] mx-auto">
                        <MenuCard items={menuItems} isLoading={isLoading} />
                    </div>
                </div>
            )}
        </section>
    );
}
