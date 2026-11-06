import Head from "next/head";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Layout({ title, description = site.description, children }: LayoutProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-card"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
