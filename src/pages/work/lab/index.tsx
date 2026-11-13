import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { LabProjects } from "@/components/home/LabProjects";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/portfolio";
import { projectArt, projectMarks } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";

export default function WorkPage() {
  const { t } = useI18n();

  return (
    <Layout
      title={["Work", "Travaux"]}
      description={[
        "Four real projects and twelve more on the workbench, with the tools and results behind each.",
        "Quatre vrais projets et douze autres sur l’établi, avec les outils et les résultats derrière chacun.",
      ]}
    >
      <section className="py-14 sm:py-20">
        <Container>
          <h1 className="max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-ink-950">{t(["Work that shipped.", "Du travail livré."])}</span>{" "}
            <span className="text-ink-500">
              {t([
                "Four real projects, then twelve more on the workbench.",
                "Quatre vrais projets, puis douze autres sur l’établi.",
              ])}
            </span>
          </h1>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div
                    className={clsx(
                      "relative flex h-44 items-end overflow-hidden rounded-card p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-float",
                      projectArt[project.slug] ?? "bg-brand-600",
                    )}
                  >
                    <span
                      aria-hidden
                      className="absolute top-3 right-4 text-7xl font-bold text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-white/35"
                    >
                      {projectMarks[project.slug] ?? project.name[0]}
                    </span>
                    <p className="relative text-lg font-semibold text-white">{project.name}</p>
                  </div>
                  <p className="mt-4 text-[15px] text-ink-700">{t(project.summary)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
                    {t(["Read the story", "Lire l’histoire"])}
                    <ChevronRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <LabProjects />
    </Layout>
  );
}
