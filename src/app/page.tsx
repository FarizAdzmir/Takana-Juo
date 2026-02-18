"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Hero from "@/components/Home/Hero";
import Story from "@/components/Home/Story";
// import Menu from "@/components/Home/Menu";
import MenuScrollStack from "@/components/Home/MenuScrollStack";
import Experience from "@/components/Home/Experience";
import Event from "@/components/Home/Event";
import Preloader from "@/components/Preloader";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);
    const [preloaderDone, setPreloaderDone] = useState(false);
    const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        // Prevent browser from restoring scroll position automatically
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
        }
    }, []);

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
            <Hero isLoaded={isLoaded} preloadedImages={preloadedImagesRef.current} />
            <Story />
            {/* <Menu /> */}
            <MenuScrollStack />
            <Experience />
            <Event />
        </>
    );
}
