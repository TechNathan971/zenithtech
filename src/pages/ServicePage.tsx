import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ToolChip } from "@/components/ui/ToolChip";
import { projects, services, type Project } from "@/data/portfolio";
import { serviceDetails } from "@/data/serviceDetails";
import { projectArt, projectHighlights } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

const steps: { title: Text; text: Text }[] = [
  {
    title: ["Brief", "Brief"],
    text: [
      "You tell me what you need and what you already have.",
      "Vous me dites ce dont vous avez besoin et ce que vous avez déjà.",
    ],
  },
  {
    title: ["Scope and price", "Périmètre et prix"],
    text: [
      "We agree what is included and one fixed price.",
      "Nous convenons de ce qui est inclus et d’un prix fixe.",
    ],
  },
  {
    title: ["Deliver", "Livraison"],
    text: [
      "I build it, ship it and hand it over with documentation.",
      "Je le construis, je le livre et je le transmets avec la documentation.",
    ],
  },
];

export function ServicePage({ slug }: { slug: string }) {
  const { t } = useI18n();
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return null;

  const proof = detail.proof
    .map((projectSlug) => projects.find((p) => p.slug === projectSlug))
    .filter((p): p is Project => Boolean(p));

  return (
    <Layout title={service.title} description={service.summary}>
      <PageHero eyebrow={["Service", "Service"]} lead={service.title} rest={service.summary}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/get-started" size="lg" arrow>
            {t(["Start a project", "Démarrer un projet"])}
          </Button>
          <Button href="/pricing" size="lg" variant="secondary">
            {t(["See how I charge", "Voir mes tarifs"])}
          </Button>
        </div>
      </PageHero>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["What you get", "Ce que vous obtenez"])}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {detail.gets.map((item) => (
              <li
                key={t(item)}
                className="flex gap-3 rounded-card border border-ink-100 bg-white/80 p-5 text-ink-800"
              >
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {t(item)}
              </li>
            ))}
          </ul>
          {service.tools.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <ToolChip key={tool} tool={tool} />
              ))}
            </ul>
          )}
        </Container>
      </section>

      {proof.length > 0 && (
        <section className="border-t border-ink-100 py-14 sm:py-20">
          <Container>
            <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
              {t(["Proof from my work", "La preuve par mon travail"])}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {proof.map((project) => {
                const highlight = projectHighlights[project.slug];
                return (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group block h-full overflow-hidden rounded-card border border-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                    >
                      <div
                        className={clsx(
                          "p-5 text-white",
                          projectArt[project.slug] ?? "bg-brand-600",
                        )}
                      >
                        <p className="font-semibold">{project.name}</p>
                        {highlight && (
                          <>
                            <p className="mt-4 text-3xl font-semibold tabular-nums">
                              {t(highlight.value)}
                            </p>
                            <p className="text-sm text-white/85">{t(highlight.label)}</p>
                          </>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="line-clamp-3 text-[15px] text-ink-700">
                          {t(project.summary)}
                        </p>
                        <span className="mt-3 inline-block text-sm font-semibold text-brand-600 group-hover:text-brand-800">
                          {t(["Read the story", "Lire l’histoire"])}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["How it works", "Comment ça se passe"])}
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={t(step.title)}>
                <span className="grid size-10 place-items-center rounded-full bg-brand-600 font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 font-semibold text-ink-950">{t(step.title)}</p>
                <p className="mt-2 text-ink-600">{t(step.text)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-card bg-ink-50 p-6 sm:p-8">
            <p className="text-xl font-semibold text-ink-950">
              {t(["Ready to talk about it?", "Prêt à en parler ?"])}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/get-started" arrow>
                {t(["Start a project", "Démarrer un projet"])}
              </Button>
              <Button href="/contact" variant="secondary">
                {t(["Contact me", "Me contacter"])}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
