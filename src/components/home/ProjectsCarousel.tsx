import clsx from "clsx";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects, type Project } from "@/data/portfolio";
import { projectArt, projectMarks } from "@/data/showcase";
import { useCycle } from "@/hooks/useCycle";
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
    href: "/get-started",
    art: "from-orange-400 to-coral-500",
  },
];

/* A project card: while you hover it, the result shown on it keeps changing */
function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const step = useCycle((hovered || focused) && !reduced, project.results.length, 1700, 0);
  const result = project.results[step] ?? project.results[0];

  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) =>
        setFocused((e.target as HTMLElement).matches(":focus-visible"))
      }
      onBlur={() => setFocused(false)}
      className="group block"
    >
      <div
        className={clsx(
          "relative aspect-[4/5] overflow-hidden rounded-card p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-float",
          projectArt[project.slug] ?? "bg-brand-600",
        )}
      >
        {/* a light that drifts across the card on hover */}
        <div
          aria-hidden
          className="absolute -inset-10 bg-[radial-gradient(40%_35%_at_75%_15%,rgba(255,255,255,0.45),transparent)] transition-transform duration-1000 ease-out group-hover:-translate-x-1/4 group-hover:translate-y-1/3 group-hover:scale-125"
        />
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-8xl font-bold text-white/15 transition-all duration-500 group-hover:scale-110 group-hover:text-white/30"
        >
          {projectMarks[project.slug] ?? project.name[0]}
        </span>
        <p className="relative text-xl font-semibold text-white">{project.name}</p>
        <div className="absolute inset-x-5 bottom-5">
          <p
            key={step}
            className="animate-fade-up rounded-xl bg-black/25 p-3 text-sm leading-snug text-white"
          >
            {t(result)}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool) => (
              <li
                key={tool}
                className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white transition-colors group-hover:bg-white/30"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-[15px] text-ink-700">{t(project.summary)}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
        {t(["Read the story", "Lire l’histoire"])}
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

const corner =
  "pointer-events-none absolute opacity-0 transition-all duration-700 ease-out group-hover:opacity-100";

/* A promo card: the whole card is one link, with thin lights that grow along its corners */
function PromoCard({ promo }: { promo: Promo }) {
  const { t } = useI18n();

  return (
    <Link
      href={promo.href}
      className="group relative block overflow-hidden rounded-card border border-ink-100 bg-ink-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-200 hover:bg-white hover:shadow-card sm:p-8"
    >
      <span
        aria-hidden
        className={clsx(
          corner,
          "top-0 left-5 h-px w-0 bg-linear-to-r from-transparent via-brand-500 to-transparent group-hover:w-1/3",
        )}
      />
      <span
        aria-hidden
        className={clsx(
          corner,
          "top-5 left-0 h-0 w-px bg-linear-to-b from-transparent via-brand-500 to-transparent group-hover:h-1/3",
        )}
      />
      <span
        aria-hidden
        className={clsx(
          corner,
          "right-5 bottom-0 h-px w-0 bg-linear-to-r from-transparent via-violet-500 to-transparent group-hover:w-1/3",
        )}
      />
      <span
        aria-hidden
        className={clsx(
          corner,
          "right-0 bottom-5 h-0 w-px bg-linear-to-b from-transparent via-violet-500 to-transparent group-hover:h-1/3",
        )}
      />
      <div
        aria-hidden
        className={clsx(
          "absolute -right-10 -bottom-12 size-44 rotate-12 rounded-3xl bg-linear-to-br opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[18deg]",
          promo.art,
        )}
      />
      <p className="relative max-w-sm text-[17px] leading-relaxed">
        <span className="font-semibold text-ink-950">{t(promo.lead)}</span>{" "}
        <span className="text-ink-600">{t(promo.body)}</span>
      </p>
      <span className="relative mt-5 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
        {t(promo.link)}
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

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
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {promos.map((promo) => (
            <PromoCard key={promo.href} promo={promo} />
          ))}
        </div>
      </Container>
    </section>
  );
}
