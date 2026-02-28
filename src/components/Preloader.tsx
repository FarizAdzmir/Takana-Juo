"use client";

import { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
    onImagesReady: (images: HTMLImageElement[]) => void;
    isRevealing: boolean;
}

export default function Preloader({ onImagesReady, isRevealing }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [displayProgress, setDisplayProgress] = useState(0);
    const hasStarted = useRef(false);
    const TRANSITION_MS = 900; // must match the CSS transition duration below

    // Lock scroll on mount
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        const frameCount = 70;
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < frameCount; i++) {
            images[i] = new Image();
        }

        const loadPromises = images.map((img, i) => {
            return new Promise<void>((resolve) => {
                const frameNum = String(i + 1).padStart(3, '0');
                const onComplete = () => {
                    loadedCount++;
                    const currentProgress = Math.round((loadedCount / frameCount) * 100);
                    setProgress(currentProgress);
                    resolve();
                };

                img.onload = onComplete;
                img.onerror = onComplete;
                img.src = `/images/Frames-Animation/frame_${frameNum}.jpeg`;
            });
        });

        Promise.all(loadPromises).then(() => {
            // Wait for bar to visually finish before revealing the site
            setTimeout(() => {
                onImagesReady(images);
            }, TRANSITION_MS);
        });

    }, [onImagesReady]);

    // Defer display update by one rAF so the browser always paints 0% first,
    // making the CSS transition visible even when images load instantly.
    useEffect(() => {
        const id = requestAnimationFrame(() => setDisplayProgress(progress));
        return () => cancelAnimationFrame(id);
    }, [progress]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out ${isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${!isRevealing && progress === 0 ? 'visible' : ''}`}
        >
            {/* Logo */}
            <div className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1000 859.54"
                    className="w-16 h-auto drop-shadow-sm"
                >
                    <defs>
                        <linearGradient id="preloader-linear-gradient" x1="806.82" y1="-67.77" x2="806.82" y2="505.3" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#d4af37" />
                            <stop offset="0.55" stopColor="#eabf47" />
                            <stop offset="1" stopColor="#ffd38e" />
                        </linearGradient>
                        <linearGradient id="preloader-linear-gradient-2" x1="500" y1="59.79" x2="500" y2="791.77" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#d4af37" />
                            <stop offset="0.29" stopColor="#eabf47" />
                            <stop offset="1" stopColor="#ffd38e" />
                        </linearGradient>
                        <linearGradient id="preloader-linear-gradient-3" x1="193.18" y1="-67.77" x2="193.18" y2="505.3" xlinkHref="#preloader-linear-gradient" />
                    </defs>
                    <g id="Logo_Preloader">
                        <path d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z" style={{ fill: 'url(#preloader-linear-gradient)' }} />
                        <path d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z" style={{ fill: 'url(#preloader-linear-gradient-2)' }} />
                        <path d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z" style={{ fill: 'url(#preloader-linear-gradient-3)' }} />
                    </g>
                </svg>
            </div>

            {/* Loading text */}
            <p className="text-[11px] uppercase tracking-[0.35em] text-cream/50 mb-8">
                Loading Experience
            </p>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-cream/10 relative overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 transition-[width] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ width: `${displayProgress}%`, backgroundColor: '#d4af37', transitionDuration: `${TRANSITION_MS}ms` }}
                />
            </div>

            {/* Counter */}
            <p className="mt-4 text-[11px] tabular-nums tracking-[0.2em] text-cream/40">
                {progress}%
            </p>
        </div>
    );
}
