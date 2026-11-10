import { FeatureGrid } from "@/components/home/FeatureGrid";
import { GuideSection } from "@/components/home/GuideSection";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ResearchBanner } from "@/components/home/ResearchBanner";
import { StatsBand } from "@/components/home/StatsBand";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <GuideSection />
      <ResearchBanner />
      <StatsBand />
    </Layout>
  );
}
