import type { Text } from "@/lib/i18n";

export type NewsItem = {
  id: string;
  art: "letter" | "thesis" | "dwts" | "build" | "workbench" | "guide";
  /** Optional real picture, for example "/images/news/thesis.jpg". Without it, the illustration shows. */
  photo?: string;
  title: Text; // the dark lead text under the carousel
  text: Text; // the grey continuation
  href: string;
  external?: boolean;
  cta: Text;
};

// The first slide is the year in review, like the annual letter in the original.
export const news: NewsItem[] = [
  {
    id: "letter",
    art: "letter",
    title: [
      "2026 brought a degree, a thesis on CI/CD and the build of this site.",
      "2026 a apporté un diplôme, un mémoire sur le CI/CD et la construction de ce site.",
    ],
    text: [
      "The year in review covers what I shipped, what I measured and what comes next.",
      "Le bilan de l’année raconte ce que j’ai livré, ce que j’ai mesuré et ce qui vient ensuite.",
    ],
    href: "/letter",
    cta: ["Read the review", "Lire le bilan"],
  },
  {
    id: "thesis",
    art: "thesis",
    title: [
      "Does automation really improve delivery?",
      "L’automatisation améliore-t-elle vraiment la livraison ?",
    ],
    text: [
      "My thesis measures CI/CD pipelines in humanitarian software with the four DORA metrics.",
      "Mon mémoire mesure les pipelines CI/CD dans les logiciels humanitaires avec les quatre métriques DORA.",
    ],
    href: "/work/research-thesis",
    cta: ["Read the thesis", "Lire le mémoire"],
  },
  {
    id: "dwts",
    art: "dwts",
    title: [
      "DWTS went from 4.2 hours to under 6 minutes.",
      "DWTS est passé de 4,2 heures à moins de 6 minutes.",
    ],
    text: [
      "Automating the pipeline cut lead time, raised deployment frequency by 750% and lowered failures from 34% to 4%.",
      "L’automatisation du pipeline a réduit le délai, augmenté la fréquence de déploiement de 750 % et ramené les échecs de 34 % à 4 %.",
    ],
    href: "/work/dwts",
    cta: ["Read the story", "Lire l’histoire"],
  },
  {
    id: "build",
    art: "build",
    title: ["ZenithTech is built in the open.", "ZenithTech se construit en toute transparence."],
    text: [
      "Follow the code, the commits and the DevOps cycle on GitHub.",
      "Suivez le code, les commits et le cycle DevOps sur GitHub.",
    ],
    href: "https://github.com/TechNathan971/zenithtech",
    external: true,
    cta: ["View the repository", "Voir le dépôt"],
  },
  {
    id: "workbench",
    art: "workbench",
    title: ["Twelve projects are lined up next.", "Douze projets sont prévus ensuite."],
    text: [
      "From reusable pipelines to a DORA dashboard, each one gets its links here when it is published.",
      "Des pipelines réutilisables à un tableau de bord DORA, chacun reçoit ses liens ici dès sa publication.",
    ],
    href: "/work",
    cta: ["See the workbench", "Voir l’établi"],
  },
  {
    id: "guide",
    art: "guide",
    title: ["Not sure where to start?", "Pas sûr par où commencer ?"],
    text: [
      "Describe your project and Guide me points you to the work and services that fit.",
      "Décrivez votre projet et « Me guider » vous oriente vers les travaux et services qui conviennent.",
    ],
    href: "/guide-me",
    cta: ["Try Guide me", "Essayer Me guider"],
  },
];
