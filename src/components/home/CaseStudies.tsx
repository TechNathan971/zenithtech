import clsx from "clsx";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/portfolio";
import { caseHeadlines, projectArt, projectMarks } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";

export function CaseStudies() {
  const { t } = useI18n();
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0].slug);

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="max-w-xl text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
              <span className="text-ink-950">
                {t([
                  "Real projects, measured results.",
                  "De vrais projets, des résultats mesurés.",
                ])}
              </span>{" "}
              <span className="text-ink-400">
                {t([
                  "Each one is built, shipped and measured.",
                  "Chacun est construit, livré et mesuré.",
                ])}
              </span>
            </h2>
            <div className="mt-6">
              <Button href="/case-studies" arrow>
                {t(["See all case studies", "Voir toutes les études de cas"])}
              </Button>
            </div>
          </div>
          <p className="max-w-lg text-lg text-ink-600 lg:justify-self-end">
            {t([
              "From a welfare system for displaced children to a CI/CD lab, these are the systems behind the numbers on this site.",
              "D’un système de suivi pour enfants déplacés à un labo CI/CD, voici les systèmes derrière les chiffres de ce site.",
            ])}
          </p>
        </div>

        <ul className="mt-12 divide-y divide-ink-100 border-y border-ink-100">
          {projects.map((project) => {
            const open = project.slug === openSlug;
            const art = projectArt[project.slug] ?? "bg-brand-600";
            const headline = caseHeadlines[project.slug] ?? project.summary;

            return (
              <li key={project.slug}>
                <h3>
                  <button
                    type="button"
                    id={`case-button-${project.slug}`}
                    aria-expanded={open}
                    aria-controls={`case-${project.slug}`}
                    onClick={() => setOpenSlug(open ? null : project.slug)}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span
                      className={clsx(
                        "grid size-12 shrink-0 place-items-center rounded-lg text-base font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                        art,
                      )}
                    >
                      {projectMarks[project.slug] ?? project.name[0]}
                    </span>
                    <span className="flex-1 text-lg font-medium text-ink-950 sm:text-2xl">
                      {t(headline)}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600"
                    >
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>

                <div
                  id={`case-${project.slug}`}
                  role="region"
                  aria-labelledby={`case-button-${project.slug}`}
                  inert={!open}
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-500 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8">
                      <div
                        className={clsx(
                          "relative min-h-52 overflow-hidden rounded-card p-6 sm:min-h-64 sm:p-10",
                          art,
                        )}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(255,255,255,0.35),transparent)]"
                        />
                        <div className="relative flex h-full min-h-40 flex-col justify-between gap-6 text-white sm:min-h-44">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-2xl font-semibold sm:text-4xl">{project.name}</p>
                            <Button
                              href={`/work/${project.slug}`}
                              variant="secondary"
                              className="shrink-0"
                            >
                              {t(["Read the story", "Lire l’histoire"])}
                            </Button>
                          </div>
                          <p className="max-w-md text-sm text-white/90 sm:text-base">
                            {t(project.role)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        <ul className="space-y-3">
                          {project.results.map((result) => (
                            <li key={t(result)} className="flex gap-3 text-ink-800">
                              <Check
                                aria-hidden
                                className="mt-0.5 size-5 shrink-0 text-brand-600"
                              />
                              {t(result)}
                            </li>
                          ))}
                        </ul>
                        <div>
                          <p className="text-sm font-medium text-ink-950">
                            {t(["Tools used", "Outils utilisés"])}
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {project.tools.map((tool) => (
                              <li
                                key={tool}
                                className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600"
                              >
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
