import { CaseStudies } from "@/components/home/CaseStudies";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { GuideSection } from "@/components/home/GuideSection";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { LoopSection } from "@/components/home/LoopSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { ResearchBanner } from "@/components/home/ResearchBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { WorkWithMe } from "@/components/home/WorkWithMe";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <GuideSection />
      <ResearchBanner />
      <CaseStudies />
      <WorkWithMe />
      <ProjectsCarousel />
      <PlatformSection />
      <Testimonials />
      <LoopSection />
    </Layout>
  );
}
