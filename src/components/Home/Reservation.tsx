"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Reservation() {
    const { t } = useLanguage();

    return (
        <section id="reservation" className="relative py-24 md:py-32 overflow-hidden">
            {/* Decorative diagonal line */}
            <div className="absolute top-0 right-0 w-[1px] h-64 bg-gradient-to-b from-gold/20 to-transparent origin-top rotate-12 translate-x-20" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-[1px] bg-gold" />
                        <span className="text-gold text-xs uppercase tracking-[0.3em]">
                            {t("events.label") || "Get In Touch"}
                        </span>
                        <div className="w-8 h-[1px] bg-gold" />
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl text-cream">
                        <span className="text-gold italic">Reservation</span>
                    </h2>
                    <p className="text-cream/50 max-w-lg mx-auto text-sm leading-relaxed">
                        No app, no fuss — just good food the old-school way.
                        Drop us a message on WhatsApp or give us a call to place your order.
                    </p>
                </div>

                {/* WhatsApp Contact Card */}
                <div className="max-w-xl mx-auto mb-16">
                    <a
                        href="https://api.whatsapp.com/send/?phone=60102145431"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative bg-gradient-to-br from-charcoal-light to-charcoal border border-cream/5 hover:border-gold/40 transition-all duration-500 overflow-hidden"
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            {/* WhatsApp Icon */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/30 group-hover:border-gold flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(200,169,110,0.15)] shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 md:w-10 md:h-10 text-gold group-hover:scale-110 transition-transform duration-300"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>

                            {/* Text Content */}
                            <div className="text-center md:text-left flex-1">
                                <p className="text-cream/40 text-[10px] uppercase tracking-[0.25em] mb-2">
                                    For Booking & Orders
                                </p>
                                <h3 className="font-heading text-xl md:text-2xl text-cream group-hover:text-gold transition-colors duration-300 mb-2">
                                    Contact Us via WhatsApp
                                </h3>
                                <p className="text-cream/50 text-sm">
                                    +60 10-214 5431
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center">
                                <span className="text-gold/50 text-2xl group-hover:text-gold group-hover:translate-x-2 transition-all duration-300">
                                    →
                                </span>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                    </a>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
                    <span className="text-gold/40 text-[10px] uppercase tracking-[0.3em]">
                        Find Us
                    </span>
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
                </div>

                {/* Map Section */}
                <div className="relative">
                    {/* Address */}
                    <div className="text-center mb-6">
                        <p className="text-cream/60 text-sm leading-relaxed">
                            Store Location
                        </p>
                    </div>

                    {/* Embedded Map */}
                    <div className="relative border border-cream/5 hover:border-gold/20 transition-colors duration-500 overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps?q=74+Jalan+Haji+Yahya+Sheikh+Ahmad,+Kampung+Baru,+50300+Kuala+Lumpur&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0, filter: "grayscale(80%) invert(92%) contrast(83%)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Takana Juo Location"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
