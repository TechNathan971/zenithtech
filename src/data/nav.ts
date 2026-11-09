import { customerHref, heroLogos } from "./customers";
import { features } from "./features";
import { tx, type Locale, type Text } from "@/lib/i18n";

/* What the components receive: plain strings in the current language. */
export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { title: string; items: NavItem[] };
export type NavPromo = { title: string; text: string; cta: NavItem };
export type NavMenu = {
  id: string;
  label: string;
  columns: NavGroup[];
  aside?: NavGroup & { promo?: NavPromo };
  footerLink?: NavItem;
};
export type NavEntry =
  { type: "menu"; menu: NavMenu } | { type: "link"; label: string; href: string };

/* What we write below: texts that can hold both languages. */
type ItemSource = { label: Text; href: string; description?: Text };
type GroupSource = { title: Text; items: ItemSource[] };
type PromoSource = { title: Text; text: Text; cta: ItemSource };
type MenuSource = {
  id: string;
  label: Text;
  columns: GroupSource[];
  aside?: GroupSource & { promo?: PromoSource };
  footerLink?: ItemSource;
};
type EntrySource = { type: "menu"; menu: MenuSource } | { type: "link"; label: Text; href: string };

const link = (label: Text, href: string, description?: Text): ItemSource => ({
  label,
  href,
  description,
});
const work = (label: Text, slug: string, description: Text) =>
  link(label, `/work/${slug}`, description);
const service = (label: Text, slug: string) => link(label, `/services/${slug}`);
const guide = (label: Text, slug: string) => link(label, `/learn/guides/${slug}`);

