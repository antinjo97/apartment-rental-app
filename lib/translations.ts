import { supabase } from "./supabase"

interface Translation {
  key: string
  lang: string
  value: string
}

const translationsCache: Record<string, Record<string, string>> = {}

export async function getTranslations(lang = "en"): Promise<Record<string, string>> {
  if (translationsCache[lang]) {
    return translationsCache[lang]
  }

  const { data, error } = await supabase.from("content_translations").select("*").eq("lang", lang)

  if (error) {
    console.error("Error fetching translations:", error)
    return {}
  }

  const translations: Record<string, string> = {}
  data.forEach((item: Translation) => {
    translations[item.key] = item.value
  })

  translationsCache[lang] = translations
  return translations
}

export function t(key: string, translations: Record<string, string>, fallback?: string): string {
  return translations[key] || fallback || key
}
