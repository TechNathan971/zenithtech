import { Briefcase, GraduationCap, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Plan = { icon: LucideIcon; title: Text; text: Text; cta: Text; href: string };

const plans: Plan[] = [
  {
    icon: Briefcase,
    title: ["Fixed-price projects", "Projets au forfait"],
    text: [
      "A clear scope, one price and a delivery plan agreed before work starts. Best for pipeline setups, server hosting and full-stack builds.",
      "Un périmètre clair, un prix et un plan de livraison convenus avant le début du travail. Idéal pour la mise en place de pipelines, l’hébergement de serveurs et les développements full-stack.",
    ],
    cta: ["Start a project", "Démarrer un projet"],
    href: "/get-started",
  },
  {
    icon: MessageSquare,
    title: ["Custom technical consults", "Consultations techniques sur mesure"],
    text: [
      "Need a second opinion on a pipeline, a server or an architecture? Tell me what you need and I’ll propose a format and a price.",
      "Besoin d’un second avis sur un pipeline, un serveur ou une architecture ? Dites-moi ce qu’il vous faut et je vous proposerai un format et un prix.",
    ],
    cta: ["Contact me", "Me contacter"],
    href: "/contact",
  },
  {
    icon: GraduationCap,
    title: ["Tutoring and training", "Cours et formation"],
    text: [
      "One-to-one tech tutoring and ICT package training. Ask for a plan that fits your level and your schedule.",
      "Cours particuliers d’informatique et formation aux logiciels TIC. Demandez un plan adapté à votre niveau et à votre emploi du temps.",
    ],
    cta: ["Ask about training", "Se renseigner sur la formation"],
    href: "/contact",
  },
];

const steps: { title: Text; text: Text }[] = [
  {
    title: ["Brief", "Brief"],
    text: [
      "You tell me what you want to build or fix.",
      "Vous me dites ce que vous voulez construire ou corriger.",
    ],
  },
  {
    title: ["Scope and price", "Périmètre et prix"],
    text: [
      "We agree what is included and one fixed price.",
      "Nous convenons de ce qui est inclus et d’un prix fixe.",
    ],
  },
  {
    title: ["Build", "Réalisation"],
    text: [
      "I build it with regular updates along the way.",
      "Je le construis avec des points réguliers en cours de route.",
    ],
  },
  {
    title: ["Ship and hand over", "Livraison et passation"],
    text: [
      "It goes live, and you get the documentation to run it.",
      "Il est mis en ligne, et vous recevez la documentation pour l’exploiter.",
    ],
  },
];

const factors: Text[] = [
  ["The scope of the work", "L’étendue du travail"],
  ["Your deadline", "Votre échéance"],
  ["The tools and hosting you already have", "Les outils et l’hébergement que vous avez déjà"],
  [
    "How much documentation and handover you need",
    "La documentation et la passation dont vous avez besoin",
  ],
];

const faq: { q: Text; a: Text }[] = [
  {
    q: ["Do you work at a fixed price?", "Travaillez-vous au forfait ?"],
    a: [
      "Yes. Projects are quoted as one fixed price for an agreed scope. If the scope changes, we agree the change before I continue.",
      "Oui. Les projets sont chiffrés à un prix fixe pour un périmètre convenu. Si le périmètre change, nous convenons du changement avant que je poursuive.",
    ],
  },
  {
    q: [
      "Can I get a quote for something unusual?",
      "Puis-je obtenir un devis pour quelque chose d’inhabituel ?",
    ],
    a: [
      "Yes. Contact me with a short description and I’ll reply with a proposed format and price.",
      "Oui. Contactez-moi avec une courte description et je vous répondrai avec un format et un prix proposés.",
    ],
  },
  {
    q: ["What should I send to get a quote?", "Que dois-je envoyer pour obtenir un devis ?"],
    a: [
      "What you want to build or fix, the tools you use today, your deadline and a rough budget.",
      "Ce que vous voulez construire ou corriger, les outils que vous utilisez aujourd’hui, votre échéance et un budget approximatif.",
    ],
  },
];

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <Layout
      title={["Pricing", "Tarifs"]}
      description={[
        "Fixed-price projects and custom technical consults.",
        "Projets au forfait et consultations techniques sur mesure.",
      ]}
    >
      <PageHero
        eyebrow={["Pricing", "Tarifs"]}
        lead={["Fixed prices, no surprises.", "Des prix fixes, sans surprise."]}
        rest={[
          "You know what you get and what it costs before any work starts.",
          "Vous savez ce que vous obtenez et ce que cela coûte avant le début du travail.",
        ]}
      />

      <section className="pb-14 sm:pb-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <li
                  key={plan.href + t(plan.title)}
                  className="group flex flex-col rounded-card border border-ink-100 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                >
                  <span className="grid size-12 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h2 className="mt-6 text-xl font-semibold text-ink-950">{t(plan.title)}</h2>
                  <p className="mt-3 text-ink-600">{t(plan.text)}</p>
                  <div className="mt-auto pt-6">
                    <Button href={plan.href} variant="secondary" arrow>
                      {t(plan.cta)}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["How a project works", "Comment se déroule un projet"])}
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={t(step.title)}>
                <span className="grid size-10 place-items-center rounded-full bg-brand-600 font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 font-semibold text-ink-950">{t(step.title)}</p>
                <p className="mt-2 text-ink-600">{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                {t(["What shapes the price", "Ce qui détermine le prix"])}
              </h2>
              <ul className="mt-6 space-y-3 text-ink-700">
                {factors.map((factor) => (
                  <li key={t(factor)} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                    />
                    {t(factor)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
                {t(["Questions", "Questions"])}
              </h2>
              <div className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
                {faq.map((item) => (
                  <details key={t(item.q)} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-950 [&::-webkit-details-marker]:hidden">
                      {t(item.q)}
                      <span
                        aria-hidden
                        className="text-xl text-brand-600 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-ink-600">{t(item.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