const workMenu: MenuSource = {
  id: "work",
  label: ["Work", "Travaux"],
  columns: [
    {
      title: ["Delivery", "Livraison"],
      items: [
        work(["CI/CD Pipelines", "Pipelines CI/CD"], "ci-cd-pipelines", [
          "Build, test and release",
          "Construire, tester, livrer",
        ]),
        work(["Release Automation", "Automatisation des releases"], "release-automation", [
          "Hands-off deployments",
          "Déploiements sans intervention",
        ]),
        work(["GitOps Workflows", "Workflows GitOps"], "gitops", [
          "Git as the source of truth",
          "Git comme source de vérité",
        ]),
        work(
          ["Preview Environments", "Environnements de prévisualisation"],
          "preview-environments",
          ["A staging copy for every branch", "Un environnement de test par branche"],
        ),
        work(["Feature Flags", "Feature flags"], "feature-flags", [
          "Ship dark, release gradually",
          "Livrer en douce, activer progressivement",
        ]),
        work(["Rollback Toolkit", "Boîte à outils de rollback"], "rollback-toolkit", [
          "Undo a release safely",
          "Annuler une release en sécurité",
        ]),
        work(["Artifact Registry", "Registre d’artefacts"], "artifact-registry", [
          "Versioned build outputs",
          "Livrables de build versionnés",
        ]),
      ],
    },
    {
      title: ["Cloud and infrastructure", "Cloud et infrastructure"],
      items: [
        work(["Terraform Modules", "Modules Terraform"], "terraform-modules", [
          "Reusable infrastructure",
          "Infrastructure réutilisable",
        ]),
        work(["Kubernetes Clusters", "Clusters Kubernetes"], "kubernetes-clusters", [
          "Container orchestration",
          "Orchestration de conteneurs",
        ]),
        work(["Landing Zones", "Landing zones"], "landing-zones", [
          "Cloud account foundations",
          "Fondations des comptes cloud",
        ]),
        work(["Network Patterns", "Modèles réseau"], "network-patterns", [
          "VPCs, DNS and load balancing",
          "VPC, DNS et répartition de charge",
        ]),
        work(["Serverless Recipes", "Recettes serverless"], "serverless-recipes", [
          "Functions and events",
          "Fonctions et événements",
        ]),
        work(["Cost Dashboards", "Tableaux de bord des coûts"], "cost-dashboards", [
          "Cloud spend, made visible",
          "Les dépenses cloud, rendues visibles",
        ]),
        work(["Backup and Recovery", "Sauvegarde et reprise"], "backup-recovery", [
          "Restore with confidence",
          "Restaurer en toute confiance",
        ]),
      ],
    },
    {
      title: ["Reliability", "Fiabilité"],
      items: [
        work(["Observability Stack", "Pile d’observabilité"], "observability-stack", [
          "Metrics, logs and traces",
          "Métriques, logs et traces",
        ]),
        work(["SLO Tracker", "Suivi des SLO"], "slo-tracker", [
          "Reliability targets",
          "Objectifs de fiabilité",
        ]),
        work(["Incident Playbooks", "Playbooks d’incident"], "incident-playbooks", [
          "Calm, practiced response",
          "Une réponse calme et rodée",
        ]),
        work(["Chaos Experiments", "Expériences de chaos"], "chaos-experiments", [
          "Break things on purpose",
          "Casser des choses exprès",
        ]),
        work(["Load Testing Lab", "Labo de tests de charge"], "load-testing-lab", [
          "Know your limits",
          "Connaître ses limites",
        ]),
        work(["Status Page", "Page de statut"], "status-page", [
          "Honest uptime reporting",
          "Un suivi honnête de la disponibilité",
        ]),
      ],
    },
    {
      title: ["Platform and security", "Plateforme et sécurité"],
      items: [
        work(["Developer Platform", "Plateforme développeur"], "developer-platform", [
          "Self-service for teams",
          "Du self-service pour les équipes",
        ]),
        work(["DevSecOps Pipeline", "Pipeline DevSecOps"], "devsecops-pipeline", [
          "Security in every build",
          "La sécurité dans chaque build",
        ]),
        work(["Secrets Management", "Gestion des secrets"], "secrets-management", [
          "Keys kept out of code",
          "Les clés hors du code",
        ]),
        work(["Policy as Code", "Politiques en tant que code"], "policy-as-code", [
          "Rules that enforce themselves",
          "Des règles qui s’appliquent seules",
        ]),
        work(["Supply-Chain Checks", "Contrôles de la chaîne logicielle"], "supply-chain-checks", [
          "Trust what you ship",
          "Faire confiance à ce qu’on livre",
        ]),
      ],
    },
  ],
  aside: {
    title: ["More", "Plus"],
    items: [
      work(["Open Source", "Open source"], "open-source", [
        "Repos and contributions",
        "Dépôts et contributions",
      ]),
      work(["The Lab", "Le labo"], "lab", [
        "Experiments and prototypes",
        "Expériences et prototypes",
      ]),
      work(["CLI Tools", "Outils CLI"], "cli-tools", [
        "Small tools that save time",
        "De petits outils qui font gagner du temps",
      ]),
      link(["Case Studies", "Études de cas"], "/case-studies", [
        "Real problems, real fixes",
        "De vrais problèmes, de vraies solutions",
      ]),
      link(["Roadmap", "Feuille de route"], "/roadmap", [
        "What I’m learning next",
        "Ce que j’apprends ensuite",
      ]),
    ],
    promo: {
      title: "ZenithTech Talks 2026",
      text: [
        "Recorded sessions on building and running reliable systems.",
        "Des sessions enregistrées sur la conception et l’exploitation de systèmes fiables.",
      ],
      cta: link(["Watch now", "Regarder"], "/talks"),
    },
  },
  footerLink: link(["See all work", "Voir tous les travaux"], "/work"),
};

