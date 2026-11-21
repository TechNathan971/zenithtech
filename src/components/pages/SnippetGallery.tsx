import { useMemo, useState } from "react";
import clsx from "clsx";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { snippets } from "@/data/snippets";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Props = {
  kind: "snippet" | "sample";
  title: Text;
  description: Text;
  eyebrow: Text;
  lead: Text;
  rest: Text;
};

export function SnippetGallery({ kind, title, description, eyebrow, lead, rest }: Props) {
  const { t } = useI18n();
  const items = useMemo(() => snippets.filter((entry) => entry.kind === kind), [kind]);
  const languages = useMemo(() => Array.from(new Set(items.map((entry) => entry.lang))), [items]);
  const [lang, setLang] = useState<string>("all");

  const visible = lang === "all" ? items : items.filter((entry) => entry.lang === lang);

  return (
    <Layout title={title} description={description}>
      <PageHero eyebrow={eyebrow} lead={lead} rest={rest} />

      <section className="pb-14 sm:pb-20">
        <Container>
          {languages.length > 1 && (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={t(["Filter by language", "Filtrer par langage"])}
            >
              {["all", ...languages].map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setLang(entry)}
                  aria-pressed={lang === entry}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    lang === entry
                      ? "bg-brand-600 text-white"
                      : "bg-ink-100 text-ink-700 hover:bg-ink-200",
                  )}
                >
                  {entry === "all" ? t(["All", "Tout"]) : entry}
                </button>
              ))}
            </div>
          )}

          <ul className="mt-8 space-y-10">
            {visible.map((entry) => (
              <li key={entry.id} className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {entry.lang}
                  </span>
                  <h2 className="mt-4 text-2xl font-medium tracking-tight text-ink-950">
                    {t(entry.title)}
                  </h2>
                  <p className="mt-3 text-ink-600">{t(entry.text)}</p>
                </div>
                <div className="min-w-0 space-y-4">
                  {entry.files.map((file) => (
                    <CodeBlock key={file.label} label={file.label} code={file.code} />
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-card bg-ink-50 p-6 sm:p-10">
            <p className="text-2xl font-medium tracking-tight text-ink-950">
              {t([
                "Want a step-by-step walkthrough instead?",
                "Envie plutôt d’un tutoriel pas à pas ?",
              ])}
            </p>
            <div className="mt-6">
              <Button href="/guides" arrow>
                {t(["Browse the guides", "Parcourir les guides"])}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
