import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroWave } from "./HeroWave";
import { VolumeCounter } from "./VolumeCounter";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_35%,var(--color-brand-100),transparent)]"
      />
      <HeroWave className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)] opacity-70 sm:opacity-100" />

      <Container className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
        <div className="animate-fade-up">
          <VolumeCounter />
        </div>
        <h1
          className="mt-6 max-w-2xl animate-fade-up text-5xl font-semibold sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Payments and money tools that grow with you.
        </h1>
        <p
          className="mt-6 max-w-xl animate-fade-up text-lg text-ink-600 sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          Take payments, run subscriptions and send money worldwide from one platform built to scale
          with your business.
        </p>
        <div
          className="mt-10 flex animate-fade-up flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button href="/get-started" size="lg" arrow>
            Get started
          </Button>
          <Button href="/products" size="lg" variant="secondary">
            Explore products
          </Button>
        </div>
      </Container>
    </section>
  );
}
