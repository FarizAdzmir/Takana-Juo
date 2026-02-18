"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Home/Hero";
import Story from "@/components/Home/Story";
import Menu from "@/components/Home/Menu";
import Experience from "@/components/Home/Experience";
import Reservation from "@/components/Home/Reservation";
import Preloader from "@/components/Preloader";

export default function Home() {
    gsap.registerPlugin(ScrollTrigger);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);
    const [preloaderDone, setPreloaderDone] = useState(false);
    const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

    // Refs for background color control
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lightSectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Force scroll to top on mount/refresh
        // We use a small timeout to ensure it overrides browser's auto-restore
        const handleScrollReset = () => {
            if (typeof window !== "undefined") {
                window.history.scrollRestoration = "manual";
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        };

        handleScrollReset();

        // Backup safeguard
        const timer = setTimeout(handleScrollReset, 50);

        return () => clearTimeout(timer);
    }, []);

    // Background Color Transitions
    useEffect(() => {
        // Only initialize ScrollTrigger AFTER the preloader is done and scroll is unlocked
        if (!preloaderDone || !wrapperRef.current) return;

        const lightZones = lightSectionsRef.current;

        // Force a refresh to ensure positions are correct after scroll unlock
        ScrollTrigger.refresh();

        // Signal to NavBar that layout is ready
        document.body.classList.add("theme-ready");
        window.dispatchEvent(new Event("takana-theme-ready"));

        const triggers: ScrollTrigger[] = [];

        lightZones.forEach((section) => {
            if (!section) return;

            const st = ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    gsap.to(wrapperRef.current, {
                        backgroundColor: "#f5f5f0", // cream
                        duration: 0.3,
                        overwrite: "auto",
                        ease: "power1.out",
                    });
                },
                onLeave: () => {
                    gsap.to(wrapperRef.current, {
                        backgroundColor: "#000000", // black
                        duration: 0.3,
                        overwrite: "auto",
                        ease: "power1.out",
                    });
                },
                onEnterBack: () => {
                    gsap.to(wrapperRef.current, {
                        backgroundColor: "#f5f5f0", // cream
                        duration: 0.3,
                        overwrite: "auto",
                        ease: "power1.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(wrapperRef.current, {
                        backgroundColor: "#000000", // black
                        duration: 0.3,
                        overwrite: "auto",
                        ease: "power1.out",
                    });
                },
            });
            triggers.push(st);
        });

        return () => {
            triggers.forEach((t) => t.kill());
        };
    }, [preloaderDone]);

    // Called by Preloader when ALL images are loaded
    // At this point the Preloader is STILL VISIBLE (covering Hero)
    const handleImagesReady = useCallback((images: HTMLImageElement[]) => {
        preloadedImagesRef.current = images;
        window.scrollTo(0, 0);

        // Set isLoaded -> Hero's useLayoutEffect will fire and draw frame 0
        setIsLoaded(true);

        // Give Hero time to initialize canvas + ScrollTrigger behind the Preloader
        // requestAnimationFrame ensures the canvas has painted at least once
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Now Hero is ready — start fading out the Preloader
                setIsRevealing(true);

                // After fade-out transition completes (800ms), fully unmount Preloader
                setTimeout(() => {
                    setPreloaderDone(true);
                    // Unlock scroll
                    document.documentElement.style.overflow = '';
                    document.body.style.overflow = '';
                }, 900);
            });
        });
    }, []);

    return (
        <>
            {!preloaderDone && (
                <Preloader
                    onImagesReady={handleImagesReady}
                    isRevealing={isRevealing}
                />
            )}

            <div ref={wrapperRef} className="bg-black min-h-screen transition-colors duration-500">
                <Hero isLoaded={isLoaded} preloadedImages={preloadedImagesRef.current} />

                <div id="story" ref={(el) => { lightSectionsRef.current[0] = el }}>
                    <Story />
                </div>

                <Menu />

                <div id="experience" ref={(el) => { lightSectionsRef.current[1] = el }}>
                    <Experience />
                </div>

                <Reservation />
            </div>
        </>
    );
}
