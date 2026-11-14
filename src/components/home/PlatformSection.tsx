import clsx from "clsx";
import { ChevronRight, Rocket, RotateCw, ShieldCheck, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Text } from "@/lib/i18n";

type Snippet = { title: string; text: string; code: string };

type View = {
  icon: LucideIcon;
  lead: Text;
  body: Text;
  link: Text;
  href: string;
  snippets: [Snippet, Snippet, Snippet];
};

const views: View[] = [
  {
    icon: Rocket,
    lead: ["Get to production faster.", "Arrivez plus vite en production."],
    body: [
      "On DWTS, lead time fell from 4.2 hours to under 6 minutes once the pipeline was automated.",
      "Sur DWTS, le délai est passé de 4,2 heures à moins de 6 minutes une fois le pipeline automatisé.",
    ],
    link: ["Read the guide", "Lire le guide"],
    href: "/learn/guides/ci-pipeline",
    snippets: [
      {
        title: "Pipelines",
        text: "Run tests and scans on every push.",
        code: "on: [push, pull_request]",
      },
      {
        title: "Deployments",
        text: "Promote a build with one command.",
        code: "deploy --env staging --build 128",
      },
      {
        title: "Approvals",
        text: "Ask for a review before production.",
        code: "environment: production",
      },
    ],
  },
  {
    icon: TrendingUp,
    lead: ["Ship more often.", "Livrez plus souvent."],
    body: [
      "Deployment frequency rose by 750%, because releasing stopped being a risky event.",
      "La fréquence de déploiement a augmenté de 750 %, parce que livrer n’est plus un événement risqué.",
    ],
    link: ["Read the guide", "Lire le guide"],
    href: "/learn/guides/automate-with-scripts",
    snippets: [
      { title: "Releases", text: "Tag and publish automatically.", code: "release --tag v1.4.0" },
      { title: "Frequency", text: "Count deployments per day.", code: "dora frequency --last 7d" },
      { title: "Rollouts", text: "Ship a change gradually.", code: "deploy --strategy rolling" },
    ],
  },
  {
    icon: ShieldCheck,
    lead: ["Keep failures low.", "Gardez les échecs au plus bas."],
    body: [
      "The change failure rate dropped from 34% to 4%, and recovery now takes 11 minutes.",
      "Le taux d’échec des changements est passé de 34 % à 4 %, et le rétablissement prend 11 minutes.",
    ],
    link: ["Read the guide", "Lire le guide"],
    href: "/learn/guides/secure-the-supply-chain",
    snippets: [
      {
        title: "Quality gate",
        text: "Block risky changes automatically.",
        code: "sonar.qualitygate.wait=true",
      },
      { title: "Rollback", text: "Undo a release safely.", code: "deploy --rollback 127" },
      { title: "Alerts", text: "Tell the team when a deploy fails.", code: "notify --on failure" },
    ],
  },
];

const runs = [
  { name: "demo-app / main", status: "Succeeded", time: "5m 42s" },
  { name: "demo-api / main", status: "Running", time: "2m 10s" },
  { name: "demo-app / fix-login", status: "Failed", time: "3m 05s" },
  { name: "demo-web / main", status: "Succeeded", time: "4m 20s" },
];

const runStyle: Record<string, string> = {
  Succeeded: "bg-emerald-100 text-emerald-700",
  Running: "bg-brand-50 text-brand-700",
  Failed: "bg-coral-400/25 text-coral-500",
};

const navItems = ["Home", "Pipelines", "Deployments", "Metrics", "Settings"];
const navForView = [1, 2, 3]; // which sidebar item is highlighted for each view

function Greeting() {
  return <p className="text-base font-semibold text-ink-950">Hello, demo-app team</p>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-50 p-3">
      <p className="text-[11px] text-ink-500">{label}</p>
      <p className="text-xl font-semibold text-ink-950 tabular-nums">{value}</p>
    </div>
  );
}

