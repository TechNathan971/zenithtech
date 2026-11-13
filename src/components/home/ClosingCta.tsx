import { ChevronRight, Code, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";

export function ClosingCta() {
  const { t } = useI18n();

  const blocks = [
    {
      icon: Tag,
      title: ["See what you’ll pay", "Voir ce que vous paierez"],
      text: [
        "Fixed-price projects with a clear scope and no surprises.",
        "Des projets au forfait avec un périmètre clair et sans surprise.",
      ],
      link: ["Pricing details", "Détails des tarifs"],
      href: "/pricing",
    },
    {
      icon: Code,
      title: ["Browse the work", "Parcourir les travaux"],
      text: [
        "Real projects with the tools and results behind them.",
        "De vrais projets avec les outils et les résultats derrière eux.",
      ],
      link: ["See the work", "Voir les travaux"],
      href: "/work",
    },
  ] as const;

  return (
    <section className="border-t border-ink-100 bg-ink-50 py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <h2 className="text-3xl leading-tight font-medium tracking-tight text-ink-950 sm:text-4xl">
              {t(["Ready to get started?", "Prêt à démarrer ?"])}
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-600">
              {t([
                "Start a project in a few minutes, or write to me about something custom.",
                "Démarrez un projet en quelques minutes, ou écrivez-moi pour quelque chose de sur mesure.",
              ])}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/get-started" size="lg" arrow>
                {t(["Start now", "Commencer"])}
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                {t(["Contact me", "Me contacter"])}
              </Button>
            </div>
          </div>
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div key={block.href}>
                <span className="grid size-12 place-items-center rounded-lg border border-ink-100 bg-white text-brand-600">
                  <Icon aria-hidden className="size-5" />
                </span>
                <p className="mt-6 font-semibold text-ink-950">{t(block.title)}</p>
                <p className="mt-2 text-ink-600">{t(block.text)}</p>
                <Link
                  href={block.href}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800"
                >
                  {t(block.link)}
                  <ChevronRight aria-hidden className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
