import { tx, type Locale, type Text } from "@/lib/i18n";

export type FeatureId = "pipelines" | "containers" | "hosting" | "dora" | "quality" | "fullstack";

/* What we write: texts that can hold both languages. */
type FeatureSource = {
  id: FeatureId;
  title: Text;
  href: string;
  short: Text; // shown on the tile
  summary: Text; // shown in the pop-up
  bullets: Text[];
  tags: string[];
  cta: Text;
  surface: string; // gradient behind the mockup
  span: string; // grid columns on large screens
  split?: boolean; // text on the left, mockup on the right
};

/* What the components receive: plain strings in the current language. */
export type Feature = Omit<FeatureSource, "title" | "short" | "summary" | "bullets" | "cta"> & {
  title: string;
  short: string;
  summary: string;
  bullets: string[];
  cta: string;
};

export const features: FeatureSource[] = [
  {
    id: "pipelines",
    title: [
      "Pipelines that ship code safely and often",
      "Des pipelines qui livrent du code souvent et en toute sécurité",
    ],
    href: "/work/ci-cd-pipelines",
    short: [
      "Build, test and deploy on every push, so shipping becomes routine instead of an event.",
      "Construire, tester et déployer à chaque push, pour que la livraison devienne une routine plutôt qu’un événement.",
    ],
    summary: [
      "On my DWTS project, automating the pipeline took deployment lead time from 4.2 hours to under 6 minutes and cut the failure rate from 34% to 4%. I build pipelines that test, check and deploy automatically, with a clear record of every change.",
      "Sur mon projet DWTS, l’automatisation du pipeline a ramené le délai de déploiement de 4,2 heures à moins de 6 minutes et le taux d’échec de 34 % à 4 %. Je construis des pipelines qui testent, vérifient et déploient automatiquement, avec une trace claire de chaque changement.",
    ],
    bullets: [
      [
        "Every push is built and tested automatically",
        "Chaque push est construit et testé automatiquement",
      ],
      [
        "Deployments that take minutes, not hours",
        "Des déploiements qui prennent des minutes, pas des heures",
      ],
      [
        "A clear history of what changed and when",
        "Un historique clair de ce qui a changé et quand",
      ],
    ],
    tags: ["GitHub Actions", "Jenkins", "GitLab"],
    cta: ["Read about pipelines", "Lire sur les pipelines"],
    surface: "bg-linear-to-br from-orange-100 via-coral-400/40 to-pink-300",
    span: "lg:col-span-4",
  },
  {
    id: "containers",
    title: [
      "Containers and Kubernetes, from laptop to cluster",
      "Conteneurs et Kubernetes, de l’ordinateur portable au cluster",
    ],
    href: "/work/docker-containers",
    short: [
      "Package an app once, run it anywhere, and let the cluster scale it as demand changes.",
      "Empaqueter une application une fois, l’exécuter partout, et laisser le cluster l’adapter à la demande.",
    ],
    summary: [
      "Docker makes an app behave the same on every machine, and Kubernetes keeps it running at scale. My projects ship in containers, from the DWTS deployment to the Jenkins lab pipeline.",
      "Docker fait en sorte qu’une application se comporte de la même façon sur toutes les machines, et Kubernetes la maintient en marche à grande échelle. Mes projets sont livrés en conteneurs, du déploiement de DWTS au pipeline Jenkins de laboratoire.",
    ],
    bullets: [
      ["Small, reproducible images", "Des images légères et reproductibles"],
      [
        "Rolling updates and health checks",
        "Des mises à jour progressives et des contrôles de santé",
      ],
      [
        "Scaling with Kubernetes when load grows",
        "Une montée en charge avec Kubernetes quand la demande augmente",
      ],
    ],
    tags: ["Docker", "Kubernetes"],
    cta: ["Read about containers", "Lire sur les conteneurs"],
    surface: "bg-linear-to-br from-brand-100 via-violet-200 to-pink-200",
    span: "lg:col-span-2",
  },
  {
    id: "hosting",
    title: ["Servers and hosting you can rely on", "Des serveurs et un hébergement fiables"],
    href: "/work/aws-ec2-hosting",
    short: [
      "Set up cloud servers, configure NGINX and keep sites online without surprises.",
      "Mettre en place des serveurs cloud, configurer NGINX et garder les sites en ligne sans mauvaise surprise.",
    ],
    summary: [
      "From AWS EC2 instances to NGINX and Tomcat, I configure the servers that applications run on, with reverse-proxy setups and deployments that can be repeated the same way every time.",
      "Des instances AWS EC2 à NGINX et Tomcat, je configure les serveurs sur lesquels tournent les applications, avec des reverse proxies et des déploiements qui se répètent à l’identique à chaque fois.",
    ],
    bullets: [
      ["Cloud servers sized for the workload", "Des serveurs cloud dimensionnés pour la charge"],
      ["NGINX as a reverse proxy and web server", "NGINX comme reverse proxy et serveur web"],
      ["Repeatable, documented deployments", "Des déploiements reproductibles et documentés"],
    ],
    tags: ["AWS EC2", "NGINX", "Tomcat"],
    cta: ["Read about hosting", "Lire sur l’hébergement"],
    surface: "bg-linear-to-br from-violet-300 via-brand-300 to-brand-500",
    span: "lg:col-span-6",
    split: true,
  },
  {
    id: "dora",
    title: ["Measure delivery with DORA metrics", "Mesurer la livraison avec les métriques DORA"],
    href: "/work/dora-metrics",
    short: [
      "Lead time, deployment frequency, failure rate and recovery time show whether delivery is really improving.",
      "Délai de livraison, fréquence de déploiement, taux d’échec et temps de rétablissement montrent si la livraison s’améliore vraiment.",
    ],
    summary: [
      "My research thesis evaluates CI/CD pipelines in humanitarian software systems using DORA metrics. On DWTS, lead time fell from 4.2 hours to under 6 minutes, failures dropped from 34% to 4%, and recovery now takes 11 minutes.",
      "Mon mémoire de recherche évalue les pipelines CI/CD dans les systèmes logiciels humanitaires à l’aide des métriques DORA. Sur DWTS, le délai est passé de 4,2 heures à moins de 6 minutes, les échecs de 34 % à 4 %, et le rétablissement prend désormais 11 minutes.",
    ],
    bullets: [
      [
        "Deployment frequency up 750% on DWTS",
        "Fréquence de déploiement en hausse de 750 % sur DWTS",
      ],
      [
        "Change failure rate down from 34% to 4%",
        "Taux d’échec des changements ramené de 34 % à 4 %",
      ],
      [
        "Mean time to recovery cut to 11 minutes",
        "Temps moyen de rétablissement réduit à 11 minutes",
      ],
    ],
    tags: ["DORA", "Research", "Metrics"],
    cta: ["Read about the research", "Lire sur la recherche"],
    surface: "bg-linear-to-br from-pink-100 via-white to-violet-100",
    span: "lg:col-span-2",
  },
  {
    id: "quality",
    title: ["Code quality and trusted artifacts", "Qualité du code et artefacts de confiance"],
    href: "/work/code-quality",
    short: [
      "Automated analysis catches problems before they ship, and every build is stored and versioned.",
      "Une analyse automatisée détecte les problèmes avant la livraison, et chaque build est stocké et versionné.",
    ],
    summary: [
      "In my CI/CD lab pipeline, SonarQube analyses every change and Nexus stores each build, so what gets deployed is always traceable and meets a quality bar. A full test environment can be set up in under 5 minutes.",
      "Dans mon pipeline CI/CD de laboratoire, SonarQube analyse chaque changement et Nexus stocke chaque build : ce qui est déployé est toujours traçable et respecte un seuil de qualité. Un environnement de test complet se met en place en moins de 5 minutes.",
    ],
    bullets: [
      [
        "Quality checks that stop risky changes",
        "Des contrôles de qualité qui bloquent les changements risqués",
      ],
      [
        "Every build versioned in an artifact repository",
        "Chaque build versionné dans un dépôt d’artefacts",
      ],
      [
        "100% automated builds in the lab pipeline",
        "Des builds automatisés à 100 % dans le pipeline de laboratoire",
      ],
    ],
    tags: ["SonarQube", "Nexus", "Jenkins"],
    cta: ["Read about code quality", "Lire sur la qualité du code"],
    surface: "bg-linear-to-br from-pink-200 via-fuchsia-300 to-violet-300",
    span: "lg:col-span-2",
  },
  {
    id: "fullstack",
    title: [
      "Full-stack apps, shipped end to end",
      "Des applications full-stack, livrées de bout en bout",
    ],
    href: "/services/full-stack-development",
    short: [
      "From the database to the interface to the server, I build web apps and get them live.",
      "De la base de données à l’interface jusqu’au serveur, je construis des applications web et je les mets en ligne.",
    ],
    summary: [
      "DWTS, MeloKeys and the Senvato portal cover PHP and MySQL back ends, React and Tailwind front ends, and the deployment that puts them online. Building and shipping are one skill, not two.",
      "DWTS, MeloKeys et le portail Senvato couvrent des back ends PHP et MySQL, des interfaces React et Tailwind, et le déploiement qui les met en ligne. Construire et livrer, c’est une seule compétence, pas deux.",
    ],
    bullets: [
      ["PHP, MySQL and Node.js back ends", "Des back ends PHP, MySQL et Node.js"],
      [
        "React, JavaScript and Tailwind CSS interfaces",
        "Des interfaces React, JavaScript et Tailwind CSS",
      ],
      [
        "APIs and integrations that connect systems",
        "Des API et des intégrations qui relient les systèmes",
      ],
    ],
    tags: ["PHP", "MySQL", "React", "Node.js"],
    cta: ["See the service", "Voir le service"],
    surface: "bg-linear-to-br from-brand-50 via-brand-100 to-violet-200",
    span: "lg:col-span-2",
  },
];

export function getFeatures(locale: Locale): Feature[] {
  return features.map((feature) => ({
    ...feature,
    title: tx(feature.title, locale),
    short: tx(feature.short, locale),
    summary: tx(feature.summary, locale),
    bullets: feature.bullets.map((bullet) => tx(bullet, locale)),
    cta: tx(feature.cta, locale),
  }));
}
