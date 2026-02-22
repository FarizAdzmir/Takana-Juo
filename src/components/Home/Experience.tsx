"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
    const { t } = useLanguage();

    const features = [
        {
            icon: "✦",
            titleKey: "experience.ambiance",
            descKey: "experience.ambianceDesc",
        },
        {
            icon: "◈",
            titleKey: "experience.service",
            descKey: "experience.serviceDesc",
        },
        {
            icon: "❖",
            titleKey: "experience.cuisine",
            descKey: "experience.cuisineDesc",
        },
    ];

    const highlights = [
        { value: "4.9", labelKey: "experience.customerRating" },
        { value: "100%", labelKey: "experience.freshIngredients" },
        { value: "#1", labelKey: "experience.inKualaLumpur" },
    ];

    return (
        <section
            className="relative py-24 md:py-32 overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-[1px] bg-gold-dark" />
                        <span className="text-gold-dark text-xs uppercase tracking-[0.3em]">
                            {t("experience.label")}
                        </span>
                        <div className="w-8 h-[1px] bg-gold-dark" />
                    </div>
                    <h2 className="font-trajan-bold text-4xl md:text-5xl text-cream">
                        {t("experience.heading")} <span className="text-gold-dark font-normal">{t("experience.headingAccent")}</span>
                    </h2>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature) => (
                        <div
                            key={feature.titleKey}
                            className="group relative bg-black/80 backdrop-blur-md p-10 text-center border border-white/10 shadow-lg hover:border-gold-dark/40 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Hover accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            <span className="inline-block text-3xl text-gold-dark mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </span>
                            <h3 className="font-trajan-regular text-xl text-cream mb-4">
                                {t(feature.titleKey)}
                            </h3>
                            <p className="text-cream/60 text-sm leading-relaxed">
                                {t(feature.descKey)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Highlights Strip */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 shadow-lg py-10 px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {highlights.map((item) => (
                            <div key={item.labelKey} className="text-center">
                                <p className="font-trajan-regular text-3xl md:text-4xl text-gold-dark mb-2">
                                    {item.value}
                                </p>
                                <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">
                                    {t(item.labelKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
