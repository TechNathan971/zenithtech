import type { Text } from "@/lib/i18n";

export type NewsItem = {
  id: string;
  category: Text;
  title: Text;
  href: string;
  external?: boolean;
  mark: string;
  art: string;
};

// Every item is something already true on this site. Add a new one at the top as things happen.
export const news: NewsItem[] = [
  {
    id: "thesis",
    category: ["Research", "Recherche"],
    title: [
      "Thesis: measuring CI/CD with DORA metrics",
      "Mémoire : mesurer le CI/CD avec les métriques DORA",
    ],
    href: "/work/research-thesis",
    mark: "DORA",
    art: "bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-400",
  },
  {
    id: "dwts",
    category: ["Case study", "Étude de cas"],
    title: ["DWTS: from 4.2 hours to under 6 minutes", "DWTS : de 4,2 heures à moins de 6 minutes"],
    href: "/work/dwts",
    mark: "4.2h → 6m",
    art: "bg-linear-to-br from-brand-700 via-brand-500 to-cyan-400",
  },
  {
    id: "build",
    category: ["Build log", "Journal de bord"],
    title: ["Building ZenithTech in the open", "Construire ZenithTech en toute transparence"],
    href: "https://github.com/TechNathan971/zenithtech",
    external: true,
    mark: "</>",
    art: "bg-linear-to-br from-ink-900 via-brand-800 to-violet-600",
  },
  {
    id: "workbench",
    category: ["Workbench", "Établi"],
    title: ["Twelve projects I’m planning next", "Douze projets que je prévois ensuite"],
    href: "/work",
    mark: "12",
    art: "bg-linear-to-br from-orange-400 via-coral-500 to-pink-500",
  },
  {
    id: "guide",
    category: ["New", "Nouveau"],
    title: [
      "Guide me: find the right starting point",
      "Me guider : trouver le bon point de départ",
    ],
    href: "/guide-me",
    mark: "?",
    art: "bg-linear-to-br from-teal-500 via-emerald-500 to-lime-400",
  },
  {
    id: "degree",
    category: ["Milestone", "Étape"],
    title: ["BSc in Software Engineering, 2026", "Bachelor of Science en génie logiciel, 2026"],
    href: "/letter",
    mark: "BSc",
    art: "bg-linear-to-br from-indigo-600 via-brand-500 to-sky-400",
  },
];
