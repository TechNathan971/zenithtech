import type { GetStaticPaths, GetStaticProps } from "next";
import { GuidePage } from "@/components/pages/GuidePage";
import { guides } from "@/data/guides";
import { locales } from "@/lib/i18n";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.flatMap((locale) =>
    guides.map((guide) => ({ params: { slug: guide.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug || !guides.some((guide) => guide.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

export default function GuideRoute({ slug }: Props) {
  return <GuidePage slug={slug} />;
}
