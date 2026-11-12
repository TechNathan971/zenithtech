import clsx from "clsx";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/portfolio";
import { projectArt } from "@/data/showcase";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Text } from "@/lib/i18n";

type Promo = { lead: Text; body: Text; link: Text; href: string; art: string };

const promos: Promo[] = [
  {
    lead: ["Research thesis.", "Mémoire de recherche."],
    body: [
      "How CI/CD pipelines perform in humanitarian software, measured with DORA metrics.",
      "Comment les pipelines CI/CD se comportent dans les logiciels humanitaires, mesurés avec les métriques DORA.",
    ],
    link: ["Read the thesis", "Lire le mémoire"],
    href: "/work/research-thesis",
    art: "from-violet-500 to-fuchsia-500",
  },
  {
    lead: ["Start a project.", "Démarrer un projet."],
    body: [
      "Tell me what you need and we’ll agree a clear scope and a fixed price.",
      "Dites-moi ce dont vous avez besoin et nous conviendrons d’un périmètre clair et d’un prix fixe.",
    ],
    link: ["Start now", "Commencer"],
    href: "/contact",
    art: "from-orange-400 to-coral-500",
  },
];

export function ProjectsCarousel() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  const arrow =
    "grid size-11 place-items-center rounded-lg border border-ink-100 bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="max-w-xl text-2xl leading-tight font-medium tracking-tight text-ink-950 sm:text-3xl lg:text-4xl">
              {t([
                "Projects that went from idea to production.",
                "Des projets passés de l’idée à la production.",
              ])}
            </h2>
            <div className="mt-6">
              <Button href="/work" arrow>
                {t(["All projects", "Tous les projets"])}
              </Button>
            </div>
          </div>
          <p className="max-w-lg text-lg text-ink-600 lg:justify-self-end">
            {t([
              "Four projects across humanitarian tech, music, DevOps and local services, each with the tools and results behind it.",
              "Quatre projets entre technologie humanitaire, musique, DevOps et services locaux, chacun avec ses outils et ses résultats.",
            ])}
          </p>
        </div>

        <div className="mt-10 flex justify-end gap-2">
          <button
            type="button"
            aria-label={t(["Previous project", "Projet précédent"])}
            disabled={edges.start}
            onClick={() => scrollByCard(-1)}
            className={arrow}
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            aria-label={t(["Next project", "Projet suivant"])}
            disabled={edges.end}
            onClick={() => scrollByCard(1)}
            className={arrow}
          >
            <ArrowRight aria-hidden className="size-5" />
          </button>
        </div>

        <ul
          ref={scroller}
          onScroll={measure}
          className="mt-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <li key={project.slug} className="w-72 shrink-0 snap-start sm:w-80">
              <Link href={`/work/${project.slug}`} className="group block">
                <div
                  className={clsx(
                    "relative aspect-[4/5] overflow-hidden rounded-card p-5 transition-transform duration-300 group-hover:-translate-y-1",
                    projectArt[project.slug] ?? "bg-brand-600",
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(255,255,255,0.35),transparent)]"
                  />
                  <p className="relative text-xl font-semibold text-white">{project.name}</p>
                  <ul className="absolute inset-x-5 bottom-5 flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 line-clamp-3 text-[15px] text-ink-700">{t(project.summary)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
                  {t(["Read the story", "Lire l’histoire"])}
                  <ChevronRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {promos.map((promo) => (
            <div
              key={promo.href}
              className="relative overflow-hidden rounded-card border border-ink-100 bg-ink-50 p-6 sm:p-8"
            >
              <div
                aria-hidden
                className={clsx(
                  "absolute -right-10 -bottom-12 size-44 rotate-12 rounded-3xl bg-linear-to-br opacity-90",
                  promo.art,
                )}
              />
              <p className="relative max-w-sm text-[17px] leading-relaxed">
                <span className="font-semibold text-ink-950">{t(promo.lead)}</span>{" "}
                <span className="text-ink-600">{t(promo.body)}</span>
              </p>
              <Link
                href={promo.href}
                className="relative mt-5 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors hover:text-brand-800"
              >
                {t(promo.link)}
                <ChevronRight aria-hidden className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
