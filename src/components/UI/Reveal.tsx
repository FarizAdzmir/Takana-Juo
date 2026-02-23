import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Premium Quintic Ease-Out curve matching the reference site
 * Fast start, very long smooth tail for a luxurious feel.
 */
export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    viewportAmount?: number | "some" | "all";
}

/**
 * RevealText: Animates text (or any block) up and fades it in.
 * Perfect for headings, paragraphs, and staggered lists.
 */
export function RevealText({
    children,
    className,
    delay = 0,
    duration = 1.2,
    viewportAmount = "some"
}: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: viewportAmount, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: LUXURY_EASE
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * RevealImage: Premium "curtain" reveal.
 * The outer container clips from bottom to top (1.4s).
 * The inner content zooms down from 1.2 -> 1.0 (1.8s) simultaneously.
 */
export function RevealImage({
    children,
    className,
    delay = 0,
    viewportAmount = "some" as const
}: RevealProps) {
    return (
        <motion.div
            // Outer container: controls the clip-path unmasking
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: viewportAmount, margin: "50px" }}
            transition={{
                duration: 1.4,
                delay,
                ease: LUXURY_EASE
            }}
            className={clsx("relative overflow-hidden w-full h-full", className)}
        >
            <motion.div
                // Inner container: controls the subtle scale down effect
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: viewportAmount, margin: "50px" }}
                transition={{
                    duration: 1.8,
                    delay,
                    ease: LUXURY_EASE
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
