import Image from "next/image";
import AnimatedText from "../UI/AnimatedText";
import { motion } from "framer-motion";

export interface MenuItemData {
    id: string | number;
    name: string;
    price: string;
}

export interface MenuCategoryData {
    title: string;
    items: MenuItemData[];
}

interface MenuCardProps {
    title: string;
    subtitle: string;
    heroImage: string;
    secondaryImage: string; // Kept in interface but unused due to no-50/50 rule
    mainCategories: MenuCategoryData[];
    sideCategories: MenuCategoryData[];
}

export default function MenuCard({
    title,
    subtitle,
    mainCategories,
    sideCategories,
}: MenuCardProps) {
    // Combine all categories into one flat list for this single-column layout
    const allCategories = [...mainCategories, ...sideCategories];

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl bg-charcoal text-white my-12 border-t border-gold/20 flex flex-col font-body">

            {/* Content Area */}
            <div className="w-full h-full p-8 md:p-16 flex flex-col">

                {/* Header Section mimicking Amrit Palace .top_menu -> .heading_featured */}
                <div className="w-full flex justify-between items-start mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h3 className="uppercase flex flex-col gap-2 font-trajan-bold text-3xl md:text-4xl lg:text-5xl text-gold leading-none tracking-tight">
                            <AnimatedText text={title} />
                            <AnimatedText text={subtitle} delayOffset={0.3} className="text-white/90 font-light tracking-[0.2em] text-2xl md:text-3xl" />
                        </h3>
                    </div>
                    {/* Icon container mimicking .icon_plates */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="hidden md:flex w-32 h-32 md:w-40 md:h-40 items-center justify-center flex-shrink-0 -mt-6"
                    >
                        {/* Logo from NavBar */}
                        <svg
                            id="Takana_Juo_Nav_MenuCard"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 1000 859.54"
                            className="w-full h-auto drop-shadow-sm opacity-90"
                        >
                            <defs>
                                <linearGradient
                                    id="nav-linear-gradient-mc1"
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
                                    id="nav-linear-gradient-mc2"
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
                                    id="nav-linear-gradient-mc3"
                                    x1="193.18"
                                    y1="-67.77"
                                    x2="193.18"
                                    y2="505.3"
                                    xlinkHref="#nav-linear-gradient-mc1"
                                />
                            </defs>
                            <g id="Logo_Nav_MC">
                                <path
                                    d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z"
                                    style={{ fill: "url(#nav-linear-gradient-mc1)" }}
                                />
                                <path
                                    d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z"
                                    style={{ fill: "url(#nav-linear-gradient-mc2)" }}
                                />
                                <path
                                    d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z"
                                    style={{ fill: "url(#nav-linear-gradient-mc3)" }}
                                />
                            </g>
                        </svg>
                    </motion.div>
                </div>

                {/* Categories List (The Amrit Palace .cms_list / .featured_menu_item structure) */}
                <div className="flex flex-col gap-16 w-full">
                    {allCategories.map((category, catIdx) => (
                        <div key={`cat-${catIdx}`} className="w-full">

                            {/* Category Title Header */}
                            {category.title !== "Nasi Goreng Categories" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-8 flex items-center gap-4"
                                >
                                    <div className="h-[1px] w-8 bg-gold"></div>
                                    <h4 className="text-gold uppercase tracking-[0.2em] font-medium text-lg md:text-xl">{category.title}</h4>
                                </motion.div>
                            )}

                            {/* Menu Items Loop */}
                            <div className="w-full flex flex-col gap-8">
                                {category.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={`item-${item.id}`}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: itemIdx * 0.05, duration: 0.6, ease: "easeOut" }}
                                        className="w-full flex flex-col group cursor-default"
                                    >
                                        {/* .menu_line container */}
                                        <div className="w-full flex flex-col">
                                            {/* .name_pr -> .name_txt & .price_box */}
                                            <div className="w-full flex justify-between items-end pb-3 border-b border-white/5 group-hover:border-gold/30 transition-colors duration-300">
                                                <div className="text-xl md:text-2xl font-body text-white/90 group-hover:text-gold transition-colors duration-300 pr-4">
                                                    {item.name}
                                                </div>
                                                <div className="text-lg md:text-xl font-body text-gold whitespace-nowrap tracking-wide">
                                                    {item.price}
                                                </div>
                                            </div>

                                            {/* .name_desc -> leaving structural space as requested */}
                                            <div className="w-full h-8 md:h-10 opacity-60 text-white/60 text-sm md:text-base italic pt-2">
                                                {/* Hidden description placeholder to maintain the aesthetic Amrit Palace spacing */}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
