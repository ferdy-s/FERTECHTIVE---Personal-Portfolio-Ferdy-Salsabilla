import { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["id", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function detectLocale(req: NextRequest): Locale {
  // Ambil dari cookie jika ada
  const cookieLang = req.cookies.get("lang")?.value;
  if (cookieLang && SUPPORTED_LOCALES.includes(cookieLang as Locale)) {
    return cookieLang as Locale;
  }

  // Ambil dari header Accept-Language
  const headerLang = req.headers.get("accept-language");
  if (headerLang) {
    const preferred = headerLang.split(",")[0].split("-")[0];
    if (SUPPORTED_LOCALES.includes(preferred as Locale)) {
      return preferred as Locale;
    }
  }

  // Default fallback
  return "en";
}
