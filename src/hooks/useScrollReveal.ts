import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// What fades up as it scrolls into view. Cards, list items, figures and headings.
const TARGETS = [
  "main section :is(ul, ol) > li",
  "main section div.grid > *",
  "main section article",
  "main section figure",
  "main section dl > div",
  "main section h1",
  "main section h2",
].join(", ");

// What never animates: the ticker, dialogs, menus and decorative drawings.
const SKIP = ".animate-marquee, [data-no-reveal], dialog, nav, [aria-hidden='true']";

export function useScrollReveal() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.closest(SKIP) && ![...el.classList].some((name) => name.startsWith("animate-")),
    );

    // Only things below the fold get hidden, so nothing flashes on page load.
    const viewport = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of candidates) {
      if (el.classList.contains("sr-in")) continue;
      if (el.classList.contains("sr") || el.getBoundingClientRect().top > viewport * 0.92) {
        el.classList.add("sr");
        pending.push(el);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let batch = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          // neighbours that arrive together follow each other a few milliseconds apart
          el.style.setProperty("--sr-delay", `${Math.min(batch, 6) * 70}ms`);
          el.classList.add("sr-in");
          observer.unobserve(el);
          batch += 1;
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced]);
}
