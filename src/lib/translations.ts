export type Language = "my" | "en";

const translations = {
    // ==================== NavBar ====================
    nav: {
        story: { my: "Kisah", en: "Story" },
        menu: { my: "Menu", en: "Menu" },
        reservation: { my: "Tempahan", en: "Reservation" },
        experience: { my: "Pengalaman", en: "Experience" },
        events: { my: "Jamuan", en: "Events" },
        open: { my: "Buka", en: "Open" },
        closed: { my: "Tutup", en: "Closed" },
    },

    // ==================== Hero ====================
    hero: {
        subtitle: { my: "Authentic Minang Food", en: "Authentic Minang Food" },
        tagline1: { my: "THIS IS OUR LEGACY", en: "THIS IS OUR LEGACY" },
        tagline2: { my: "ENJOY THE SIMPLE PLEASURES", en: "ENJOY THE SIMPLE PLEASURES" },
        viewMenu: { my: "Lihat Menu", en: "View Menu" },
        reservation: { my: "Tempahan", en: "Reservation" },
        scroll: { my: "Scroll", en: "Scroll" },
    },

    // ==================== Story ====================
    story: {
        label: { my: "Kisah Kami", en: "Our Story" },
        heading: { my: "Warisan", en: "A Legacy of" },
        headingAccent: { my: "Rasa", en: "Flavor" },
        p1: {
            my: "Berasal dari Bukit Tinggi, Takana Juo membawa semangat rasa Minangkabau — ringkas, mengenyangkan, dan dekat di hati. Namanya yang bermaksud “mengingati rasa” lahir daripada sebuah perjalanan merantau, apabila seorang bapa berhijrah dari Indonesia ke Malaysia dengan harapan untuk membina perniagaan kecil demi menyara keluarga.",
            en: "From Bukit Tinggi comes the spirit of Minangkabau flavors—bold, comforting, and deeply rooted in everyday tradition. The name Takana Juo, meaning “Will Always Be Remembered,” reflects home-cooked meals prepared with passion and enriched by ancestral heritage.",
        },
        p2: {
            my: "Bermula secara sederhana di atas beca, perniagaan ini mula menjual nasi goreng di Pasar Minggu Kampung Baru pada tahun 1995, beroperasi dari jam 3 petang hingga 12 malam. Fokusnya jelas dan jujur — nasi goreng panas dimasak terus, disajikan bersama lauk pilihan seperti telur, ayam, atau daging. Semua resipi adalah olahan sendiri, diasah melalui masa, usaha, dan kesungguhan.",
            en: "The journey began humbly in 1995 at Pasar Minggu Kampung Baru. Using a beca (trishaw), the family sold nasi goreng from 3:00 p.m. until midnight. The focus was simple and honest: freshly cooked-to-order nasi goreng, served with familiar sides such as egg, chicken, or beef. Each recipe was carefully preserved and refined over time through repetition, patience, and care.",
        },
        p3: {
            my: "Lebih daripada sekadar perniagaan, Takana Juo dibina untuk kelangsungan hidup dan masa depan keluarga. Apa yang bermula kecil kini menjadi legasi yang terus bertahan — masih kekal berniaga hingga ke hari ini, menyajikan rasa yang sederhana, ikhlas, dan penuh kenangan.",
            en: "More than just a business, Takana Juo was built to put food on the table and move the family forward. What started as a small roadside effort has grown into a lasting tradition—still operating strong today, serving the same comforting flavors that have accompanied generations through time.",
        },
        years: { my: "Tahun", en: "Years" },
        tradition: { my: "Tradisi", en: "Tradition" },
        dishes: { my: "Hidangan", en: "Dishes" },
        passion: { my: "Dedikasi", en: "Passion" },
        ourKitchen: { my: "Dapur Kami", en: "Our Kitchen" },
    },

    // ==================== Menu ====================
    menu: {
        label: { my: "Authentic Minang Food", en: "Authentic Minang Food" },
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
            ngOriginal: {
                desc: {
                    my: "Resepi nasi goreng asli yang dimasak dengan sempurna dan beraroma tradisional.",
                    en: "The original fried rice recipe cooked to perfection with traditional aromas.",
                }
            },
            ngTelur: {
                desc: {
                    my: "Nasi goreng dihidangkan bersama telur mata yang segar dan sedap.",
                    en: "Fried rice served with a fresh and delicious sunny-side-up egg.",
                }
            },
            ngDaging: {
                desc: {
                    my: "Nasi goreng lazat dengan potongan daging yang empuk dan berperisa.",
                    en: "Delicious fried rice with tender and flavorful slices of beef.",
                }
            },
            ngAyam: {
                desc: {
                    my: "Nasi goreng hangat dengan potongan ayam goreng rempah asli.",
                    en: "Warm fried rice with pieces of authentic spiced fried chicken.",
                }
            },
            ngDagingTelur: {
                desc: {
                    my: "Kombinasi klasik daging empuk dan telur mata mendarat sempurna di atas nasi goreng.",
                    en: "Classic combination of tender beef and a sunny-side-up egg landing perfectly on fried rice.",
                }
            },
            ngAyamTelur: {
                desc: {
                    my: "Nasi goreng mantap bersama ayam berempah dan telur mata menambat selera.",
                    en: "Robust fried rice with spiced chicken and a sunny-side-up egg to capture your appetite.",
                }
            },
            ngAyamDaging: {
                desc: {
                    my: "Hidangan nasi goreng mewah dengan dua jenis lauk, ayam dan daging yang meriah.",
                    en: "Lavish fried rice dish with two types of protein, joyous chicken and beef.",
                }
            },
            ngSpecial: {
                desc: {
                    my: "Hidangan istimewa sebenar: Nasi goreng yang disatukan dengan ayam, daging, dan telur dalam satu hidangan sempurna.",
                    en: "A true special: Fried rice brought together with chicken, beef, and egg in one perfect dish.",
                }
            },
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
        label: { my: "Authentic Minang Food", en: "Authentic Minang Food" },
        heading: { my: "Sebuah", en: "The" },
        headingAccent: { my: "Pengalaman", en: "Experience" },
        ambiance: { my: "Penyediaan", en: "Craft" },
        ambianceDesc: {
            my: "Nasi goreng digoreng rapi dengan adunan resepi warisan turun-temurun, memastikan setiap butir nasi kaya dengan rasa yang seimbang.",
            en: "Our Nasi Goreng is prepared using a heritage blend of family ingredients, carefully tossed so each grain carries a full, balanced flavor.",
        },
        service: { my: "Perapan", en: "Marination" },
        serviceDesc: {
            my: "Ayam dan daging diperap sebati dengan kunyit dan rempah rahsia turun-temurun, membangkitkan aroma lembut dan rasa yang mendalam.",
            en: "Chicken and beef are marinated in turmeric and time-honored secret spices, imparting a gentle fragrance and a well-developed taste.",
        },
        cuisine: { my: "Tekstur", en: "Texture" },
        cuisineDesc: {
            my: "Telur segar diaduk sehingga gebu sempurna, menghasilkan telur dadar keemasan yang ringan dan lembut di lidah.",
            en: "Farm-fresh eggs are beaten to perfection, creating a fluffy, golden omelette that is light and melts in the mouth.",
        },
        customerRating: { my: "Rating Pelanggan", en: "Customer Rating" },
        freshIngredients: { my: "Bahan Segar", en: "Fresh Ingredients" },
        inKualaLumpur: { my: "Di Kuala Lumpur", en: "In Kuala Lumpur" },
    },

    // ==================== Events ====================
    events: {
        label: { my: "Authentic Minang Food", en: "Authentic Minang Food" },
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
