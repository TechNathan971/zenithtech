import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { CopyLine } from "@/components/ui/CopyLine";
import { PageHero } from "@/components/ui/PageHero";
import { SectionNav, type SectionLink } from "@/components/ui/SectionNav";
import { cliTools } from "@/data/cli";
import { useI18n } from "@/hooks/useI18n";

export default function CliReferencePage() {
  const { t } = useI18n();

  const sections = useMemo<SectionLink[]>(
    () => cliTools.map((tool) => ({ id: tool.slug, label: [tool.name, tool.name] as const })),
    [],
  );

  return (
    <Layout
      title={["CLI reference", "Référence CLI"]}
      description={[
        "Six command-line tools: how to check them, get help and use their key options.",
        "Six outils en ligne de commande : les vérifier, obtenir de l’aide et utiliser leurs options clés.",
      ]}
    >
      <PageHero
        eyebrow={["CLI reference", "Référence CLI"]}
        lead={["Know your tools.", "Connaître ses outils."]}
        rest={[
          "For each tool: how to check it is installed, where to get help, and the options you will use most.",
          "Pour chaque outil : comment vérifier qu’il est installé, où trouver de l’aide, et les options les plus utilisées.",
        ]}
      />

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[13rem_1fr]">
            <SectionNav sections={sections} />

            <div className="min-w-0 space-y-16">
              {cliTools.map((tool) => (
                <div key={tool.slug} id={tool.slug} className="scroll-mt-28">
                  <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                    {tool.name}
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg text-ink-700">{t(tool.about)}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink-950">
                        {t(["Check it is installed", "Vérifier l’installation"])}
                      </p>
                      <CopyLine command={tool.check} />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink-950">
                        {t(["Get help", "Obtenir de l’aide"])}
                      </p>
                      <CopyLine command={tool.help} />
                    </div>
                  </div>

                  <p className="mt-8 text-sm font-semibold text-ink-950">
                    {t(["Options you will use most", "Les options les plus utilisées"])}
                  </p>
                  <ul className="mt-3 divide-y divide-ink-100 rounded-card border border-ink-100 bg-white/80">
                    {tool.flags.map((flag) => (
                      <li
                        key={flag.use}
                        className="grid gap-2 p-4 md:grid-cols-[minmax(0,1fr)_1.2fr] md:gap-6"
                      >
                        <code className="font-mono text-sm break-words text-brand-700">
                          {flag.use}
                        </code>
                        <span className="text-ink-700">{t(flag.what)}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 rounded-card border border-brand-200 bg-brand-50/70 p-4 text-sm text-brand-900">
                    <span className="font-semibold">{t(["Tip: ", "Astuce : "])}</span>
                    {t(tool.tip)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
