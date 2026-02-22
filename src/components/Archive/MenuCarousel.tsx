"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MenuItem {
    id: number;
    main: string;
    sub: string;
    price: string;
    image: string;
}

const menuItems: MenuItem[] = [
    { id: 1, main: "Nasi Goreng", sub: "Original", price: "RM 4", image: "/images/Menu/01NGB.png" },
    { id: 2, main: "Nasi Goreng", sub: "Telur", price: "RM 6", image: "/images/Menu/02NGT.png" },
    { id: 3, main: "Nasi Goreng", sub: "Daging", price: "RM 7", image: "/images/Menu/03NGD.png" },
    { id: 4, main: "Nasi Goreng", sub: "Ayam", price: "RM 9", image: "/images/Menu/04NGA.png" },
    { id: 5, main: "Nasi Goreng", sub: "Daging Telur", price: "RM 8", image: "/images/Menu/05NGDT.png" },
    { id: 6, main: "Nasi Goreng", sub: "Ayam Telur", price: "RM 10", image: "/images/Menu/06NGAT.png" },
    { id: 7, main: "Nasi Goreng", sub: "Ayam Daging", price: "RM 11", image: "/images/Menu/07NGAD.png" },
    { id: 8, main: "Nasi Goreng", sub: "Special", price: "RM 12", image: "/images/Menu/08NGS.png" },
];

/* ─── Infinite loop helpers ─── */
const REPEAT = 21;
const infiniteItems = Array.from({ length: REPEAT }, () => menuItems).flat();
const MID = Math.floor(infiniteItems.length / 2);

/* ─── Sizing helpers ─── */
function getItemMetrics() {
    if (typeof window === "undefined") return { w: 90, gap: 200 };
    const vw = window.innerWidth;
    if (vw >= 1280) return { w: 100, gap: 500 };
    if (vw >= 768) return { w: 80, gap: 350 };
    return { w: 70, gap: 200 };
}