const servicesMenu: MenuSource = {
  id: "services",
  label: "Services",
  columns: [
    {
      title: ["By stage", "Par étape"],
      items: [
        service("Startups", "startups"),
        service(["Growing teams", "Équipes en croissance"], "growing-teams"),
        service(["Enterprises", "Grandes entreprises"], "enterprises"),
      ],
    },
    {
      title: ["By need", "Par besoin"],
      items: [
        service(["CI/CD setup", "Mise en place CI/CD"], "ci-cd-setup"),
        service(["Kubernetes adoption", "Adoption de Kubernetes"], "kubernetes-adoption"),
        service(["Cloud migration", "Migration cloud"], "cloud-migration"),
        service(["Cost optimization", "Optimisation des coûts"], "cost-optimization"),
        service(["Observability setup", "Mise en place de l’observabilité"], "observability-setup"),
        service(["Security hardening", "Renforcement de la sécurité"], "security-hardening"),
        service(["Disaster recovery", "Reprise après sinistre"], "disaster-recovery"),
        service(["Automation", "Automatisation"], "automation"),
        service(["Platform engineering", "Ingénierie de plateforme"], "platform-engineering"),
        service(["Team training", "Formation des équipes"], "team-training"),
      ],
    },
    {
      title: ["By industry", "Par secteur"],
      items: [
        service(["AI and ML", "IA et ML"], "ai-ml"),
        service("Fintech", "fintech"),
        service(["Healthcare", "Santé"], "healthcare"),
        service("E-commerce", "e-commerce"),
        service("SaaS", "saas"),
        service(["Gaming", "Jeu vidéo"], "gaming"),
        service(["Education", "Éducation"], "education"),
        service(["Logistics", "Logistique"], "logistics"),
        service(["Media", "Médias"], "media"),
        service(["Nonprofits", "Associations"], "nonprofits"),
        service(["Public sector", "Secteur public"], "public-sector"),
      ],
    },
  ],
  aside: {
    title: ["Ecosystem", "Écosystème"],
    items: [
      link(["Partners", "Partenaires"], "/partners"),
      link(["Template library", "Bibliothèque de modèles"], "/templates"),
    ],
  },
};

const learnMenu: MenuSource = {
  id: "learn",
  label: ["Learn", "Apprendre"],
  columns: [
    {
      title: "Documentation",
      items: [
        link(["Handbook", "Manuel"], "/learn/handbook"),
        link(["Cheat sheets", "Aide-mémoire"], "/learn/cheat-sheets"),
        link(["CLI reference", "Référence CLI"], "/learn/cli-reference"),
        link(["Snippets", "Extraits de code"], "/learn/snippets"),
      ],
    },
    {
      title: "Guides",
      items: [
        guide(["Set up a CI pipeline", "Mettre en place un pipeline CI"], "ci-pipeline"),
        guide(["Containerize an app", "Conteneuriser une application"], "containerize-an-app"),
        guide(["Deploy to Kubernetes", "Déployer sur Kubernetes"], "deploy-to-kubernetes"),
        guide(["Write Terraform modules", "Écrire des modules Terraform"], "terraform-modules"),
        guide(["Monitor with Prometheus", "Superviser avec Prometheus"], "monitor-with-prometheus"),
        guide(
          ["Secure the supply chain", "Sécuriser la chaîne logicielle"],
          "secure-the-supply-chain",
        ),
        guide(["Automate with scripts", "Automatiser avec des scripts"], "automate-with-scripts"),
      ],
    },
    {
      title: ["Resources", "Ressources"],
      items: [
        link(["Templates", "Modèles"], "/learn/templates"),
        link(["Code samples", "Exemples de code"], "/learn/code-samples"),
        link(["Dev blog", "Blog technique"], "/blog"),
        link(["System status", "État du système"], "/status"),
      ],
    },
  ],
};

