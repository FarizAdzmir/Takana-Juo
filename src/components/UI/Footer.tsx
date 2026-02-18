"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Footer() {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-black text-cream w-full min-h-screen flex flex-col justify-between overflow-hidden">
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />

            {/* Top Section: Logo & Back to Top */}
            <div className="w-full px-6 py-8 md:px-12 md:py-10 flex justify-end items-start">

                {/* Back To Top */}
                <button
                    onClick={scrollToTop}
                    className="group flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60 hover:text-gold transition-colors duration-300"
                >
                    <span>Back to Top</span>
                    <div className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="bg-transparent"
                        >
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* Middle Section: Main Text */}
            <div className="flex-grow flex items-center px-6 md:px-12">
                <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl leading-[0.9] text-cream max-w-6xl">
                    Taste of{" "}
                    <span className="text-gold italic font-serif">Minang</span>{" "}
                    <br className="hidden md:block" />
                    Tradition.
                </h1>
            </div>

            {/* Bottom Section: Logo/Copyright & Socials */}
            <div className="w-full px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-cream/5 mt-8 md:mt-0">
                {/* Left: Big Logo & Copyright */}
                <div className="flex flex-col gap-6 w-full md:w-auto">
                    <div className="w-32 md:w-48 opacity-90">
                        <svg
                            viewBox="0 0 1000 375.385"
                            className="w-full h-auto text-cream"
                        >
                            <path
                                fill="currentColor"
                                d="M521.8,160.208a542.705,542.705,0,0,1-20.65-89.515c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.705,542.705,0,0,1-20.65,89.515C452.728,239.049,409.623,310.85,350.035,373.64l-1.663,1.724L500,375.282l151.628.082-1.663-1.724C590.377,310.85,547.272,239.049,521.8,160.208Z"
                            />
                            <path
                                fill="currentColor"
                                d="M756.579,271.05l.287-.206.082-.348c7-25.679,13.342-51.912,18.884-77.959C784.679,150.971,791.74,108.5,796.81,66.32l.411-3.366-2.2,2.566a355.654,355.654,0,0,1-116.363,89.187A350.82,350.82,0,0,1,558.13,187.446l-1.375.123.513,1.273a511,511,0,0,0,30.81,64.432,513.836,513.836,0,0,0,48.3,70.713l.41.493.616-.144a316,316,0,0,0,65.7-21.9A315.375,315.375,0,0,0,756.579,271.05Z"
                            />
                            <path
                                fill="currentColor"
                                d="M1000,0l-3.079,4.085A393.558,393.558,0,0,1,905.62,91.9a393.121,393.121,0,0,1-89.207,46l-.575.2q-12.562,74.971-25.1,149.944a355.488,355.488,0,0,1-69.5,31.344,353.476,353.476,0,0,1-72.108,15.5l-1.95.225,34.3,39.9.308.37,223.035-.056Z"
                            />
                            <path
                                fill="currentColor"
                                d="M224.168,192.537c5.542,26.047,11.884,52.28,18.884,77.959l.082.348.287.206a315.224,315.224,0,0,0,53.471,31.384,316.016,316.016,0,0,0,65.7,21.9l.616.144.41-.493a513.836,513.836,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.432l.513-1.273-1.375-.123a350.814,350.814,0,0,1-120.531-32.739A355.67,355.67,0,0,1,204.976,65.52l-2.2-2.566.411,3.366C208.26,108.5,215.321,150.971,224.168,192.537Z"
                            />
                            <path
                                fill="currentColor"
                                d="M352.826,335.112l-1.95-.225a353.476,353.476,0,0,1-72.108-15.5,355.488,355.488,0,0,1-69.5-31.344Q196.7,213.073,184.162,138.1l-.575-.2a393.121,393.121,0,0,1-89.207-46A393.552,393.552,0,0,1,3.08,4.09L0,0,95.184,375.329l223.035.056.308-.37Z"
                            />
                        </svg>
                    </div>
                    <p className="text-cream/30 text-[10px] uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Takana Juo. All Rights Reserved.
                    </p>
                </div>

                {/* Right: Socials */}
                <div className="flex gap-4">
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/takanajuoofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-300"
                        aria-label="Instagram"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    {/* WhatsApp */}
                    <a
                        href="https://api.whatsapp.com/send/?phone=60102145431"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-300"
                        aria-label="WhatsApp"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
