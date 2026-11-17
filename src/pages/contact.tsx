import { Briefcase, Code, Mail, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Layout } from "@/components/layout/Layout";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type Channel = { icon: LucideIcon; label: Text; value: string; href: string };

const field =
  "mt-2 w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400";

export default function ContactPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topicIndex, setTopicIndex] = useState(0);
  const [message, setMessage] = useState("");

  const topics: Text[] = [
    ...services.map((service) => service.title),
    ["Something else", "Autre chose"],
  ];

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `${t(topics[topicIndex])} · ${name}`;
    const body = `${message}\n\n${name} <${email}>`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Layout
      title={["Contact", "Contact"]}
      description={[
        "Write to me about a project, a question or a custom consult.",
        "Écrivez-moi pour un projet, une question ou une consultation sur mesure.",
      ]}
    >
      <PageHero
        eyebrow={["Contact", "Contact"]}
        lead={["Let’s talk.", "Parlons-en."]}
        rest={[
          "Write to me about a project, a question or a custom consult.",
          "Écrivez-moi pour un projet, une question ou une consultation sur mesure.",
        ]}
      />

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <ul className="space-y-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-card border border-ink-100 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
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

            <form
              onSubmit={onSubmit}
              className="rounded-card border border-ink-100 bg-white/90 p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-ink-950">
                {t(["Send a message", "Envoyer un message"])}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink-950">
                  {t(["Your name", "Votre nom"])}
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                  />
                </label>
                <label className="block text-sm font-medium text-ink-950">
                  {t(["Your email", "Votre e-mail"])}
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-ink-950">
                {t(["What is it about?", "De quoi s’agit-il ?"])}
                <select
                  value={topicIndex}
                  onChange={(e) => setTopicIndex(Number(e.target.value))}
                  className={field}
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={index}>
                      {t(topic)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-5 block text-sm font-medium text-ink-950">
                {t(["Your message", "Votre message"])}
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t([
                    "What you want to build or fix, the tools you use, your deadline…",
                    "Ce que vous voulez construire ou corriger, les outils utilisés, votre échéance…",
                  ])}
                  className={`${field} resize-none`}
                />
              </label>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className={buttonStyles({ size: "lg" })}>
                  {t(["Send message", "Envoyer le message"])}
                </button>
                <p className="text-xs text-ink-500">
                  {t([
                    "Sending opens your email app with the message ready.",
                    "L’envoi ouvre votre application e-mail avec le message prêt.",
                  ])}
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
