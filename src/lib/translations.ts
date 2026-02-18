export type Language = "my" | "en";

const translations = {
    // ==================== NavBar ====================
    nav: {
        story: { my: "Cerita", en: "Story" },
        menu: { my: "Menu", en: "Menu" },
        experience: { my: "Pengalaman", en: "Experience" },
        events: { my: "Acara", en: "Events" },
        open: { my: "Buka", en: "Open" },
        closed: { my: "Tutup", en: "Closed" },
    },

    // ==================== Hero ====================
    hero: {
        subtitle: { my: "Masakan Minangkabau Autentik", en: "Authentic Minangkabau Cuisine" },
        tagline: {
            my: "Di mana warisan bertemu cita rasa. Perjalanan kulinari melalui tradisi kaya Sumatera Barat.",
            en: "Where heritage meets flavor. A culinary journey through the rich traditions of West Sumatra.",
        },
        viewMenu: { my: "Lihat Menu", en: "View Menu" },
        reservation: { my: "Tempahan", en: "Reservation" },
        scroll: { my: "Tatal", en: "Scroll" },
    },

    // ==================== Story ====================
    story: {
        label: { my: "Cerita Kami", en: "Our Story" },
        heading: { my: "Warisan", en: "A Legacy of" },
        headingAccent: { my: "Rasa", en: "Flavor" },
        p1: {
            my: "Lahir dari hati Sumatera Barat, Takana Juo membawa semangat masakan Minangkabau — berani, harum, dan berakar dalam tradisi. Nama kami, bermaksud \"kenang rasa,\" adalah janji yang kami tepati dengan setiap hidangan.",
            en: "Born from the heart of West Sumatra, Takana Juo carries the spirit of Minangkabau cuisine — bold, aromatic, and deeply rooted in tradition. Our name, meaning \"remember the flavors,\" is a promise we keep with every dish.",
        },
        p2: {
            my: "Selama lebih sedekad, dapur kami menjadi tempat berkumpul di mana resipi keluarga bertemu teknik halus. Setiap rempah dipilih sendiri, setiap santan diperah segar, setiap rendang dimasak perlahan sehingga sempurna.",
            en: "For over a decade, our kitchen has been a gathering place where family recipes meet refined technique. Each spice is hand-selected, each coconut freshly pressed, each rendang slow-cooked to perfection.",
        },
        p3: {
            my: "Kami percaya makanan hebat lebih dari sekadar rezeki — ia adalah jambatan antara generasi, perayaan budaya, dan jemputan untuk rasa kekitaan.",
            en: "We believe that great food is more than sustenance — it is a bridge between generations, a celebration of culture, and an invitation to belong.",
        },
        years: { my: "Tahun", en: "Years" },
        dishes: { my: "Hidangan", en: "Dishes" },
        passion: { my: "Keghairahan", en: "Passion" },
        ourKitchen: { my: "Dapur Kami", en: "Our Kitchen" },
    },

    // ==================== Menu ====================
    menu: {
        label: { my: "Pilihan Kami", en: "Our Selection" },
        heading: { my: "The", en: "The" },
        headingAccent: { my: "Menu", en: "Menu" },
        subtitle: {
            my: "Setiap hidangan adalah bab dalam cerita kulinari kami, direka dengan resipi turun-temurun dan bahan tempatan terbaik.",
            en: "Every dish is a chapter in our culinary story, crafted with time-honored recipes and the finest local ingredients.",
        },
        appetizers: { my: "Pembuka Selera", en: "Appetizers" },
        mains: { my: "Hidangan Utama", en: "Main Course" },
        desserts: { my: "Pencuci Mulut", en: "Desserts" },
        drinks: { my: "Minuman", en: "Drinks" },
        viewFullMenu: { my: "Lihat Menu Penuh", en: "View Full Menu" },
        // Item descriptions
        items: {
            perkedel: {
                desc: {
                    my: "Perkedel jagung rangup dengan herba dan rempah wangi, dihidang dengan sambal hijau",
                    en: "Crispy corn fritters with fragrant herbs and spices, served with sambal hijau",
                },
            },
            satePadang: {
                desc: {
                    my: "Sate daging panggang dalam kuah kari kuning yang kaya dengan nasi himpit",
                    en: "Grilled beef skewers in rich yellow curry sauce with pressed rice",
                },
            },
            martabak: {
                desc: {
                    my: "Kulit nipis berisi daging cincang berempah, telur, dan daun bawang",
                    en: "Savory stuffed crepe with spiced minced meat, egg, and green onion",
                },
            },
            keripik: {
                desc: {
                    my: "Keripik ubi kayu nipis bersalut serpihan cili merah pedas",
                    en: "Thin cassava chips coated in fiery red chili flakes",
                },
            },
            rendang: {
                desc: {
                    my: "Daging lembu dimasak perlahan dalam santan dan rempah, hidangan istimewa kami",
                    en: "Slow-cooked beef in rich coconut and spice reduction, our signature dish",
                },
            },
            gulai: {
                desc: {
                    my: "Ayam kampung dimasak dalam kari santan kuning yang harum",
                    en: "Free-range chicken simmered in aromatic yellow coconut curry",
                },
            },
            dendeng: {
                desc: {
                    my: "Dendeng daging salai dan ditumbuk dengan sambal cili hijau segar",
                    en: "Smoked and pounded beef jerky with fresh green chili sambal",
                },
            },
            ikanBakar: {
                desc: {
                    my: "Ikan panggang yang direndam kunyit dan pes rempah rica-rica",
                    en: "Grilled whole fish marinated in turmeric and rica-rica spice paste",
                },
            },
            kolak: {
                desc: {
                    my: "Pisang dan keledek hangat dalam kuah gula melaka dan santan",
                    en: "Warm banana and sweet potato in coconut palm sugar broth",
                },
            },
            kueLapis: {
                desc: {
                    my: "Kek kukus berlapis dengan pandan dan santan",
                    en: "Multi-layered steamed cake with pandan and coconut milk",
                },
            },
            esTeler: {
                desc: {
                    my: "Ais kacang dengan avokado, nangka, kelapa, dan susu pekat",
                    en: "Shaved ice with avocado, jackfruit, coconut, and condensed milk",
                },
            },
            tehTalua: {
                desc: {
                    my: "Teh telur tradisional Minangkabau dengan limau — berbuih dan menyegarkan",
                    en: "Traditional Minangkabau egg tea with lime — frothy and invigorating",
                },
            },
            kopiLuak: {
                desc: {
                    my: "Kopi luwak premium, lembut dan bersahaja dengan nota coklat",
                    en: "Premium civet coffee, smooth and earthy with chocolate undertones",
                },
            },
            esJeruk: {
                desc: {
                    my: "Jus limau nipis segar dengan gula tebu di atas ais dikisar",
                    en: "Freshly squeezed lime juice with cane sugar over crushed ice",
                },
            },
        },
    },

    // ==================== Experience ====================
    experience: {
        label: { my: "Kenapa Pilih Kami", en: "Why Choose Us" },
        heading: { my: "The", en: "The" },
        headingAccent: { my: "Pengalaman", en: "Experience" },
        ambiance: { my: "Suasana", en: "Ambiance" },
        ambianceDesc: {
            my: "Dalaman kayu hangat diilhamkan seni bina tradisional Rumah Gadang Minangkabau, mencipta suasana warisan dan keselesaan.",
            en: "Warm wooden interiors inspired by traditional Minangkabau Rumah Gadang architecture, creating an atmosphere of heritage and comfort.",
        },
        service: { my: "Layanan", en: "Service" },
        serviceDesc: {
            my: "Layanan mesra gaya keluarga berakar dalam tradisi kemurahan hati Minangkabau — di mana setiap tetamu adalah keluarga.",
            en: "Attentive, family-style hospitality rooted in the Minangkabau tradition of generous warmth — where every guest is family.",
        },
        cuisine: { my: "Masakan", en: "Cuisine" },
        cuisineDesc: {
            my: "Dari rendang yang dimasak perlahan berjam-jam hingga pes rempah yang dikisar segar, setiap hidangan mencerminkan komitmen kami terhadap keaslian dan kraf.",
            en: "From rendang slow-cooked for hours to freshly ground spice pastes, every dish reflects our commitment to authenticity and craft.",
        },
        guestRating: { my: "Penilaian Tetamu", en: "Guest Rating" },
        happyGuests: { my: "Tetamu Gembira", en: "Happy Guests" },
        freshIngredients: { my: "Bahan Segar", en: "Fresh Ingredients" },
        inWestSumatra: { my: "Di Sumatera Barat", en: "In West Sumatra" },
    },

    // ==================== Events ====================
    events: {
        label: { my: "Apa Yang Berlaku", en: "What's Happening" },
        heading1: { my: "Acara &", en: "Events &" },
        headingAccent: { my: "Perhimpunan", en: "Gatherings" },
        subtitle: {
            my: "Dari persembahan budaya hingga bengkel kulinari, sentiasa ada sesuatu yang istimewa menanti di Takana Juo.",
            en: "From cultural performances to culinary workshops, there is always something special waiting at Takana Juo.",
        },
        everySaturday: { my: "Setiap Sabtu", en: "Every Saturday" },
        saluangTitle: { my: "Persembahan Saluang Langsung", en: "Live Saluang Performance" },
        saluangDesc: {
            my: "Nikmati melodi memukau muzik seruling buluh tradisional Minangkabau semasa anda menjamu selera. Malam budaya dan masakan.",
            en: "Enjoy the soulful melodies of traditional Minangkabau bamboo flute music while you dine. An evening of culture and cuisine.",
        },
        weekly: { my: "Mingguan", en: "Weekly" },
        rendangDate: { my: "15 Mac, 2026", en: "March 15, 2026" },
        rendangTitle: { my: "Kelas Rendang Master", en: "Rendang Master Class" },
        rendangDesc: {
            my: "Sertai chef utama kami untuk kelas amali eksklusif. Pelajari seni memasak rendang autentik dari awal.",
            en: "Join our head chef for an exclusive hands-on class. Learn the art of slow-cooking authentic rendang from scratch.",
        },
        special: { my: "Istimewa", en: "Special" },
        availableDaily: { my: "Tersedia Setiap Hari", en: "Available Daily" },
        privateDiningTitle: { my: "Jamuan Peribadi", en: "Private Dining" },
        privateDiningDesc: {
            my: "Raikan detik istimewa di ruang makan peribadi kami. Menu tersuai, layanan khusus, dan suasana intim untuk sehingga 20 tetamu.",
            en: "Celebrate special moments in our private dining room. Custom menus, dedicated service, and an intimate atmosphere for up to 20 guests.",
        },
        exclusive: { my: "Eksklusif", en: "Exclusive" },
        learnMore: { my: "Ketahui Lagi", en: "Learn More" },
        ctaHeading: {
            my: "Bersedia untuk Malam yang Tidak Dilupakan?",
            en: "Ready for an Unforgettable Evening?",
        },
        ctaSubtitle: {
            my: "Tempah meja anda hari ini dan alami kehangatan, rasa, dan tradisi Takana Juo.",
            en: "Reserve your table today and experience the warmth, flavor, and tradition of Takana Juo.",
        },
        reserveTable: { my: "Tempah Meja", en: "Reserve a Table" },
    },

    // ==================== Footer ====================
    footer: {
        description: {
            my: "Masakan Minangkabau autentik yang direka dengan keghairahan dan tradisi. Setiap hidangan menceritakan kisah warisan kami.",
            en: "Authentic Minangkabau cuisine crafted with passion and tradition. Every dish tells a story of our heritage.",
        },
        explore: { my: "Terokai", en: "Explore" },
        ourStory: { my: "Cerita Kami", en: "Our Story" },
        visitUs: { my: "Lawati Kami", en: "Visit Us" },
        address: { my: "Alamat", en: "Address" },
        hours: { my: "Waktu Operasi", en: "Hours" },
        contact: { my: "Hubungi", en: "Contact" },
        rights: { my: "Hak cipta terpelihara.", en: "All rights reserved." },
        craftedWith: { my: "Direka dengan ♥ dan tradisi", en: "Crafted with ♥ and tradition" },
    },
} as const;

export type TranslationKey = string;

// Flatten nested keys into dot-notation accessor
// e.g., t("hero.tagline") → translations.hero.tagline[lang]
export function getTranslation(lang: Language, key: string): string {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations;

    for (const k of keys) {
        if (current[k] === undefined) {
            console.warn(`Translation missing: ${key}`);
            return key;
        }
        current = current[k];
    }

    if (typeof current === "object" && current[lang] !== undefined) {
        return current[lang];
    }

    console.warn(`Translation missing for lang "${lang}": ${key}`);
    return key;
}

export default translations;
