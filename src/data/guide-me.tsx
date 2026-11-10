import { GuideSection } from "@/components/home/GuideSection";
import { Layout } from "@/components/layout/Layout";

export default function GuideMePage() {
  return (
    <Layout
      title={["Guide me", "Me guider"]}
      description={[
        "Describe what you’re working on and get pointers to the work and services that fit.",
        "Décrivez votre projet et obtenez des pistes vers les travaux et services qui conviennent.",
      ]}
    >
      <GuideSection as="h1" />
    </Layout>
  );
}
