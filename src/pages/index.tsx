import { AnnualLetter } from "@/components/home/AnnualLetter";
import { CaseStudies } from "@/components/home/CaseStudies";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { GuideSection } from "@/components/home/GuideSection";
import { Hero } from "@/components/home/Hero";
import { LabProjects } from "@/components/home/LabProjects";
import { LogoStrip } from "@/components/home/LogoStrip";
import { LoopSection } from "@/components/home/LoopSection";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { ReadOfTheWeek } from "@/components/home/ReadOfTheWeek";
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
      <LabProjects limit={6} />
      <PlatformSection />
      <Testimonials />
      <LoopSection />
      <NewsCarousel />
      <AnnualLetter />
      <ReadOfTheWeek />
      <ClosingCta />
    </Layout>
  );
}