const resourcesMenu: MenuSource = {
  id: "resources",
  label: ["Resources", "Ressources"],
  columns: [
    {
      title: ["Read", "Lire"],
      items: [
        link("Blog", "/blog"),
        link(["Case studies", "Études de cas"], "/case-studies"),
        link("Guides", "/guides"),
      ],
    },
    {
      title: ["Support", "Assistance"],
      items: [
        link(["Get in touch", "Prendre contact"], "/support"),
        link(["Office hours", "Permanences"], "/support/office-hours"),
        link(["Mentoring", "Mentorat"], "/support/mentoring"),
      ],
    },
    {
      title: ["About", "À propos"],
      items: [
        link(["Roadmap", "Feuille de route"], "/roadmap"),
        link(["Talks", "Conférences"], "/talks"),
        link(["Work with me", "Travailler avec moi"], "/work-with-me"),
        link(["Updates", "Actualités"], "/updates"),
        link(["Press kit", "Dossier de presse"], "/press-kit"),
        link(["About", "À propos"], "/about"),
      ],
    },
  ],
  aside: {
    title: "Contact",
    items: [
      link(["Contact me", "Me contacter"], "/contact"),
      link(["Collaborate", "Collaborer"], "/collaborate"),
    ],
  },
};

const mainNavSource: EntrySource[] = [
  { type: "menu", menu: workMenu },
  { type: "menu", menu: servicesMenu },
  { type: "menu", menu: learnMenu },
  { type: "menu", menu: resourcesMenu },
  { type: "link", label: ["Pricing", "Tarifs"], href: "/pricing" },
  { type: "link", label: ["Guide me", "Me guider"], href: "/guide-me" },
];

/** Links used outside the menus (buttons, ticker, topic tiles). */
const extraRoutes: ItemSource[] = [
  link(["Sign in", "Se connecter"], "/sign-in"),
  link(["Contact me", "Me contacter"], "/contact"),
  link(["Get started", "Commencer"], "/get-started"),
  ...heroLogos.map((logo) =>
    link([`${logo.title} in my stack`, `${logo.title} dans ma stack`], customerHref(logo.slug)),
  ),
  ...features.map((feature) => link(feature.title, feature.href, feature.short)),
];

/* Turning texts into plain strings for one language */
const toItem = (source: ItemSource, locale: Locale): NavItem => ({
  label: tx(source.label, locale),
  href: source.href,
  description: source.description ? tx(source.description, locale) : undefined,
});

const toGroup = (source: GroupSource, locale: Locale): NavGroup => ({
  title: tx(source.title, locale),
  items: source.items.map((item) => toItem(item, locale)),
});

export function getMainNav(locale: Locale): NavEntry[] {
  return mainNavSource.map((entry): NavEntry => {
    if (entry.type === "link") {
      return { type: "link", label: tx(entry.label, locale), href: entry.href };
    }
    const { id, label, columns, aside, footerLink } = entry.menu;
    return {
      type: "menu",
      menu: {
        id,
        label: tx(label, locale),
        columns: columns.map((group) => toGroup(group, locale)),
        aside: aside
          ? {
              ...toGroup(aside, locale),
              promo: aside.promo
                ? {
                    title: tx(aside.promo.title, locale),
                    text: tx(aside.promo.text, locale),
                    cta: toItem(aside.promo.cta, locale),
                  }
                : undefined,
            }
          : undefined,
        footerLink: footerLink ? toItem(footerLink, locale) : undefined,
      },
    };
  });
}

/** Every unique link on the site's navigation, used to generate placeholder pages. */
function collectSources(): ItemSource[] {
  const all: ItemSource[] = [];
  for (const entry of mainNavSource) {
    if (entry.type === "link") {
      all.push({ label: entry.label, href: entry.href });
      continue;
    }
    const { columns, aside, footerLink } = entry.menu;
    for (const group of aside ? [...columns, aside] : columns) all.push(...group.items);
    if (aside?.promo) all.push(aside.promo.cta);
    if (footerLink) all.push(footerLink);
  }
  all.push(...extraRoutes);

  const unique = new Map<string, ItemSource>();
  for (const item of all) if (!unique.has(item.href)) unique.set(item.href, item);
  return [...unique.values()];
}

const allSources = collectSources();

export function getAllNavLinks(locale: Locale): NavItem[] {
  return allSources.map((source) => toItem(source, locale));
}