/* ─── List View ─── */
function MenuListView() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto px-8 lg:px-0 py-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28 gap-y-14">
                {menuItems.map((item) => (
                    <div key={item.id} className="group cursor-default">
                        <div className="flex justify-between items-end pb-4 border-b border-charcoal/10 group-hover:border-gold transition-colors duration-500">
                            <div>
                                <p className="font-trajan-regular text-xs text-charcoal/40 uppercase tracking-[0.25em] mb-1">{item.main}</p>
                                <h3 className="font-trajan-regular text-2xl lg:text-3xl text-charcoal group-hover:text-gold-dark transition-colors duration-500 uppercase tracking-wide">
                                    {item.sub}
                                </h3>
                            </div>
                            <span className="font-body text-lg text-gold-dark tracking-wider ml-4 whitespace-nowrap">
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Main Component ─── */
export default function Menu() {
    const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");
    const [activeIndex, setActiveIndex] = useState(MID);
    const [offset, setOffset] = useState(0);
    const [direction, setDirection] = useState(0);

    const active = infiniteItems[activeIndex];

    /* Recalculate offset whenever activeIndex or window size changes */
    const recalc = useCallback(() => {
        const { w, gap } = getItemMetrics();
        setOffset(activeIndex * (w + gap));
    }, [activeIndex]);

    useEffect(() => {
        recalc();
        window.addEventListener("resize", recalc);
        return () => window.removeEventListener("resize", recalc);
    }, [recalc]);

    /* Arrow Handlers
       Right arrow → track slides right → show previous item (index - 1)
       Left  arrow → track slides left  → show next item     (index + 1)  */
    const goRight = () => { setDirection(-1); setActiveIndex((i) => i - 1); };
    const goLeft = () => { setDirection(1); setActiveIndex((i) => i + 1); };

    return (
        <section id="menu" className="relative w-screen h-[100dvh] bg-cream overflow-hidden select-none">

            {/* ═══ TOP BAR ═══ */}
            <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 xl:px-20 pt-10 md:pt-14">
                {/* Title */}
                <h2 className="font-trajan-regular text-2xl md:text-4xl xl:text-5xl text-charcoal uppercase tracking-[0.15em] leading-none">
                    The <span className="italic text-gold-dark normal-case">Menu</span>
                </h2>

                {/* View Toggle – simple squared icon buttons */}
                <div className="flex">
                    <button
                        onClick={() => setViewMode("carousel")}
                        className={`w-11 h-11 md:w-14 md:h-14 flex items-center justify-center border border-charcoal/30 transition-colors duration-200 ${viewMode === "carousel" ? "bg-charcoal text-cream" : "text-charcoal hover:bg-charcoal/5"}`}
                        aria-label="Carousel view"
                    >
                        {/* Grid / Image icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`w-11 h-11 md:w-14 md:h-14 flex items-center justify-center border border-charcoal/30 border-l-0 transition-colors duration-200 ${viewMode === "list" ? "bg-charcoal text-cream" : "text-charcoal hover:bg-charcoal/5"}`}
                        aria-label="List view"
                    >
                        {/* List icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"><line x1="9" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="9" y1="18" x2="21" y2="18" /><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" /></svg>
                    </button>
                </div>
            </header>

            {/* ═══ LIST VIEW ═══ */}
            <AnimatePresence>
                {viewMode === "list" && (
                    <div className="absolute inset-0 z-40 bg-cream pt-28 md:pt-36 pb-12 overflow-y-auto">
                        <MenuListView />
                    </div>
                )}
            </AnimatePresence>

            {/* ═══ CAROUSEL VIEW ═══ */}
            {viewMode === "carousel" && (
                <>
                    {/* ── Left: Hero plate ── */}
                    <div className="absolute left-[3%] md:left-[8%] xl:left-[10%] top-1/2 -translate-y-[55%] z-20 w-[75vw] h-[75vw] md:w-[42vw] md:h-[42vw] xl:w-[36vw] xl:h-[36vw] max-w-[680px] max-h-[680px] pointer-events-none">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.div
                                key={active.id + "-" + activeIndex}
                                custom={direction}
                                initial={{ opacity: 0, rotate: direction * -90, scale: 0.7 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: direction * 90, scale: 0.7 }}
                                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
                            >
                                <Image src={active.image} alt={`${active.main} ${active.sub}`} fill className="object-contain" sizes="(max-width:768px) 80vw, 45vw" priority />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Right: Text details ── */}
                    <div className="absolute right-[5%] md:right-[8%] xl:right-[10%] top-[38%] md:top-1/2 -translate-y-1/2 text-right z-30 w-[85%] md:w-[42%] xl:w-[36%] pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`t-${activeIndex}`}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -24 }}
                                transition={{ duration: 0.45 }}
                                className="flex flex-col items-end"
                            >
                                {/* Subtle category label */}
                                <p className="font-trajan-regular text-[11px] md:text-xs text-charcoal/35 uppercase tracking-[0.35em] mb-3">
                                    {active.main}
                                </p>
                                {/* Hero variation name */}
                                <h3 className="font-trajan-regular text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] text-charcoal uppercase leading-[0.85] tracking-wide mb-6 md:mb-10">
                                    {active.sub}
                                </h3>
                                {/* Thin separator */}
                                <span className="block w-16 h-[1px] bg-gold mb-6 md:mb-8" />
                                {/* Price */}
                                <span className="font-body text-xl md:text-2xl xl:text-3xl text-gold-dark font-light tracking-[0.15em]">
                                    {active.price}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Bottom: Arrow controls (positioned above slider on the right) ── */}
                    <div className="absolute bottom-[170px] md:bottom-[190px] xl:bottom-[210px] right-[5%] md:right-[8%] xl:right-[10%] z-40 flex gap-3">
                        <button onClick={goLeft} className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-charcoal/25 text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-colors duration-200" aria-label="Previous">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" strokeLinecap="square" strokeLinejoin="miter" /></svg>
                        </button>
                        <button onClick={goRight} className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-charcoal/25 text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-colors duration-200" aria-label="Next">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" strokeLinecap="square" strokeLinejoin="miter" /></svg>
                        </button>
                    </div>

                    {/* ── Bottom: Infinite horizontal plate track ── */}
                    <div className="absolute bottom-6 md:bottom-10 xl:bottom-14 left-0 w-screen h-[130px] md:h-[150px] xl:h-[170px] z-10 overflow-visible pointer-events-none">
                        <div
                            className="flex items-center h-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{
                                transform: `translateX(calc(35vw - ${offset}px))`,
                            }}
                        >
                            {infiniteItems.map((item, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <div
                                        key={`s-${idx}`}
                                        className={`relative flex-shrink-0 pointer-events-auto transition-all duration-700 ease-out cursor-pointer ${isActive ? "opacity-0 scale-50" : "opacity-100 hover:opacity-80 hover:scale-105"}`}
                                        onClick={() => {
                                            setDirection(idx > activeIndex ? 1 : -1);
                                            setActiveIndex(idx);
                                        }}
                                        style={{
                                            width: `${getItemMetrics().w}px`,
                                            height: `${getItemMetrics().w}px`,
                                            marginRight: `${getItemMetrics().gap}px`,
                                        }}
                                    >
                                        <Image src={item.image} alt="" fill className="object-contain drop-shadow-lg" sizes="150px" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
