import clsx from "clsx";
import { Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/data/portfolio";
import { caseHeadlines, projectArt, projectHighlights } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";

export default function CaseStudiesPage() {
  const { t } = useI18n();

  return (
    <Layout
      title={["Case studies", "Études de cas"]}
      description={[
        "How each project was built and what it achieved.",
        "Comment chaque projet a été construit et ce qu’il a permis d’obtenir.",
      ]}
    >
      <PageHero
        eyebrow={["Case studies", "Études de cas"]}
        lead={["Real problems, measured results.", "De vrais problèmes, des résultats mesurés."]}
        rest={[
          "Four projects, each with the challenge, the build and the numbers.",
          "Quatre projets, chacun avec son défi, sa réalisation et ses chiffres.",
        ]}
      />
      <section className="pb-14 sm:pb-20">
        <Container>
          <ul className="space-y-6">
            {projects.map((project) => {
              const highlight = projectHighlights[project.slug];
              return (
                <li
                  key={project.slug}
                  className="grid overflow-hidden rounded-card border border-ink-100 bg-white/80 md:grid-cols-[1fr_1.4fr]"
                >
                  <div
                    className={clsx(
                      "flex flex-col justify-between gap-8 p-6 text-white sm:p-8",
                      projectArt[project.slug] ?? "bg-brand-600",
                    )}
                  >
                    <div>
                      <p className="text-2xl font-semibold">{project.name}</p>
                      <p className="mt-1 text-sm text-white/85">{t(project.role)}</p>
                    </div>
                    {highlight && (
                      <div>
                        <p className="text-4xl font-semibold tabular-nums">{t(highlight.value)}</p>
                        <p className="mt-1 text-sm text-white/85">{t(highlight.label)}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-lg font-medium text-ink-950">
                      {t(caseHeadlines[project.slug] ?? project.summary)}
                    </p>
                    <ul className="mt-4 space-y-2 text-ink-700">
                      {project.results.map((result) => (
                        <li key={t(result)} className="flex gap-3 text-sm">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                          {t(result)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button href={`/work/${project.slug}`} variant="secondary" arrow>
                        {t(["Read the story", "Lire l’histoire"])}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </Layout>
  );
}
