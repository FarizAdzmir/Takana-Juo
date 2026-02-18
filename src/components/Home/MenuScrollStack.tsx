// @ts-nocheck
"use client";

import CardStack from "../UI/CardStack";

interface MenuItem {
    id: number;
    name: string;
    price: string;
    variation: "Ala Carte" | "Combo";
}

const menuItems: MenuItem[] = [
    { id: 1, name: "Nasi Goreng", price: "RM 4", variation: "Ala Carte" },
    { id: 2, name: "Nasi Goreng Telur", price: "RM 5", variation: "Ala Carte" },
    { id: 3, name: "Nasi Goreng Daging", price: "RM 7", variation: "Ala Carte" },
    { id: 4, name: "Nasi Goreng Ayam", price: "RM 10", variation: "Ala Carte" },
    { id: 5, name: "Nasi Goreng Daging Telur", price: "RM 9", variation: "Combo" },
    { id: 6, name: "Nasi Goreng Ayam Telur", price: "RM 11", variation: "Combo" },
    { id: 7, name: "Nasi Goreng Special", price: "RM 12", variation: "Combo" },
];

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-charcoal-light border border-cream/5 hover:border-gold/30 transition-colors duration-500 overflow-hidden group">
            {/* Image Placeholder (Top on Mobile, Left on Desktop) */}
            <div className="w-full h-[60%] md:w-1/2 md:h-full bg-charcoal border-b md:border-b-0 md:border-r border-cream/5 flex items-center justify-center relative overflow-hidden">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#faf6f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <div className="flex flex-col items-center gap-2 md:gap-3 opacity-30 relative z-10 group-hover:opacity-50 transition-opacity duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 md:w-10 md:h-10 text-cream/40 group-hover:text-gold/60 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                        />
                    </svg>
                    <span className="text-cream/20 text-[8px] md:text-[10px] uppercase tracking-[0.2em] group-hover:text-gold/60 transition-colors">
                        Photo
                    </span>
                </div>
            </div>

            {/* Content Details (Bottom on Mobile, Right on Desktop) */}
            <div className="w-full h-[40%] md:w-1/2 md:h-full p-5 md:p-8 relative">

                {/* Mobile Layout: Name -> Price -> Variation */}
                <div className="md:hidden flex flex-col justify-center h-full gap-1">
                    <h3 className="font-heading text-3xl text-cream leading-tight text-left">
                        {item.name}
                    </h3>
                    <span className="font-heading text-2xl text-gold text-left">
                        {item.price}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cream/50 text-left mt-1">
                        {item.variation}
                    </span>
                </div>

                {/* Desktop Layout: Original */}
                <div className="hidden md:flex flex-col justify-between h-full">
                    {/* Top: Number & Tag */}
                    <div className="flex items-center justify-between">
                        <span className="text-cream/20 text-xs uppercase tracking-[0.3em] font-body">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                            className={`text-[10px] uppercase tracking-[0.25em] px-3 border ${item.variation === "Combo"
                                ? "text-gold border-gold/30 bg-gold/5"
                                : "text-cream/50 border-cream/10"
                                }`}
                        >
                            {item.variation}
                        </span>
                    </div>

                    {/* Middle: Name */}
                    <div className="flex-1 flex items-center">
                        <h3 className="font-heading text-5xl text-cream leading-tight group-hover:text-gold transition-colors duration-300">
                            {item.name}
                        </h3>
                    </div>

                    {/* Bottom: Price */}
                    <div className="flex items-end justify-between">
                        <span className="text-gold/60 text-xs uppercase tracking-wider group-hover:text-gold transition-colors">
                            Price
                        </span>
                        <span className="font-heading text-4xl text-gold">
                            {item.price}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MenuScrollStack() {
    const cardStackItems = menuItems.map((item, index) => ({
        id: item.id,
        content: <MenuCard item={item} index={index} />,
    }));

    return (
        <section id="menu" className="relative bg-charcoal min-h-screen">
            {/* Section Header */}
            <div className="relative z-10 text-center pt-20 md:pt-32 pb-0 px-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-6 md:w-8 h-[1px] bg-gold" />
                    <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.3em]">
                        Our Selection
                    </span>
                    <div className="w-6 md:w-8 h-[1px] bg-gold" />
                </div>
                <h2 className="font-heading text-3xl md:text-5xl text-cream">
                    The <span className="text-gold italic">Menu</span>
                </h2>
                <p className="text-cream/50 max-w-sm md:max-w-md mx-auto text-xs md:text-sm leading-relaxed mt-4">
                    Simple. Authentic. Homestyle Nasi Goreng — the soul of Malaysian street food,
                    served with love at Takana Juo.
                </p>
            </div>

            {/* CardStack (Now functional on Mobile & Desktop) */}
            <div className="relative z-0 px-4 md:px-10 xl:px-20 2xl:px-28 pb-20">
                <CardStack items={cardStackItems} />
            </div>

            {/* Removed separate Mobile Horizontal Scroll */}

            {/* Spacing after stack */}
            <div className="h-[10vh] md:h-[20vh]" />
        </section>
    );
}
