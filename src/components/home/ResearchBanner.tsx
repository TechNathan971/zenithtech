import { Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";
import type { WaveLook } from "@/lib/wave";
import { HeroWave } from "./HeroWave";

// Save your photo as public/images/me-banner.jpg (about 2400 x 1000, you on the right half).
const PHOTO = "/images/me-banner.jpg";

const look: WaveLook = {
  colors: ["#5b7cff", "#a855f7", "#ff8a6b"],
  angle: -0.3,
  center: [0.72, 0.5],
  scale: 0.9,
  speed: 0.7,
  seed: 21,
};

const metrics: { label: Text; value: Text }[] = [
  {
    label: ["Lead time", "Délai de livraison"],
    value: ["4.2 h → under 6 min", "4,2 h → moins de 6 min"],
  },
  { label: ["Failure rate", "Taux d’échec"], value: ["34% → 4%", "34 % → 4 %"] },
  { label: ["Recovery", "Rétablissement"], value: "11 min" },
  { label: ["Frequency", "Fréquence"], value: "+750%" },
];

export function ResearchBanner() {
  const { t } = useI18n();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-card bg-ink-950 text-white">
          {photoFailed ? (
            // no photo yet: a soft moving ribbon fills the banner
            <HeroWave
              look={look}
              resolution={0.45}
              fps={24}
              fade={0}
              className="absolute inset-0 -z-20 size-full opacity-80"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={(img) => {
                if (img && img.complete && img.naturalWidth === 0) setPhotoFailed(true);
              }}
              src={PHOTO}
              alt=""
              onError={() => setPhotoFailed(true)}
              className="absolute inset-0 -z-20 size-full object-cover object-right"
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/40 to-transparent"
          />

          <div className="grid min-h-[30rem] gap-10 p-8 sm:p-12 lg:grid-cols-[1.25fr_1fr]">
            <div className="flex flex-col justify-between gap-10">
              <div>
                <p className="text-sm font-semibold tracking-widest text-brand-200 uppercase">
                  {t(["Research", "Recherche"])}
                </p>
                <h2 className="mt-4 max-w-lg text-3xl leading-tight font-medium tracking-tight text-white sm:text-5xl">
                  {t([
                    "Measuring what makes delivery reliable.",
                    "Mesurer ce qui rend la livraison fiable.",
                  ])}
                </h2>
                <p className="mt-4 max-w-lg text-lg text-ink-200">
                  {t([
                    "My thesis tests whether automated CI/CD pipelines really improve delivery in humanitarian software, using the four DORA metrics.",
                    "Mon mémoire teste si les pipelines CI/CD automatisés améliorent vraiment la livraison dans les logiciels humanitaires, avec les quatre métriques DORA.",
                  ])}
                </p>
              </div>
              <div>
                <ul className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                  {metrics.map((metric) => (
                    <li
                      key={t(metric.label)}
                      className="rounded-xl border border-white/15 bg-white/10 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                      <p className="text-[11px] text-ink-200">{t(metric.label)}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{t(metric.value)}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/work/research-thesis" variant="inverse" size="lg" arrow>
                    {t(["Read the thesis", "Lire le mémoire"])}
                  </Button>
                  <Button
                    href="/work/dwts"
                    size="lg"
                    variant="ghost"
                    className="text-white hover:text-brand-200"
                  >
                    {t(["See the DWTS results", "Voir les résultats de DWTS"])}
                  </Button>
                </div>
              </div>
            </div>

            {photoFailed && (
              <div className="hidden items-center justify-center lg:flex">
                <div className="grid aspect-[4/5] w-full max-w-xs place-items-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center">
                  <div>
                    <Camera aria-hidden className="mx-auto size-10 text-white/70" />
                    <p className="mt-4 font-semibold text-white">
                      {t(["Your photo goes here", "Votre photo va ici"])}
                    </p>
                    <p className="mt-2 text-xs text-white/70">
                      {t(["Save it as", "Enregistrez-la sous"])}
                    </p>
                    <code className="mt-1 inline-block rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white">
                      public/images/me-banner.jpg
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="absolute right-8 bottom-6 hidden text-xl font-semibold tracking-tight text-white sm:block sm:text-2xl">
            zenithtech <span className="font-light">research</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
