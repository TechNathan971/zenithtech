import Head from "next/head";
import type { ReactNode } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {
  title?: Text;
  description?: Text;
  children: ReactNode;
};

export function Layout({ title, description = site.description, children }: LayoutProps) {
  const { t } = useI18n();
  const fullTitle = title ? `${t(title)} | ${site.name}` : `${site.name} | ${t(site.tagline)}`;
  const text = t(description);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={text} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={text} />
        <meta property="og:type" content="website" />
      </Head>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-card"
      >
        {t(["Skip to content", "Aller au contenu"])}
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* The page frame: thin vertical lines with a small gap to the window edge, like the original */}
        <div className="mx-auto flex w-full flex-1 flex-col sm:w-[calc(100%_-_3rem)] sm:max-w-[1320px] sm:border-x sm:border-ink-100">
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
