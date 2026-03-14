"use client"

import React, { createContext, useContext, useState } from 'react'
import type { Language } from '../types'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'tr',
    setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('tr')
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)