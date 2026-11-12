import { Briefcase, ChevronRight, GraduationCap, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Card = { icon: LucideIcon; lead: Text; body: Text; link: Text; href: string };

const cards: Card[] = [
  {
    icon: Briefcase,
    lead: ["Fixed-price projects.", "Projets au forfait."],
    body: [
      "A clear scope, a clear price and delivery you can plan around, from CI/CD setup to full-stack builds.",
      "Un périmètre clair, un prix clair et une livraison que vous pouvez planifier, de la mise en place CI/CD aux développements full-stack.",
    ],
    link: ["See how I charge", "Voir mes tarifs"],
    href: "/pricing",
  },
  {
    icon: GraduationCap,
    lead: ["Tutoring and training.", "Cours et formation."],
    body: [
      "One-to-one tech tutoring and training on everyday ICT packages, at your pace.",
      "Des cours particuliers d’informatique et des formations aux logiciels TIC courants, à votre rythme.",
    ],
    link: ["View training", "Voir la formation"],
    href: "/services/tutoring-and-training",
  },
  {
    icon: MessageSquare,
    lead: ["Technical consults.", "Consultations techniques."],
    body: [
      "Need a second opinion on a pipeline, a server or an architecture? Book a custom consult.",
      "Besoin d’un second avis sur un pipeline, un serveur ou une architecture ? Réservez une consultation sur mesure.",
    ],
    link: ["Contact me", "Me contacter"],
    href: "/contact",
  },
];

export function WorkWithMe() {
  const { t } = useI18n();

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <h2 className="max-w-2xl text-2xl leading-tight font-medium tracking-tight text-ink-950 sm:text-3xl lg:text-4xl">
          {t([
            "Get to results faster with hands-on help.",
            "Obtenez des résultats plus vite grâce à une aide concrète.",
          ])}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.href}>
                <span className="grid size-12 place-items-center rounded-lg border border-ink-100 bg-white text-brand-600">
                  <Icon aria-hidden className="size-5" />
                </span>
                <p className="mt-6 text-[17px] leading-relaxed">
                  <span className="font-semibold text-ink-950">{t(card.lead)}</span>{" "}
                  <span className="text-ink-600">{t(card.body)}</span>
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors hover:text-brand-800"
                >
                  {t(card.link)}
                  <ChevronRight aria-hidden className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
