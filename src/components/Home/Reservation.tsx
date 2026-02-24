"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SiWhatsapp, SiWaze, SiGrab, SiFoodpanda } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";
import { RevealText } from "@/components/UI/Reveal";

export default function Reservation() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    const contactMethods = [
        {
            icon: SiWhatsapp,
            iconColor: "#25D366",
            title: "WHATSAPP",
            value: "+60 10-214 5431",
            extra: "",
            link: "https://api.whatsapp.com/send/?phone=60102145431",
            gradient: "from-[#25D366]/20 to-[#25D366]/5"
        },
        {
            icon: SiWaze,
            iconColor: "#33CCFF",
            title: "LOCATION",
            value: "TAKANA JUO",
            extra: "",
            link: "https://www.waze.com/ul?q=74%20Jalan%20Haji%20Yahya%20Sheikh%20Ahmad,%20Kampung%20Baru",
            gradient: "from-[#33CCFF]/20 to-[#33CCFF]/5"
        },
        {
            icon: SiFoodpanda,
            iconColor: "#D70F64",
            title: "FOODPANDA",
            value: t("reservation.foodpanda"),
            extra: "",
            link: "#",
            gradient: "from-[#D70F64]/20 to-[#D70F64]/5"
        },
        {
            icon: SiGrab,
            iconColor: "#00B14F",
            title: "GRAB FOOD",
            value: t("reservation.grabfood"),
            extra: "",
            link: "#",
            gradient: "from-[#00B14F]/20 to-[#00B14F]/5"
        }
    ];

    return (
        <section id="reservation" className="relative py-32 text-white overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold-dark/[0.04] via-black to-[#D4AF37]/[0.05]"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                />

                {/* Moving orbs changed to gold/cream hints to keep brand color */}
                <motion.div
                    className="absolute top-1/3 left-1/5 w-96 h-96 bg-gold-dark/[0.03] blur-[100px]"
                    animate={{
                        x: [0, 200, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-white/[0.02] blur-[100px]"
                    animate={{
                        x: [0, -150, 0],
                        y: [0, -80, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />


            </div>

            <div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6"
            >
                {/* Header */}
                <div className="text-center mb-20">
                    <RevealText className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-[1px] bg-gold-dark" />
                        <span className="text-gold-dark text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium font-body">
                            {t("reservation.label")}
                        </span>
                        <div className="w-12 h-[1px] bg-gold-dark" />
                    </RevealText>

                    <RevealText delay={0.1}>
                        <h2 className="font-trajan-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                            {t("reservation.heading")} <span className="text-gold-dark font-normal">{t("reservation.headingAccent")}</span>
                        </h2>
                    </RevealText>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    {/* Left Column: Contact Methods */}
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="space-y-6">
                            {contactMethods.map((method, index) => (
                                <RevealText key={index} delay={0.1 * (index + 2)}>
                                    <a
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <div className={`
                                            relative overflow-hidden
                                            bg-white/[0.02] hover:bg-white/[0.06]
                                            border border-white/10 hover:border-white/30
                                            p-5 md:p-6 flex items-center gap-6
                                            transition-all duration-500
                                        `}>
                                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" style={{ color: method.iconColor }}>
                                                <method.icon />
                                            </div>

                                            <div className="relative flex-1">
                                                <h3 className="font-body font-medium text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mb-1 group-hover:text-white/80 transition-colors">
                                                    {method.title}
                                                </h3>
                                                <p className="font-body text-sm md:text-[15px] text-white tracking-wide">
                                                    {method.value}
                                                </p>
                                                {method.extra && (
                                                    <p className="font-body text-xs text-white/50 mt-1">
                                                        {method.extra}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                </RevealText>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Embedded Map — hidden on mobile to prevent lag */}
                    <RevealText delay={0.3} className="relative h-full min-h-[400px] w-full hidden lg:block">
                        <div className="absolute inset-0 border border-white/10 p-2 bg-black/80 backdrop-blur-md shadow-lg pointer-events-none">
                            <div className="relative w-full h-full border border-white/10 overflow-hidden bg-[#0A0A0A] group pb-8">
                                <iframe
                                    src="https://www.google.com/maps?q=74,+Jalan+Haji+Yahya+Sheikh+Ahmad,+Kampung+Baru,+50300+Kuala+Lumpur,+Wilayah+Persekutuan+Kuala+Lumpur&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Takana Juo Location"
                                    className="absolute inset-0 w-full h-full object-cover scale-[1.05] transition-transform duration-[20s] group-hover:scale-[1.02] pointer-events-none"
                                />
                            </div>
                        </div>
                    </RevealText>
                </div>
            </div>
        </section>
    );
}
