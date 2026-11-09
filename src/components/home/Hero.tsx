import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroWave } from "./HeroWave";
import { LiveStatus } from "./LiveStatus";

export function Hero() {
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

      <Container className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
        <div className="animate-fade-up">
          <LiveStatus />
        </div>
        <h1
          className="mt-6 max-w-2xl animate-fade-up text-5xl font-semibold sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Engineering that ships, scales and stays up.
        </h1>
        <p
          className="mt-6 max-w-xl animate-fade-up text-lg text-ink-600 sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          I’m a DevOps engineer. I design the pipelines, cloud platforms and automation that carry
          software from a commit to production, and keep it reliable once it gets there.
        </p>
        <div
          className="mt-10 flex animate-fade-up flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button href="/get-started" size="lg" arrow>
            Get started
          </Button>
          <Button href="/sign-in" size="lg" variant="secondary">
            <GitBranch aria-hidden className="size-4" />
            Continue with GitHub
          </Button>
        </div>
      </Container>
    </section>
  );
}
