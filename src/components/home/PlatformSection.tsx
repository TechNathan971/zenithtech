import clsx from "clsx";
import { Rocket, ShieldCheck, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

const runs = [
  { name: "demo-app / main", status: "Succeeded", time: "5m 42s" },
  { name: "demo-api / main", status: "Running", time: "2m 10s" },
  { name: "demo-app / fix-login", status: "Failed", time: "3m 05s" },
  { name: "demo-web / main", status: "Succeeded", time: "4m 20s" },
];

const statusStyle: Record<string, string> = {
  Succeeded: "bg-emerald-100 text-emerald-700",
  Running: "bg-brand-50 text-brand-700",
  Failed: "bg-coral-400/25 text-coral-500",
};

type Point = { icon: LucideIcon; lead: Text; body: Text };

const points: Point[] = [
  {
    icon: Rocket,
    lead: ["Get to production faster.", "Arrivez plus vite en production."],
    body: [
      "On DWTS, lead time fell from 4.2 hours to under 6 minutes once the pipeline was automated.",
      "Sur DWTS, le délai est passé de 4,2 heures à moins de 6 minutes une fois le pipeline automatisé.",
    ],
  },
  {
    icon: TrendingUp,
    lead: ["Ship more often.", "Livrez plus souvent."],
    body: [
      "Deployment frequency rose by 750%, because releasing stopped being a risky event.",
      "La fréquence de déploiement a augmenté de 750 %, parce que livrer n’est plus un événement risqué.",
    ],
  },
  {
    icon: ShieldCheck,
    lead: ["Keep failures low.", "Gardez les échecs au plus bas."],
    body: [
      "The change failure rate dropped from 34% to 4%, and recovery now takes 11 minutes.",
      "Le taux d’échec des changements est passé de 34 % à 4 %, et le rétablissement prend 11 minutes.",
    ],
  },
];

function Floating({
  title,
  text,
  code,
  className,
}: {
  title: string;
  text: string;
  code: string;
  className: string;
}): ReactNode {
  return (
    <div
      className={clsx(
        "absolute z-10 hidden w-72 overflow-hidden rounded-xl bg-white shadow-float lg:block",
        className,
      )}
    >
      <div className="p-4">
        <p className="text-sm font-semibold text-ink-950">{title}</p>
        <p className="mt-1 text-xs text-ink-600">{text}</p>
      </div>
      <code className="block border-t border-ink-100 bg-ink-50 px-4 py-2.5 font-mono text-[11px] text-ink-800">
        {code}
      </code>
    </div>
  );
}

export function PlatformSection() {
  const { t } = useI18n();

  return (
    <section className="border-t border-ink-100 py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="max-w-xl text-2xl leading-tight font-medium tracking-tight text-ink-950 sm:text-3xl lg:text-4xl">
              {t([
                "Turn your delivery pipeline into a complete platform.",
                "Transformez votre pipeline de livraison en véritable plateforme.",
              ])}
            </h2>
            <div className="mt-6">
              <Button href="/services/ci-cd-automation" arrow>
                {t(["See the service", "Voir le service"])}
              </Button>
            </div>
          </div>
          <p className="max-w-lg text-lg text-ink-600 lg:justify-self-end">
            {t([
              "From one app to many teams, a good pipeline gives everyone the same safe path to production.",
              "D’une seule application à plusieurs équipes, un bon pipeline donne à chacun le même chemin sûr vers la production.",
            ])}
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-card bg-linear-to-br from-orange-300 via-pink-400 to-violet-500 p-5 sm:p-10 lg:px-24 lg:py-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-float">
            <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2">
              <span className="size-2 rounded-full bg-ink-200" />
              <span className="size-2 rounded-full bg-ink-200" />
              <span className="size-2 rounded-full bg-ink-200" />
              <span className="ml-2 rounded-full bg-white px-3 py-0.5 text-[11px] text-ink-500">
                dashboard.demo-app.dev
              </span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr]">
              <nav aria-hidden className="bg-ink-950 p-4 text-sm text-ink-200">
                <p className="mb-4 font-semibold text-white">ZenithOps</p>
                <ul className="space-y-3">
                  <li className="text-white">Home</li>
                  <li>Pipelines</li>
                  <li>Deployments</li>
                  <li>Metrics</li>
                  <li>Settings</li>
                </ul>
              </nav>
              <div className="p-4 sm:p-6">
                <p className="text-base font-semibold text-ink-950">Hello, demo-app team</p>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-ink-100 p-3 text-xs">
                  <span className="text-ink-600">1 pipeline needs a review before release.</span>
                  <span className="shrink-0 rounded-md bg-brand-50 px-3 py-1.5 font-medium text-brand-700">
                    Review
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-ink-50 p-3">
                    <p className="text-[11px] text-ink-500">Deployments today</p>
                    <p className="text-xl font-semibold text-ink-950 tabular-nums">14</p>
                  </div>
                  <div className="rounded-lg bg-ink-50 p-3">
                    <p className="text-[11px] text-ink-500">Lead time</p>
                    <p className="text-xl font-semibold text-ink-950 tabular-nums">5m 42s</p>
                  </div>
                </div>
                <p className="mt-5 text-sm font-semibold text-ink-950">Recent runs</p>
                <ul className="mt-2 divide-y divide-ink-100 text-xs">
                  {runs.map((run) => (
                    <li key={run.name} className="flex items-center justify-between gap-2 py-2.5">
                      <span className="truncate text-ink-800">{run.name}</span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-ink-500 tabular-nums sm:inline">
                          {run.time}
                        </span>
                        <span
                          className={clsx(
                            "rounded-full px-2 py-0.5 font-medium",
                            statusStyle[run.status],
                          )}
                        >
                          {run.status}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Floating
            title="Pipelines"
            text="Run tests and scans on every push."
            code="on: [push, pull_request]"
            className="bottom-8 left-6"
          />
          <Floating
            title="Deployments"
            text="Promote a build with one command."
            code="deploy --env staging --build 128"
            className="top-8 right-6"
          />
          <Floating
            title="Metrics"
            text="Track lead time and failure rate."
            code="dora report --last 30d"
            className="right-6 bottom-8"
          />
          <p className="mt-4 text-xs text-white/80">
            {t([
              "Sample interface with sample data.",
              "Interface d’exemple avec des données d’exemple.",
            ])}
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div key={t(point.lead)}>
                <span className="grid size-12 place-items-center rounded-lg border border-ink-100 bg-white text-brand-600">
                  <Icon aria-hidden className="size-5" />
                </span>
                <p className="mt-6 text-[17px] leading-relaxed">
                  <span className="font-semibold text-ink-950">{t(point.lead)}</span>{" "}
                  <span className="text-ink-600">{t(point.body)}</span>
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
