"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getTranslations } from "@/lib/translations"

interface LanguageContextType {
  language: "en" | "hr"
  setLanguage: (lang: "en" | "hr") => void
  translations: Record<string, string>
  t: (key: string, fallback?: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dohvaćanje preferiranog jezika iz local storage-a ili defaultni "en"
const getInitialLanguage = (): "en" | "hr" => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage === "en" || savedLanguage === "hr") {
      return savedLanguage
    }
    // Provjeri browser jezik
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("hr") || browserLang.startsWith("bs") || browserLang.startsWith("sr")) {
      return "hr"
    }
  }
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<"en" | "hr">("en")
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Postavljanje jezika i spremanje u local storage
  const setLanguage = (lang: "en" | "hr") => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang)
      // Postavi HTML lang atribut
      document.documentElement.lang = lang
    }
  }

  // Učitavanje jezika pri prvom renderiranju
  useEffect(() => {
    const initialLang = getInitialLanguage()
    setLanguageState(initialLang)
    if (typeof window !== "undefined") {
      document.documentElement.lang = initialLang
    }
  }, [])

  // Učitavanje prijevoda kad se jezik promijeni
  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true)
      try {
        const trans = await getTranslations(language)
        setTranslations(trans)
        console.log(`Loaded ${Object.keys(trans).length} translations for ${language}`)
      } catch (error) {
        console.error("Error loading translations:", error)
        // Fallback prijevodi ako se ne mogu učitati iz baze
        setTranslations(getFallbackTranslations(language))
      } finally {
        setIsLoading(false)
      }
    }
    loadTranslations()
  }, [language])

  // Funkcija za prijevod s boljim fallback-om
  const t = (key: string, fallback?: string): string => {
    const translation = translations[key]
    if (translation) return translation

    // Ako nema prijevoda, pokušaj s fallback-om
    if (fallback) return fallback

    // Ako nema ni fallback-a, vrati ključ ali formatiraj ga
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Fallback prijevodi ako se ne mogu učitati iz baze
function getFallbackTranslations(lang: "en" | "hr"): Record<string, string> {
  if (lang === "hr") {
    return {
      home: "Početna",
      apartments: "Apartmani",
      about: "O nama",
      contact: "Kontakt",
      admin: "Admin",
      profile: "Profil",
      login: "Prijava",
      logout: "Odjava",
      signup: "Registracija",
      search: "Pretraži",
      book_now: "Rezerviraj",
      night: "noć",
      loading: "Učitavanje...",
      error: "Greška",
      success: "Uspjeh",
    }
  }
  return {
    home: "Home",
    apartments: "Apartments",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    profile: "Profile",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    search: "Search",
    book_now: "Book Now",
    night: "night",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  }
}
