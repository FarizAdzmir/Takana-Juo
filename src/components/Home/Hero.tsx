"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import RollingText from "@/components/UI/RollingText";
import GradientText from "@/components/UI/GradientText";
import ShinyText from "@/components/UI/ShinyText";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    isLoaded?: boolean;
    preloadedImages?: HTMLImageElement[];
}

export default function Hero({ isLoaded = false, preloadedImages = [] }: HeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Canvas setup and scroll animation
    useLayoutEffect(() => {
        if (!isLoaded || preloadedImages.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const images = preloadedImages;
        const frameCount = images.length;

        // Helper: calculate cover dimensions for an image in the container
        const getCoverDimensions = (containerW: number, containerH: number, imgW: number, imgH: number) => {
            const imgAspect = imgW / imgH;
            const containerAspect = containerW / containerH;
            let drawWidth, drawHeight;

            if (containerAspect > imgAspect) {
                drawWidth = containerW;
                drawHeight = containerW / imgAspect;
            } else {
                drawHeight = containerH;
                drawWidth = containerH * imgAspect;
            }

            const offsetX = (containerW - drawWidth) / 2;
            const offsetY = (containerH - drawHeight) / 2;

            return { drawWidth, drawHeight, offsetX, offsetY };
        };

        const renderFrame = (frameIndex: number) => {
            const index = Math.min(Math.max(frameIndex, 0), frameCount - 1);
            const img = images[index];

            if (img && img.complete) {
                const container = containerRef.current;
                // Double check container existence
                if (!container) return;

                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                // Avoid rendering on 0x0 container
                if (containerWidth === 0 || containerHeight === 0) return;

                const imgWidth = img.naturalWidth;
                const imgHeight = img.naturalHeight;

                canvas.width = containerWidth;
                canvas.height = containerHeight;

                const { drawWidth, drawHeight, offsetX, offsetY } = getCoverDimensions(
                    containerWidth, containerHeight, imgWidth, imgHeight
                );

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        // Draw initially
        renderFrame(0);

        // Helper to update on resize
        const handleResize = () => {
            // Re-render current frame based on scroll progress if scrollTrigger exists, otherwise frame 0
            // But simpler to just re-render frame 0 if we haven't scrolled, or track current frame.
            // For robustness, let's just let ScrollTrigger's onUpdate handle it during scroll,
            // and here we just ensure canvas size is correct.
            if (scrollTrigger && scrollTrigger.progress) {
                const frameIndex = Math.floor(scrollTrigger.progress * (frameCount - 1));
                renderFrame(frameIndex);
            } else {
                renderFrame(0);
            }
        };

        window.addEventListener("resize", handleResize);

        // Create ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true, // Handle resize automatically for pinning
            onUpdate: (self) => {
                const frameIndex = Math.floor(self.progress * (frameCount - 1));
                renderFrame(frameIndex);
            },
        });

        // Force a refresh and render to ensure everything is synced
        requestAnimationFrame(() => {
            renderFrame(0);
            ScrollTrigger.refresh();
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            scrollTrigger.kill();
        };
    }, [isLoaded, preloadedImages]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Canvas Background */}
            <div className="absolute inset-0 z-0">
                <canvas
                    ref={canvasRef}
                    className="block"
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 bg-charcoal/30" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Decorative Element */}
                <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
                    <div className="w-12 h-[1px] bg-[#C7C7C7]" />
                    <span className="text-white text-xs uppercase tracking-[0.4em] font-body">
                        {t("hero.subtitle")}
                    </span>
                    <div className="w-12 h-[1px] bg-[#C7C7C7]" />
                </div>

                {/* Main Title */}
                <h1 className="font-trajan-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6 animate-slide-up flex justify-center">
                    <GradientText
                        colors={["#FFD38E", "#EABF47", "#D4AF37"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="!overflow-visible w-full text-center whitespace-nowrap"
                    >
                        <span className="block text-center pb-2">
                            Takana
                            <br />
                            <span className="font-normal">Juo</span>
                        </span>
                    </GradientText>
                </h1>

                {/* Tagline */}
                <div className="flex flex-col items-center justify-center gap-6 mt-10 mb-16 animate-fade-in drop-shadow-md" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center gap-3 opacity-70">
                        <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                        <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold" />
                    </div>

                    <h2 className="font-trajan-regular text-cream/95 text-2xl md:text-3xl tracking-widest text-center">
                        {t("hero.tagline1")}
                    </h2>

                    <p className="font-body text-cream/80 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-md mx-auto text-center leading-loose whitespace-pre-line">
                        {t("hero.tagline2")}
                    </p>
                </div>

                {/* CTAs */}

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float z-20">
                <RollingText className="text-cream/50 text-[10px] uppercase tracking-[0.3em] hover:text-gold transition-colors duration-300 cursor-pointer">
                    {t("hero.scroll")}
                </RollingText>
                <div className="w-[1px] h-8 bg-gradient-to-b from-cream/50 to-transparent" />
            </div>
        </section>
    );
}
