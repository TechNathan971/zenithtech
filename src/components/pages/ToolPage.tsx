import clsx from "clsx";
import { Check, Copy, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { SectionNav, type SectionLink } from "@/components/ui/SectionNav";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { customerHref, heroLogos } from "@/data/customers";
import { stages } from "@/data/devops";
import { dailyTools, projects, services } from "@/data/portfolio";
import { projectArt, projectHighlights } from "@/data/showcase";
import { toolDetails } from "@/data/toolDetails";
import { useI18n } from "@/hooks/useI18n";

const sections: SectionLink[] = [
  { id: "overview", label: ["Overview", "Aperçu"] },
  { id: "where", label: ["Where I use it", "Où je l’utilise"] },
  { id: "gives", label: ["What it gives you", "Ce qu’il apporte"] },
  { id: "loop", label: ["In the DevOps loop", "Dans la boucle DevOps"] },
  { id: "example", label: ["A small example", "Un petit exemple"] },
  { id: "habits", label: ["Good habits", "Bonnes habitudes"] },
  { id: "faq", label: ["A common question", "Une question courante"] },
  { id: "related", label: ["Related tools", "Outils liés"] },
];

function CodeBlock({ label, code }: { label: string; code: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked: nothing to do
    }
  };

  return (
    <div className="overflow-hidden rounded-card bg-ink-950 shadow-float">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-ink-300">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink-200 transition-colors hover:bg-white/10"
        >
          {copied ? (
            <Check aria-hidden className="size-3.5" />
          ) : (
            <Copy aria-hidden className="size-3.5" />
          )}
          {copied ? t(["Copied", "Copié"]) : t(["Copy", "Copier"])}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-ink-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ToolPage({ slug }: { slug: string }) {
  const { t } = useI18n();
  const logo = heroLogos.find((entry) => entry.slug === slug);
  const detail = toolDetails[slug];
  if (!logo || !detail) return null;

  const usedIn = projects.filter((project) => project.tools.includes(logo.title));
  const offered = services.filter((service) => service.tools.includes(logo.title));
  const stage = stages.find((entry) => entry.id === detail.stage);
  const related = detail.related
    .map((relatedSlug) => heroLogos.find((entry) => entry.slug === relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const [stageEn, stageFr] = (stage?.label ?? ["", ""]) as readonly [string, string];

  return (
    <Layout title={logo.title} description={detail.tagline}>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
                {t(detail.category)}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
                <span className="text-ink-950">{logo.title}.</span>{" "}
                <span className="text-ink-500">{t(detail.tagline)}</span>
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" arrow>
                  {t(["Ask me about it", "Me poser une question"])}
                </Button>
                <Button href="/work" size="lg" variant="secondary">
                  {t(["See my work", "Voir mes travaux"])}
                </Button>
              </div>
            </div>
            <div className="relative grid size-32 shrink-0 place-items-center rounded-3xl border border-ink-100 bg-white shadow-card">
              <span aria-hidden className="absolute text-5xl font-bold text-ink-200">
                {logo.title[0]}
              </span>
              <ToolLogoImg slug={logo.slug} className="relative size-16 object-contain" />
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-3 border-y border-ink-100">
            <div className="flex flex-col-reverse gap-1 px-3 py-7 text-center">
              <dt className="text-sm text-ink-600">
                {t(["projects using it", "projets qui l’utilisent"])}
              </dt>
              <dd className="text-4xl font-medium tracking-tight text-ink-950 tabular-nums">
                <CountUp value={usedIn.length} />
              </dd>
            </div>
            <div className="flex flex-col-reverse gap-1 px-3 py-7 text-center">
              <dt className="text-sm text-ink-600">
                {t(["services that include it", "services qui l’incluent"])}
              </dt>
              <dd className="text-4xl font-medium tracking-tight text-ink-950 tabular-nums">
                <CountUp value={offered.length} />
              </dd>
            </div>
            <div className="flex flex-col-reverse gap-1 px-3 py-7 text-center">
              <dt className="text-sm text-ink-600">
                {t(["stage in the loop", "étape de la boucle"])}
              </dt>
              <dd className="text-xl font-medium tracking-tight text-ink-950 sm:text-2xl">
                {stage ? t(stage.label) : "—"}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[13rem_1fr]">
            <SectionNav sections={sections} />

            <div className="min-w-0 space-y-20">
              <div id="overview" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["What it is", "Ce que c’est"])}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
                  {t(detail.what)}
                </p>
              </div>

              <div id="where" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Where I use it", "Où je l’utilise"])}
                </h2>
                {usedIn.length > 0 ? (
                  <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                    {usedIn.map((project) => {
                      const highlight = projectHighlights[project.slug];
                      return (
                        <li key={project.slug}>
                          <Link
                            href={`/work/${project.slug}`}
                            className="group block h-full overflow-hidden rounded-card border border-ink-100 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
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
                ) : (
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
                    {dailyTools.includes(logo.title)
                      ? t([
                          "A daily tool: I use it across projects and in my day-to-day work.",
                          "Un outil du quotidien : je l’utilise dans plusieurs projets et au jour le jour.",
                        ])
                      : t([
                          "Part of my toolkit, and of the services I offer.",
                          "Un élément de ma boîte à outils et des services que je propose.",
                        ])}
                  </p>
                )}
              </div>

              <div id="gives" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["What it gives you", "Ce qu’il apporte"])}
                </h2>
                <ul className="mt-6 grid gap-5 md:grid-cols-3">
                  {detail.gives.map((item) => (
                    <li
                      key={t(item.title)}
                      className="group rounded-card border border-ink-100 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                    >
                      <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                        <Check aria-hidden className="size-5" />
                      </span>
                      <p className="mt-5 font-semibold text-ink-950">{t(item.title)}</p>
                      <p className="mt-2 text-ink-600">{t(item.text)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="loop" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Where it sits in the DevOps loop", "Sa place dans la boucle DevOps"])}
                </h2>
                <p className="mt-4 max-w-2xl text-ink-600">
                  {t([
                    `${logo.title} sits in the “${stageEn}” stage of the DevOps loop.`,
                    `${logo.title} se situe à l’étape « ${stageFr} » de la boucle DevOps.`,
                  ])}
                </p>
                <ol className="mt-6 grid gap-3 sm:grid-cols-4">
                  {stages.map((entry, index) => {
                    const current = entry.id === detail.stage;
                    return (
                      <li
                        key={entry.id}
                        className={clsx(
                          "rounded-card border p-5 transition-colors",
                          current
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-100 bg-white/80 text-ink-600",
                        )}
                      >
                        <span
                          className={clsx(
                            "text-xs tabular-nums",
                            current ? "text-white/80" : "text-ink-400",
                          )}
                        >
                          0{index + 1}
                        </span>
                        <p className="mt-2 font-semibold">{t(entry.label)}</p>
                        {current && (
                          <ToolLogoImg
                            slug={logo.slug}
                            className="mt-3 size-7 rounded bg-white object-contain p-1"
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div id="example" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["A small example", "Un petit exemple"])}
                </h2>
                <div className="mt-6">
                  <CodeBlock label={detail.snippet.label} code={detail.snippet.code} />
                </div>
              </div>

              <div id="habits" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t([
                    "Good habits, and what to avoid",
                    "Bonnes habitudes, et ce qu’il faut éviter",
                  ])}
                </h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="rounded-card border border-emerald-200 bg-emerald-50/70 p-6">
                    <p className="font-semibold text-emerald-900">
                      {t(["Good habits", "Bonnes habitudes"])}
                    </p>
                    <ul className="mt-4 space-y-3 text-emerald-950/90">
                      {detail.habits.map((habit) => (
                        <li key={t(habit)} className="flex gap-3 text-sm">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          {t(habit)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-card border border-coral-400/40 bg-coral-400/10 p-6">
                    <p className="font-semibold text-ink-950">{t(["Watch out for", "À éviter"])}</p>
                    <ul className="mt-4 space-y-3 text-ink-800">
                      {detail.pitfalls.map((pitfall) => (
                        <li key={t(pitfall)} className="flex gap-3 text-sm">
                          <X aria-hidden className="mt-0.5 size-4 shrink-0 text-coral-500" />
                          {t(pitfall)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div id="faq" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["A common question", "Une question courante"])}
                </h2>
                <details open className="group mt-6 border-y border-ink-100 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink-950 [&::-webkit-details-marker]:hidden">
                    {t(detail.faq.q)}
                    <span
                      aria-hidden
                      className="text-2xl text-brand-600 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-ink-700">{t(detail.faq.a)}</p>
                </details>
              </div>

              <div id="related" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Related tools", "Outils liés"])}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={customerHref(entry.slug)}
                        className="group flex h-full flex-col rounded-card border border-ink-100 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                      >
                        <ToolLogoImg slug={entry.slug} className="size-8 object-contain" />
                        <p className="mt-4 font-semibold text-ink-950">{entry.title}</p>
                        {toolDetails[entry.slug] && (
                          <p className="mt-1 text-sm text-ink-600">
                            {t(toolDetails[entry.slug].tagline)}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card bg-ink-50 p-6 sm:p-10">
                <p className="text-2xl font-medium tracking-tight text-ink-950">
                  {t([`Need help with ${logo.title}?`, `Besoin d’aide avec ${logo.title} ?`])}
                </p>
                <p className="mt-2 max-w-xl text-ink-600">
                  {t([
                    "Tell me what you’re trying to do and I’ll tell you how I’d approach it.",
                    "Dites-moi ce que vous voulez faire et je vous dirai comment je m’y prendrais.",
                  ])}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact" arrow>
                    {t(["Contact me", "Me contacter"])}
                  </Button>
                  <Button href="/pricing" variant="secondary">
                    {t(["See how I charge", "Voir mes tarifs"])}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
