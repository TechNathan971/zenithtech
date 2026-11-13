import { ChevronLeft } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { labProjects, statusLabels } from "@/data/lab";
import { useI18n } from "@/hooks/useI18n";
import { locales } from "@/lib/i18n";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.flatMap((locale) =>
    labProjects.map((project) => ({ params: { slug: project.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug || !labProjects.some((project) => project.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

export default function LabProjectPage({ slug }: Props) {
  const { t } = useI18n();
  const project = labProjects.find((p) => p.slug === slug);
  if (!project) return null;

  const { site, repo, readme } = project.links;
  const hasLinks = Boolean(site || repo || readme);
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <Layout title={project.title} description={project.summary}>
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
            {t(statusLabels[project.status])}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-medium tracking-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
            {t(project.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-600">{t(project.summary)}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-card border border-ink-100 bg-ink-50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink-950">
                {t(["Why this project", "Pourquoi ce projet"])}
              </h2>
              <p className="mt-3 text-ink-700">{t(project.why)}</p>
              <h2 className="mt-8 text-lg font-semibold text-ink-950">{t(["Tools", "Outils"])}</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink-600"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-ink-100 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink-950">{t(["Links", "Liens"])}</h2>
              {hasLinks ? (
                <div className="mt-4 flex flex-col items-start gap-3">
                  {site && (
                    <Button href={site} arrow {...external}>
                      {t(["Visit the site", "Visiter le site"])}
                    </Button>
                  )}
                  {repo && (
                    <Button href={repo} variant="secondary" arrow {...external}>
                      {t(["View the repository", "Voir le dépôt"])}
                    </Button>
                  )}
                  {readme && (
                    <Button href={readme} variant="secondary" arrow {...external}>
                      {t(["Read the README", "Lire le README"])}
                    </Button>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-ink-600">
                  {t([
                    "The links will appear here as soon as the project is published.",
                    "Les liens apparaîtront ici dès que le projet sera publié.",
                  ])}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
