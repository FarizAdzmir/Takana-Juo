"use client";

import { useRef, useEffect } from "react";

interface NoiseProps {
    patternSize?: number;
    patternScaleX?: number;
    patternScaleY?: number;
    patternRefreshInterval?: number;
    patternAlpha?: number;
}

export default function Noise({
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15,
}: NoiseProps) {
    const grainRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = grainRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        let frameCount = 0;

        const loop = () => {
            frameId = window.requestAnimationFrame(loop);

            // Skip frames based on refresh interval
            frameCount++;
            if (patternRefreshInterval > 0 && frameCount % patternRefreshInterval !== 0) return;

            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            const patternCanvas = document.createElement("canvas");
            patternCanvas.width = patternSize;
            patternCanvas.height = patternSize;
            const patternCtx = patternCanvas.getContext("2d");
            if (!patternCtx) return;

            const patternData = patternCtx.createImageData(patternSize, patternSize);
            const patternPixelDataLength = patternData.data.length;

            for (let i = 0; i < patternPixelDataLength; i += 4) {
                const value = Math.random() * 255;
                patternData.data[i] = value;
                patternData.data[i + 1] = value;
                patternData.data[i + 2] = value;
                patternData.data[i + 3] = patternAlpha;
            }

            patternCtx.putImageData(patternData, 0, 0);

            const pattern = ctx.createPattern(patternCanvas, "repeat");
            if (pattern) {
                ctx.fillStyle = pattern;
                ctx.save();
                ctx.scale(patternScaleX, patternScaleY);
                ctx.fillRect(0, 0, w / patternScaleX, h / patternScaleY);
                ctx.restore();
            }
        };

        loop();

        return () => {
            window.removeEventListener("resize", resize);
            window.cancelAnimationFrame(frameId);
        };
    }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

    return (
        <canvas
            ref={grainRef}
            className="absolute inset-0 z-[9999] w-full h-full pointer-events-none sticky top-0"
        />
    );
}
