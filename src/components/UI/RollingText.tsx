// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import React from "react";

interface RollingTextProps {
    children: React.ReactNode;
    className?: string;
    height?: string;
}

export default function RollingText({ children, className = "", height = "1.5em" }: RollingTextProps) {
    return (
        <div
            className={`relative overflow-hidden flex items-center justify-center ${className}`}
            style={{ height }}
        >
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative flex flex-col items-center justify-start w-full"
            >
                <div style={{ overflow: "hidden" }}>
                    <motion.div
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {children}
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-0 left-0 w-full text-center"
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
