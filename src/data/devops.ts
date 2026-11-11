import type { Text } from "@/lib/i18n";

export type StageId = "build" | "deploy" | "monitor" | "scale";

export type Stage = {
  id: StageId;
  t: number; // where the stage sits on the loop
  side: "left" | "right"; // which side its label appears on
  label: Text;
  summary: Text;
  points: Text[];
  tools: string[];
  href: string;
  cta: Text;
};

export const stages: Stage[] = [
  {
    id: "build",
    t: (3 * Math.PI) / 4,
    side: "left",
    label: ["Build & Test", "Construire et tester"],
    summary: [
      "Every change is built and analysed automatically. SonarQube checks code quality and Nexus stores each versioned build, so nothing unverified moves forward.",
      "Chaque changement est construit et analysé automatiquement. SonarQube contrôle la qualité du code et Nexus stocke chaque build versionné : rien de non vérifié ne passe à l’étape suivante.",
    ],
    points: [
      [
        "100% automated build execution in the lab pipeline",
        "Exécution des builds automatisée à 100 % dans le pipeline de laboratoire",
      ],
      [
        "Test environments ready in under 5 minutes",
        "Environnements de test prêts en moins de 5 minutes",
      ],
    ],
    tools: ["Jenkins", "SonarQube", "Nexus", "Docker"],
    href: "/work/ci-cd-lab-pipeline",
    cta: ["See the CI/CD lab", "Voir le labo CI/CD"],
  },
  {
    id: "deploy",
    t: Math.PI / 4,
    side: "right",
    label: ["Deploy & Release", "Déployer et livrer"],
    summary: [
      "Pipelines ship to servers in minutes, with the same steps every time. On DWTS, GitHub Actions and Docker on AWS EC2 replaced slow manual releases.",
      "Les pipelines livrent sur les serveurs en quelques minutes, avec les mêmes étapes à chaque fois. Sur DWTS, GitHub Actions et Docker sur AWS EC2 ont remplacé des livraisons manuelles lentes.",
    ],
    points: [
      [
        "Lead time from 4.2 hours to under 6 minutes",
        "Délai de livraison de 4,2 heures à moins de 6 minutes",
      ],
      ["Deployment frequency up 750%", "Fréquence de déploiement en hausse de 750 %"],
    ],
    tools: ["GitHub Actions", "Docker", "AWS EC2"],
    href: "/work/dwts",
    cta: ["See the DWTS project", "Voir le projet DWTS"],
  },
  {
    id: "monitor",
    t: (7 * Math.PI) / 4,
    side: "right",
    label: ["Monitor & Observe", "Superviser et observer"],
    summary: [
      "You can’t improve what you don’t measure. The four DORA metrics show lead time, frequency, failures and recovery, which is exactly what my thesis studies.",
      "On n’améliore pas ce qu’on ne mesure pas. Les quatre métriques DORA montrent le délai, la fréquence, les échecs et le rétablissement, exactement ce qu’étudie mon mémoire.",
    ],
    points: [
      [
        "Change failure rate down from 34% to 4%",
        "Taux d’échec des changements ramené de 34 % à 4 %",
      ],
      [
        "Mean time to recovery cut to 11 minutes",
        "Temps moyen de rétablissement réduit à 11 minutes",
      ],
    ],
    tools: ["DORA metrics", "Research"],
    href: "/work/dora-metrics",
    cta: ["Read about DORA metrics", "Lire sur les métriques DORA"],
  },
  {
    id: "scale",
    t: (5 * Math.PI) / 4,
    side: "left",
    label: ["Secure & Scale", "Sécuriser et passer à l’échelle"],
    summary: [
      "Containers keep environments identical, Kubernetes scales them as demand grows, and NGINX stands in front as a reverse proxy.",
      "Les conteneurs gardent les environnements identiques, Kubernetes les adapte à la demande, et NGINX se place devant comme reverse proxy.",
    ],
    points: [
      [
        "Containers keep every environment identical",
        "Les conteneurs gardent chaque environnement identique",
      ],
      [
        "Kubernetes scales workloads when load grows",
        "Kubernetes adapte les charges quand la demande augmente",
      ],
      [
        "NGINX acts as the reverse proxy in front",
        "NGINX joue le rôle de reverse proxy en frontal",
      ],
    ],
    tools: ["Docker", "Kubernetes", "NGINX", "AWS EC2"],
    href: "/work/docker-containers",
    cta: ["Read about containers", "Lire sur les conteneurs"],
  },
];

export type PresetId = "aurora" | "matrix" | "neon" | "network" | "cyber" | "horizon";

export type Preset = {
  id: PresetId;
  label: Text;
  dev: string; // colour of the Dev half
  ops: string; // colour of the Ops half
  accent: string; // grid and network colour
  background: string;
};

export const presets: Preset[] = [
  {
    id: "aurora",
    label: "Aurora DevOps",
    dev: "#3d7bff",
    ops: "#c04dff",
    accent: "#7aa2ff",
    background: "radial-gradient(80% 70% at 50% 0%, #14246e 0%, #0a1233 55%, #070d24 100%)",
  },
  {
    id: "matrix",
    label: "Cloud Matrix",
    dev: "#22d3ee",
    ops: "#34d399",
    accent: "#6ee7b7",
    background: "radial-gradient(80% 70% at 50% 0%, #0b4a5a 0%, #082530 55%, #061218 100%)",
  },
  {
    id: "neon",
    label: ["Neon Infrastructure", "Infrastructure néon"],
    dev: "#00e5ff",
    ops: "#ff3df2",
    accent: "#b794ff",
    background: "radial-gradient(80% 70% at 50% 0%, #3a0f66 0%, #1a0838 55%, #0a0620 100%)",
  },
  {
    id: "network",
    label: ["Digital Network", "Réseau numérique"],
    dev: "#60a5fa",
    ops: "#a78bfa",
    accent: "#93c5fd",
    background: "radial-gradient(80% 70% at 50% 0%, #1e2f7a 0%, #0f1a45 55%, #0a1030 100%)",
  },
  {
    id: "cyber",
    label: ["Cyber Flow", "Flux cyber"],
    dev: "#f59e0b",
    ops: "#ef4444",
    accent: "#fb923c",
    background: "radial-gradient(80% 70% at 50% 0%, #4a1a14 0%, #260d12 55%, #12080f 100%)",
  },
  {
    id: "horizon",
    label: ["Tech Horizon", "Horizon tech"],
    dev: "#3b82f6",
    ops: "#f97316",
    accent: "#fbbf24",
    background: "radial-gradient(80% 70% at 50% 100%, #7a3512 0%, #17204f 45%, #0a1030 100%)",
  },
];
