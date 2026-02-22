"use client";

import { useLanguage } from "@/context/LanguageContext";

export interface MenuItem {
    name: string;
    price: string;
}

export interface MenuCategoryData {
    title: string;
    items: MenuItem[];
}

export default function MenuCard() {
    const { t } = useLanguage();

    const menuData: MenuCategoryData[] = [
        {
            title: t("menu.categories.nasiGoreng"),
            items: [
                { name: t("menu.categories.nasiGoreng"), price: "RM 4.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.telur")}`, price: "RM 6.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.daging")}`, price: "RM 7.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.ayam")}`, price: "RM 9.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.dagingTelur")}`, price: "RM 8.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.ayamTelur")}`, price: "RM 10.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.ayamDaging")}`, price: "RM 11.00" },
                { name: `${t("menu.categories.nasiGoreng")} ${t("menu.variations.special")}`, price: "RM 12.00" },
            ]
        },
        {
            title: t("menu.categories.addOn"),
            items: [
                { name: t("menu.extras.extraCili"), price: "RM 1.00" },
                { name: t("menu.extras.extraNasi"), price: "RM 1.00" },
            ]
        }
    ];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-dark/[0.03] to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-20">

                {/* Main Menu Render */}
                {menuData.map((section, idx) => (
                    <div key={section.title} className={idx > 0 ? "mt-16" : ""}>
                        <h2 className="font-heading text-2xl md:text-3xl text-gold-dark mb-8 text-center tracking-wider">{section.title}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {section.items.map((item) => (
                                <div
                                    key={item.name}
                                    className="group border-b border-cream/10 pb-4 hover:border-gold-dark/30 transition-colors duration-300"
                                >
                                    <div className="flex items-baseline justify-between gap-4">
                                        <h3 className="font-heading text-lg text-cream group-hover:text-gold-dark transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <span className="font-heading text-gold-dark text-lg">
                                            {item.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
