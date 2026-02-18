"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Story() {
    const { t } = useLanguage();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-gold/20" />
            <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold/20" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="aspect-[4/5] bg-charcoal/5 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-warm-brown/20 to-gold/10 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-gold/30 flex items-center justify-center">
                                        <span className="font-heading text-gold/50 text-3xl">味</span>
                                    </div>
                                    <p className="text-charcoal/30 text-sm uppercase tracking-[0.2em]">
                                        {t("story.ourKitchen")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Offset decorative frame */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-gold" />
                                <span className="text-gold text-xs uppercase tracking-[0.3em]">
                                    {t("story.label")}
                                </span>
                            </div>
                            <h2 className="font-heading text-4xl md:text-5xl text-charcoal leading-tight">
                                {t("story.heading")}{" "}
                                <span className="text-gold italic">{t("story.headingAccent")}</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-charcoal/70 leading-relaxed">
                            <p>{t("story.p1")}</p>
                            <p>{t("story.p2")}</p>
                            <p>{t("story.p3")}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-charcoal/10">
                            <div>
                                <p className="font-heading text-3xl text-gold">
                                    {new Date().getFullYear() - 1995}
                                </p>
                                <p className="text-charcoal/50 text-xs uppercase tracking-[0.15em] mt-1">
                                    {t("story.years")}
                                </p>
                            </div>
                            <div>
                                <p className="font-heading text-3xl text-gold">∞</p>
                                <p className="text-charcoal/50 text-xs uppercase tracking-[0.15em] mt-1">
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
