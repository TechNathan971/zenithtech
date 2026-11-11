import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { writing } from "@/data/portfolio";
import { useI18n } from "@/hooks/useI18n";

export function ResearchBanner() {
  const { t } = useI18n();
  const thesis = writing[0];

  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-ink-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(50% 70% at 88% 10%, rgba(139,92,246,0.55), transparent), radial-gradient(45% 60% at 98% 95%, rgba(255,107,74,0.45), transparent), radial-gradient(40% 60% at 60% 120%, rgba(61,92,255,0.5), transparent)",
            }}
          />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-widest text-brand-200 uppercase">
                {t(["Research", "Recherche"])}
              </p>
              <h2 className="mt-4 max-w-xl text-2xl leading-tight font-medium text-white sm:text-3xl lg:text-4xl">
                {t([
                  "Measuring CI/CD with DORA metrics",
                  "Mesurer le CI/CD avec les métriques DORA",
                ])}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-ink-200">
                {t([
                  "My thesis tests whether automated pipelines really improve delivery in humanitarian software, using the four DORA metrics.",
                  "Mon mémoire teste si les pipelines automatisés améliorent vraiment la livraison dans les logiciels humanitaires, à l’aide des quatre métriques DORA.",
                ])}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <p className="text-xs font-medium tracking-wide text-ink-200 uppercase">
                {t(thesis.kind)}
              </p>
              <p className="mt-2 text-base leading-snug font-medium text-white">
                {t(thesis.title)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
