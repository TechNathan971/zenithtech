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
      title: ["Projects", "Projets"],
      items: [
        work("DWTS", "dwts", [
          "Welfare records for displaced children",
          "Dossiers sociaux d’enfants déplacés",
        ]),
        work("MeloKeys", "melokeys", [
          "Keyboard and audio workstation layouts",
          "Dispositions de clavier et de station audio",
        ]),
        work(["CI/CD Lab Pipeline", "Pipeline CI/CD de laboratoire"], "ci-cd-lab-pipeline", [
          "Jenkins, SonarQube, Nexus and Docker",
          "Jenkins, SonarQube, Nexus et Docker",
        ]),
        work(["Senvato Services Portal", "Portail de services Senvato"], "senvato", [
          "A directory for local trade professionals",
          "Un annuaire de professionnels des métiers locaux",
        ]),
        work(["Research Thesis", "Mémoire de recherche"], "research-thesis", [
          "CI/CD and DORA metrics",
          "CI/CD et métriques DORA",
        ]),
      ],
    },
    {
      title: ["Delivery", "Livraison"],
      items: [
        work(["CI/CD Pipelines", "Pipelines CI/CD"], "ci-cd-pipelines", [
          "Build, test and release",
          "Construire, tester, livrer",
        ]),
        work("GitHub Actions", "github-actions", [
          "Workflows on every push",
          "Des workflows à chaque push",
        ]),
        work(["Jenkins Pipelines", "Pipelines Jenkins"], "jenkins-pipelines", [
          "Pipeline as code",
          "Le pipeline en tant que code",
        ]),
        work(["Release Automation", "Automatisation des releases"], "release-automation", [
          "Hands-off deployments",
          "Déploiements sans intervention",
        ]),
        work(["Rollback Toolkit", "Boîte à outils de rollback"], "rollback-toolkit", [
          "Undo a release safely",
          "Annuler une release en sécurité",
        ]),
      ],
    },
    {
      title: ["Containers and hosting", "Conteneurs et hébergement"],
      items: [
        work(["Docker Containers", "Conteneurs Docker"], "docker-containers", [
          "Package once, run anywhere",
          "Empaqueter une fois, exécuter partout",
        ]),
        work("Kubernetes", "kubernetes", [
          "Container orchestration",
          "Orchestration de conteneurs",
        ]),
        work(["AWS EC2 Hosting", "Hébergement AWS EC2"], "aws-ec2-hosting", [
          "Cloud servers",
          "Serveurs cloud",
        ]),
        work(["NGINX and Web Servers", "NGINX et serveurs web"], "nginx-web-servers", [
          "Reverse proxy and serving",
          "Reverse proxy et service web",
        ]),
        work(["Tomcat Deployments", "Déploiements Tomcat"], "tomcat-deployments", [
          "Hosting Java applications",
          "Hébergement d’applications Java",
        ]),
      ],
    },
    {
      title: ["Quality and metrics", "Qualité et métriques"],
      items: [
        work(["Code Quality", "Qualité du code"], "code-quality", [
          "Automated analysis with SonarQube",
          "Analyse automatisée avec SonarQube",
        ]),
        work(["Artifact Repositories", "Dépôts d’artefacts"], "artifact-repositories", [
          "Versioned builds with Nexus",
          "Builds versionnés avec Nexus",
        ]),
        work(["DORA Metrics", "Métriques DORA"], "dora-metrics", [
          "Measure delivery performance",
          "Mesurer la performance de livraison",
        ]),
        work(["Test Environments", "Environnements de test"], "test-environments", [
          "Ready in minutes",
          "Prêts en quelques minutes",
        ]),
      ],
    },
  ],
  aside: {
    title: ["More", "Plus"],
    items: [
      work(["Open Source", "Open source"], "open-source", ["Repos on GitHub", "Dépôts sur GitHub"]),
      link(["Case Studies", "Études de cas"], "/case-studies", [
        "How each project was built",
        "Comment chaque projet a été construit",
      ]),
      link(["Roadmap", "Feuille de route"], "/roadmap", [
        "What I’m learning next",
        "Ce que j’apprends ensuite",
      ]),
    ],
    promo: {
      title: ["Research thesis", "Mémoire de recherche"],
      text: [
        "CI/CD pipelines in humanitarian software, measured with DORA metrics.",
        "Les pipelines CI/CD dans les logiciels humanitaires, mesurés avec les métriques DORA.",
      ],
      cta: link(["Read the thesis", "Lire le mémoire"], "/work/research-thesis"),
    },
  },
  footerLink: link(["See all work", "Voir tous les travaux"], "/work"),
};

const servicesMenu: MenuSource = {
  id: "services",
  label: "Services",
  columns: [
    {
      title: ["What I offer", "Ce que je propose"],
      items: [
        service(
          [
            "CI/CD pipeline automation and infrastructure setup",
            "Automatisation CI/CD et mise en place d’infrastructure",
          ],
          "ci-cd-automation",
        ),
        service(
          [
            "Full-stack development and API integration",
            "Développement full-stack et intégration d’API",
          ],
          "full-stack-development",
        ),
        service(
          [
            "Server configuration, hosting and NGINX",
            "Configuration de serveurs, hébergement et NGINX",
          ],
          "server-and-hosting",
        ),
        service(
          [
            "Tech tutoring and ICT package training",
            "Cours d’informatique et formation aux logiciels TIC",
          ],
          "tutoring-and-training",
        ),
      ],
    },
    {
      title: ["By project type", "Par type de projet"],
      items: [
        service(["Launch a web product", "Lancer un produit web"], "launch-a-product"),
        service(["Automate deployments", "Automatiser les déploiements"], "automate-deployments"),
        service(
          ["Host and secure a website", "Héberger et sécuriser un site web"],
          "host-a-website",
        ),
        service(["Move to the cloud", "Passer au cloud"], "move-to-the-cloud"),
        service(["Learn the tools", "Apprendre les outils"], "learn-the-tools"),
      ],
    },
    {
      title: ["By sector", "Par secteur"],
      items: [
        service(
          ["Humanitarian and nonprofits", "Humanitaire et associations"],
          "humanitarian-nonprofits",
        ),
        service(["Education and training", "Éducation et formation"], "education-training"),
        service(["Music and audio", "Musique et audio"], "music-audio"),
        service(
          ["Marketplaces and directories", "Places de marché et annuaires"],
          "marketplaces-directories",
        ),
        service(["Local businesses", "Entreprises locales"], "local-businesses"),
        service("Startups", "startups"),
      ],
    },
  ],
  aside: {
    title: ["How I work", "Ma façon de travailler"],
    items: [
      link(["Fixed-price projects", "Projets au forfait"], "/pricing"),
      link(["Custom technical consults", "Consultations techniques sur mesure"], "/contact"),
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
        link(["Writing", "Publications"], "/writing"),
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
