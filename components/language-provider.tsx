'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'fr' | 'en'

type LanguageContextType = {
  language: Language
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved === 'fr' || saved === 'en') {
        setLanguage(saved)
      }
  }, [])

  const changeLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
  
    if (!context) {
      throw new Error('useLanguage must be used inside LanguageProvider')
    }
  
    return context
  }