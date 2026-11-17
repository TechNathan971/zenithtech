import { Camera } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { customerHref, heroLogos } from "@/data/customers";
import { education, projects, services, writing, yearsInTech } from "@/data/portfolio";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

function AboutPhoto() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={(img) => {
          if (img && img.complete && img.naturalWidth === 0) setFailed(true);
        }}
        src="/images/me-banner.jpg"
        alt=""
        onError={() => setFailed(true)}
        className="aspect-[4/5] w-full max-w-sm rounded-card object-cover object-right shadow-card"
      />
    );
  }

  return (
    <div className="grid aspect-[4/5] w-full max-w-sm place-items-center rounded-card border-2 border-dashed border-ink-200 bg-white/70 p-6 text-center">
      <div>
        <Camera aria-hidden className="mx-auto size-10 text-ink-400" />
        <p className="mt-4 font-semibold text-ink-950">
          {t(["Your photo goes here", "Votre photo va ici"])}
        </p>
        <code className="mt-2 inline-block rounded bg-ink-100 px-1.5 py-0.5 text-[11px] text-ink-700">
          public/images/me-banner.jpg
        </code>
      </div>
    </div>
  );
}

const facts: { value: string; label: Text }[] = [
  { value: `${yearsInTech}+`, label: ["years in tech", "ans dans la tech"] },
  { value: String(projects.length), label: ["featured projects", "projets phares"] },
  { value: String(services.length), label: ["services offered", "services proposés"] },
  { value: String(education.year), label: education.degree },
];

export default function AboutPage() {
  const { t } = useI18n();
  const thesis = writing[0];

  return (
    <Layout
      title={["About", "À propos"]}
      description={[
        "A DevOps engineer and full-stack developer with six years in tech.",
        "Un ingénieur DevOps et développeur full-stack avec six ans dans la tech.",
      ]}
    >
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
                {t(["About", "À propos"])}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
                <span className="text-ink-950">
                  {t([
                    "I’m a DevOps engineer and full-stack developer.",
                    "Je suis ingénieur DevOps et développeur full-stack.",
                  ])}
                </span>{" "}
                <span className="text-ink-500">
                  {t([
                    "Six years in tech, building the pipelines, servers and apps that carry software from commit to production.",
                    "Six ans dans la tech, à construire les pipelines, serveurs et applications qui portent un logiciel du commit à la production.",
                  ])}
                </span>
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" arrow>
                  {t(["Contact me", "Me contacter"])}
                </Button>
                <Button href="/work" size="lg" variant="secondary">
                  {t(["See my work", "Voir mes travaux"])}
                </Button>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <AboutPhoto />
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-y border-ink-100 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.value} className="flex flex-col-reverse gap-1 px-3 py-8 text-center">
                <dt className="text-sm text-ink-600">{t(fact.label)}</dt>
                <dd className="text-4xl font-medium tracking-tight text-ink-950 tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["What I do", "Ce que je fais"])}
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-card border border-ink-100 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                >
                  <p className="font-semibold text-ink-950">{t(service.title)}</p>
                  <p className="mt-2 text-ink-600">{t(service.summary)}</p>
                  {service.tools.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["Tools I work with", "Les outils avec lesquels je travaille"])}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {heroLogos.map((logo) => (
              <li key={logo.slug}>
                <Link
                  href={customerHref(logo.slug)}
                  className="group flex items-center gap-3 rounded-lg border border-ink-100 bg-white/70 px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <ToolLogoImg slug={logo.slug} className="size-6 shrink-0 object-contain" />
                  <span className="truncate text-sm font-medium text-ink-700">{logo.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-card bg-ink-50 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink-950">
                {t(["Education and research", "Formation et recherche"])}
              </h2>
              <p className="mt-4 font-semibold text-ink-950">
                {t(education.degree)} · {education.year}
              </p>
              <p className="mt-1 text-ink-600">{t(thesis.kind)}</p>
            </div>
            <div>
              <p className="text-lg leading-snug font-medium text-ink-950">{t(thesis.title)}</p>
              <div className="mt-5">
                <Button href="/work/research-thesis" variant="secondary" arrow>
                  {t(["Read the thesis", "Lire le mémoire"])}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
