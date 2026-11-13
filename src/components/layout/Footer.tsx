import Link from "next/link";
import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { getMainNav, type NavItem } from "@/data/nav";
import { profile } from "@/data/profile";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NewsletterForm } from "./NewsletterForm";

function itemsOf(nav: ReturnType<typeof getMainNav>, ids: string[]): NavItem[] {
  const seen = new Set<string>();
  const result: NavItem[] = [];
  for (const entry of nav) {
    if (entry.type !== "menu" || !ids.includes(entry.menu.id)) continue;
    const { columns, aside } = entry.menu;
    for (const group of aside ? [...columns, aside] : columns) {
      for (const item of group.items) {
        if (seen.has(item.href)) continue;
        seen.add(item.href);
        result.push(item);
      }
    }
  }
  return result;
}

export function Footer() {
  const { locale, t } = useI18n();
  const nav = useMemo(() => getMainNav(locale), [locale]);

  const columns: { title: Text; items: NavItem[] }[] = [
    { title: ["Work", "Travaux"], items: itemsOf(nav, ["work"]) },
    { title: "Services", items: itemsOf(nav, ["services"]) },
    { title: ["Learn", "Apprendre"], items: itemsOf(nav, ["learn"]) },
    {
      title: ["About and contact", "À propos et contact"],
      items: [
        ...itemsOf(nav, ["resources"]),
        { label: t(["Sign in", "Se connecter"]), href: "/sign-in" },
      ],
    },
  ];

  const digits = profile.phone.replace(/\D/g, "");
  const channels = [
    { label: "Email", href: `mailto:${profile.email}` },
    ...(digits ? [{ label: "WhatsApp", href: `https://wa.me/${digits}` }] : []),
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
    { label: "GitHub", href: profile.github },
  ];

  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <Container className="pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <NewsletterForm />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:justify-end">
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:text-brand-800"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink-100 pt-10 lg:grid-cols-4">
          {columns.map((column) => (
            <nav key={t(column.title)} aria-label={t(column.title)}>
              <p className="text-sm font-semibold text-ink-950">{t(column.title)}</p>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-600 transition-colors hover:text-ink-950"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-xs text-ink-500">
          {t([
            "Tool names and logos belong to their owners and are shown only to indicate the tools I use.",
            "Les noms et logos des outils appartiennent à leurs propriétaires et ne servent qu’à indiquer les outils que j’utilise.",
          ])}
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-ink-100 pt-6 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
          <LanguageSwitcher />
          <p>
            © {new Date().getFullYear()} ZenithTech.{" "}
            {t(["A personal learning project.", "Un projet personnel d’apprentissage."])}
          </p>
        </div>
      </Container>
    </footer>
  );
}
