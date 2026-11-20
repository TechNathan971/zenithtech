import clsx from "clsx";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { posts, readingMinutes } from "@/data/posts";
import { useI18n } from "@/hooks/useI18n";
import { formatDate } from "@/lib/text";

export default function BlogIndexPage() {
  const { locale, t } = useI18n();
  const [featured, ...rest] = posts;

  return (
    <Layout
      title={["Blog", "Blog"]}
      description={[
        "Notes on DevOps, delivery metrics and the projects behind this site.",
        "Des notes sur le DevOps, les métriques de livraison et les projets derrière ce site.",
      ]}
    >
      <PageHero
        eyebrow={["Blog", "Blog"]}
        lead={["Notes from the field.", "Notes du terrain."]}
        rest={[
          "Short articles on delivery, reliability and automation.",
          "De courts articles sur la livraison, la fiabilité et l’automatisation.",
        ]}
      />

      <section className="pb-14 sm:pb-20">
        <Container>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-card border border-ink-100 bg-white/80 transition-all duration-300 hover:shadow-card md:grid-cols-[1.2fr_1fr]"
          >
            <div className={clsx("relative min-h-56 overflow-hidden", featured.art)}>
              <div
                aria-hidden
                className="absolute -inset-10 bg-[radial-gradient(40%_35%_at_75%_15%,rgba(255,255,255,0.4),transparent)] transition-transform duration-1000 ease-out group-hover:-translate-x-1/4 group-hover:translate-y-1/3 group-hover:scale-125"
              />
            </div>
            <div className="p-6 sm:p-10">
              <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
                {t(featured.category)}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                {t(featured.title)}
              </h2>
              <p className="mt-4 text-ink-600">{t(featured.excerpt)}</p>
              <p className="mt-6 text-sm text-ink-500">
                {formatDate(featured.date, locale)} · {readingMinutes(featured, locale)}{" "}
                {t(["min read", "min de lecture"])}
              </p>
            </div>
          </Link>

          {rest.length > 0 && (
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-ink-100 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className={clsx("h-40", post.art)} />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
                        {t(post.category)}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold text-ink-950 group-hover:text-brand-700">
                        {t(post.title)}
                      </h2>
                      <p className="mt-2 text-ink-600">{t(post.excerpt)}</p>
                      <div className="mt-auto flex items-center justify-between pt-6">
                        <ul className="flex gap-2">
                          {post.tools.map((tool) => (
                            <li
                              key={tool}
                              className="grid size-8 place-items-center rounded-full border border-ink-100 bg-white"
                            >
                              <ToolLogoImg slug={tool} className="size-4 object-contain" />
                            </li>
                          ))}
                        </ul>
                        <span className="text-sm text-ink-500">
                          {readingMinutes(post, locale)} {t(["min read", "min de lecture"])}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-12 text-center text-ink-600">
            {t([
              "New posts will appear here. You can follow along with the newsletter in the footer.",
              "Les nouveaux articles apparaîtront ici. Vous pouvez suivre avec la newsletter en bas de page.",
            ])}
          </p>
        </Container>
      </section>
    </Layout>
  );
}
