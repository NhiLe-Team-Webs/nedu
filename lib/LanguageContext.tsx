"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { vi } from './translations/vi';
import { en } from './translations/en';

type Language = 'vi' | 'en';
type Translations = typeof vi;

// Helper type to access nested properties safely
type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)];

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('vi');

    useEffect(() => {
        // Check localStorage first
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
            setLanguageState(savedLang);
        } else {
            // Should default to 'vi' as per layout
            setLanguageState('vi');
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = language === 'vi' ? vi : en;

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
