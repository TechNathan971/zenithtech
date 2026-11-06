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
const product = (label: string, slug: string, description: string) =>
  link(label, `/products/${slug}`, description);
const solution = (label: string, slug: string) => link(label, `/solutions/${slug}`);

const productsMenu: NavMenu = {
  id: "products",
  label: "Products",
  columns: [
    {
      title: "Payments",
      items: [
        product("Payments", "payments", "Online payments"),
        product("Pay Links", "pay-links", "No-code payments"),
        product("Checkout", "checkout", "Prebuilt payment pages"),
        product("Components", "components", "Flexible UI building blocks"),
        product("Payment methods", "payment-methods", "Access to 100+ methods"),
        product("Counter", "counter", "In-person payments"),
        product("Smart Routing", "smart-routing", "Higher acceptance rates"),
        product("OneTap", "onetap", "Faster checkout"),
        product("Bank Connect", "bank-connect", "Linked bank account data"),
      ],
    },
    {
      title: "Revenue",
      items: [
        product("Billing", "billing", "Recurring revenue"),
        product("Metered", "metered", "Usage-based billing"),
        product("Plans", "plans", "Subscription management"),
        product("Invoices", "invoices", "One-time or recurring"),
        product("Taxes", "taxes", "Sales tax and VAT automation"),
        product("Ledger", "ledger", "Revenue accounting"),
        product("Insights", "insights", "Custom reports"),
        product("Data Sync", "data-sync", "Warehouse exports"),
      ],
    },
    {
      title: "Money management",
      items: [
        product("Vault", "vault", "Business accounts and cash"),
        product("Global Transfers", "global-transfers", "Payouts to anyone"),
        product("Growth Funding", "growth-funding", "Business financing"),
        product("Stablecoin Rails", "stablecoin-rails", "Wallets and stablecoin payments"),
        product("Crypto Checkout", "crypto-checkout", "Embeddable crypto purchases"),
      ],
    },
    {
      title: "Embedded finance",
      items: [
        product("Platform Pay", "platform-pay", "Payments for platforms"),
        product("Platform Funding", "platform-funding", "Customer financing"),
        product("Platform Vault", "platform-vault", "Embedded financial accounts"),
        product("Cards", "cards", "Physical and virtual cards"),
      ],
    },
  ],
  aside: {
    title: "More",
    items: [
      link("Roadmap", "/roadmap", "See what's ahead"),
      product("Shield", "shield", "Fraud prevention"),
      product("Launch", "launch", "Company incorporation"),
      product("Offsets", "offsets", "Carbon removal"),
      product("Identity Check", "identity-check", "Online identity verification"),
    ],
    promo: {
      title: "ZenithTech Summit 2026",
      text: "See how we're building the next generation of money tools.",
      cta: link("Watch now", "/summit"),
    },
  },
  footerLink: link("See all products", "/products"),
};

const solutionsMenu: NavMenu = {
  id: "solutions",
  label: "Solutions",
  columns: [
    {
      title: "By stage",
      items: [solution("Enterprises", "enterprises"), solution("Startups", "startups")],
    },
    {
      title: "By use case",
      items: [
        solution("Ecommerce", "ecommerce"),
        solution("Marketplaces", "marketplaces"),
        solution("SaaS", "saas"),
        solution("Platforms", "platforms"),
        solution("Global businesses", "global-businesses"),
        solution("In-app payments", "in-app-payments"),
        solution("Embedded finance", "embedded-finance"),
        solution("Finance automation", "finance-automation"),
        solution("Money management", "money-management"),
        solution("Digital assets", "digital-assets"),
      ],
    },
    {
      title: "By industry",
      items: [
        solution("AI companies", "ai-companies"),
        solution("Creator economy", "creator-economy"),
        solution("Fintech", "fintech"),
        solution("Gaming", "gaming"),
        solution("Travel and hospitality", "travel-hospitality"),
        solution("Insurance", "insurance"),
        solution("Media and entertainment", "media-entertainment"),
        solution("Nonprofits", "nonprofits"),
        solution("Professional services", "professional-services"),
        solution("Public sector", "public-sector"),
        solution("Retail", "retail"),
      ],
    },
  ],
  aside: {
    title: "Ecosystem",
    items: [link("Partners", "/partners"), link("App Marketplace", "/marketplace")],
  },
};

const developersMenu: NavMenu = {
  id: "developers",
  label: "Developers",
  columns: [
    {
      title: "Documentation",
      items: [
        link("Docs", "/developers/docs"),
        link("API reference", "/developers/api-reference"),
        link("Libraries and SDKs", "/developers/sdks"),
        link("Apps", "/developers/apps"),
      ],
    },
    {
      title: "Guides",
      items: [
        link("Accept online payments", "/developers/guides/accept-payments"),
        link("Build a prebuilt checkout", "/developers/guides/checkout"),
        link("Build a platform or marketplace", "/developers/guides/platforms"),
        link("Manage subscriptions", "/developers/guides/subscriptions"),
        link("Offer usage-based billing", "/developers/guides/metered-billing"),
        link("Issue virtual cards", "/developers/guides/cards"),
        link("Connect AI agents", "/developers/guides/ai-agents"),
      ],
    },
    {
      title: "Resources",
      items: [
        link("App integrations", "/developers/integrations"),
        link("Code samples", "/developers/samples"),
        link("Developer blog", "/developers/blog"),
        link("API status", "/developers/status"),
      ],
    },
  ],
};

const resourcesMenu: NavMenu = {
  id: "resources",
  label: "Resources",
  columns: [
    {
      title: "Learn",
      items: [
        link("Blog", "/blog"),
        link("Customer stories", "/customers"),
        link("Guides", "/guides"),
      ],
    },
    {
      title: "Support",
      items: [
        link("Get support", "/support"),
        link("Support plans", "/support/plans"),
        link("Professional services", "/professional-services"),
      ],
    },
    {
      title: "Company",
      items: [
        link("Roadmap", "/roadmap"),
        link("Annual summit", "/summit"),
        link("Careers", "/careers"),
        link("Newsroom", "/newsroom"),
        link("Press", "/press"),
        link("About", "/about"),
      ],
    },
  ],
  aside: {
    title: "Contact",
    items: [
      link("Contact sales", "/contact-sales"),
      link("Become a partner", "/partners/become-a-partner"),
    ],
  },
};

export const mainNav: NavEntry[] = [
  { type: "menu", menu: productsMenu },
  { type: "menu", menu: solutionsMenu },
  { type: "menu", menu: developersMenu },
  { type: "menu", menu: resourcesMenu },
  { type: "link", label: "Pricing", href: "/pricing" },
];

/** Links used outside the menus (header buttons). */
const extraRoutes: NavItem[] = [
  link("Sign in", "/sign-in"),
  link("Contact sales", "/contact-sales"),
  link("Get started", "/get-started"),
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
