import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";

// Put your photo at public/images/me-banner.jpg (about 2400 x 1000, with you on the right half).
const PHOTO = "/images/me-banner.jpg";

export function ResearchBanner() {
  const { t } = useI18n();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="relative isolate flex min-h-[26rem] overflow-hidden rounded-card bg-ink-950 text-white sm:min-h-[34rem]">
          {/* shown until you add your photo */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage:
                "radial-gradient(50% 70% at 88% 10%, rgba(139,92,246,0.55), transparent), radial-gradient(45% 60% at 98% 95%, rgba(255,107,74,0.45), transparent), radial-gradient(40% 60% at 60% 120%, rgba(61,92,255,0.5), transparent)",
            }}
          />
          {!photoFailed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={(img) => {
                if (img && img.complete && img.naturalWidth === 0) setPhotoFailed(true);
              }}
              src={PHOTO}
              alt=""
              onError={() => setPhotoFailed(true)}
              className="absolute inset-0 -z-10 size-full object-cover object-right"
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-r from-black/75 via-black/35 to-transparent"
          />

          <div className="relative flex flex-col justify-between p-8 sm:p-12">
            <h2 className="max-w-lg text-3xl leading-tight font-medium tracking-tight text-white sm:text-5xl">
              {t([
                "Measuring what makes delivery reliable.",
                "Mesurer ce qui rend la livraison fiable.",
              ])}
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-3">
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

          <p className="absolute right-8 bottom-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            zenithtech <span className="font-light">research</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
