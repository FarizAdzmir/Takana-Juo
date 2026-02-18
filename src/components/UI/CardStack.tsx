// @ts-nocheck
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface CardStackProps {
    items: {
        id: number;
        content: ReactNode;
    }[];
    offset?: number;
    scaleFactor?: number;
}

export default function CardStack({ items, offset = 10, scaleFactor = 0 }: CardStackProps) {
    return (
        <div className="relative w-full">
            {items.map((item, index) => (
                <Card
                    key={item.id}
                    i={index}
                    content={item.content}
                    progress={index / items.length}
                    range={[index * 0.25, 1]}
                    targetScale={1 - (items.length - index) * scaleFactor}
                />
            ))}
        </div>
    );
}

function Card({
    i,
    content,
    progress,
    range,
    targetScale,
}: {
    i: number;
    content: ReactNode;
    progress: number;
    range: number[];
    targetScale: number;
}) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="h-screen flex items-start justify-center sticky top-0 px-4 pt-32 z-0"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(${i * 25}px)`,
                }}
                className="relative flex flex-row items-center justify-between h-[400px] w-full max-w-5xl p-0 origin-top overflow-hidden shadow-2xl"
            >
                {content}
            </motion.div>
        </div>
    );
}
