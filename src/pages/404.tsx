import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <Layout title={["Page not found", "Page introuvable"]}>
      <section className="py-32">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">404</p>
          <h1 className="mt-4 text-5xl font-semibold">
            {t(["We couldn’t find that page.", "Nous n’avons pas trouvé cette page."])}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-600">
            {t([
              "It may not be built yet. We’re adding pages step by step.",
              "Elle n’existe peut-être pas encore. Nous ajoutons les pages étape par étape.",
            ])}
          </p>
          <div className="mt-10">
            <Button href="/" size="lg">
              {t(["Back to home", "Retour à l’accueil"])}
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
