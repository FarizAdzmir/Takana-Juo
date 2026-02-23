"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface NavCapsuleProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
    glowColor?: string;
    secondaryGlowColor?: string;
    borderColor?: string;
    backdropClass?: string;
    textColor?: string;
    glowSize?: number;
    contentClassName?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

export default function NavCapsule({
    children,
    className = "",
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    glowColor = "#d4af37", // Gold
    secondaryGlowColor = "#eabf47", // Lighter Gold
    borderColor = "border-white/10",
    backdropClass = "bg-black/80",
    textColor = "text-cream",
    glowSize = 100,
    contentClassName = "",
    layout,
    ...props
}: NavCapsuleProps & { layout?: boolean | "position" | "size" }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onMouseMove?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpacity(1);
        onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpacity(0);
        onMouseLeave?.(e);
    };

    const glow1 = glowColor;
    const glow2 = secondaryGlowColor || glowColor;

    return (
        <motion.div
            layout={layout}
            ref={divRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${backdropClass} backdrop-blur-md shadow-lg flex items-center justify-center font-heading text-xs tracking-[0.2em] uppercase ${textColor} ${className}`}
            {...props}
        >
            {/* Base Static Border */}
            <div className={`pointer-events-none absolute inset-0 border ${borderColor}`} />

            {/* Spotlight Borders - Layer 1 */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow1}, transparent 50%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow2}, transparent 50%)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow1}, transparent 50%)` }} />
                <div className="absolute top-0 right-0 bottom-0 w-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow2}, transparent 50%)` }} />
            </div>

            {/* Spotlight Borders - Layer 2 (Double Intensity) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow1}, transparent 50%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow2}, transparent 50%)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow1}, transparent 50%)` }} />
                <div className="absolute top-0 right-0 bottom-0 w-[1px]" style={{ opacity, background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glow2}, transparent 50%)` }} />
            </div>

            {/* Content */}
            <div className={`relative z-10 flex items-center justify-center ${contentClassName}`}>
                {children}
            </div>
        </motion.div>
    );
}
