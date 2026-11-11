import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import { HeroWave } from "./HeroWave";
import { LiveStatus } from "./LiveStatus";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_35%,var(--color-brand-100),transparent)]"
      />
      <HeroWave className="pointer-events-none absolute inset-0 size-full opacity-70 sm:opacity-100" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white"
      />

      <Container className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="animate-fade-up">
          <LiveStatus />
        </div>
        <h1
          className="mt-6 max-w-5xl animate-fade-up text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-ink-950">
            {t([
              "Engineering that ships, scales and stays up.",
              "Une ingénierie qui livre, évolue et tient bon.",
            ])}
          </span>{" "}
          <span className="text-ink-500">
            {t([
              "I’m a DevOps engineer building the pipelines, cloud platforms and automation that carry software from commit to production.",
              "Je suis ingénieur DevOps : je conçois les pipelines, les plateformes cloud et l’automatisation qui portent un logiciel du commit jusqu’à la production.",
            ])}
          </span>
        </h1>
        <div
          className="mt-8 flex animate-fade-up flex-wrap gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <Button href="/get-started" size="lg" arrow>
            {t(["Get started", "Commencer"])}
          </Button>
          <Button href="/sign-in" size="lg" variant="secondary">
            <GitBranch aria-hidden className="size-4" />
            {t(["Continue with GitHub", "Continuer avec GitHub"])}
          </Button>
        </div>
      </Container>
    </section>
  );
}