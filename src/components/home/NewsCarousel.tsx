import clsx from "clsx";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { news, type NewsItem } from "@/data/news";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const cardClass = "group block";

function CardLink({ item, children }: { item: NewsItem; children: ReactNode }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cardClass}>
      {children}
    </Link>
  );
}

export function NewsCarousel() {
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
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
            <span className="text-ink-950">{t(["What’s happening", "Ce qui se passe"])}</span>
            <br />
            <span className="text-ink-400">
              {t(["The latest from the lab.", "Les dernières nouvelles du labo."])}
            </span>
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t(["Previous", "Précédent"])}
              disabled={edges.start}
              onClick={() => scrollByCard(-1)}
              className={arrow}
            >
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label={t(["Next", "Suivant"])}
              disabled={edges.end}
              onClick={() => scrollByCard(1)}
              className={arrow}
            >
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={scroller}
          onScroll={measure}
          className="mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {news.map((item) => (
            <li key={item.id} className="w-72 shrink-0 snap-start sm:w-80">
              <CardLink item={item}>
                <div
                  className={clsx(
                    "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-float",
                    item.art,
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute -inset-10 bg-[radial-gradient(40%_35%_at_75%_15%,rgba(255,255,255,0.4),transparent)] transition-transform duration-1000 ease-out group-hover:-translate-x-1/4 group-hover:translate-y-1/3 group-hover:scale-125"
                  />
                  <span
                    aria-hidden
                    className="relative text-4xl font-bold tracking-tight text-white/90 transition-transform duration-500 group-hover:scale-110"
                  >
                    {item.mark}
                  </span>
                </div>
                <p className="mt-4 text-xs font-semibold tracking-widest text-brand-600 uppercase">
                  {t(item.category)}
                </p>
                <p className="mt-2 text-lg leading-snug font-medium text-ink-950">
                  {t(item.title)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
                  {t(["Read more", "En savoir plus"])}
                  {item.external ? (
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  ) : (
                    <ChevronRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  )}
                </span>
              </CardLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
