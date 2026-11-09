import clsx from "clsx";
import Link from "next/link";
import { customerHref, heroLogos } from "@/data/customers";

// One real list plus 3 copies. This must match the -25% in the marquee keyframes.
const CLONES = 3;

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={clsx("flex shrink-0 items-center gap-16 pr-16", hidden && "motion-reduce:hidden")}
    >
      {heroLogos.map((logo) => (
        <li key={logo.slug}>
          <Link
            href={customerHref(logo.slug)}
            tabIndex={hidden ? -1 : undefined}
            className={clsx(
              "block py-3 text-xl whitespace-nowrap text-ink-500 transition-[transform,color] duration-200 ease-out select-none",
              "hover:-translate-y-1.5 hover:text-ink-950 focus-visible:-translate-y-1.5 focus-visible:text-ink-950",
              logo.className,
            )}
          >
            {logo.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  return (
    <section
      aria-label="Tools and technologies"
      className="group/marquee relative overflow-hidden border-y border-ink-100 bg-white py-6 motion-reduce:overflow-x-auto"
    >
      <div className="flex w-max animate-marquee will-change-transform group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
        <LogoRow />
        {Array.from({ length: CLONES }, (_, i) => (
          <LogoRow key={i} hidden />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent motion-reduce:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent motion-reduce:hidden"
      />
    </section>
  );
}
