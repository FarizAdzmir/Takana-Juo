export type Language = "my" | "en";

const translations = {
    // ==================== NavBar ====================
    nav: {
        menu: { my: "Menu", en: "Menu" },
        reservation: { my: "Tempahan", en: "Reservation" },
        open: { my: "Buka", en: "Open" },
        closed: { my: "Tutup", en: "Close" },
    },

    // ==================== Hero ====================
    hero: {
        subtitle: { my: "Makanan Warisan Minang", en: "Authentic Minang Food" },
        tagline1: { my: "INI LEGASI KAMI", en: "THIS IS OUR LEGACY" },
        tagline2: { my: "KENIKMATAN YANG SEDERHANA", en: "ENJOY THE SIMPLE PLEASURE" },
        scroll: { my: "Scroll", en: "Scroll" },
    },

    // ==================== Story ====================
    story: {
        label: { my: "Kisah Kami", en: "Our Story" },
        heading: { my: "Warisan", en: "A Legacy of" },
        headingAccent: { my: "Rasa", en: "Flavor" },
        p1: {
            my: "Berasal dari Bukit Tinggi, Takana Juo membawa semangat rasa Minangkabau — ringkas, mengenyangkan, dan dekat di hati. Namanya yang bermaksud 'mengingati rasa' lahir daripada sebuah perjalanan merantau, apabila seorang bapa berhijrah dari Indonesia ke Malaysia dengan harapan untuk membina perniagaan kecil demi menyara keluarga.",
            en: "From Bukit Tinggi comes the spirit of Minangkabau flavors—bold, comforting, and deeply rooted in everyday tradition. The name Takana Juo, meaning 'Will Always Be Remembered,' reflects home-cooked meals prepared with passion and enriched by ancestral heritage.",
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
        passion: { my: "Dedikasi", en: "Passion" },
    },

    // ==================== Menu ====================
    menu: {
        label: { my: "Makanan Warisan Minang", en: "Authentic Minang Food" },
        heading: { my: "The", en: "The" },
        headingAccent: { my: "Menu", en: "Menu" },
        categories: {
            nasiGoreng: { my: "Nasi Goreng", en: "Nasi Goreng" },
            addOn: { my: "Tambahan", en: "Add On" },
        },
        variations: {
            biasa: { my: "Biasa", en: "Classic" },
            telur: { my: "Telur", en: "Egg" },
            daging: { my: "Daging", en: "Beef" },
            ayam: { my: "Ayam", en: "Chicken" },
            dagingTelur: { my: "Daging Telur", en: "Beef & Egg" },
            ayamTelur: { my: "Ayam Telur", en: "Chicken & Egg" },
            ayamDaging: { my: "Ayam Daging", en: "Chicken & Beef" },
            special: { my: "Special", en: "Special" },
        },
        extras: {
            extraCili: { my: "Extra Cili Potong", en: "Chopped Chilies Soy Sauce" },
            extraNasi: { my: "Extra Nasi", en: "Extra Rice" },
        },
    },

    // ==================== Experience ====================
    experience: {
        label: { my: "Makanan Warisan Minang", en: "Authentic Minang Food" },
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
    },

    // ==================== Reservation ====================
    reservation: {
        label: { my: "Makanan Warisan Minang", en: "Authentic Minang Food" },
        heading: { my: "Buat", en: "Make a" },
        headingAccent: { my: "Tempahan", en: "Reservation" },
        foodpanda: { my: "PESAN SEKARANG DI FOODPANDA", en: "WE'RE AVAILABLE ON FOODPANDA" },
        grabfood: { my: "PESAN SEKARANG DI GRAB FOOD", en: "WE'RE AVAILABLE ON GRAB FOOD" },
    },

    // ==================== Footer ====================
    footer: {
        quote: {
            my: "RASA TRADISI MINANG",
            en: "TASTE OF MINANG TRADITION",
        },
        brand: {
            my: "TAKANA JUO",
            en: "TAKANA JUO",
        },
        description: {
            my: "SAJIAN YANG DISEDIAKAN DENGAN SEPENUH HATI DAN DIPERKAYA OLEH WARISAN LELUHUR",
            en: "MEALS PREPARED WITH PASSION AND ENRICHED BY ANCESTRAL HERITAGE",
        },
        contactText: {
            my: "UNTUK TEMPAHAN SILA HUBUNGI KAMI +60 10-214 5431",
            en: "FOR RESERVATION OR BOOKING PLEASE CONTACT US +60 10-214 5431",
        },
        connectTitle: {
            my: "Hubungi kami",
            en: "Connect with us",
        },
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
