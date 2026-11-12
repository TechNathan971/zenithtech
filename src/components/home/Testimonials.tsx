import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/portfolio";
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

export function Testimonials() {
  const { locale, t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  // With more than one testimonial, they rotate on their own
  useEffect(() => {
    if (testimonials.length < 2 || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [reduced]);

  const item = testimonials[index];
  const [open, close] = locale === "fr" ? ["« ", " »"] : ["“", "”"];

  return (
    <section className="border-t border-ink-100 py-20 sm:py-28">
      <Container>
        <figure className="mx-auto max-w-3xl text-center" aria-live="polite">
          <span
            aria-hidden
            className="mx-auto grid size-16 place-items-center rounded-full bg-linear-to-br from-brand-500 to-violet-500 text-lg font-semibold text-white"
          >
            {initials(item.author)}
          </span>
          <blockquote className="mt-8 text-2xl leading-snug font-medium tracking-tight text-ink-500 sm:text-3xl">
            {open}
            {t(item.quote)}
            {close}
          </blockquote>
          <figcaption className="mt-8">
            <p className="font-semibold text-ink-950">{item.author}</p>
            <p className="text-ink-600">{t(item.role)}</p>
          </figcaption>
          <Link
            href="/work/research-thesis"
            className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            {t(["About the project", "À propos du projet"])}
            <ChevronRight aria-hidden className="size-4" />
          </Link>
          {testimonials.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((entry, i) => (
                <button
                  key={entry.author}
                  type="button"
                  aria-label={entry.author}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-brand-600" : "w-3 bg-ink-200"
                  }`}
                />
              ))}
            </div>
          )}
        </figure>
      </Container>
    </section>
  );
}
