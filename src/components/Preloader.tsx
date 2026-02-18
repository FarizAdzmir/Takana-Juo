"use client";

import { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
    onImagesReady: (images: HTMLImageElement[]) => void;
    isRevealing: boolean;
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

        Promise.all(loadPromises).then(() => {
            onImagesReady(images);
        });

    }, [onImagesReady]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out ${isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${!isRevealing && progress === 0 ? 'visible' : ''}`}
        >
            {/* Logo */}
            <div className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 375.385"
                    className="w-16 h-auto"
                >
                    <path
                        fill="#C39B5A"
                        d="M521.8,160.208a542.705,542.705,0,0,1-20.65-89.515c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.705,542.705,0,0,1-20.65,89.515C452.728,239.049,409.623,310.85,350.035,373.64l-1.663,1.724L500,375.282l151.628.082-1.663-1.724C590.377,310.85,547.272,239.049,521.8,160.208Z"
                    />
                    <path
                        fill="#C39B5A"
                        d="M756.579,271.05l.287-.206.082-.348c7-25.679,13.342-51.912,18.884-77.959C784.679,150.971,791.74,108.5,796.81,66.32l.411-3.366-2.2,2.566a355.654,355.654,0,0,1-116.363,89.187A350.82,350.82,0,0,1,558.13,187.446l-1.375.123.513,1.273a511,511,0,0,0,30.81,64.432,513.836,513.836,0,0,0,48.3,70.713l.41.493.616-.144a316,316,0,0,0,65.7-21.9A315.375,315.375,0,0,0,756.579,271.05Z"
                    />
                    <path
                        fill="#C39B5A"
                        d="M1000,0l-3.079,4.085A393.558,393.558,0,0,1,905.62,91.9a393.121,393.121,0,0,1-89.207,46l-.575.2q-12.562,74.971-25.1,149.944a355.488,355.488,0,0,1-69.5,31.344,353.476,353.476,0,0,1-72.108,15.5l-1.95.225,34.3,39.9.308.37,223.035-.056Z"
                    />
                    <path
                        fill="#C39B5A"
                        d="M224.168,192.537c5.542,26.047,11.884,52.28,18.884,77.959l.082.348.287.206a315.224,315.224,0,0,0,53.471,31.384,316.016,316.016,0,0,0,65.7,21.9l.616.144.41-.493a513.836,513.836,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.432l.513-1.273-1.375-.123a350.814,350.814,0,0,1-120.531-32.739A355.67,355.67,0,0,1,204.976,65.52l-2.2-2.566.411,3.366C208.26,108.5,215.321,150.971,224.168,192.537Z"
                    />
                    <path
                        fill="#C39B5A"
                        d="M352.826,335.112l-1.95-.225a353.476,353.476,0,0,1-72.108-15.5,355.488,355.488,0,0,1-69.5-31.344Q196.7,213.073,184.162,138.1l-.575-.2a393.121,393.121,0,0,1-89.207-46A393.552,393.552,0,0,1,3.08,4.09L0,0,95.184,375.329l223.035.056.308-.37Z"
                    />
                </svg>
            </div>

            {/* Loading text */}
            <p className="text-[11px] uppercase tracking-[0.35em] text-cream/50 mb-8">
                Loading Experience
            </p>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-cream/10 relative overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-gold transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Counter */}
            <p className="mt-4 text-[11px] tabular-nums tracking-[0.2em] text-cream/40">
                {progress}%
            </p>
        </div>
    );
}
