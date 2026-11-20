import type { GetStaticPaths, GetStaticProps } from "next";
import { PostPage } from "@/components/pages/PostPage";
import { posts } from "@/data/posts";
import { locales } from "@/lib/i18n";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.flatMap((locale) =>
    posts.map((post) => ({ params: { slug: post.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug || !posts.some((post) => post.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

export default function BlogPostRoute({ slug }: Props) {
  return <PostPage slug={slug} />;
}
