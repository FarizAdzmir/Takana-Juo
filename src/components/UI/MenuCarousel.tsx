import Image from "next/image";

export interface MenuItem {
    id: number;
    main: string;
    sub: string;
    price: string;
    image: string;
}

export default function MenuCarousel({ item }: { item: MenuItem }) {
    return (
        <div className="flex-shrink-0 w-[280px] md:w-[230px] lg:w-[300px] xl:w-[320px] flex flex-col items-center group relative pb-8 mt-[130px] lg:mt-[150px]">
            {/* Card body */}
            <div className="relative w-full h-full bg-gradient-to-b from-white to-[#EFEFEF] rounded-[40px] pt-[130px] lg:pt-[150px] pb-10 px-6 sm:px-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_60px_rgba(0,0,0,0.12)] transition-shadow duration-300">

                {/* Plate image (Floating Much Higher, High Z-Index so it sits above edge fades) */}
                <div className="absolute -top-[130px] lg:-top-[150px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[200px] md:h-[200px] lg:w-[270px] lg:h-[270px] xl:w-[290px] xl:h-[290px] group-hover:-translate-y-4 transition-transform duration-500 ease-out z-[50]">
                    <Image
                        src={item.image}
                        alt={`${item.main} ${item.sub}`}
                        fill
                        className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
                        sizes="(max-width: 768px) 250px, (max-width: 1024px) 200px, 290px"
                    />
                </div>

                {/* Text info (Left Aligned) */}
                <div className="w-full text-left mt-2 flex flex-col gap-0.5">
                    {/* Size Medium: Nasi Goreng */}
                    <h4 className="font-body font-medium text-sm md:text-base xl:text-lg text-charcoal/70">
                        {item.main}
                    </h4>
                    {/* Size Big (NOT BOLD): Variation */}
                    <h3 className="font-body font-normal text-xl md:text-2xl xl:text-3xl text-black leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.sub === "Original" ? "Classic" : item.sub}
                    </h3>
                </div>

                {/* Price (Smaller) */}
                <div className="w-full text-left mt-12">
                    <span className="font-body font-medium text-sm md:text-base text-charcoal/80">
                        {item.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
