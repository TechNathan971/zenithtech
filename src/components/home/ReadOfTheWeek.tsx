import { BookOpen, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { reads, type Read } from "@/data/reads";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

// The pick changes by itself every week. The server shows the first one until the browser takes over.
const subscribe = () => () => {};
const weekIndex = () => Math.floor(Date.now() / 604_800_000) % reads.length;

const publications: { icon: LucideIcon; label: Text; href: string }[] = [
  { icon: BookOpen, label: "Blog", href: "/blog" },
  { icon: FileText, label: ["Case studies", "Études de cas"], href: "/case-studies" },
];

function BookCover({ read }: { read: Read }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={(img) => {
          if (img && img.complete && img.naturalWidth === 0) setFailed(true);
        }}
        src={read.cover}
        alt={read.title}
        onError={() => setFailed(true)}
        className="w-52 rounded-sm shadow-float sm:w-64"
      />
    );
  }

  // No cover picture yet: a drawn cover keeps the layout intact
  return (
    <div
      aria-hidden
      className="flex aspect-[2/3] w-52 flex-col justify-between rounded-sm p-5 text-white shadow-float sm:w-64"
      style={{ background: read.background }}
    >
      <p className="text-2xl leading-tight font-bold">{read.title}</p>
      <p className="text-xs text-white/80">{read.authors}</p>
    </div>
  );
}

function LibraryEmblem() {
  return (
    <div
      aria-hidden
      className="grid h-36 w-24 place-items-center rounded-t-full border-2 border-ink-300 bg-white px-2 text-center text-ink-500 shadow-card outline-1 outline-offset-4 outline-ink-200"
    >
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 32 32" className="size-9 text-brand-700">
          <path
            d="M8.5 22 16 9l7.5 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-2 font-serif text-[11px] leading-tight">The Library</p>
        <p className="font-serif text-[11px] italic">of ZenithTech</p>
      </div>
    </div>
  );
}

export function ReadOfTheWeek() {
  const { t } = useI18n();
  const index = useSyncExternalStore(subscribe, weekIndex, () => 0);
  const read = reads[index];

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <h2 className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
          <span className="text-ink-950">{t(["Read of the week", "Lecture de la semaine"])}</span>
          <br />
          <span className="text-ink-500">
            {t(["DevOps starts with ideas.", "Le DevOps commence par des idées."])}
          </span>
        </h2>

        <div className="relative mt-16">
          <div className="absolute -top-12 right-6 z-10 sm:right-10">
            <LibraryEmblem />
          </div>
          <div className="grid overflow-hidden rounded-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div
              className="grid place-items-center p-10 sm:p-16"
              style={{ background: read.panel }}
            >
              <BookCover key={read.title} read={read} />
            </div>
            <div className="flex flex-col bg-ink-50 p-8 sm:p-12">
              <h3 className="text-2xl leading-snug font-medium text-ink-950 sm:text-[1.75rem]">
                {read.title}
                <span className="block text-ink-500">{read.authors}</span>
              </h3>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-700">
                {t(read.blurb)}{" "}
                {read.url && (
                  <a
                    href={read.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-brand-700"
                  >
                    {t(["Read it online.", "La lire en ligne."])}
                  </a>
                )}
              </p>
              <p className="mt-4 max-w-xl font-medium text-ink-950">{t(read.why)}</p>

              <div className="mt-auto pt-12">
                <p className="max-w-sm text-sm text-ink-600">
                  {t([
                    "For more ideas on delivery, reliability and automation, see my in-house notes:",
                    "Pour plus d’idées sur la livraison, la fiabilité et l’automatisation, voyez mes notes :",
                  ])}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {publications.map((publication) => {
                    const Icon = publication.icon;
                    return (
                      <li key={publication.href}>
                        <Link
                          href={publication.href}
                          className="group inline-flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-1.5 pr-5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-700"
                        >
                          <span className="grid size-10 place-items-center rounded-md bg-ink-950 text-white transition-transform duration-300 group-hover:scale-105">
                            <Icon aria-hidden className="size-5" />
                          </span>
                          {t(publication.label)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
