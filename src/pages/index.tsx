import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <Layout>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="animate-fade-up text-sm font-semibold tracking-widest text-brand-600 uppercase">
            Step 2 · Design system and layout shell
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold sm:text-6xl">
            Money tools for businesses that mean to grow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-600">
            The real homepage arrives in Step 4. For now this page proves the shell, the tokens and
            the routing all work.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/design" size="lg" arrow>
              View the design system
            </Button>
            <Button href="/does-not-exist" size="lg" variant="secondary">
              Test the 404 page
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
