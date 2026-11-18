import clsx from "clsx";
import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { projectScenes } from "@/components/home/ProjectArt";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ToolChip } from "@/components/ui/ToolChip";
import { projects, services } from "@/data/portfolio";
import { projectStories } from "@/data/projectStories";
import { caseHeadlines, projectArt, projectHighlights } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";

export function ProjectStoryPage({ slug }: { slug: string }) {
  const { t } = useI18n();
  const index = projects.findIndex((p) => p.slug === slug);
  const story = projectStories[slug];
  if (index < 0 || !story) return null;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const art = projectArt[slug] ?? "bg-brand-600";
  const Scene = projectScenes[slug];
  const highlight = projectHighlights[slug];
  const service = services.find((s) => s.slug === story.services[0]);

  return (
    <Layout title={project.name} description={project.summary}>
      <section className="py-10 sm:py-14">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            <ChevronLeft aria-hidden className="size-4" />
            {t(["All work", "Tous les travaux"])}
          </Link>

          <div className={clsx("group/panel relative mt-6 overflow-hidden rounded-card", art)}>
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(255,255,255,0.35),transparent)] transition-transform duration-1000 group-hover/panel:scale-110"
            />
            <div className="relative grid gap-10 p-6 sm:p-12 md:grid-cols-[1fr_1.15fr] md:items-center">
              <div className="text-white">
                <p className="text-sm font-semibold tracking-widest text-white/80 uppercase">
                  {t(project.role)}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {project.name}
                </h1>
                {project.fullName && (
                  <p className="mt-2 text-lg text-white/85">{t(project.fullName)}</p>
                )}
                <p className="mt-5 max-w-md text-white/90">{t(project.summary)}</p>
                {highlight && (
                  <div className="mt-8">
                    <p className="text-4xl font-semibold tabular-nums sm:text-5xl">
                      {t(highlight.value)}
                    </p>
                    <p className="mt-2 text-sm text-white/85">{t(highlight.label)}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center md:items-end">
                {Scene && <Scene />}
                <p className="mt-6 text-[11px] text-white/70">
                  {t([
                    "Illustration with sample data.",
                    "Illustration avec des données d’exemple.",
                  ])}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
              {t(["The challenge", "Le défi"])}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-700">{t(story.challenge)}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["What I built", "Ce que j’ai construit"])}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {story.built.map((item) => (
              <li
                key={t(item)}
                className="flex gap-3 rounded-card border border-ink-100 bg-white/80 p-5 text-ink-800"
              >
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {t(item)}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["How a change ships", "Comment un changement arrive en production"])}
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            {t(["A simplified view of the flow.", "Une vue simplifiée du flux."])}
          </p>
          <ol
            className={clsx(
              "mt-8 grid gap-4 sm:grid-cols-2",
              story.steps.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4",
            )}
          >
            {story.steps.map((step, i) => (
              <li
                key={t(step.title)}
                className="group rounded-card border border-ink-100 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-transform duration-300 group-hover:scale-110">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-ink-950">{t(step.title)}</p>
                <p className="mt-2 text-sm text-ink-600">{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["Results", "Résultats"])}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.results.map((result) => (
              <li
                key={t(result)}
                className="rounded-card bg-ink-50 p-6 text-lg leading-snug font-medium text-ink-950"
              >
                {t(result)}
              </li>
            ))}
          </ul>
          <h2 className="mt-16 text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["Tools", "Outils"])}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <ToolChip key={tool} tool={tool} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href={`/work/${next.slug}`}
              className="group block rounded-card border border-ink-100 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
            >
              <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
                {t(["Next project", "Projet suivant"])}
              </p>
              <p className="mt-3 text-xl font-semibold text-ink-950">{next.name}</p>
              <p className="mt-2 text-ink-600">{t(caseHeadlines[next.slug] ?? next.summary)}</p>
            </Link>
            <div className="rounded-card bg-ink-50 p-6 sm:p-8">
              <p className="text-xl font-semibold text-ink-950">
                {t(["Need something like this?", "Besoin de quelque chose de similaire ?"])}
              </p>
              {service && (
                <p className="mt-2 text-ink-600">
                  {t(["See the service:", "Voir le service :"])}{" "}
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-medium text-brand-700 underline hover:text-brand-900"
                  >
                    {t(service.title)}
                  </Link>
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/get-started" arrow>
                  {t(["Start a project", "Démarrer un projet"])}
                </Button>
                <Button href="/contact" variant="secondary">
                  {t(["Contact me", "Me contacter"])}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
