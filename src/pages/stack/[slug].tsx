import type { GetStaticPaths, GetStaticProps } from "next";
import { ToolPage } from "@/components/pages/ToolPage";
import { heroLogos } from "@/data/customers";
import { locales } from "@/lib/i18n";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.flatMap((locale) =>
    heroLogos.map((logo) => ({ params: { slug: logo.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug || !heroLogos.some((logo) => logo.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

export default function StackPage({ slug }: Props) {
  return <ToolPage slug={slug} />;
}
