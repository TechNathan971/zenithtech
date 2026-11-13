import {
  Activity,
  Boxes,
  Eye,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Text } from "@/lib/i18n";

export type LabStatus = "live" | "in-progress" | "planned";

export type LabProject = {
  slug: string;
  title: Text;
  summary: Text;
  why: Text;
  status: LabStatus;
  tools: string[];
  icon: LucideIcon;
  /**
   * Fill these in when a project is published. A card opens the first one that exists,
   * in this order: site, repo, readme. With none, it opens the project's own page.
   */
  links: { site?: string; repo?: string; readme?: string };
};

export const statusLabels: Record<LabStatus, Text> = {
  live: ["Live", "En ligne"],
  "in-progress": ["In progress", "En cours"],
  planned: ["Planned", "Prévu"],
};

export type LabTarget = {
  href: string;
  external: boolean;
  kind: "site" | "repo" | "readme" | "details";
};

export function labHref(project: LabProject): LabTarget {
  const { site, repo, readme } = project.links;
  if (site) return { href: site, external: true, kind: "site" };
  if (repo) return { href: repo, external: true, kind: "repo" };
  if (readme) return { href: readme, external: true, kind: "readme" };
  return { href: `/work/lab/${project.slug}`, external: false, kind: "details" };
}

export const labProjects: LabProject[] = [
  {
    slug: "zenithtech-platform",
    title: ["ZenithTech platform", "Plateforme ZenithTech"],
    summary: [
      "This very site: a bilingual Next.js app that I’m taking all the way through a full DevOps cycle.",
      "Ce site même : une application Next.js bilingue que je mène à travers un cycle DevOps complet.",
    ],
    why: [
      "Shows the whole path from code to CI/CD, containers and Kubernetes on one real app.",
      "Montre tout le chemin du code au CI/CD, aux conteneurs et à Kubernetes sur une vraie application.",
    ],
    status: "in-progress",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    icon: Globe,
    links: { repo: "https://github.com/TechNathan971/zenithtech" },
  },
  {
    slug: "pipeline-templates",
    title: ["Reusable CI/CD templates", "Modèles CI/CD réutilisables"],
    summary: [
      "A library of GitHub Actions workflows for Node, PHP and Docker projects that any repo can adopt in minutes.",
      "Une bibliothèque de workflows GitHub Actions pour les projets Node, PHP et Docker, adoptable en quelques minutes par n’importe quel dépôt.",
    ],
    why: [
      "Turns what I learned on DWTS into something other teams can copy.",
      "Transforme ce que j’ai appris sur DWTS en quelque chose que d’autres équipes peuvent reprendre.",
    ],
    status: "planned",
    tools: ["GitHub Actions", "Docker"],
    icon: Workflow,
    links: {},
  },
  {
    slug: "compose-lab",
    title: ["Docker Compose lab stacks", "Stacks de labo Docker Compose"],
    summary: [
      "Ready-to-run stacks: LAMP, MERN, NGINX with PHP-FPM, and Jenkins with SonarQube and Nexus.",
      "Des stacks prêtes à l’emploi : LAMP, MERN, NGINX avec PHP-FPM, et Jenkins avec SonarQube et Nexus.",
    ],
    why: [
      "Makes test environments start with one command, like the under-5-minute setup in my CI/CD lab.",
      "Permet de lancer des environnements de test d’une seule commande, comme la mise en place en moins de 5 minutes de mon labo CI/CD.",
    ],
    status: "planned",
    tools: ["Docker", "NGINX", "MySQL", "PHP"],
    icon: Boxes,
    links: {},
  },
  {
    slug: "k8s-homelab",
    title: ["Kubernetes home lab", "Labo Kubernetes local"],
    summary: [
      "A local cluster with Helm charts that deploy a sample app with health checks and autoscaling.",
      "Un cluster local avec des charts Helm qui déploient une application d’exemple avec contrôles de santé et mise à l’échelle automatique.",
    ],
    why: [
      "Proves the Kubernetes side of the stack with something anyone can run on a laptop.",
      "Démontre le volet Kubernetes de la stack avec quelque chose que chacun peut lancer sur un portable.",
    ],
    status: "planned",
    tools: ["Kubernetes", "Helm", "Docker"],
    icon: Layers,
    links: {},
  },
  {
    slug: "terraform-ec2",
    title: ["Terraform web server module", "Module Terraform de serveur web"],
    summary: [
      "One command that creates an EC2 server, a security group and an NGINX reverse proxy.",
      "Une seule commande qui crée un serveur EC2, un groupe de sécurité et un reverse proxy NGINX.",
    ],
    why: [
      "Moves my server work from hand-built to repeatable infrastructure as code.",
      "Fait passer mon travail sur les serveurs du fait main à une infrastructure reproductible en tant que code.",
    ],
    status: "planned",
    tools: ["Terraform", "AWS EC2", "NGINX"],
    icon: Server,
    links: {},
  },
  {
    slug: "dora-dashboard",
    title: ["DORA metrics dashboard", "Tableau de bord des métriques DORA"],
    summary: [
      "A dashboard that reads deployment data from GitHub and calculates the four DORA metrics automatically.",
      "Un tableau de bord qui lit les données de déploiement sur GitHub et calcule automatiquement les quatre métriques DORA.",
    ],
    why: [
      "Puts my thesis research into a tool teams can actually use.",
      "Met ma recherche de mémoire dans un outil que les équipes peuvent vraiment utiliser.",
    ],
    status: "planned",
    tools: ["Next.js", "GitHub API", "Charts"],
    icon: Gauge,
    links: {},
  },
  {
    slug: "status-monitor",
    title: ["Status page and uptime monitor", "Page de statut et surveillance de disponibilité"],
    summary: [
      "Checks a list of sites on a schedule and publishes an honest status page.",
      "Vérifie une liste de sites à intervalle régulier et publie une page de statut honnête.",
    ],
    why: [
      "Gives the green status dot on this site’s homepage something real to report.",
      "Donne au voyant vert de la page d’accueil de ce site quelque chose de réel à signaler.",
    ],
    status: "planned",
    tools: ["Node.js", "Next.js", "Cron"],
    icon: Activity,
    links: {},
  },
  {
    slug: "gitops-argocd",
    title: ["GitOps with Argo CD", "GitOps avec Argo CD"],
    summary: [
      "Deployments driven entirely from Git: merge a change and the cluster updates itself.",
      "Des déploiements pilotés entièrement par Git : on fusionne un changement et le cluster se met à jour.",
    ],
    why: [
      "Shows the next step after pipelines: Git as the single source of truth.",
      "Montre l’étape suivante après les pipelines : Git comme unique source de vérité.",
    ],
    status: "planned",
    tools: ["Argo CD", "Kubernetes", "GitHub"],
    icon: GitBranch,
    links: {},
  },
  {
    slug: "observability-stack",
    title: ["Observability stack", "Pile d’observabilité"],
    summary: [
      "Metrics, logs and dashboards for a sample app, with alerts that fire only when something needs attention.",
      "Métriques, logs et tableaux de bord pour une application d’exemple, avec des alertes qui ne se déclenchent que lorsque c’est utile.",
    ],
    why: [
      "Adds the monitoring half of the DevOps loop to the portfolio.",
      "Ajoute au portfolio la moitié « supervision » de la boucle DevOps.",
    ],
    status: "planned",
    tools: ["Prometheus", "Grafana", "Loki"],
    icon: Eye,
    links: {},
  },
  {
    slug: "devsecops-pipeline",
    title: ["DevSecOps pipeline", "Pipeline DevSecOps"],
    summary: [
      "A pipeline that scans for leaked secrets, vulnerable dependencies and risky container images on every pull request.",
      "Un pipeline qui détecte les secrets exposés, les dépendances vulnérables et les images de conteneur risquées à chaque pull request.",
    ],
    why: [
      "Brings security into the same automated path as builds and deploys.",
      "Fait entrer la sécurité dans le même chemin automatisé que les builds et les déploiements.",
    ],
    status: "planned",
    tools: ["GitHub Actions", "Trivy", "Gitleaks", "SonarQube"],
    icon: ShieldCheck,
    links: {},
  },
  {
    slug: "nginx-playbooks",
    title: ["NGINX hosting playbooks", "Playbooks d’hébergement NGINX"],
    summary: [
      "Ansible playbooks that set up a reverse proxy, HTTPS and basic hardening on a fresh server.",
      "Des playbooks Ansible qui installent un reverse proxy, le HTTPS et un durcissement de base sur un serveur neuf.",
    ],
    why: [
      "Packages my server and NGINX service into something repeatable and documented.",
      "Met mon service de serveurs et NGINX sous une forme reproductible et documentée.",
    ],
    status: "planned",
    tools: ["Ansible", "NGINX", "Linux"],
    icon: Terminal,
    links: {},
  },
  {
    slug: "learndesk",
    title: ["LearnDesk tutoring portal", "Portail de cours LearnDesk"],
    summary: [
      "A small app for booking tech tutoring sessions and sharing lesson notes with learners.",
      "Une petite application pour réserver des cours d’informatique et partager des notes de cours avec les apprenants.",
    ],
    why: [
      "Supports my tutoring and training service with a tool I built and run myself.",
      "Appuie mon service de cours et de formation avec un outil que j’ai construit et que j’exploite moi-même.",
    ],
    status: "planned",
    tools: ["Next.js", "PostgreSQL", "Docker"],
    icon: GraduationCap,
    links: {},
  },
];
