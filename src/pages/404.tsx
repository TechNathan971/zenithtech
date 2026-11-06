import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <section className="py-32">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">404</p>
          <h1 className="mt-4 text-5xl font-semibold">We could not find that page.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-600">
            It may not be built yet. We are adding pages step by step.
          </p>
          <div className="mt-10">
            <Button href="/" size="lg">
              Back to home
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
