import type { ComponentType } from "react";
import { labProjects } from "@/data/lab";
import type { NewsItem } from "@/data/news";
import { useI18n } from "@/hooks/useI18n";

const strips = [
  { flex: "flex-[3]", art: "from-amber-300 to-orange-500" },
  { flex: "flex-[2]", art: "from-sky-300 to-brand-600" },
  { flex: "flex-[3]", art: "from-fuchsia-300 to-violet-600" },
  { flex: "flex-[1]", art: "from-emerald-300 to-teal-600" },
  { flex: "flex-[2]", art: "from-pink-300 to-rose-600" },
];

function LetterArt() {
  const { t } = useI18n();
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-violet-500 via-fuchsia-500 to-brand-600">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_100%,rgba(255,255,255,0.35),transparent)]"
      />
      <div aria-hidden className="absolute inset-y-0 right-0 flex w-2/5 gap-3 p-6">
        {strips.map((strip, index) => (
          <div
            key={index}
            className={`${strip.flex} rounded-xl bg-linear-to-b ${strip.art} opacity-90`}
          />
        ))}
      </div>
      <p className="absolute bottom-8 left-8 text-4xl leading-tight font-semibold text-white sm:text-5xl">
        {t(["Year in review", "Bilan de l’année"])}
        <br />
        2026
      </p>
    </div>
  );
}

const dora = [
  ["Lead time", "4.2 h → 6 min"],
  ["Failure rate", "34% → 4%"],
  ["Recovery", "11 min"],
  ["Frequency", "+750%"],
];

function ThesisArt() {
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-ink-950 via-brand-900 to-violet-800 p-8">
      <p className="text-sm font-semibold tracking-widest text-brand-200 uppercase">DORA metrics</p>
      <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
        {dora.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/15 bg-white/10 p-4">
            <p className="text-xs text-ink-200">{label}</p>
            <p className="mt-1 text-xl font-semibold text-white tabular-nums">{value}</p>
          </div>
        ))}
      </div>
      <svg
        aria-hidden
        viewBox="0 0 400 120"
        className="absolute right-8 bottom-8 w-72 text-brand-300"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,100 50,90 100,95 150,60 200,70 250,40 300,45 350,15 400,20"
        />
      </svg>
    </div>
  );
}

function DwtsArt() {
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-brand-700 via-brand-500 to-pink-400 p-8">
      <p className="text-sm font-semibold tracking-widest text-white/80 uppercase">DWTS</p>
      <ol className="mt-6 flex max-w-lg gap-2">
        {["Build", "Test", "Scan", "Deploy"].map((stage) => (
          <li
            key={stage}
            className="flex-1 rounded-lg bg-white/20 px-3 py-2 text-center text-xs font-medium text-white"
          >
            ✓ {stage}
          </li>
        ))}
      </ol>
      <div className="mt-8 max-w-lg space-y-4 text-xs text-white">
        <div>
          <p className="mb-1.5">Before · 4.2 hours</p>
          <div className="h-3 rounded-full bg-white/80" />
        </div>
        <div>
          <p className="mb-1.5">After · under 6 minutes</p>
          <div className="h-3 w-[8%] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

function BuildArt() {
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-ink-900 via-brand-900 to-violet-800 p-8">
      <div className="max-w-lg overflow-hidden rounded-xl bg-ink-950/90 shadow-float">
        <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
        </div>
        <div className="space-y-1.5 p-4 font-mono text-xs text-ink-200">
          <p>$ git commit -m &quot;feat: add the DevOps loop section&quot;</p>
          <p>$ git push origin main</p>
          <p className="text-emerald-300">✓ checks passed · deployed to staging</p>
          <p className="text-ink-400">$ _</p>
        </div>
      </div>
    </div>
  );
}

function WorkbenchArt() {
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-orange-400 via-coral-500 to-pink-500 p-8">
      <p className="text-sm font-semibold tracking-widest text-white/80 uppercase">Workbench</p>
      <ul className="mt-6 grid max-w-md grid-cols-4 gap-3">
        {labProjects.map((project) => {
          const Icon = project.icon;
          return (
            <li
              key={project.slug}
              className="grid aspect-square place-items-center rounded-xl bg-white/20 text-white"
            >
              <Icon aria-hidden className="size-6" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GuideArt() {
  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-teal-500 via-emerald-500 to-lime-400 p-8">
      <div className="max-w-md rounded-xl bg-white p-4 shadow-float">
        <p className="text-xs text-ink-500">What are you working on?</p>
        <p className="mt-2 rounded-lg border border-ink-200 p-3 text-sm text-ink-800">
          My deployments are slow and manual
        </p>
      </div>
      <div className="mt-4 flex max-w-md flex-wrap gap-2">
        {["CI/CD pipeline automation", "DWTS case study"].map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-800"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export const newsArt: Record<NewsItem["art"], ComponentType> = {
  letter: LetterArt,
  thesis: ThesisArt,
  dwts: DwtsArt,
  build: BuildArt,
  workbench: WorkbenchArt,
  guide: GuideArt,
};
