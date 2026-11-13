import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { writing } from "@/data/portfolio";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

const metrics: { name: Text; text: Text }[] = [
  {
    name: ["Deployment frequency", "Fréquence de déploiement"],
    text: [
      "How often the team releases to production.",
      "À quelle fréquence l’équipe livre en production.",
    ],
  },
  {
    name: ["Lead time for changes", "Délai de livraison des changements"],
    text: [
      "How long a change takes to get from commit to running in production.",
      "Le temps qu’il faut à un changement pour passer du commit à la production.",
    ],
  },
  {
    name: ["Change failure rate", "Taux d’échec des changements"],
    text: [
      "The share of releases that cause a failure and need a fix.",
      "La part des livraisons qui provoquent une panne et nécessitent une correction.",
    ],
  },
  {
    name: ["Time to restore service", "Temps de rétablissement du service"],
    text: [
      "How quickly the team recovers when something breaks.",
      "La rapidité avec laquelle l’équipe se rétablit quand quelque chose casse.",
    ],
  },
];

const results: { name: Text; before: Text; after: Text }[] = [
  {
    name: ["Deployment lead time", "Délai de déploiement"],
    before: ["4.2 hours", "4,2 heures"],
    after: ["Under 6 minutes", "Moins de 6 minutes"],
  },
  {
    name: ["Deployment frequency", "Fréquence de déploiement"],
    before: ["Baseline", "Référence"],
    after: "+750%",
  },
  {
    name: ["Change failure rate", "Taux d’échec des changements"],
    before: ["34%", "34 %"],
    after: ["4%", "4 %"],
  },
  {
    name: ["Time to restore service", "Temps de rétablissement"],
    before: "—",
    after: ["11 minutes", "11 minutes"],
  },
];

export default function ResearchThesisPage() {
  const { t } = useI18n();
  const thesis = writing[0];

  return (
    <Layout title={["Research thesis", "Mémoire de recherche"]} description={thesis.title}>
      <section className="py-14 sm:py-20">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            <ChevronLeft aria-hidden className="size-4" />
            {t(["All work", "Tous les travaux"])}
          </Link>
          <p className="mt-8 text-sm font-semibold tracking-widest text-brand-600 uppercase">
            {t(thesis.kind)}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl leading-tight font-medium tracking-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
            {t(thesis.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-600">
            {t([
              "This thesis evaluates how automated CI/CD pipelines affect software delivery in humanitarian systems, using the four DORA metrics as the yardstick.",
              "Ce mémoire évalue l’effet des pipelines CI/CD automatisés sur la livraison de logiciels dans les systèmes humanitaires, en prenant les quatre métriques DORA comme étalon.",
            ])}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={thesis.url} size="lg" arrow target="_blank" rel="noopener noreferrer">
              {t(["Open the thesis", "Ouvrir le mémoire"])}
            </Button>
            <Button href="/work/dwts" size="lg" variant="secondary">
              {t(["See the DWTS project", "Voir le projet DWTS"])}
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["The four DORA metrics", "Les quatre métriques DORA"])}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <li key={t(metric.name)} className="rounded-card border border-ink-100 p-5">
                <p className="font-semibold text-ink-950">{t(metric.name)}</p>
                <p className="mt-2 text-sm text-ink-600">{t(metric.text)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["Results on DWTS", "Résultats sur DWTS"])}
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left">
              <thead className="text-sm text-ink-500">
                <tr className="border-b border-ink-100">
                  <th className="py-3 font-medium">{t(["Metric", "Métrique"])}</th>
                  <th className="py-3 font-medium">{t(["Before", "Avant"])}</th>
                  <th className="py-3 font-medium">{t(["After", "Après"])}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={t(row.name)} className="border-b border-ink-100">
                    <td className="py-4 font-medium text-ink-950">{t(row.name)}</td>
                    <td className="py-4 text-ink-600 tabular-nums">{t(row.before)}</td>
                    <td className="py-4 font-semibold text-brand-700 tabular-nums">
                      {t(row.after)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
