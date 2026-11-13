import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { reads } from "@/data/reads";
import { useI18n } from "@/hooks/useI18n";

// The pick changes by itself every week. The server shows the first one until the browser takes over.
const subscribe = () => () => {};
const weekIndex = () => Math.floor(Date.now() / 604_800_000) % reads.length;

export function ReadOfTheWeek() {
  const { t } = useI18n();
  const index = useSyncExternalStore(subscribe, weekIndex, () => 0);
  const read = reads[index];

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl lg:text-4xl">
          {t(["Read of the week", "Lecture de la semaine"])}
        </h2>
        <div className="mt-10 grid overflow-hidden rounded-card border border-ink-100 bg-ink-50 md:grid-cols-[18rem_1fr]">
          <div className="grid place-items-center p-8" style={{ background: read.background }}>
            <div
              aria-hidden
              className="flex aspect-[3/4] w-44 flex-col justify-between rounded-lg bg-black/25 p-4 text-white shadow-float"
            >
              <p className="text-xl leading-tight font-bold">{read.title}</p>
              <p className="text-[11px] text-white/80">{read.authors}</p>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <h3 className="text-2xl leading-tight font-medium text-ink-950">
              {read.title}
              <span className="block text-lg text-ink-500">{read.subtitle}</span>
            </h3>
            <p className="mt-2 text-sm text-ink-500">{read.authors}</p>
            <p className="mt-5 max-w-2xl text-ink-700">{t(read.blurb)}</p>
            <p className="mt-4 max-w-2xl font-medium text-ink-950">{t(read.why)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {read.url && (
                <a
                  href={read.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800"
                >
                  {t(["Read it online", "La lire en ligne"])}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              )}
              <Link
                href="/work/dora-metrics"
                className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800"
              >
                {t(["See DORA metrics in my work", "Voir les métriques DORA dans mon travail"])}
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-500">
          {t(["More from my notes:", "Plus dans mes notes :"])}{" "}
          <Link href="/blog" className="font-medium text-brand-600 hover:text-brand-800">
            Blog
          </Link>
          {" · "}
          <Link href="/case-studies" className="font-medium text-brand-600 hover:text-brand-800">
            {t(["Case studies", "Études de cas"])}
          </Link>
        </p>
      </Container>
    </section>
  );
}
