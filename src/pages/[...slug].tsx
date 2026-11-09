import type { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllNavLinks } from "@/data/nav";
import { useI18n } from "@/hooks/useI18n";
import { locales, toLocale } from "@/lib/i18n";

type Props = { title: string; description: string | null; href: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.flatMap((locale) =>
    getAllNavLinks(locale)
      .filter((item) => item.href !== "/")
      .map((item) => ({ params: { slug: item.href.split("/").filter(Boolean) }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const slug = (params?.slug as string[] | undefined) ?? [];
  const href = `/${slug.join("/")}`;
  const item = getAllNavLinks(toLocale(locale)).find((entry) => entry.href === href);
  if (!item) return { notFound: true };
  return {
    props: { title: item.label, description: item.description ?? null, href },
  };
};

export default function PlaceholderPage({ title, description, href }: Props) {
  const { t } = useI18n();

  return (
    <Layout title={title}>
      <section className="py-24">
        <Container>
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">{href}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold">{title}</h1>
          {description && <p className="mt-4 text-xl text-ink-600">{description}</p>}
          <p className="mt-8 max-w-xl rounded-card bg-ink-50 p-5 text-ink-600">
            {t([
              "This page is a placeholder generated from the navigation data. We’ll replace it with the real page in a later step.",
              "Cette page est un espace réservé généré à partir des données de navigation. Nous la remplacerons par la vraie page dans une prochaine étape.",
            ])}
          </p>
          <div className="mt-8">
            <Button href="/" variant="secondary">
              {t(["Back to home", "Retour à l’accueil"])}
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
