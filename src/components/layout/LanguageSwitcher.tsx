import clsx from "clsx";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n } from "@/hooks/useI18n";
import { localeNames, locales } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { asPath } = useRouter();
  const { locale, t } = useI18n();

  return (
    <nav aria-label={t(["Language", "Langue"])} className="flex items-center gap-3 text-sm">
      <Globe aria-hidden className="size-4 text-brand-600" />
      <ul className="flex items-center gap-1">
        {locales.map((code) => (
          <li key={code}>
            <Link
              href={asPath}
              locale={code}
              lang={code}
              hrefLang={code}
              aria-current={code === locale ? "true" : undefined}
              className={clsx(
                "rounded-md px-2 py-1 font-medium transition-colors",
                code === locale ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:text-ink-950",
              )}
            >
              {localeNames[code]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
