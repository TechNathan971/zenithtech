import { Check, X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { SectionNav, type SectionLink } from "@/components/ui/SectionNav";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { guides } from "@/data/guides";
import { useI18n } from "@/hooks/useI18n";
import { both } from "@/lib/text";

export function GuidePage({ slug }: { slug: string }) {
  const { t } = useI18n();
  const guide = guides.find((entry) => entry.slug === slug);

  const sections = useMemo<SectionLink[]>(() => {
    if (!guide) return [];
    return [
      { id: "overview", label: ["Overview", "Aperçu"] },
      ...guide.steps.map((step, index) => {
        const [en, fr] = both(step.title);
        return {
          id: `step-${index + 1}`,
          label: [`${index + 1}. ${en}`, `${index + 1}. ${fr}`] as const,
        };
      }),
      { id: "mistakes", label: ["Common mistakes", "Erreurs courantes"] },
      { id: "next", label: ["Next steps", "Prochaines étapes"] },
    ];
  }, [guide]);

  if (!guide) return null;

  return (
    <Layout title={guide.title} description={guide.summary}>
      <section className="py-14 sm:py-20">
        <Container>
          <Link
            href="/guides"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            ← {t(["All guides", "Tous les guides"])}
          </Link>
          <p className="mt-8 text-sm font-semibold tracking-widest text-brand-600 uppercase">
            {t(["Guide", "Guide"])}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-ink-950">{t(guide.title)}.</span>{" "}
            <span className="text-ink-500">{t(guide.summary)}</span>
          </h1>
          <ul className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <li className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-700">
              {t(guide.level)}
            </li>
            <li className="rounded-full bg-ink-100 px-3 py-1.5 font-medium text-ink-700">
              {guide.minutes} min
            </li>
            <li className="rounded-full bg-ink-100 px-3 py-1.5 font-medium text-ink-700">
              {guide.steps.length} {t(["steps", "étapes"])}
            </li>
            {guide.tools.map((tool) => (
              <li
                key={tool}
                className="grid size-9 place-items-center rounded-full border border-ink-100 bg-white"
              >
                <ToolLogoImg slug={tool} className="size-5 object-contain" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[13rem_1fr]">
            <SectionNav sections={sections} />

            <div className="min-w-0 space-y-20">
              <div id="overview" className="scroll-mt-28">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-card border border-ink-100 bg-white/80 p-6">
                    <p className="font-semibold text-ink-950">
                      {t(["What you’ll learn", "Ce que vous allez apprendre"])}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {guide.learn.map((item) => (
                        <li key={t(item)} className="flex gap-3 text-ink-700">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" />
                          {t(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-card border border-ink-100 bg-white/80 p-6">
                    <p className="font-semibold text-ink-950">
                      {t(["What you’ll need", "Ce qu’il vous faut"])}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {guide.needs.map((item) => (
                        <li key={t(item)} className="flex gap-3 text-ink-700">
                          <span
                            aria-hidden
                            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink-400"
                          />
                          {t(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {guide.steps.map((step, index) => (
                <div key={t(step.title)} id={`step-${index + 1}`} className="scroll-mt-28">
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-600 text-lg font-semibold text-white">
                      {index + 1}
                    </span>
                    <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                      {t(step.title)}
                    </h2>
                  </div>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
                    {t(step.text)}
                  </p>
                  {step.code && (
                    <div className="mt-6">
                      <CodeBlock label={step.code.label} code={step.code.code} />
                    </div>
                  )}
                  {step.tip && (
                    <p className="mt-5 rounded-card border border-brand-200 bg-brand-50/70 p-4 text-sm text-brand-900">
                      <span className="font-semibold">{t(["Tip: ", "Astuce : "])}</span>
                      {t(step.tip)}
                    </p>
                  )}
                </div>
              ))}

              <div id="mistakes" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Common mistakes", "Erreurs courantes"])}
                </h2>
                <ul className="mt-6 space-y-3 rounded-card border border-coral-400/40 bg-coral-400/10 p-6">
                  {guide.mistakes.map((item) => (
                    <li key={t(item)} className="flex gap-3 text-ink-800">
                      <X aria-hidden className="mt-1 size-4 shrink-0 text-coral-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="next" className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                  {t(["Next steps", "Prochaines étapes"])}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {guide.next.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex h-full items-center justify-between rounded-card border border-ink-100 bg-white/80 p-5 font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                      >
                        {t(item.label)}
                        <span
                          aria-hidden
                          className="text-brand-600 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 rounded-card bg-ink-50 p-6 sm:p-10">
                  <p className="text-2xl font-medium tracking-tight text-ink-950">
                    {t([
                      "Stuck, or want this done for you?",
                      "Bloqué, ou envie qu’on le fasse pour vous ?",
                    ])}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/contact" arrow>
                      {t(["Contact me", "Me contacter"])}
                    </Button>
                    <Button href="/services/ci-cd-automation" variant="secondary">
                      {t(["See the service", "Voir le service"])}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
