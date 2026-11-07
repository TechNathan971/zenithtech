export type FeatureId =
  "payments" | "billing" | "platform" | "assistants" | "cards" | "stablecoins";

export type Feature = {
  id: FeatureId;
  title: string;
  href: string;
  summary: string;
  bullets: string[];
  cta: string;
  surface: string; // gradient behind the mockup
  span: string; // how many grid columns the card takes on large screens
  split?: boolean; // text on the left, mockup on the right
};

export const features: Feature[] = [
  {
    id: "payments",
    title: "Take payments anywhere, online and in person",
    href: "/products/payments",
    summary:
      "Accept cards, wallets and bank payments in more than 100 countries, with a checkout that adapts to every shopper and a terminal for the shop floor.",
    bullets: [
      "Local payment methods shown automatically for each shopper",
      "One integration for web, mobile app and in-store",
      "Smart retries that recover failed payments",
    ],
    cta: "Explore Payments",
    surface: "bg-linear-to-br from-orange-100 via-coral-400/40 to-pink-300",
    span: "lg:col-span-4",
  },
  {
    id: "billing",
    title: "Bill customers exactly how you want",
    href: "/products/billing",
    summary:
      "Charge flat fees, seats, usage or any mix of them. Plans, trials, invoices and tax all run on one billing engine.",
    bullets: [
      "Usage-based and tiered pricing",
      "Automatic invoices, retries and reminders",
      "Revenue reports your finance team can trust",
    ],
    cta: "Explore Billing",
    surface: "bg-linear-to-br from-brand-100 via-violet-200 to-pink-200",
    span: "lg:col-span-2",
  },
  {
    id: "platform",
    title: "Embed payments inside your platform",
    href: "/products/platform-pay",
    summary:
      "Add payments, payouts and financial accounts to your own software with drop-in components or APIs, while ZenithTech handles onboarding and compliance.",
    bullets: [
      "Embedded dashboards for your customers",
      "Automatic identity checks and risk monitoring",
      "Earn revenue on every transaction your platform powers",
    ],
    cta: "Explore Platform Pay",
    surface: "bg-linear-to-br from-violet-300 via-brand-300 to-brand-500",
    span: "lg:col-span-6",
    split: true,
  },
  {
    id: "assistants",
    title: "Sell through AI assistants",
    href: "/solutions/ai-companies",
    summary:
      "Let shoppers discover and buy your products from inside AI chat experiences, with secure checkout and a catalog that stays in sync.",
    bullets: [
      "Product feeds that assistants can read",
      "Secure, tokenized checkout inside the conversation",
      "Orders land in the tools you already use",
    ],
    cta: "See AI solutions",
    surface: "bg-linear-to-br from-pink-100 via-white to-violet-100",
    span: "lg:col-span-2",
  },
  {
    id: "cards",
    title: "Launch your own card program",
    href: "/products/cards",
    summary:
      "Issue physical and virtual cards under your own brand, with spending controls you set in code.",
    bullets: [
      "Instant virtual cards through the API",
      "Real-time spending limits and controls",
      "Share in the revenue from card spending",
    ],
    cta: "Explore Cards",
    surface: "bg-linear-to-br from-pink-200 via-fuchsia-300 to-violet-300",
    span: "lg:col-span-2",
  },
  {
    id: "stablecoins",
    title: "Move money across borders with stablecoins",
    href: "/products/stablecoin-rails",
    summary:
      "Send and receive stablecoin payments, hold balances in wallets, and settle to local currency in seconds.",
    bullets: [
      "Wallets and payouts in one place",
      "Settlement into local currency",
      "Built-in compliance and monitoring",
    ],
    cta: "Explore Stablecoin Rails",
    surface: "bg-linear-to-br from-brand-50 via-brand-100 to-violet-200",
    span: "lg:col-span-2",
  },
];
