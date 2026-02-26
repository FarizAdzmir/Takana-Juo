"use client";

import React, { useRef, useState } from 'react';
import { SiWhatsapp, SiFoodpanda, SiGrab } from "react-icons/si";
import { FiPhone, FiCheck } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { RevealText } from "@/components/UI/Reveal";
import GradientText from "@/components/UI/GradientText";

export default function Reservation() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("+60 10-214 5431");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="reservation" className="bg-black w-full px-4 sm:px-8 md:px-16 py-20 md:py-32 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={containerRef}
                    className="bg-[#900017] rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <RevealText className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-gold-dark" />
                            <span className="text-gold-dark text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium font-body">
                                {t("reservation.label")}
                            </span>
                            <div className="w-8 h-[1px] bg-gold-dark" />
                        </RevealText>

                        <RevealText delay={0.1}>
                            <h2 className="font-trajan-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-10">
                                {t("reservation.heading")} <span className="text-gold-dark font-normal">{t("reservation.headingAccent")}</span>
                            </h2>
                        </RevealText>

                        <RevealText delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={handleCopy}
                                    className="w-full sm:w-[280px] h-14 bg-black px-6 rounded-full font-bold font-body text-sm hover:bg-stone-900 transition-colors flex items-center justify-center gap-2 border border-black/10 shadow-lg"
                                >
                                    {copied ? <FiCheck className="text-lg text-[#D1A61C]" /> : <FiPhone className="text-lg text-[#D1A61C]" />}
                                    <GradientText className="[&>div]:!p-0 flex items-center justify-center" colors={['#D1A61C', '#EABF47', '#B18700']}>
                                        {copied ? "COPIED TO CLIPBOARD" : "+60 10-214 5431"}
                                    </GradientText>
                                </button>
                                <a
                                    href="https://wa.me/60102145431"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-[280px] h-14 bg-gradient-to-r from-[#D1A61C] to-[#B18700] text-white px-6 rounded-full font-bold font-body text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D1A61C]/20"
                                >
                                    <SiWhatsapp className="text-xl" />
                                    WHATSAPP US
                                </a>
                            </div>
                        </RevealText>
                    </div>

                    <RevealText delay={0.3}>
                        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-stone-500 text-sm font-body">
                            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-stone-300">
                                <a href="#" className="flex items-center gap-2 hover:text-white transition group">
                                    <SiFoodpanda className="text-[#D70F64] text-xl group-hover:scale-110 transition-transform" />
                                    <span className="font-medium tracking-wide">foodpanda</span>
                                </a>
                                <a href="#" className="flex items-center gap-2 hover:text-white transition group">
                                    <SiGrab className="text-[#00B14F] text-xl group-hover:scale-110 transition-transform" />
                                    <span className="font-medium tracking-wide">Grab Food</span>
                                </a>
                            </div>
                        </div>
                    </RevealText>
                </div>
            </div>
        </section>
    );
}
