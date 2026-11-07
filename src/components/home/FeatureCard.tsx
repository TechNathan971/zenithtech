import clsx from "clsx";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import type { Feature } from "@/data/features";
import { FeatureMock } from "./FeatureMocks";

type FeatureCardProps = {
  feature: Feature;
  onExpand: (feature: Feature) => void;
};

export function FeatureCard({ feature, onExpand }: FeatureCardProps) {
  return (
    <article
      className={clsx(
        "flex flex-col overflow-hidden rounded-card border border-ink-100 bg-white transition-shadow duration-200 hover:shadow-card",
        feature.span,
        feature.split && "lg:flex-row",
      )}
    >
      <div
        className={clsx(
          "flex items-start justify-between gap-4 p-6 sm:p-8",
          feature.split && "lg:w-[34%] lg:shrink-0",
        )}
      >
        <h3 className="max-w-sm text-2xl leading-snug font-semibold text-ink-950">
          <Link href={feature.href} className="transition-colors hover:text-brand-700">
            {feature.title}
          </Link>
        </h3>
        <button
          type="button"
          onClick={() => onExpand(feature)}
          aria-label={`Expand: ${feature.title}`}
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100"
        >
          <Maximize2 aria-hidden className="size-4" />
        </button>
      </div>
      <div
        aria-hidden
        onClick={() => onExpand(feature)}
        className={clsx(
          "@container relative min-h-72 flex-1 cursor-zoom-in sm:min-h-80",
          feature.surface,
        )}
      >
        <FeatureMock id={feature.id} />
      </div>
    </article>
  );
}
