import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { customerHref, heroLogos, type CustomerLogo } from "@/data/customers";
import { useI18n } from "@/hooks/useI18n";

// One real list plus 3 copies. This must match the -25% in the marquee keyframes.
const CLONES = 3;
// Set to false to show the logos alone, without the small names.
const SHOW_NAMES = true;

function ToolLogo({ logo }: { logo: CustomerLogo }) {
  const [failed, setFailed] = useState(false);

  // No logo file: show the tool's name instead
  if (failed) {
    return <span className={clsx("text-base", logo.className)}>{logo.name}</span>;
  }

  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={(img) => {
          // catches a picture that already failed before the page became interactive
          if (img && img.complete && img.naturalWidth === 0) setFailed(true);
        }}
        src={`/logos/${logo.slug}.svg`}
        alt=""
        width={28}
        height={28}
        onError={() => setFailed(true)}
        className="size-7 object-contain"
      />
      {SHOW_NAMES && <span className="text-sm font-medium text-ink-600">{logo.name}</span>}
    </span>
  );
}

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={clsx("flex shrink-0 items-center gap-12 pr-12", hidden && "motion-reduce:hidden")}
    >
      {heroLogos.map((logo) => (
        <li key={logo.slug}>
          <Link
            href={customerHref(logo.slug)}
            aria-label={logo.title}
            tabIndex={hidden ? -1 : undefined}
            className="block py-2 opacity-80 transition-[transform,opacity] duration-200 ease-out select-none hover:-translate-y-1 hover:opacity-100 focus-visible:-translate-y-1 focus-visible:opacity-100"
          >
            <ToolLogo logo={logo} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t(["Tools and technologies", "Outils et technologies"])}
      className="group/marquee relative overflow-hidden border-y border-ink-100 bg-white py-5 motion-reduce:overflow-x-auto"
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