function RunList() {
  return (
    <ul className="mt-2 divide-y divide-ink-100 text-xs">
      {runs.map((run) => (
        <li key={run.name} className="flex items-center justify-between gap-2 py-2.5">
          <span className="truncate text-ink-800">{run.name}</span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="hidden text-ink-500 tabular-nums sm:inline">{run.time}</span>
            <span className={clsx("rounded-full px-2 py-0.5 font-medium", runStyle[run.status])}>
              {run.status}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function PipelinesView() {
  return (
    <>
      <Greeting />
      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-pink-200 bg-pink-50 p-3 text-xs">
        <span className="text-ink-700">1 pipeline needs a review before release.</span>
        <span className="shrink-0 rounded-md bg-pink-200/70 px-3 py-1.5 font-medium text-pink-800">
          Review
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Lead time" value="5m 42s" />
        <Stat label="Success rate" value="96%" />
      </div>
      <p className="mt-5 text-sm font-semibold text-ink-950">Recent runs</p>
      <RunList />
    </>
  );
}

const week = [30, 44, 38, 60, 72, 88, 100];
const releases = [
  { tag: "v1.4.0", note: "2 hours ago" },
  { tag: "v1.3.2", note: "yesterday" },
  { tag: "v1.3.1", note: "2 days ago" },
];

function ReleasesView() {
  return (
    <>
      <Greeting />
      <div className="mt-4 rounded-lg border border-ink-100 p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-ink-500">Deployments this week</p>
            <p className="text-2xl font-semibold text-ink-950 tabular-nums">42</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            +48%
          </span>
        </div>
        <div className="mt-4 flex h-24 items-end gap-2">
          {week.map((height, index) => (
            <div
              key={index}
              className="flex-1 animate-fade-up rounded-t-sm bg-linear-to-t from-brand-600 to-pink-400"
              style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-ink-950">Latest releases</p>
      <ul className="mt-2 divide-y divide-ink-100 text-xs">
        {releases.map((release) => (
          <li key={release.tag} className="flex items-center justify-between py-2.5">
            <span className="font-medium text-ink-800">{release.tag}</span>
            <span className="text-ink-500">{release.note}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function ReliabilityView() {
  return (
    <>
      <Greeting />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Change failure rate" value="5%" />
        <Stat label="Time to recover" value="12 min" />
      </div>
      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs">
        <p className="font-medium text-emerald-800">Incident #31 · resolved</p>
        <p className="mt-1 text-emerald-700">
          Build 128 failed its checks and was rolled back automatically.
        </p>
      </div>
      <p className="mt-5 text-sm font-semibold text-ink-950">Checks</p>
      <ul className="mt-2 divide-y divide-ink-100 text-xs">
        {["Quality gate passed", "Health checks passing", "Rollback ready"].map((check) => (
          <li key={check} className="flex items-center justify-between py-2.5">
            <span className="text-ink-800">{check}</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
              OK
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

const screens = [PipelinesView, ReleasesView, ReliabilityView];
const snippetPlace = ["bottom-8 left-6", "top-8 right-6", "right-6 bottom-16"];

function Floating({ snippet, className }: { snippet: Snippet; className: string }) {
  return (
    <div
      className={clsx(
        "absolute z-10 hidden w-72 animate-fade-up overflow-hidden rounded-xl bg-white shadow-float lg:block",
        className,
      )}
    >
      <div className="p-4">
        <p className="text-sm font-semibold text-ink-950">{snippet.title}</p>
        <p className="mt-1 text-xs text-ink-600">{snippet.text}</p>
      </div>
      <code className="block border-t border-ink-100 bg-ink-50 px-4 py-2.5 font-mono text-[11px] text-ink-800">
        {snippet.code}
      </code>
    </div>
  );
}

export function PlatformSection() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [view, setView] = useState(0);
  const [touched, setTouched] = useState(false);

  // The view changes on its own until the visitor hovers or clicks a column
  useEffect(() => {
    if (touched || reduced) return;
    const id = setInterval(() => setView((v) => (v + 1) % views.length), 5000);
    return () => clearInterval(id);
  }, [touched, reduced]);

  const choose = (index: number) => {
    setView(index);
    setTouched(true);
  };

  const Screen = screens[view];

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
                  {navItems.map((item, index) => (
                    <li
                      key={item}
                      className={clsx(
                        "transition-colors duration-300",
                        index === navForView[view] && "font-semibold text-pink-300",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </nav>
              <div key={view} className="min-h-[22rem] animate-fade-up p-4 sm:p-6">
                <Screen />
              </div>
            </div>
          </div>

          {views[view].snippets.map((snippet, index) => (
            <Floating
              key={`${view}-${snippet.title}`}
              snippet={snippet}
              className={snippetPlace[index]}
            />
          ))}

          <button
            type="button"
            aria-label={t(["Replay", "Rejouer"])}
            onClick={() => {
              setView(0);
              setTouched(false);
            }}
            className="absolute right-4 bottom-4 z-20 grid size-10 place-items-center rounded-lg bg-white text-brand-600 shadow-card transition-colors hover:bg-brand-50"
          >
            <RotateCw aria-hidden className="size-4" />
          </button>
          <p className="mt-4 text-xs text-white/80">
            {t([
              "Sample interface with sample data.",
              "Interface d’exemple avec des données d’exemple.",
            ])}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {views.map((entry, index) => {
            const Icon = entry.icon;
            const isActive = index === view;
            return (
              <div
                key={entry.href}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") choose(index);
                }}
                onFocus={() => choose(index)}
                onClick={() => choose(index)}
                className={clsx(
                  "rounded-card p-6 transition-colors duration-300",
                  isActive ? "bg-ink-50" : "bg-transparent",
                )}
              >
                <span
                  className={clsx(
                    "grid size-12 place-items-center rounded-lg border transition-colors duration-300",
                    isActive
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-ink-100 bg-white text-brand-600",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <p className="mt-6 text-[17px] leading-relaxed">
                  <span className="font-semibold text-ink-950">{t(entry.lead)}</span>{" "}
                  <span className="text-ink-600">{t(entry.body)}</span>
                </p>
                <Link
                  href={entry.href}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors hover:text-brand-800"
                >
                  {t(entry.link)}
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
