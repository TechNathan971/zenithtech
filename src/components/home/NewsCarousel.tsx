import clsx from "clsx";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { news, type NewsItem } from "@/data/news";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { newsArt } from "./NewsArt";

function SlideMedia({ item }: { item: NewsItem }) {
  const [failed, setFailed] = useState(false);
  const Art = newsArt[item.art];

  // The art keeps one fixed width, so a narrow slice shows a crop of it, like a photo
  return (
    <div className="absolute inset-y-0 left-0 w-[58rem] max-w-none">
      <Art />
      {item.photo && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={(img) => {
            if (img && img.complete && img.naturalWidth === 0) setFailed(true);
          }}
          src={item.photo}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );
}

export function NewsCarousel() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // The slides advance on their own until the visitor picks one
  useEffect(() => {
    if (touched || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % news.length), 6500);
    return () => clearInterval(id);
  }, [touched, reduced]);

  const choose = (index: number) => {
    setActive(index);
    setTouched(true);
  };
  const go = (direction: 1 | -1) => choose((active + direction + news.length) % news.length);

  const item = news[active];

  const arrow =
    "grid size-11 place-items-center rounded-lg border border-ink-100 bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100";

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
            <span className="text-ink-950">{t(["What’s happening", "Ce qui se passe"])}</span>
            <br />
            <span className="text-ink-400">
              {t(["See the latest from the lab.", "Les dernières nouvelles du labo."])}
            </span>
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t(["Previous", "Précédent"])}
              onClick={() => go(-1)}
              className={arrow}
            >
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label={t(["Next", "Suivant"])}
              onClick={() => go(1)}
              className={arrow}
            >
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        {/* One big slide and narrow slices. Click a slice to bring it forward. */}
        <ul className="mt-10 flex h-[24rem] gap-2 sm:h-[30rem] sm:gap-3 lg:h-[36rem]">
          {news.map((entry, index) => {
            const isActive = index === active;
            return (
              <li
                key={entry.id}
                className={clsx(
                  "relative min-w-2 basis-0 overflow-hidden rounded-card transition-[flex-grow] duration-700 ease-out sm:min-w-9",
                  isActive ? "grow-[30] sm:grow-[12]" : "grow-[1]",
                )}
              >
                <SlideMedia item={entry} />
                {isActive ? (
                  entry.external ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(entry.title)}
                      className="absolute inset-0 z-10"
                    />
                  ) : (
                    <Link
                      href={entry.href}
                      aria-label={t(entry.title)}
                      className="absolute inset-0 z-10"
                    />
                  )
                ) : (
                  <button
                    type="button"
                    aria-label={t(entry.title)}
                    onClick={() => choose(index)}
                    className="absolute inset-0 z-10 cursor-pointer bg-white/0 transition-colors hover:bg-white/15"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div
          key={item.id}
          aria-live="polite"
          className="mt-8 grid animate-fade-up gap-6 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <p className="max-w-3xl text-lg leading-relaxed">
            <span className="font-semibold text-ink-950">{t(item.title)}</span>{" "}
            <span className="text-ink-600">{t(item.text)}</span>
          </p>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              {t(item.cta)}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          ) : (
            <Button href={item.href} variant="secondary" size="lg" arrow>
              {t(item.cta)}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
