import { Download } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { templates } from "@/data/templates";
import { useI18n } from "@/hooks/useI18n";
import { downloadText } from "@/lib/download";

export default function TemplatesPage() {
  const { t } = useI18n();

  return (
    <Layout
      title={["Templates", "Modèles"]}
      description={["Starter files you can download.", "Des fichiers de départ à télécharger."]}
    >
      <PageHero
        eyebrow={["Templates", "Modèles"]}
        lead={["Start from something solid.", "Partir d’une base solide."]}
        rest={[
          "Six starter files for pipelines, containers, Kubernetes and documentation. Download one, then adapt it to your project.",
          "Six fichiers de départ pour pipelines, conteneurs, Kubernetes et documentation. Téléchargez-en un, puis adaptez-le à votre projet.",
        ]}
      />

      <section className="pb-14 sm:pb-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {templates.map((template) => (
              <li
                key={template.filename}
                className="flex flex-col rounded-card border border-ink-100 bg-white/80 p-6"
              >
                <p className="font-mono text-sm text-brand-700">{template.filename}</p>
                <h2 className="mt-2 text-xl font-semibold text-ink-950">{t(template.title)}</h2>
                <p className="mt-2 text-ink-600">{t(template.text)}</p>

                <details className="group mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-ink-700 hover:text-ink-950">
                    {t(["Preview the file", "Aperçu du fichier"])}
                  </summary>
                  <div className="mt-3">
                    <CodeBlock label={template.filename} code={template.content} />
                  </div>
                </details>

                <button
                  type="button"
                  onClick={() => downloadText(template.filename, template.content)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  <Download aria-hidden className="size-4" />
                  {t(["Download", "Télécharger"])}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Layout>
  );
}
