"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type Language, getTranslation } from "@/lib/translations";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "tj_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>("my"); // Malay default
    const [mounted, setMounted] = useState(false);

    // Load persisted language on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "my") {
            setLangState(stored);
        }
        setMounted(true);
    }, []);

    const setLang = useCallback((newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem(STORAGE_KEY, newLang);
    }, []);

    const t = useCallback(
        (key: string) => getTranslation(lang, key),
        [lang]
    );

    // Prevent hydration mismatch: render with default until mounted
    const value: LanguageContextType = {
        lang: mounted ? lang : "my",
        setLang,
        t: mounted ? t : (key: string) => getTranslation("my", key),
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
