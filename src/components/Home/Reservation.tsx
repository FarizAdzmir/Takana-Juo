"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SiWhatsapp, SiWaze, SiGrab, SiFoodpanda } from "react-icons/si";

export default function Reservation() {
    const { t } = useLanguage();

    return (
        <section id="reservation" className="relative py-24 md:py-32 overflow-hidden bg-[#0A0A0A]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-gold/[0.03] to-transparent pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Contact Details */}
                    <div className="lg:col-span-4 flex flex-col space-y-12">

                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-[1px] bg-gold" />
                                <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-medium">
                                    {t("events.label") || "Visit Us"}
                                </span>
                            </div>

                            <h2 className="font-trajan-bold text-4xl md:text-5xl lg:text-5xl text-cream mb-8 leading-tight">
                                Contact & <br /><span className="text-gold font-normal italic">Location</span>
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">Takana Juo</h4>
                                    <p className="text-cream/60 leading-relaxed text-sm">
                                        74 Jalan Haji Yahya Sheikh Ahmad,<br />
                                        Kampung Baru,<br />
                                        50300 Kuala Lumpur
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-cream/40 text-[10px] uppercase tracking-[0.3em] mt-8 mb-2">Operating Hours</h4>
                                    <p className="text-cream/80 text-sm">Open Daily: 11:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Brand Icons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=60102145431"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cream/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 group"
                                aria-label="WhatsApp"
                            >
                                <SiWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="https://www.waze.com/ul?q=74%20Jalan%20Haji%20Yahya%20Sheikh%20Ahmad,%20Kampung%20Baru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cream/70 hover:text-[#33CCFF] hover:border-[#33CCFF] hover:bg-[#33CCFF]/10 transition-all duration-300 group"
                                aria-label="Waze Location"
                            >
                                <SiWaze className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cream/70 hover:text-[#00B14F] hover:border-[#00B14F] hover:bg-[#00B14F]/10 transition-all duration-300 group"
                                aria-label="GrabFood"
                            >
                                <SiGrab className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cream/70 hover:text-[#D70F64] hover:border-[#D70F64] hover:bg-[#D70F64]/10 transition-all duration-300 group"
                                aria-label="FoodPanda"
                            >
                                <SiFoodpanda className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Embedded Map */}
                    <div className="lg:col-span-8 relative w-full h-[450px] lg:h-[600px] border border-cream/10 p-3 bg-white/5 backdrop-blur-sm shadow-2xl">
                        <div className="w-full h-full relative overflow-hidden bg-charcoal border border-cream/5 group pb-7">
                            <div className="absolute inset-0 bg-gold/5 pointer-events-none z-10 mix-blend-overlay opacity-50 group-hover:opacity-10 transition-opacity duration-700" />
                            <iframe
                                src="https://www.google.com/maps?q=74+Jalan+Haji+Yahya+Sheikh+Ahmad,+Kampung+Baru,+50300+Kuala+Lumpur&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(95%) contrast(85%) sepia(20%) hue-rotate(5deg)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Takana Juo Location"
                                className="absolute inset-0 w-full h-full object-cover scale-[1.05] transition-transform duration-[20s] group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
