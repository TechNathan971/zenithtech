import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LogoStrip />
      <FeatureGrid />
    </Layout>
  );
}
