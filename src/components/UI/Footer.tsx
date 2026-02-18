"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    const quickLinks = [
        { key: "footer.ourStory", href: "#story" },
        { key: "nav.menu", href: "#menu" },
        { key: "nav.experience", href: "#experience" },
        { key: "nav.events", href: "#events" },
    ];

    const socialLinks = [
        { name: "Instagram", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "TripAdvisor", href: "#" },
    ];

    return (
        <footer className="sticky bottom-0 z-0 bg-charcoal text-cream h-screen flex flex-col">
            {/* Top accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Branding Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                                <span className="font-heading text-gold text-lg font-bold">
                                    T
                                </span>
                            </div>
                            <span className="font-heading text-2xl tracking-wider">
                                Takana Juo
                            </span>
                        </div>
                        <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
                            {t("footer.description")}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-cream/50 hover:text-gold text-sm transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-heading text-gold text-lg tracking-wider">
                            {t("footer.explore")}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    className="text-cream/60 hover:text-cream text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                >
                                    {t(link.key)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Hours */}
                    <div className="space-y-6">
                        <h3 className="font-heading text-gold text-lg tracking-wider">
                            {t("footer.visitUs")}
                        </h3>
                        <div className="space-y-4 text-sm text-cream/60">
                            <div>
                                <p className="text-cream/80 font-medium mb-1">{t("footer.address")}</p>
                                <p>Jl. Raya No. 123</p>
                                <p>Padang, West Sumatra</p>
                            </div>
                            <div>
                                <p className="text-cream/80 font-medium mb-1">{t("footer.hours")}</p>
                                <p>Mon – Fri: 11:00 – 22:00</p>
                                <p>Sat – Sun: 10:00 – 23:00</p>
                            </div>
                            <div>
                                <p className="text-cream/80 font-medium mb-1">{t("footer.contact")}</p>
                                <p>+62 812 3456 7890</p>
                                <p>hello@takanajuo.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-cream/40 text-xs tracking-wider">
                        © {new Date().getFullYear()} Takana Juo. {t("footer.rights")}
                    </p>
                    <p className="text-cream/30 text-xs tracking-wider">
                        {t("footer.craftedWith")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
