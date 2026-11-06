import type { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { allNavLinks } from "@/data/nav";

type Props = { title: string; description: string | null; href: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: allNavLinks
    .filter((item) => item.href !== "/")
    .map((item) => ({ params: { slug: item.href.split("/").filter(Boolean) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = (params?.slug as string[] | undefined) ?? [];
  const href = `/${slug.join("/")}`;
  const item = allNavLinks.find((entry) => entry.href === href);
  if (!item) return { notFound: true };
  return {
    props: { title: item.label, description: item.description ?? null, href },
  };
};

export default function PlaceholderPage({ title, description, href }: Props) {
  return (
    <Layout title={title}>
      <section className="py-24">
        <Container>
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">{href}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold">{title}</h1>
          {description && <p className="mt-4 text-xl text-ink-600">{description}</p>}
          <p className="mt-8 max-w-xl rounded-card bg-ink-50 p-5 text-ink-600">
            This page is a placeholder generated from the navigation data. We will replace it with
            the real page in a later step.
          </p>
          <div className="mt-8">
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
