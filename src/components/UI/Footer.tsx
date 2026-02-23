"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SiInstagram, SiWhatsapp, SiWaze, SiFoodpanda, SiGrab } from "react-icons/si";
import GradientText from "@/components/UI/GradientText";

export default function Footer() {
    const { t } = useLanguage();
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const updateYearAtMidnight = () => {
            const now = new Date();
            // Calculate time until exactly Jan 1st of next year
            const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
            const timeToNextYear = nextYear.getTime() - now.getTime();

            const timeoutId = setTimeout(() => {
                setCurrentYear(new Date().getFullYear());
                // Call itself again for the next year (although unlikely to stay precisely open for 1 full year)
                updateYearAtMidnight();
            }, timeToNextYear);

            return () => clearTimeout(timeoutId);
        };

        const cleanup = updateYearAtMidnight();
        return cleanup;
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="relative w-full h-[100dvh]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
            <div className="fixed bottom-0 left-0 w-full h-[100dvh]">
                <section className="w-full h-full bg-charcoal flex flex-col items-center justify-between overflow-x-hidden overflow-y-auto">

                    <div className="w-full flex-grow flex flex-col items-center justify-center pt-4 lg:pt-8">
                        {/* Press Mention Section */}
                        <div className="w-full max-w-[1600px] px-6 lg:px-12 flex justify-center">
                            {/* Golden Bounding Box */}
                            <div className="w-full border border-gold-dark py-6 lg:py-20 px-6 text-center flex flex-col items-center justify-center gap-4 lg:gap-10">
                                <h1
                                    className="font-harbour text-3xl md:text-5xl lg:text-5xl uppercase max-w-5xl leading-tight md:leading-snug tracking-wider bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage: 'linear-gradient(to right, #EABF47, #ffd38e, #d4af37, #EABF47)',
                                        backgroundSize: '300% 100%',
                                        animation: 'shimmer 8s ease-in-out infinite alternate',
                                    }}
                                >
                                    {t('footer.quote')}
                                </h1>
                                <div className="font-mono text-gold-dark text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">
                                    {t('footer.brand')}
                                </div>
                            </div>
                        </div>

                        {/* Info Columns Grid */}
                        <div className="w-full max-w-[1600px] px-6 lg:px-12 mt-8 text-cream">
                            <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_2.5fr] border border-cream/30">

                                {/* Left Col: Logo */}
                                <div className="flex justify-center items-center py-4 lg:py-12 px-8 border-b lg:border-b-0 lg:border-r border-cream/30">
                                    <div className="w-16 md:w-24">
                                        <a href="/">
                                            <svg
                                                id="Takana_Juo_Footer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 1000 859.54"
                                                className="w-full h-auto drop-shadow-sm"
                                            >
                                                <defs>
                                                    <linearGradient
                                                        id="footer-linear-gradient"
                                                        x1="806.82"
                                                        y1="-67.77"
                                                        x2="806.82"
                                                        y2="505.3"
                                                        gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop offset="0" stopColor="#d4af37" />
                                                        <stop offset="0.55" stopColor="#eabf47" />
                                                        <stop offset="1" stopColor="#ffd38e" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="footer-linear-gradient-2"
                                                        x1="500"
                                                        y1="59.79"
                                                        x2="500"
                                                        y2="791.77"
                                                        gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop offset="0" stopColor="#d4af37" />
                                                        <stop offset="0.29" stopColor="#eabf47" />
                                                        <stop offset="1" stopColor="#ffd38e" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="footer-linear-gradient-3"
                                                        x1="193.18"
                                                        y1="-67.77"
                                                        x2="193.18"
                                                        y2="505.3"
                                                        xlinkHref="#footer-linear-gradient"
                                                    />
                                                </defs>
                                                <g id="Logo_Footer">
                                                    <path
                                                        d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z"
                                                        style={{ fill: "url(#footer-linear-gradient)" }}
                                                    />
                                                    <path
                                                        d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z"
                                                        style={{ fill: "url(#footer-linear-gradient-2)" }}
                                                    />
                                                    <path
                                                        d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z"
                                                        style={{ fill: "url(#footer-linear-gradient-3)" }}
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Middle Col: Description & Contact */}
                                <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-cream/30">
                                    {/* Description - top half */}
                                    <div className="py-4 lg:py-12 px-8 font-mono text-sm max-w-lg mx-auto lg:mx-0 w-full uppercase tracking-[0.15em] leading-[1.8] opacity-80 min-h-[80px] lg:min-h-[160px] flex justify-center lg:justify-start items-center text-center lg:text-left">
                                        {t('footer.description')}
                                    </div>
                                    {/* Horizontal Divider bounded inside column */}
                                    <div className="w-full border-t border-cream/30"></div>
                                    <div className="py-4 px-8 font-mono text-sm uppercase tracking-[0.15em] opacity-80 flex lg:items-center justify-center lg:justify-start text-center lg:text-left">
                                        <span className="leading-loose">
                                            {t('footer.contactText').replace('+60 10-214 5431', '').trim()}
                                            <br />
                                            +60 10-214 5431
                                        </span>
                                    </div>
                                </div>

                                {/* Right Col: Social Icons */}
                                <div className="flex flex-col py-4 lg:py-12 px-8 justify-center">
                                    <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center w-full">
                                        <span className="font-harbour text-xl tracking-widest uppercase text-cream font-bold opacity-90">
                                            {t('footer.connectTitle')}
                                        </span>
                                        {/* Social Icons Container */}
                                        <div className="flex items-center gap-6 mt-2 opacity-90">
                                            <a href="https://www.instagram.com/takanajuoofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-dark transition-colors" aria-label="Instagram">
                                                <SiInstagram className="w-6 h-6 md:w-7 md:h-7" />
                                            </a>
                                            <a href="https://api.whatsapp.com/send/?phone=60102145431" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-dark transition-colors" aria-label="WhatsApp">
                                                <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
                                            </a>
                                            <a href="https://www.waze.com/ul?q=74%20Jalan%20Haji%20Yahya%20Sheikh%20Ahmad,%20Kampung%20Baru" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-dark transition-colors" aria-label="Waze">
                                                <SiWaze className="w-6 h-6 md:w-7 md:h-7" />
                                            </a>
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-dark transition-colors" aria-label="Foodpanda">
                                                <SiFoodpanda className="w-6 h-6 md:w-7 md:h-7" />
                                            </a>
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-dark transition-colors" aria-label="GrabFood">
                                                <SiGrab className="w-6 h-6 md:w-7 md:h-7" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center pb-4 lg:pb-4 pt-3 lg:pt-8 text-gold-dark">
                        {/* Bottom Bar: Copyright */}
                        <div className="w-full max-w-[1600px] flex justify-center items-center px-6 lg:px-12 py-4 font-mono text-sm uppercase tracking-[0.2em] opacity-80">
                            <div className="text-center">{t('footer.brand')} © {currentYear}</div>
                        </div>
                    </div>

                </section>
            </div>
        </footer>
    );
}
