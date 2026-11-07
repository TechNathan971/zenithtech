import clsx from "clsx";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Modal } from "@/components/ui/Modal";
import { features, type Feature } from "@/data/features";
import { FeatureCard } from "./FeatureCard";
import { FeatureMock } from "./FeatureMocks";

function FeatureDetail({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr]">
      <div className={clsx("@container relative min-h-72 lg:min-h-[30rem]", feature.surface)}>
        <FeatureMock id={feature.id} playing />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-600 shadow-card">
          Live demo · sample data
        </span>
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <h3 className="pr-10 text-3xl leading-tight font-semibold text-ink-950 lg:pr-0">
          {feature.title}
        </h3>
        <p className="mt-4 text-ink-600">{feature.summary}</p>
        <ul className="mt-6 space-y-3">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm text-ink-700">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
              {bullet}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {feature.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={feature.href} arrow onClick={onClose}>
            {feature.cta}
          </Button>
          <button
            type="button"
            onClick={onClose}
            className={buttonStyles({ variant: "secondary" })}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  const [active, setActive] = useState<Feature | null>(null);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-4xl text-4xl leading-tight font-semibold sm:text-5xl">
          <span className="text-ink-950">Everything between a commit and production.</span>{" "}
          <span className="text-ink-400">
            Pipelines, containers, infrastructure, monitoring and security: the pieces I build,
            break and write about.
          </span>
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} onExpand={setActive} />
          ))}
        </div>
      </Container>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        label={active?.title ?? "Topic details"}
      >
        {active && <FeatureDetail feature={active} onClose={() => setActive(null)} />}
      </Modal>
    </section>
  );
}
