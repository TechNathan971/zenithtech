import type { Text } from "@/lib/i18n";

export type Read = {
  title: string;
  subtitle: string;
  authors: string;
  blurb: Text;
  why: Text;
  background: string;
  url?: string;
};

// A recommendation list, not a set of affiliate links. The homepage shows one per week.
export const reads: Read[] = [
  {
    title: "Accelerate",
    subtitle: "The Science of Lean Software and DevOps",
    authors: "Nicole Forsgren, Jez Humble and Gene Kim",
    blurb: [
      "Built on years of survey research with thousands of technology professionals, it shows that a handful of measures set high-performing software teams apart: lead time, deployment frequency, change failure rate and time to restore service.",
      "Fondé sur des années d’enquêtes auprès de milliers de professionnels de la technologie, ce livre montre qu’une poignée de mesures distingue les équipes logicielles performantes : délai de livraison, fréquence de déploiement, taux d’échec des changements et temps de rétablissement.",
    ],
    why: [
      "The source of the DORA metrics used in my thesis.",
      "La source des métriques DORA utilisées dans mon mémoire.",
    ],
    background: "linear-gradient(145deg, #1d2a6b, #3d5cff)",
  },
  {
    title: "The Phoenix Project",
    subtitle: "A Novel About IT, DevOps, and Helping Your Business Win",
    authors: "Gene Kim, Kevin Behr and George Spafford",
    blurb: [
      "A novel about an IT manager handed a failing project with no time to spare. Along the way it explains flow, feedback and learning, the ideas behind DevOps, as a story instead of a manual.",
      "Un roman sur un responsable informatique à qui l’on confie un projet en difficulté, sans temps à perdre. Il explique au passage le flux, le retour d’information et l’apprentissage, les idées du DevOps, sous forme d’histoire plutôt que de manuel.",
    ],
    why: [
      "A friendly way to see why pipelines matter beyond the tooling.",
      "Une façon accessible de comprendre pourquoi les pipelines comptent au-delà des outils.",
    ],
    background: "linear-gradient(145deg, #7a3512, #f97316)",
  },
  {
    title: "Site Reliability Engineering",
    subtitle: "How Google Runs Production Systems",
    authors: "Edited by Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy",
    blurb: [
      "How Google runs production systems at scale, from service level objectives and error budgets to monitoring and incident response. The full text is free to read online.",
      "Comment Google exploite des systèmes de production à grande échelle, des objectifs de niveau de service et budgets d’erreur à la supervision et à la réponse aux incidents. Le texte complet est lisible gratuitement en ligne.",
    ],
    why: [
      "A good next step once you have pipelines and want to keep them reliable.",
      "Une bonne suite une fois les pipelines en place, pour les garder fiables.",
    ],
    background: "linear-gradient(145deg, #0f4c3a, #10b981)",
    url: "https://sre.google/sre-book/table-of-contents/",
  },
  {
    title: "The DevOps Handbook",
    subtitle:
      "How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
    authors: "Gene Kim, Jez Humble, Patrick Debois and John Willis",
    blurb: [
      "A practical guide to bringing DevOps into an organisation, built around three ideas: fast flow of work, fast feedback, and a culture of continual learning.",
      "Un guide pratique pour introduire le DevOps dans une organisation, bâti sur trois idées : un flux de travail rapide, un retour d’information rapide et une culture d’apprentissage continu.",
    ],
    why: [
      "A practical map for adopting DevOps in a real team.",
      "Une feuille de route concrète pour adopter le DevOps dans une vraie équipe.",
    ],
    background: "linear-gradient(145deg, #4a1a6b, #a855f7)",
  },
];
