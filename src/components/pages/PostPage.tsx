import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { SectionNav, type SectionLink } from "@/components/ui/SectionNav";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { posts, readingMinutes } from "@/data/posts";
import { useI18n } from "@/hooks/useI18n";
import { formatDate } from "@/lib/text";

export function PostPage({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const post = posts.find((entry) => entry.slug === slug);

  const sections = useMemo<SectionLink[]>(() => {
    if (!post) return [];
    return post.blocks.flatMap((block, index) =>
      block.type === "h2" ? [{ id: `s${index}`, label: block.text }] : [],
    );
  }, [post]);

  if (!post) return null;
  const others = posts.filter((entry) => entry.slug !== slug);

  return (
    <Layout title={post.title} description={post.excerpt}>
      <section className="py-14 sm:py-20">
        <Container>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-800">
            ← {t(["All posts", "Tous les articles"])}
          </Link>
          <p className="mt-8 text-sm font-semibold tracking-widest text-brand-600 uppercase">
            {t(post.category)}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl leading-tight font-medium tracking-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
            {t(post.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-600">{t(post.excerpt)}</p>
          <p className="mt-6 text-sm text-ink-500">
            {formatDate(post.date, locale)} · {readingMinutes(post, locale)}{" "}
            {t(["min read", "min de lecture"])}
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[13rem_1fr]">
            <SectionNav sections={sections} />

            <article className="max-w-3xl min-w-0 space-y-6">
              {post.blocks.map((block, index) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={index}
                        id={`s${index}`}
                        className="scroll-mt-28 pt-8 text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl"
                      >
                        {t(block.text)}
                      </h2>
                    );
                  case "p":
                    return (
                      <p key={index} className="text-lg leading-relaxed text-ink-700">
                        {t(block.text)}
                      </p>
                    );
                  case "ul":
                    return (
                      <ul key={index} className="space-y-3 text-lg text-ink-700">
                        {block.items.map((item) => (
                          <li key={t(item)} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-600"
                            />
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    );
                  case "ol":
                    return (
                      <ol key={index} className="space-y-4 text-lg text-ink-700">
                        {block.items.map((item, itemIndex) => (
                          <li key={t(item)} className="flex gap-4">
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                              {itemIndex + 1}
                            </span>
                            <span className="pt-0.5">{t(item)}</span>
                          </li>
                        ))}
                      </ol>
                    );
                  case "code":
                    return <CodeBlock key={index} label={block.label} code={block.code} />;
                  case "link":
                    return (
                      <p key={index} className="rounded-card bg-ink-50 p-5 text-lg">
                        <Link
                          href={block.href}
                          className="font-semibold text-brand-700 underline hover:text-brand-900"
                        >
                          {t(block.text)}
                        </Link>
                      </p>
                    );
                }
              })}

              <div className="pt-10">
                <p className="text-sm font-semibold text-ink-950">
                  {t(["Tools in this post", "Outils de cet article"])}
                </p>
                <ul className="mt-3 flex gap-2">
                  {post.tools.map((tool) => (
                    <li
                      key={tool}
                      className="grid size-10 place-items-center rounded-full border border-ink-100 bg-white"
                    >
                      <ToolLogoImg slug={tool} className="size-5 object-contain" />
                    </li>
                  ))}
                </ul>
              </div>

              {others.length > 0 && (
                <div className="pt-10">
                  <p className="text-2xl font-medium tracking-tight text-ink-950">
                    {t(["Keep reading", "Continuer la lecture"])}
                  </p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/blog/${other.slug}`}
                          className="group block overflow-hidden rounded-card border border-ink-100 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                        >
                          <div className={clsx("h-24", other.art)} />
                          <p className="p-5 font-semibold text-ink-950 group-hover:text-brand-700">
                            {t(other.title)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-card bg-ink-50 p-6 sm:p-8">
                <p className="text-xl font-semibold text-ink-950">
                  {t(["Want help applying this?", "Envie d’aide pour l’appliquer ?"])}
                </p>
                <div className="mt-5">
                  <Button href="/contact" arrow>
                    {t(["Contact me", "Me contacter"])}
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
