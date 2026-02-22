"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Story() {
    const { t } = useLanguage();

    return (
        <section id="story" className="relative py-16 md:py-20 lg:py-16 h-auto lg:h-[90vh] lg:min-h-[800px] flex items-center overflow-hidden">
            {/* Elegant Background Texture / Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-gold-light/30" />
            <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold-light/30" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-10 md:mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg group">
                        <div className="aspect-[4/5] bg-cream-dark overflow-hidden relative shadow-2xl">
                            {/* Inner Frame */}
                            <div className="absolute inset-5 border border-gold-light/40 z-10 transition-transform duration-700 group-hover:scale-[0.98] pointer-events-none" />

                            {/* Main Display Area */}
                            <div className="w-full h-full relative transition-transform duration-1000 group-hover:scale-105">
                                <Image
                                    src="/images/Profile-Zam.jpg"
                                    alt="Takana Juo Founder"
                                    fill
                                    className="object-cover object-center grayscale-[0.2]"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Optional subtle dark overlay to match theme */}
                                <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply pointer-events-none" />
                            </div>
                        </div>
                        {/* Offset decorative block shadow */}
                        <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-full h-full border border-theme-red/60 bg-theme-red/5 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-6 lg:space-y-8">
                        {/* Header Area */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-gradient-to-r from-[#D1A61C] via-[#B18700] to-[#D1A61C]" />
                                <span className="text-gold-light text-xs uppercase tracking-[0.4em] font-bold">
                                    {t("story.label")}
                                </span>
                            </div>
                            <h2 className="font-trajan-bold text-[1.8rem] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[2.8rem] text-charcoal leading-none tracking-tight whitespace-nowrap">
                                {t("story.heading")} <span className="text-gold-light font-normal">{t("story.headingAccent")}</span>
                            </h2>
                        </div>

                        {/* Story Paragraphs */}
                        <div className="space-y-4 text-charcoal/80 text-base lg:text-md leading-relaxed font-body">
                            <p>{t("story.p1")}</p>
                            <p>{t("story.p2")}</p>
                            <p>{t("story.p3")}</p>
                        </div>

                        {/* Stats / Highlights */}
                        <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-8 border-t border-charcoal/20">
                            <div className="text-center">
                                <p className="font-trajan-bold text-2xl md:text-3xl lg:text-4xl text-gold-light mb-2 h-12 flex items-center justify-center">
                                    {new Date().getFullYear() - 1995}
                                </p>
                                <p className="text-charcoal/60 font-trajan-regular text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em]">
                                    {t("story.years")}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="font-trajan-bold text-2xl md:text-3xl lg:text-4xl text-gold-light mb-2 h-12 flex items-center justify-center">
                                    100%
                                </p>
                                <p className="text-charcoal/60 font-trajan-regular text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em]">
                                    {t("story.tradition")}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="font-trajan-bold text-5xl md:text-6xl lg:text-7xl text-gold-light mb-2 h-12 flex items-center justify-center">
                                    ∞
                                </p>
                                <p className="text-charcoal/60 font-trajan-regular text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em]">
                                    {t("story.passion")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
