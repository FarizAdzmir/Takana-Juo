"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

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
    // useLayoutEffect ensures canvas renders synchronously before browser paint
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
                if (!container) return;

                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;
                const imgWidth = img.naturalWidth;
                const imgHeight = img.naturalHeight;

                // Set canvas buffer size to container size for crisp rendering
                canvas.width = containerWidth;
                canvas.height = containerHeight;

                const { drawWidth, drawHeight, offsetX, offsetY } = getCoverDimensions(
                    containerWidth, containerHeight, imgWidth, imgHeight
                );

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        // CRITICAL: Draw frame 0 immediately (synchronously before paint)
        renderFrame(0);

        const handleResize = () => renderFrame(0);
        window.addEventListener("resize", handleResize);

        // Create ScrollTrigger AFTER canvas is initialized
        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
                const frameIndex = Math.floor(self.progress * (frameCount - 1));
                renderFrame(frameIndex);
            },
        });

        // Refresh once after layout settles
        requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
            renderFrame(0);
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
            className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal"
        >
            {/* Canvas Background */}
            <div className="absolute inset-0 z-0 bg-charcoal">
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
                    <div className="w-12 h-[1px] bg-gold" />
                    <span className="text-gold text-xs uppercase tracking-[0.4em] font-body">
                        {t("hero.subtitle")}
                    </span>
                    <div className="w-12 h-[1px] bg-gold" />
                </div>

                {/* Main Title */}
                <h1 className="font-heading text-cream text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6 animate-slide-up">
                    Takana
                    <br />
                    <span className="text-gold italic font-normal">Juo</span>
                </h1>

                {/* Tagline */}
                <p
                    className="text-cream/90 text-lg md:text-xl font-body max-w-lg mx-auto mb-12 leading-relaxed animate-fade-in drop-shadow-md"
                    style={{ animationDelay: "0.3s" }}
                >
                    {t("hero.tagline")}
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
                    style={{ animationDelay: "0.6s" }}
                >
                    <a
                        href="#menu"
                        className="px-8 py-3.5 bg-gold text-charcoal text-sm uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,169,110,0.3)]"
                    >
                        {t("hero.viewMenu")}
                    </a>
                    <a
                        href="#events"
                        className="px-8 py-3.5 border border-cream/30 text-cream text-sm uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm"
                    >
                        {t("hero.reservation")}
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float z-20">
                <span className="text-cream/50 text-[10px] uppercase tracking-[0.3em]">
                    {t("hero.scroll")}
                </span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-cream/50 to-transparent" />
            </div>
        </section>
    );
}
