import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";

const strips = [
  { flex: "flex-[3]", art: "from-amber-300 to-orange-500" },
  { flex: "flex-[2]", art: "from-sky-300 to-brand-600" },
  { flex: "flex-[3]", art: "from-fuchsia-300 to-violet-600" },
  { flex: "flex-[1]", art: "from-emerald-300 to-teal-600" },
  { flex: "flex-[2]", art: "from-pink-300 to-rose-600" },
];

export function AnnualLetter() {
  const { t } = useI18n();

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <Link href="/letter" className="group block">
          <div className="relative flex min-h-72 items-end overflow-hidden rounded-card bg-linear-to-br from-violet-500 via-fuchsia-500 to-brand-600 p-8 sm:min-h-96 sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_100%,rgba(255,255,255,0.35),transparent)]"
            />
            <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 gap-3 p-6 md:flex">
              {strips.map((strip, index) => (
                <div
                  key={index}
                  className={`${strip.flex} rounded-xl bg-linear-to-b ${strip.art} opacity-90 transition-transform duration-500 group-hover:-translate-y-3`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                />
              ))}
            </div>
            <p className="relative text-4xl leading-tight font-semibold text-white sm:text-6xl">
              {t(["Year in review", "Bilan de l’année"])}
              <br />
              2026
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-lg leading-relaxed">
              <span className="font-semibold text-ink-950">
                {t([
                  "2026 brought a degree, a thesis on CI/CD and the build of this site.",
                  "2026 a apporté un diplôme, un mémoire sur le CI/CD et la construction de ce site.",
                ])}
              </span>{" "}
              <span className="text-ink-600">
                {t([
                  "Read what I shipped, what I measured and what comes next.",
                  "Découvrez ce que j’ai livré, ce que j’ai mesuré et ce qui vient ensuite.",
                ])}
              </span>
            </p>
            <span className="inline-flex h-12 items-center rounded-lg border border-brand-200 bg-white px-5 font-semibold text-brand-700 transition-colors group-hover:bg-brand-50">
              {t(["Read the review", "Lire le bilan"])}
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
