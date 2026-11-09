import { customerHref, heroLogos } from "./customers";
import { features } from "./features";

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

const link = (label: string, href: string, description?: string): NavItem => ({
  label,
  href,
  description,
});
const work = (label: string, slug: string, description: string) =>
  link(label, `/work/${slug}`, description);
const service = (label: string, slug: string) => link(label, `/services/${slug}`);
const guide = (label: string, slug: string) => link(label, `/learn/guides/${slug}`);

const workMenu: NavMenu = {
  id: "work",
  label: "Work",
  columns: [
    {
      title: "Delivery",
      items: [
        work("CI/CD Pipelines", "ci-cd-pipelines", "Build, test and release"),
        work("Release Automation", "release-automation", "Hands-off deployments"),
        work("GitOps Workflows", "gitops", "Git as the source of truth"),
        work("Preview Environments", "preview-environments", "A staging copy for every branch"),
        work("Feature Flags", "feature-flags", "Ship dark, release gradually"),
        work("Rollback Toolkit", "rollback-toolkit", "Undo a release safely"),
        work("Artifact Registry", "artifact-registry", "Versioned build outputs"),
      ],
    },
    {
      title: "Cloud and infrastructure",
      items: [
        work("Terraform Modules", "terraform-modules", "Reusable infrastructure"),
        work("Kubernetes Clusters", "kubernetes-clusters", "Container orchestration"),
        work("Landing Zones", "landing-zones", "Cloud account foundations"),
        work("Network Patterns", "network-patterns", "VPCs, DNS and load balancing"),
        work("Serverless Recipes", "serverless-recipes", "Functions and events"),
        work("Cost Dashboards", "cost-dashboards", "Cloud spend, made visible"),
        work("Backup and Recovery", "backup-recovery", "Restore with confidence"),
      ],
    },
    {
      title: "Reliability",
      items: [
        work("Observability Stack", "observability-stack", "Metrics, logs and traces"),
        work("SLO Tracker", "slo-tracker", "Reliability targets"),
        work("Incident Playbooks", "incident-playbooks", "Calm, practiced response"),
        work("Chaos Experiments", "chaos-experiments", "Break things on purpose"),
        work("Load Testing Lab", "load-testing-lab", "Know your limits"),
        work("Status Page", "status-page", "Honest uptime reporting"),
      ],
    },
    {
      title: "Platform and security",
      items: [
        work("Developer Platform", "developer-platform", "Self-service for teams"),
        work("DevSecOps Pipeline", "devsecops-pipeline", "Security in every build"),
        work("Secrets Management", "secrets-management", "Keys kept out of code"),
        work("Policy as Code", "policy-as-code", "Rules that enforce themselves"),
        work("Supply-Chain Checks", "supply-chain-checks", "Trust what you ship"),
      ],
    },
  ],
  aside: {
    title: "More",
    items: [
      work("Open Source", "open-source", "Repos and contributions"),
      work("The Lab", "lab", "Experiments and prototypes"),
      work("CLI Tools", "cli-tools", "Small tools that save time"),
      link("Case Studies", "/case-studies", "Real problems, real fixes"),
      link("Roadmap", "/roadmap", "What I’m learning next"),
    ],
    promo: {
      title: "ZenithTech Talks 2026",
      text: "Recorded sessions on building and running reliable systems.",
      cta: link("Watch now", "/talks"),
    },
  },
  footerLink: link("See all work", "/work"),
};

