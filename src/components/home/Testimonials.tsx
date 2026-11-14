import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stories, type Story } from "@/data/stories";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function initials(name: string) {
  const words = name
    .replace(/^(mr|mrs|ms|dr|prof)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function ToolMark({ slug, className }: { slug: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
      }}
      src={`/logos/${slug}.svg`}
      alt=""
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function Avatar({ story }: { story: Story }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const base = "mx-auto grid size-[72px] place-items-center overflow-hidden rounded-full";

  // A result has no person, so the tool's logo takes the place of the face
  if (story.kind === "result") {
    return (
      <span aria-hidden className={clsx(base, "border border-ink-100 bg-white")}>
        <ToolMark slug={story.tool.slug} className="size-9 object-contain" />
      </span>
    );
  }

  if (story.photo && !photoFailed) {
    return (
      <span aria-hidden className={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={(img) => {
            if (img && img.complete && img.naturalWidth === 0) setPhotoFailed(true);
          }}
          src={story.photo}
          alt=""
          onError={() => setPhotoFailed(true)}
          className="size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={clsx(
        base,
        "bg-linear-to-br from-brand-500 to-violet-500 text-lg font-semibold text-white",
      )}
    >
      {initials(story.name)}
    </span>
  );
}

export function Testimonials() {
  const { locale, t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // The stories rotate on their own until the visitor picks one
  useEffect(() => {
    if (touched || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stories.length), 7000);
    return () => clearInterval(id);
  }, [touched, reduced]);

  const choose = (index: number) => {
    setActive(index);
    setTouched(true);
  };

  const story = stories[active];
  const [open, close] =
    story.kind === "quote" ? (locale === "fr" ? ["« ", " »"] : ["“", "”"]) : ["", ""];

  return (
    <section className="border-t border-ink-100 pt-20 sm:pt-28">
      <Container>
        <figure
          key={story.id}
          aria-live="polite"
          className="mx-auto max-w-3xl animate-fade-up text-center"
        >
          <Avatar story={story} />
          <blockquote className="mt-8 text-2xl leading-snug font-medium tracking-tight text-ink-500 sm:text-3xl">
            {open}
            {t(story.quote)}
            {close}
          </blockquote>
          <figcaption className="mt-8">
            <p className="font-semibold text-ink-950">{story.name}</p>
            <p className="text-ink-600">{t(story.role)}</p>
          </figcaption>
          <Link
            href={story.href}
            className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            {t(story.cta)}
            <ChevronRight aria-hidden className="size-4" />
          </Link>
        </figure>
      </Container>

      {/* the row of tech logos: the active one is dark with a line above it */}
      <div className="mt-16 border-t border-dashed border-ink-200">
        <Container>
          <ul className="grid grid-cols-2 sm:grid-cols-4">
            {stories.map((entry, index) => {
              const isActive = index === active;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") choose(index);
                    }}
                    onFocus={() => choose(index)}
                    onClick={() => choose(index)}
                    className="relative flex w-full items-center justify-center gap-2.5 py-10"
                  >
                    <span
                      aria-hidden
                      className={clsx(
                        "absolute inset-x-0 -top-px h-px bg-ink-700 transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <ToolMark
                      slug={entry.tool.slug}
                      className={clsx(
                        "size-8 object-contain transition-all duration-500",
                        !isActive && "opacity-50 grayscale",
                      )}
                    />
                    <span
                      className={clsx(
                        "text-base font-medium transition-colors duration-500",
                        isActive ? "text-ink-950" : "text-ink-400",
                      )}
                    >
                      {entry.tool.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}
