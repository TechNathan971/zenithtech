import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import { GuideBox } from "./GuideBox";

export function GuideSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const { t } = useI18n();
  const Heading = as;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Heading className="text-4xl leading-tight font-semibold sm:text-5xl">
              {t(["Not sure where to start?", "Pas sûr par où commencer ?"])}
            </Heading>
            <p className="mt-4 max-w-md text-lg text-ink-600">
              {t([
                "Describe what you’re working on and get pointers to the work and services that fit.",
                "Décrivez votre projet et obtenez des pistes vers les travaux et services qui conviennent.",
              ])}
            </p>
          </div>
          <div className="rounded-card border border-ink-100 bg-ink-50 p-6 sm:p-8">
            <GuideBox />
          </div>
        </div>
      </Container>
    </section>
  );
}
