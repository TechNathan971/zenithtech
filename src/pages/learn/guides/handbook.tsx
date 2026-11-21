import clsx from "clsx";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SearchBox } from "@/components/ui/SearchBox";
import { SectionNav, type SectionLink } from "@/components/ui/SectionNav";
import { checklist, glossary } from "@/data/handbook";
import { useI18n } from "@/hooks/useI18n";
import { both } from "@/lib/text";

const sections: SectionLink[] = [
  { id: "checklist", label: ["Before you ship", "Avant de livrer"] },
  { id: "glossary", label: ["Glossary", "Glossaire"] },
];

export default function HandbookPage() {
  const { t } = useI18n();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const total = checklist.reduce((sum, group) => sum + group.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;
  const percent = Math.round((count / total) * 100);

  const terms = useMemo(() => {
    const search = query.trim().toLowerCase();
    return glossary.filter((entry) =>
      !search ? true : `${entry.term} ${t(entry.def)}`.toLowerCase().includes(search),
    );
  }, [query, t]);

  return (
    <Layout
      title={["DevOps handbook", "Manuel DevOps"]}
      description={[
        "A checklist before you ship and a glossary of the words that matter.",
        "Une liste de contrôle avant de livrer et un glossaire des mots qui comptent.",
      ]}
    >
      <PageHero
        eyebrow={["Handbook", "Manuel"]}
        lead={["The short handbook.", "Le manuel court."]}
        rest={[
          "A checklist to run through before every release, and plain-language definitions of the terms you will meet.",
          "Une liste de contrôle à parcourir avant chaque livraison, et des définitions simples des termes que vous rencontrerez.",
        ]}
      />

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[13rem_1fr]">
            <SectionNav sections={sections} />

            <div className="min-w-0 space-y-24">
              <div id="checklist" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Before you ship", "Avant de livrer"])}
                </h2>
                <p className="mt-3 max-w-2xl text-lg text-ink-700">
                  {t([
                    "Tick each item as you check it. Nothing is stored, so you can start fresh next time.",
                    "Cochez chaque point au fur et à mesure. Rien n’est enregistré, vous pouvez donc repartir de zéro la prochaine fois.",
                  ])}
                </p>

                <div className="mt-6 rounded-card border border-ink-100 bg-white/80 p-5">
                  <div className="flex items-center justify-between text-sm font-semibold text-ink-950">
                    <span>
                      {count} / {total}
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-ink-600" aria-live="polite">
                    {count === total
                      ? t([
                          "Everything is checked. You are ready to ship.",
                          "Tout est vérifié. Vous êtes prêt à livrer.",
                        ])
                      : t(["Keep going.", "Continuez."])}
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {checklist.map((group) => (
                    <div
                      key={both(group.title)[0]}
                      className="rounded-card border border-ink-100 bg-white/80 p-6"
                    >
                      <p className="font-semibold text-ink-950">{t(group.title)}</p>
                      <ul className="mt-4 space-y-3">
                        {group.items.map((item) => {
                          const key = both(item)[0];
                          const checked = Boolean(done[key]);
                          return (
                            <li key={key}>
                              <label className="flex cursor-pointer gap-3 text-ink-700">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() =>
                                    setDone((prev) => ({ ...prev, [key]: !prev[key] }))
                                  }
                                  className="peer sr-only"
                                />
                                <span
                                  aria-hidden
                                  className={clsx(
                                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400",
                                    checked
                                      ? "border-brand-600 bg-brand-600 text-white"
                                      : "border-ink-300 bg-white",
                                  )}
                                >
                                  {checked && <Check className="size-3.5" />}
                                </span>
                                <span className={clsx(checked && "text-ink-400 line-through")}>
                                  {t(item)}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div id="glossary" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Glossary", "Glossaire"])}
                </h2>
                <div className="mt-6 max-w-xl">
                  <SearchBox
                    value={query}
                    onChange={setQuery}
                    placeholder={["Search a term", "Chercher un terme"]}
                  />
                </div>

                {terms.length === 0 ? (
                  <p className="mt-8 text-ink-600">
                    {t([
                      "No term matches that search.",
                      "Aucun terme ne correspond à cette recherche.",
                    ])}
                  </p>
                ) : (
                  <dl className="mt-8 divide-y divide-ink-100 rounded-card border border-ink-100 bg-white/80">
                    {terms.map((entry) => (
                      <div
                        key={entry.term}
                        className="grid gap-2 p-5 md:grid-cols-[14rem_1fr] md:gap-8"
                      >
                        <dt className="font-semibold text-ink-950">{entry.term}</dt>
                        <dd className="text-ink-700">{t(entry.def)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className="rounded-card bg-ink-50 p-6 sm:p-10">
                <p className="text-2xl font-medium tracking-tight text-ink-950">
                  {t(["Ready to put it into practice?", "Prêt à le mettre en pratique ?"])}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/guides" arrow>
                    {t(["Follow a guide", "Suivre un guide"])}
                  </Button>
                  <Button href="/learn/cheat-sheets" variant="secondary">
                    {t(["Open the cheat sheets", "Ouvrir les aide-mémoire"])}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
