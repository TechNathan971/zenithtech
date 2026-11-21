import clsx from "clsx";
import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { CopyLine } from "@/components/ui/CopyLine";
import { PageHero } from "@/components/ui/PageHero";
import { SearchBox } from "@/components/ui/SearchBox";
import { cheatSheets } from "@/data/cheats";
import { useI18n } from "@/hooks/useI18n";

export default function CheatSheetsPage() {
  const { t } = useI18n();
  const [active, setActive] = useState(cheatSheets[0].slug);
  const [query, setQuery] = useState("");

  const search = query.trim().toLowerCase();

  const rows = useMemo(() => {
    if (!search) {
      const sheet = cheatSheets.find((entry) => entry.slug === active) ?? cheatSheets[0];
      return sheet.items.map((item) => ({ ...item, tool: sheet.name }));
    }
    return cheatSheets.flatMap((sheet) =>
      sheet.items
        .filter((item) => `${item.cmd} ${t(item.what)}`.toLowerCase().includes(search))
        .map((item) => ({ ...item, tool: sheet.name })),
    );
  }, [active, search, t]);

  return (
    <Layout
      title={["Cheat sheets", "Aide-mémoire"]}
      description={[
        "Commands you use every day, ready to copy.",
        "Les commandes de tous les jours, prêtes à copier.",
      ]}
    >
      <PageHero
        eyebrow={["Cheat sheets", "Aide-mémoire"]}
        lead={["The commands you reach for.", "Les commandes dont on a besoin."]}
        rest={[
          "Click a command to copy it. Search across every tool at once.",
          "Cliquez sur une commande pour la copier. Cherchez dans tous les outils à la fois.",
        ]}
      />

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="max-w-xl">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder={[
                "Search commands, e.g. logs or rollback",
                "Chercher une commande, par ex. logs ou rollback",
              ]}
            />
          </div>

          {!search && (
            <div className="mt-6 flex flex-wrap gap-2" role="tablist">
              {cheatSheets.map((sheet) => (
                <button
                  key={sheet.slug}
                  type="button"
                  role="tab"
                  aria-selected={active === sheet.slug}
                  onClick={() => setActive(sheet.slug)}
                  className={clsx(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                    active === sheet.slug
                      ? "bg-brand-600 text-white"
                      : "bg-ink-100 text-ink-700 hover:bg-ink-200",
                  )}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
          )}

          {rows.length === 0 ? (
            <p className="mt-10 text-ink-600">
              {t([
                "No command matches that search.",
                "Aucune commande ne correspond à cette recherche.",
              ])}
            </p>
          ) : (
            <ul className="mt-8 grid gap-x-8 gap-y-5 lg:grid-cols-2">
              {rows.map((row) => (
                <li key={`${row.tool}-${row.cmd}`} className="min-w-0">
                  <p className="mb-2 flex items-center gap-2 text-sm text-ink-700">
                    {search && (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                        {row.tool}
                      </span>
                    )}
                    {t(row.what)}
                  </p>
                  <CopyLine command={row.cmd} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </Layout>
  );
}
