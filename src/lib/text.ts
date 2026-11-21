import type { Locale, Text } from "@/lib/i18n";

/** Both languages of a text, even when it is a plain string. */
export const both = (text: Text): [string, string] =>
  typeof text === "string" ? [text, text] : [text[0], text[1]];

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}