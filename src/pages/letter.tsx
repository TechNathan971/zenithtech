import { Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { education, projects, writing } from "@/data/portfolio";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Milestone = { title: Text; text: Text; href?: string; cta?: Text };

const dwts = projects[0];

const milestones: Milestone[] = [
  {
    title: education.degree,
    text: [
      `Completed in ${education.year}, after building real systems alongside the coursework.`,
      `Obtenu en ${education.year}, après avoir construit de vrais systèmes en parallèle des cours.`,
    ],
  },
  {
    title: writing[0].kind,
    text: writing[0].title,
    href: "/work/research-thesis",
    cta: ["Read the thesis", "Lire le mémoire"],
  },
  {
    title: ["DWTS in numbers", "DWTS en chiffres"],
    text: [
      "Lead time from 4.2 hours to under 6 minutes, deployment frequency up 750%, failure rate from 34% to 4%, recovery in 11 minutes.",
      "Délai de 4,2 heures à moins de 6 minutes, fréquence de déploiement en hausse de 750 %, taux d’échec de 34 % à 4 %, rétablissement en 11 minutes.",
    ],
    href: `/work/${dwts.slug}`,
    cta: ["See the project", "Voir le projet"],
  },
  {
    title: ["Building ZenithTech", "Construire ZenithTech"],
    text: [
      "This site, built step by step with Next.js, TypeScript and Tailwind, on its way through containers and a full CI/CD pipeline.",
      "Ce site, construit étape par étape avec Next.js, TypeScript et Tailwind, en route vers les conteneurs et un pipeline CI/CD complet.",
    ],
    href: "https://github.com/TechNathan971/zenithtech",
    cta: ["See the repository", "Voir le dépôt"],
  },
];

export default function LetterPage() {
  const { t } = useI18n();

  return (
    <Layout
      title={["Year in review 2026", "Bilan de l’année 2026"]}
      description={[
        "What I shipped, what I measured and what comes next.",
        "Ce que j’ai livré, ce que j’ai mesuré et ce qui vient ensuite.",
      ]}
    >
      <section className="py-14 sm:py-20">
        <Container>
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">2026</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-ink-950">
              {t(["A year of shipping and measuring.", "Une année à livrer et à mesurer."])}
            </span>{" "}
            <span className="text-ink-500">
              {t(["Here is how it went.", "Voici comment elle s’est passée."])}
            </span>
          </h1>
          <ol className="mt-12 space-y-6">
            {milestones.map((item) => (
              <li
                key={t(item.title)}
                className="flex gap-4 rounded-card border border-ink-100 bg-white/70 p-6"
              >
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink-950">{t(item.title)}</p>
                  <p className="mt-2 text-ink-700">{t(item.text)}</p>
                  {item.href && item.cta && (
                    <div className="mt-4">
                      <Button
                        href={item.href}
                        variant="secondary"
                        arrow
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {t(item.cta)}
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-card bg-ink-50 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-ink-950">
              {t(["What comes next", "La suite"])}
            </h2>
            <p className="mt-2 max-w-2xl text-ink-700">
              {t([
                "Twelve projects are lined up on the workbench, from reusable pipelines to a DORA dashboard. Each one gets its links here as soon as it is published.",
                "Douze projets sont prévus sur l’établi, des pipelines réutilisables à un tableau de bord DORA. Chacun reçoit ses liens ici dès sa publication.",
              ])}
            </p>
            <div className="mt-5">
              <Button href="/work" arrow>
                {t(["See the workbench", "Voir l’établi"])}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
