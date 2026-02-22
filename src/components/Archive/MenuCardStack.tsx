// @ts-nocheck
"use client";

import CardStack from "../UI/CardStack";

interface MenuItem {
    id: number;
    main: string;
    sub: string;
    price: string;
    image?: string; // Optional for future
}

const menuItems: MenuItem[] = [
    { id: 1, main: "Nasi Goreng", sub: "Original", price: "RM 4" },
    { id: 2, main: "Nasi Goreng", sub: "Telur", price: "RM 5" },
    { id: 3, main: "Nasi Goreng", sub: "Daging", price: "RM 7" },
    { id: 4, main: "Nasi Goreng", sub: "Ayam", price: "RM 10" },
    { id: 5, main: "Nasi Goreng", sub: "Daging Telur", price: "RM 9" },
    { id: 6, main: "Nasi Goreng", sub: "Ayam Telur", price: "RM 11" },
    { id: 7, main: "Nasi Goreng", sub: "Special", price: "RM 12" },
];

function MenuCard({ item }: { item: MenuItem; index: number }) {
    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-charcoal-light border border-cream/5 hover:border-gold/30 transition-colors duration-500 overflow-hidden group">
            {/* Image/Pattern Side (Top on Mobile, Left on Desktop) */}
            <div className="w-full h-[55%] md:w-1/2 md:h-full bg-charcoal border-b md:border-b-0 md:border-r border-cream/5 flex items-center justify-center relative overflow-hidden">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#faf6f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Decorative Circle */}
                <div className="absolute w-[80%] aspect-square rounded-full border border-gold/5 group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute w-[60%] aspect-square rounded-full border border-gold/10 group-hover:scale-105 transition-transform duration-700 ease-out delay-75" />

                <div className="flex flex-col items-center gap-2 md:gap-3 opacity-30 relative z-10 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 md:w-16 md:h-16 text-cream/40 group-hover:text-gold transition-colors duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={0.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                        />
                    </svg>
                </div>
            </div>

            {/* Content Details (Bottom on Mobile, Right on Desktop) */}
            <div className="w-full h-[45%] md:w-1/2 md:h-full p-6 md:p-10 relative flex flex-col justify-center">

                {/* Main Name */}
                <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-[0.9] tracking-wide group-hover:text-gold transition-colors duration-300">
                    {item.main}
                </h3>

                {/* Sub variation */}
                <div className="flex items-center gap-4 mt-2 md:mt-4">
                    <span className="w-8 md:w-12 h-[1px] bg-gold/50 group-hover:w-16 transition-all duration-300" />
                    <span className="font-serif italic text-xl md:text-2xl text-gold/80">
                        {item.sub}
                    </span>
                </div>

                {/* Price (Absolute positioning for cleaner layout) */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                    <span className="font-heading text-2xl md:text-4xl text-cream group-hover:text-gold transition-colors duration-300">
                        {item.price}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Menu() {
    const cardStackItems = menuItems.map((item, index) => ({
        id: item.id,
        content: <MenuCard item={item} index={index} />,
    }));

    return (
        <section id="menu" className="relative min-h-screen">
            {/* Section Header */}
            <div className="sticky top-0 z-30 text-center pt-10 md:pt-16 pb-10 px-4 backdrop-blur-sm transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-6 md:w-8 h-[1px] bg-gold" />
                    <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.3em]">
                        Our Selection
                    </span>
                    <div className="w-6 md:w-8 h-[1px] bg-gold" />
                </div>
                <h2 className="font-trajan-bold text-3xl md:text-5xl text-cream">
                    The <span className="text-gold italic font-normal">Menu</span>
                </h2>
                <p className="font-body text-cream/50 max-w-sm md:max-w-md mx-auto text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed mt-4">
                    Simple. Authentic. Homestyle Nasi Goreng — the soul food.
                </p>
            </div>

            {/* CardStack (Now functional on Mobile & Desktop) */}
            <div className="relative z-0 px-4 md:px-10 xl:px-20 2xl:px-28 pb-20">
                {/* topOffset = Header Height + padding */}
                {/* Mobile: Header is approx 200px. Desktop: Approx 260px. */}
                {/* We can pass a responsive value if we used CSS classes, but here we estimate safe buffer */}
                <CardStack
                    items={cardStackItems}
                    topOffset="260px"
                    cardGap={0}
                    scaleFactor={0}
                />
            </div>

            {/* Removed separate Mobile Horizontal Scroll */}

            {/* Spacing after stack */}
            <div className="h-[10vh] md:h-[20vh]" />
        </section>
    );
}
