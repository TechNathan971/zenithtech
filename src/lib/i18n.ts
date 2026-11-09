export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Either one string (the same in every language) or a pair: [english, french]. */
export type Text = string | readonly [en: string, fr: string];

const position: Record<Locale, 0 | 1> = { en: 0, fr: 1 };

export function toLocale(value: string | undefined): Locale {
  return value === "fr" ? "fr" : "en";
}

export function tx(text: Text, locale: Locale | undefined): string {
  if (typeof text === "string") return text;
  return text[position[locale ?? defaultLocale]] ?? text[0];
}
