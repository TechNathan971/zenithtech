import { useRouter } from "next/router";
import { toLocale, tx, type Text } from "@/lib/i18n";

export function useI18n() {
  const { locale: raw } = useRouter();
  const locale = toLocale(raw);
  return { locale, t: (text: Text) => tx(text, locale) };
}
