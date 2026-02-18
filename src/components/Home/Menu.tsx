"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItem {
    name: string;
    descKey: string;
    price: string;
}

interface MenuCategory {
    id: string;
    labelKey: string;
    items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
    {
        id: "appetizers",
        labelKey: "menu.appetizers",
        items: [
            { name: "Perkedel Jagung", descKey: "menu.items.perkedel.desc", price: "35K" },
            { name: "Sate Padang", descKey: "menu.items.satePadang.desc", price: "45K" },
            { name: "Martabak Telur", descKey: "menu.items.martabak.desc", price: "40K" },
            { name: "Keripik Balado", descKey: "menu.items.keripik.desc", price: "25K" },
        ],
    },
    {
        id: "mains",
        labelKey: "menu.mains",
        items: [
            { name: "Rendang Daging", descKey: "menu.items.rendang.desc", price: "75K" },
            { name: "Gulai Ayam", descKey: "menu.items.gulai.desc", price: "55K" },
            { name: "Dendeng Batokok", descKey: "menu.items.dendeng.desc", price: "65K" },
            { name: "Ikan Bakar Rica", descKey: "menu.items.ikanBakar.desc", price: "70K" },
        ],
    },
    {
        id: "desserts",
        labelKey: "menu.desserts",
        items: [
            { name: "Kolak Pisang", descKey: "menu.items.kolak.desc", price: "30K" },
            { name: "Kue Lapis", descKey: "menu.items.kueLapis.desc", price: "25K" },
            { name: "Es Teler", descKey: "menu.items.esTeler.desc", price: "35K" },
        ],
    },
    {
        id: "drinks",
        labelKey: "menu.drinks",
        items: [
            { name: "Teh Talua", descKey: "menu.items.tehTalua.desc", price: "25K" },
            { name: "Kopi Luak", descKey: "menu.items.kopiLuak.desc", price: "55K" },
            { name: "Es Jeruk Nipis", descKey: "menu.items.esJeruk.desc", price: "20K" },
        ],
    },
];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState("mains");
    const { t } = useLanguage();

    const currentCategory = menuCategories.find((c) => c.id === activeCategory);

    return (
        <section id="menu" className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/[0.03] to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-[1px] bg-gold" />
                        <span className="text-gold text-xs uppercase tracking-[0.3em]">
                            {t("menu.label")}
                        </span>
                        <div className="w-8 h-[1px] bg-gold" />
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl text-cream">
                        {t("menu.heading")} <span className="text-gold italic">{t("menu.headingAccent")}</span>
                    </h2>
                    <p className="text-cream/50 max-w-md mx-auto text-sm leading-relaxed">
                        {t("menu.subtitle")}
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-14">
                    {menuCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${activeCategory === cat.id
                                ? "bg-gold text-charcoal border-gold"
                                : "bg-transparent text-cream/60 border-cream/15 hover:border-gold/50 hover:text-cream"
                                }`}
                        >
                            {t(cat.labelKey)}
                        </button>
                    ))}
                </div>

                {/* Menu Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {currentCategory?.items.map((item) => (
                        <div
                            key={item.name}
                            className="group border-b border-cream/10 pb-6 hover:border-gold/30 transition-colors duration-300"
                        >
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                <h3 className="font-heading text-lg text-cream group-hover:text-gold transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <div className="flex-1 border-b border-dotted border-cream/15 min-w-8 translate-y-[-4px]" />
                                <span className="font-heading text-gold text-lg">
                                    {item.price}
                                </span>
                            </div>
                            <p className="text-cream/40 text-sm leading-relaxed">
                                {t(item.descKey)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* View Full Menu CTA */}
                <div className="text-center mt-14">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 text-gold text-sm uppercase tracking-[0.2em] hover:gap-5 transition-all duration-300 group"
                    >
                        {t("menu.viewFullMenu")}
                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                            →
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