const servicesMenu: NavMenu = {
  id: "services",
  label: "Services",
  columns: [
    {
      title: "By stage",
      items: [
        service("Startups", "startups"),
        service("Growing teams", "growing-teams"),
        service("Enterprises", "enterprises"),
      ],
    },
    {
      title: "By need",
      items: [
        service("CI/CD setup", "ci-cd-setup"),
        service("Kubernetes adoption", "kubernetes-adoption"),
        service("Cloud migration", "cloud-migration"),
        service("Cost optimization", "cost-optimization"),
        service("Observability setup", "observability-setup"),
        service("Security hardening", "security-hardening"),
        service("Disaster recovery", "disaster-recovery"),
        service("Automation", "automation"),
        service("Platform engineering", "platform-engineering"),
        service("Team training", "team-training"),
      ],
    },
    {
      title: "By industry",
      items: [
        service("AI and ML", "ai-ml"),
        service("Fintech", "fintech"),
        service("Healthcare", "healthcare"),
        service("E-commerce", "e-commerce"),
        service("SaaS", "saas"),
        service("Gaming", "gaming"),
        service("Education", "education"),
        service("Logistics", "logistics"),
        service("Media", "media"),
        service("Nonprofits", "nonprofits"),
        service("Public sector", "public-sector"),
      ],
    },
  ],
  aside: {
    title: "Ecosystem",
    items: [link("Partners", "/partners"), link("Template library", "/templates")],
  },
};

const learnMenu: NavMenu = {
  id: "learn",
  label: "Learn",
  columns: [
    {
      title: "Documentation",
      items: [
        link("Handbook", "/learn/handbook"),
        link("Cheat sheets", "/learn/cheat-sheets"),
        link("CLI reference", "/learn/cli-reference"),
        link("Snippets", "/learn/snippets"),
      ],
    },
    {
      title: "Guides",
      items: [
        guide("Set up a CI pipeline", "ci-pipeline"),
        guide("Containerize an app", "containerize-an-app"),
        guide("Deploy to Kubernetes", "deploy-to-kubernetes"),
        guide("Write Terraform modules", "terraform-modules"),
        guide("Monitor with Prometheus", "monitor-with-prometheus"),
        guide("Secure the supply chain", "secure-the-supply-chain"),
        guide("Automate with scripts", "automate-with-scripts"),
      ],
    },
    {
      title: "Resources",
      items: [
        link("Templates", "/learn/templates"),
        link("Code samples", "/learn/code-samples"),
        link("Dev blog", "/blog"),
        link("System status", "/status"),
      ],
    },
  ],
};

const resourcesMenu: NavMenu = {
  id: "resources",
  label: "Resources",
  columns: [
    {
      title: "Read",
      items: [
        link("Blog", "/blog"),
        link("Case studies", "/case-studies"),
        link("Guides", "/guides"),
      ],
    },
    {
      title: "Support",
      items: [
        link("Get in touch", "/support"),
        link("Office hours", "/support/office-hours"),
        link("Mentoring", "/support/mentoring"),
      ],
    },
    {
      title: "About",
      items: [
        link("Roadmap", "/roadmap"),
        link("Talks", "/talks"),
        link("Work with me", "/work-with-me"),
        link("Updates", "/updates"),
        link("Press kit", "/press-kit"),
        link("About", "/about"),
      ],
    },
  ],
  aside: {
    title: "Contact",
    items: [link("Contact me", "/contact"), link("Collaborate", "/collaborate")],
  },
};

export const mainNav: NavEntry[] = [
  { type: "menu", menu: workMenu },
  { type: "menu", menu: servicesMenu },
  { type: "menu", menu: learnMenu },
  { type: "menu", menu: resourcesMenu },
  { type: "link", label: "Pricing", href: "/pricing" },
  { type: "link", label: "Guide me", href: "/guide-me" },
];

/** Links used outside the menus (buttons, ticker, topic tiles). */
const extraRoutes: NavItem[] = [
  link("Sign in", "/sign-in"),
  link("Contact me", "/contact"),
  link("Get started", "/get-started"),
  ...heroLogos.map((logo) => link(`${logo.title} in my stack`, customerHref(logo.slug))),
  ...features.map((feature) => link(feature.title, feature.href, feature.short)),
];

/** Every unique link on the site's navigation, used to generate placeholder pages. */
function collectLinks(): NavItem[] {
  const all: NavItem[] = [];
  for (const entry of mainNav) {
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

  const unique = new Map<string, NavItem>();
  for (const item of all) if (!unique.has(item.href)) unique.set(item.href, item);
  return [...unique.values()];
}

export const allNavLinks = collectLinks();
