"use client";

import { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
    onImagesReady: (images: HTMLImageElement[]) => void;
    isRevealing: boolean; // controlled by parent to start fade-out
}

export default function Preloader({ onImagesReady, isRevealing }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const hasStarted = useRef(false);

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

        const frameCount = 150;
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        // Pre-allocate array to ensure order
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
                img.src = `/images/Frames/frame_${frameNum}.jpg`;
            });
        });

        // Wait for ALL images to load, then notify parent immediately
        // Parent will set up canvas FIRST, then tell us to fade out
        Promise.all(loadPromises).then(() => {
            onImagesReady(images);
        });

    }, [onImagesReady]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-gold transition-opacity duration-[800ms] ease-in-out ${isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="text-6xl font-heading mb-4 animate-pulse">Takana Juo</div>
            <div className="w-64 h-1 bg-cream/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gold transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-cream/50">
                {progress}%
            </div>
        </div>
    );
}
