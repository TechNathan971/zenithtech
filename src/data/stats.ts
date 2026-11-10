import { projects, yearsInTech } from "@/data/portfolio";
import type { Text } from "@/lib/i18n";

export type Stat = { value: string; label: Text };

// Every number comes from your own details in portfolio.ts.
export const stats: Stat[] = [
  { value: `${yearsInTech}+`, label: ["years in tech", "ans dans la tech"] },
  { value: String(projects.length), label: ["featured projects", "projets phares"] },
  {
    value: "< 6 min",
    label: [
      "deployment lead time on DWTS, down from 4.2 hours",
      "délai de déploiement sur DWTS, contre 4,2 heures auparavant",
    ],
  },
  {
    value: "4%",
    label: [
      "change failure rate on DWTS, down from 34%",
      "taux d’échec des changements sur DWTS, contre 34 % auparavant",
    ],
  },
];
