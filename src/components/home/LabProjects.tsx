import clsx from "clsx";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { labHref, labProjects, statusLabels, type LabProject, type LabStatus } from "@/data/lab";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

const statusStyle: Record<LabStatus, string> = {
  live: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-brand-50 text-brand-700",
  planned: "bg-ink-100 text-ink-600",
};

const kindLabel: Record<string, Text> = {
  site: ["Visit the site", "Visiter le site"],
  repo: ["View the repository", "Voir le dépôt"],
  readme: ["Read the README", "Lire le README"],
  details: ["See details", "Voir les détails"],
};

const cardClass =
  "group flex h-full flex-col rounded-card border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card";

function CardLink({ project, children }: { project: LabProject; children: ReactNode }) {
  const target = labHref(project);
  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={target.href} className={cardClass}>
      {children}
    </Link>
  );
}

export function LabProjects({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const items = limit ? labProjects.slice(0, limit) : labProjects;

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="max-w-xl text-2xl leading-tight font-medium tracking-tight text-ink-950 sm:text-3xl lg:text-4xl">
              <span>
                {t([
                  "On the workbench: what I’m building next.",
                  "Sur l’établi : ce que je construis ensuite.",
                ])}
              </span>
            </h2>
            {limit && (
              <div className="mt-6">
                <Button href="/work" arrow>
                  {t(["See all projects", "Voir tous les projets"])}
                </Button>
              </div>
            )}
          </div>
          <p className="max-w-lg text-lg text-ink-600 lg:justify-self-end">
            {t([
              "Twelve projects that grow out of this site, from reusable pipelines to a DORA dashboard. Each card opens the live site, the GitHub repo or the README as soon as it is published.",
              "Douze projets issus de ce site, des pipelines réutilisables à un tableau de bord DORA. Chaque carte ouvre le site en ligne, le dépôt GitHub ou le README dès sa publication.",
            ])}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => {
            const Icon = project.icon;
            const target = labHref(project);
            return (
              <li key={project.slug}>
                <CardLink project={project}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        statusStyle[project.status],
                      )}
                    >
                      {t(statusLabels[project.status])}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-950">{t(project.title)}</h3>
                  <p className="mt-2 text-[15px] text-ink-600">{t(project.summary)}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
                    {t(kindLabel[target.kind])}
                    {target.external ? (
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    ) : (
                      <ChevronRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </span>
                </CardLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
