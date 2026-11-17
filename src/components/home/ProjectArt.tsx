import clsx from "clsx";
import { Check, Star } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { ToolLogoImg } from "@/components/ui/ToolLogoImg";

function Window({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-float">
      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2">
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[11px] text-ink-500">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/* DWTS: a records dashboard */
const records = [
  ["#1042", "Registered", "bg-emerald-100 text-emerald-700"],
  ["#1043", "Placed", "bg-brand-50 text-brand-700"],
  ["#1044", "Needs review", "bg-amber-100 text-amber-700"],
  ["#1045", "Registered", "bg-emerald-100 text-emerald-700"],
];

function DwtsScene() {
  return (
    <div className="relative w-full max-w-md">
      <Window url="dwts.example/records">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-950">Records</p>
            <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-medium text-white">
              + New record
            </span>
          </div>
          <div className="mt-3 h-8 rounded-md border border-ink-200 px-3 text-xs leading-8 text-ink-400">
            Search records…
          </div>
          <ul className="mt-3 divide-y divide-ink-100 text-xs">
            {records.map(([id, status, style], index) => (
              <li
                key={id}
                className="flex items-center justify-between py-2.5 transition-transform duration-300 group-hover/panel:translate-x-1"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="font-medium text-ink-800">Record {id}</span>
                <span className={clsx("rounded-full px-2 py-0.5 font-medium", style)}>
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Window>
      <div className="absolute -right-3 -bottom-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[11px] shadow-float transition-transform duration-500 group-hover/panel:-translate-y-1">
        <Check aria-hidden className="size-4 text-emerald-600" />
        <span className="font-medium text-ink-800">Deploy #128 passed · 5m 42s</span>
      </div>
    </div>
  );
}

/* MeloKeys: a keyboard playing a chord */
const WHITE_KEYS = 14;
const BLACK_AFTER = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
const CHORD = new Set([0, 2, 4, 6]); // C, E, G, B
const WAVE = Array.from({ length: 28 }, (_, i) => 22 + ((i * 37) % 70));

function MelokeysScene() {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/15 bg-ink-950/70 p-4 shadow-float">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-white/15 px-2.5 py-1 font-medium text-white">Cmaj7</span>
        <span className="text-white/70">Voicing: automatic</span>
      </div>
      <div className="relative mt-4 flex h-32 gap-0.5">
        {Array.from({ length: WHITE_KEYS }, (_, i) => (
          <div
            key={i}
            className={clsx(
              "flex-1 rounded-b-md border transition-transform duration-300",
              CHORD.has(i)
                ? "translate-y-1 border-violet-400 bg-linear-to-b from-white to-violet-300"
                : "border-ink-200 bg-white group-hover/panel:translate-y-0.5",
            )}
            style={{ transitionDelay: `${i * 25}ms` }}
          />
        ))}
        {BLACK_AFTER.map((after) => (
          <div
            key={after}
            aria-hidden
            className="absolute top-0 h-[60%] w-[4.4%] -translate-x-1/2 rounded-b-sm bg-ink-900"
            style={{ left: `${((after + 1) / WHITE_KEYS) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-4 flex h-10 items-end gap-0.5">
        {WAVE.map((height, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-full bg-violet-300/80 transition-transform duration-500 group-hover/panel:scale-y-125"
            style={{ height: `${height}%`, transitionDelay: `${i * 18}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* CI/CD lab: the pipeline and its build history */
const pipeline = [
  { name: "Git push", slug: "github" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "SonarQube", slug: "sonarqube" },
  { name: "Nexus", slug: "nexus" },
  { name: "Docker", slug: "docker" },
  { name: "Tomcat", slug: "tomcat" },
];
const builds = [
  ["#57", "Passed", "4m 12s", "bg-emerald-100 text-emerald-700"],
  ["#56", "Passed", "4m 30s", "bg-emerald-100 text-emerald-700"],
  ["#55", "Failed", "2m 02s", "bg-coral-400/25 text-coral-500"],
];

function LabScene() {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-float">
      <p className="text-sm font-semibold text-ink-950">Pipeline</p>
      <ol className="mt-3 grid grid-cols-3 gap-2">
        {pipeline.map((step, index) => (
          <li
            key={step.name}
            className="flex items-center gap-2 rounded-lg border border-ink-100 bg-ink-50 p-2 transition-transform duration-300 group-hover/panel:-translate-y-0.5"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <ToolLogoImg slug={step.slug} className="size-5 shrink-0 object-contain" />
            <span className="min-w-0 truncate text-[11px] font-medium text-ink-800">
              {step.name}
            </span>
            <Check aria-hidden className="ml-auto size-3.5 shrink-0 text-emerald-600" />
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm font-semibold text-ink-950">Build history</p>
      <ul className="mt-2 divide-y divide-ink-100 text-xs">
        {builds.map(([id, status, time, style]) => (
          <li key={id} className="flex items-center justify-between py-2">
            <span className="font-medium text-ink-800">Build {id}</span>
            <span className="flex items-center gap-3">
              <span className="text-ink-500 tabular-nums">{time}</span>
              <span className={clsx("rounded-full px-2 py-0.5 font-medium", style)}>{status}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-[11px] font-medium text-brand-700">
        Test environment ready in under 5 minutes
      </p>
    </div>
  );
}

/* Senvato: a service directory */
const providers = [
  { name: "Aqua Fix Plumbing", field: "Plumbing", initials: "AF", color: "bg-sky-500" },
  { name: "Bright Spark Electric", field: "Electrical", initials: "BS", color: "bg-amber-500" },
  { name: "TechFix Services", field: "Technical", initials: "TF", color: "bg-violet-500" },
];

function SenvatoScene() {
  return (
    <div className="relative w-full max-w-md">
      <Window url="senvato.example/search">
        <div className="p-4">
          <div className="h-8 rounded-md border border-ink-200 px-3 text-xs leading-8 text-ink-500">
            Find a trade professional near you
          </div>
          <div className="mt-3 flex gap-2 text-[11px] font-medium">
            <span className="rounded-full bg-ink-950 px-2.5 py-1 text-white">All</span>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">Plumbing</span>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">Electrical</span>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">Technical</span>
          </div>
          <ul className="mt-3 divide-y divide-ink-100">
            {providers.map((provider, index) => (
              <li
                key={provider.name}
                className="flex items-center gap-3 py-2.5 transition-transform duration-300 group-hover/panel:translate-x-1"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span
                  className={clsx(
                    "grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white",
                    provider.color,
                  )}
                >
                  {provider.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-ink-900">
                    {provider.name}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-ink-500">
                    {provider.field}
                    <Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />
                    <Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />
                    <Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />
                    <Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />
                  </span>
                </span>
                <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-medium text-white">
                  Contact
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Window>
      <div className="absolute -right-3 -bottom-4 rounded-lg bg-white px-3 py-2 text-[11px] font-medium text-ink-800 shadow-float transition-transform duration-500 group-hover/panel:-translate-y-1">
        Replies in half the time
      </div>
    </div>
  );
}

export const projectScenes: Record<string, ComponentType> = {
  dwts: DwtsScene,
  melokeys: MelokeysScene,
  "ci-cd-lab-pipeline": LabScene,
  senvato: SenvatoScene,
};
