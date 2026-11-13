import { Briefcase, Code, Mail, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Channel = { icon: LucideIcon; label: Text; value: string; href: string };

const steps: { title: Text; text: Text }[] = [
  {
    title: ["Tell me what you need", "Dites-moi ce dont vous avez besoin"],
    text: [
      "Send a short message about your project, your tools and your deadline.",
      "Envoyez un court message sur votre projet, vos outils et votre échéance.",
    ],
  },
  {
    title: ["We agree scope and price", "Nous convenons du périmètre et du prix"],
    text: [
      "You get a clear scope and a fixed price before any work starts.",
      "Vous recevez un périmètre clair et un prix fixe avant le début du travail.",
    ],
  },
  {
    title: ["I build it and ship it", "Je le construis et je le livre"],
    text: [
      "Regular updates, then delivery with the pipeline or server running.",
      "Des points réguliers, puis une livraison avec le pipeline ou le serveur en service.",
    ],
  },
];

const checklist: Text[] = [
  ["What you want to build or fix", "Ce que vous voulez construire ou corriger"],
  [
    "The tools or hosting you use today",
    "Les outils ou l’hébergement que vous utilisez aujourd’hui",
  ],
  ["Your deadline and rough budget", "Votre échéance et votre budget approximatif"],
];

export default function GetStartedPage() {
  const { t } = useI18n();

  const digits = profile.phone.replace(/\D/g, "");
  const channels: Channel[] = [
    {
      icon: Mail,
      label: ["Email", "E-mail"],
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...(digits
      ? [
          {
            icon: MessageCircle,
            label: "WhatsApp" as Text,
            value: profile.phone,
            href: `https://wa.me/${digits}`,
          },
        ]
      : []),
    ...(profile.linkedin
      ? [
          {
            icon: Briefcase,
            label: "LinkedIn" as Text,
            value: profile.linkedin,
            href: profile.linkedin,
          },
        ]
      : []),
    { icon: Code, label: "GitHub", value: profile.github, href: profile.github },
  ];

  return (
    <Layout
      title={["Start a project", "Démarrer un projet"]}
      description={[
        "Tell me what you need and we’ll agree a clear scope and a fixed price.",
        "Dites-moi ce dont vous avez besoin et nous conviendrons d’un périmètre clair et d’un prix fixe.",
      ]}
    >
      <section className="py-14 sm:py-20">
        <Container>
          <h1 className="max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-ink-950">
              {t(["Let’s start your project.", "Démarrons votre projet."])}
            </span>{" "}
            <span className="text-ink-500">
              {t([
                "Pick the channel you prefer and tell me what you need.",
                "Choisissez le canal qui vous convient et dites-moi ce dont vous avez besoin.",
              ])}
            </span>
          </h1>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-card border border-ink-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink-950">{t(channel.label)}</span>
                      <span className="block truncate text-sm text-ink-600">{channel.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">
            {t(["How it works", "Comment ça se passe"])}
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
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
          <div className="mt-12 rounded-card bg-ink-50 p-6 sm:p-8">
            <h3 className="font-semibold text-ink-950">
              {t(["What to include in your message", "À inclure dans votre message"])}
            </h3>
            <ul className="mt-4 space-y-2 text-ink-700">
              {checklist.map((item) => (
                <li key={t(item)}>• {t(item)}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/guide-me" variant="secondary" arrow>
                {t([
                  "Not sure what you need? Try Guide me",
                  "Pas sûr de ce qu’il vous faut ? Essayez Me guider",
                ])}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
