"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Event() {
    const { t } = useLanguage();

    const events = [
        {
            dateKey: "events.everySaturday",
            titleKey: "events.saluangTitle",
            descKey: "events.saluangDesc",
            tagKey: "events.weekly",
        },
        {
            dateKey: "events.rendangDate",
            titleKey: "events.rendangTitle",
            descKey: "events.rendangDesc",
            tagKey: "events.special",
        },
        {
            dateKey: "events.availableDaily",
            titleKey: "events.privateDiningTitle",
            descKey: "events.privateDiningDesc",
            tagKey: "events.exclusive",
        },
    ];

    return (
        <section id="events" className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
            {/* Decorative diagonal line */}
            <div className="absolute top-0 right-0 w-[1px] h-64 bg-gradient-to-b from-gold/20 to-transparent origin-top rotate-12 translate-x-20" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-[1px] bg-gold" />
                        <span className="text-gold text-xs uppercase tracking-[0.3em]">
                            {t("events.label")}
                        </span>
                        <div className="w-8 h-[1px] bg-gold" />
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl text-cream">
                        {t("events.heading1")}{" "}
                        <span className="text-gold italic">{t("events.headingAccent")}</span>
                    </h2>
                    <p className="text-cream/50 max-w-md mx-auto text-sm leading-relaxed">
                        {t("events.subtitle")}
                    </p>
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.titleKey}
                            className="group relative bg-charcoal-light border border-cream/5 p-8 hover:border-gold/30 transition-all duration-500 flex flex-col"
                        >
                            {/* Tag */}
                            <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.25em] text-gold border border-gold/30 px-3 py-1">
                                {t(event.tagKey)}
                            </span>

                            {/* Date */}
                            <p className="text-cream/40 text-xs uppercase tracking-[0.2em] mb-4">
                                {t(event.dateKey)}
                            </p>

                            {/* Title */}
                            <h3 className="font-heading text-xl text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                                {t(event.titleKey)}
                            </h3>

                            {/* Description */}
                            <p className="text-cream/50 text-sm leading-relaxed mb-8 flex-1">
                                {t(event.descKey)}
                            </p>

                            {/* CTA */}
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all duration-300"
                            >
                                {t("events.learnMore")}
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>

                {/* Reservation CTA */}
                <div className="mt-20 text-center bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/15 py-14 px-8">
                    <h3 className="font-heading text-2xl md:text-3xl text-cream mb-4">
                        {t("events.ctaHeading")}
                    </h3>
                    <p className="text-cream/50 text-sm mb-8 max-w-md mx-auto">
                        {t("events.ctaSubtitle")}
                    </p>
                    <a
                        href="#"
                        className="inline-block px-10 py-4 bg-gold text-charcoal text-sm uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,169,110,0.3)]"
                    >
                        {t("events.reserveTable")}
                    </a>
                </div>
            </div>
        </section>
    );
}
