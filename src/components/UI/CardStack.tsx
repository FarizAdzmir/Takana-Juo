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
    topOffset?: number | string;
    cardGap?: number;
}

export default function CardStack({ items, offset = 10, scaleFactor = 0.06, topOffset = "20vh", cardGap = 10 }: CardStackProps) {
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
                    topOffset={topOffset}
                    cardGap={cardGap}
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
    topOffset,
    cardGap,
}: {
    i: number;
    content: ReactNode;
    progress: number;
    range: number[];
    targetScale: number;
    topOffset: number | string;
    cardGap: number;
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
            style={{ paddingTop: topOffset }}
            className="h-screen flex items-start justify-center sticky top-0 px-4 z-0"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(${i * cardGap}px)`,
                }}
                className="relative flex flex-row items-center justify-between h-[400px] w-full max-w-5xl p-0 origin-top overflow-hidden shadow-2xl"
            >
                {content}
            </motion.div>
        </div>
    );
}
