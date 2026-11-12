import type { Text } from "@/lib/i18n";

/** Gradient art for each project, used on the cards and in the accordion. */
export const projectArt: Record<string, string> = {
  dwts: "bg-linear-to-br from-brand-600 via-violet-500 to-pink-400",
  melokeys: "bg-linear-to-br from-ink-900 via-violet-700 to-fuchsia-500",
  "ci-cd-lab-pipeline": "bg-linear-to-br from-brand-900 via-brand-600 to-cyan-400",
  senvato: "bg-linear-to-br from-orange-400 via-coral-500 to-pink-500",
};

export const projectMarks: Record<string, string> = {
  dwts: "D",
  melokeys: "M",
  "ci-cd-lab-pipeline": "CI",
  senvato: "S",
};

/** One-line outcome for each project, taken from the results you gave me. */
export const caseHeadlines: Record<string, Text> = {
  dwts: [
    "DWTS cuts deployment lead time from 4.2 hours to under 6 minutes.",
    "DWTS ramène le délai de déploiement de 4,2 heures à moins de 6 minutes.",
  ],
  "ci-cd-lab-pipeline": [
    "The CI/CD lab automates every build and sets up test environments in under 5 minutes.",
    "Le labo CI/CD automatise chaque build et prépare des environnements de test en moins de 5 minutes.",
  ],
  senvato: [
    "Senvato brings local trade professionals online and halves contact response time.",
    "Senvato met les professionnels des métiers locaux en ligne et divise par deux le délai de réponse.",
  ],
  melokeys: [
    "MeloKeys speeds up keyboard and audio layout setup by 40%.",
    "MeloKeys accélère de 40 % la mise en place des dispositions de clavier et d’audio.",
  ],
};
