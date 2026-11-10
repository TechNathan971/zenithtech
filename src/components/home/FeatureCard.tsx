import clsx from "clsx";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FocusEvent } from "react";
import type { Feature } from "@/data/features";
import { useI18n } from "@/hooks/useI18n";
import { FeatureMock } from "./FeatureMocks";

type FeatureCardProps = {
  feature: Feature;
  onExpand: (feature: Feature) => void;
};

export function FeatureCard({ feature, onExpand }: FeatureCardProps) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <article
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e: FocusEvent<HTMLElement>) =>
        setFocused((e.target as HTMLElement).matches(":focus-visible"))
      }
      onBlur={() => setFocused(false)}
      className={clsx(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-card border border-ink-100 bg-white",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-float",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        "has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brand-500",
        feature.span,
        feature.split && "lg:flex-row",
      )}
    >
      <div
        className={clsx(
          "flex items-start justify-between gap-4 p-6 sm:p-8",
          feature.split && "lg:w-[38%] lg:shrink-0",
        )}
      >
        <div>
          <h3 className="max-w-sm text-2xl leading-snug font-semibold text-ink-950">
            <Link
              href={feature.href}
              className="relative z-10 transition-colors hover:text-brand-700"
            >
              {feature.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">{feature.short}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {feature.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {/* This button's ::after stretches over the whole tile, so a click anywhere expands it. */}
        <button
          type="button"
          onClick={() => onExpand(feature)}
          aria-label={`${t(["Expand", "Agrandir"])} : ${feature.title}`}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-200 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white after:absolute after:inset-0"
        >
          <Maximize2 aria-hidden className="size-4" />
        </button>
      </div>

      <div
        aria-hidden
        className={clsx("@container relative min-h-72 flex-1 sm:min-h-80", feature.surface)}
      >
        <FeatureMock id={feature.id} playing={hovered || focused} />
        <span className="pointer-events-none absolute right-3 bottom-3 translate-y-1 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden">
          {t(["Click to expand", "Cliquer pour agrandir"])}
        </span>
      </div>
    </article>
  );
}
