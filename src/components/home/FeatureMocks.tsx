import clsx from "clsx";
import { Check, ShieldAlert, ShieldCheck } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { FeatureId } from "@/data/features";
import { useCycle } from "@/hooks/useCycle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STEPS = 5; // every mockup tells its story in 5 steps (0 to 4)
const INTERVAL = 1400; // ms per step
const REST = STEPS - 1; // the finished state shown when nothing is hovered

type MockProps = { step: number };

function Window({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("overflow-hidden rounded-t-xl bg-white shadow-float", className)}>
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

function Spinner() {
  return (
    <span
      aria-hidden
      className="size-3.5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
    />
  );
}

/* 1. Pipelines: stages complete one after another */
const STAGES = ["Build", "Test", "Scan", "Deploy"];
const PIPE_LOG = [
  "$ docker build -t demo-app .",
  "$ run tests  ·  42 passed",
  "$ sonar-scanner  ·  quality gate passed",
  "$ deploy --env staging",
  "✓ Live on staging",
];

function PipelineMock({ step }: MockProps) {
  const passed = step >= 4;
  return (
    <div className="flex size-full items-end justify-center px-5 pt-8 @lg:px-10">
      <Window url="ci.demo-app.dev/runs/128" className="w-full max-w-lg">
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-950">Run #128 · main</p>
            <span
              className={clsx(
                "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                passed ? "bg-emerald-100 text-emerald-700" : "bg-brand-50 text-brand-700",
              )}
            >
              {passed ? "Passed" : "Running"}
            </span>
          </div>
          <ol className="flex items-center gap-1.5">
            {STAGES.map((stage, i) => {
              const done = step > i;
              const running = step === i;
              return (
                <li
                  key={stage}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors duration-300",
                    done && "border-emerald-200 bg-emerald-50 text-emerald-700",
                    running && "border-brand-300 bg-brand-50 text-brand-700",
                    !done && !running && "border-ink-100 text-ink-400",
                  )}
                >
                  {done && <Check aria-hidden className="size-3.5" />}
                  {running && <Spinner />}
                  {stage}
                </li>
              );
            })}
          </ol>
          <div className="rounded-lg bg-ink-950 p-3 font-mono text-[11px] leading-5 text-ink-200">
            {PIPE_LOG.map((line, i) => (
              <p
                key={line}
                className={clsx(
                  "whitespace-pre transition-opacity duration-300",
                  i <= step ? "opacity-100" : "opacity-0",
                  i === PIPE_LOG.length - 1 && "text-emerald-300",
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
}

/* 2. Containers: replicas scale up as load drops */
const PODS = 10;
const REPLICAS = [2, 4, 6, 8, 10];
const CPU = [86, 68, 54, 44, 36];

function KubeMock({ step }: MockProps) {
  const replicas = REPLICAS[step];
  return (
    <div className="flex size-full items-end justify-center px-5 pt-8">
      <div className="w-full max-w-sm rounded-t-xl bg-white p-5 shadow-float">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-ink-700">deployment/web</p>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700 tabular-nums">
            {replicas}/{PODS} replicas
          </span>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {Array.from({ length: PODS }, (_, i) => (
            <div
              key={i}
              className={clsx(
                "grid aspect-square place-items-center rounded-lg transition-all duration-500",
                i < replicas
                  ? "scale-100 bg-brand-600 text-white"
                  : "scale-90 bg-ink-100 text-transparent",
              )}
            >
              <Check aria-hidden className="size-4" />
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-[11px] text-ink-500">
            <span>Average CPU</span>
            <span className="tabular-nums">{CPU[step]}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full origin-left rounded-full bg-linear-to-r from-brand-500 to-pink-400 transition-transform duration-700"
              style={{ transform: `scaleX(${CPU[step] / 100})` }}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-ink-500">autoscaler target: 60%</p>
        </div>
      </div>
    </div>
  );
}

/* 3. Hosting: a server change goes live */
const HOST_LOG = [
  "$ sudo nginx -t",
  "nginx: configuration file test is successful",
  "$ sudo systemctl reload nginx",
  "$ curl -I https://app.example.com",
  "HTTP/2 200 · live",
];
const HOST_SERVICES = ["NGINX", "App container", "MySQL database", "Health check"];

function HostingMock({ step }: MockProps) {
  const shown = step + 1;
  return (
    <div className="grid size-full items-end gap-4 px-5 pt-8 @2xl:grid-cols-[1.25fr_1fr] @2xl:px-10">
      <Window url="ec2-instance · ssh" className="w-full">
        <div className="bg-ink-950 p-4 font-mono text-[11px] leading-6 text-ink-200">
          {HOST_LOG.map((line, i) => (
            <p
              key={line}
              className={clsx(
                "whitespace-pre transition-all duration-300",
                i < shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                line.startsWith("HTTP") && "text-emerald-300",
              )}
            >
              {line}
            </p>
          ))}
        </div>
      </Window>
      <div className="hidden rounded-t-xl bg-white p-5 shadow-float @2xl:block">
        <p className="text-sm font-semibold text-ink-950">Services</p>
        <ul className="mt-3 space-y-2.5">
          {HOST_SERVICES.map((name, i) => (
            <li
              key={name}
              className={clsx(
                "flex items-center justify-between rounded-lg border border-ink-100 px-3 py-2 text-xs transition-all duration-300",
                step >= i ? "opacity-100" : "opacity-30",
              )}
            >
              <span className="text-ink-800">{name}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                up
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 4. DORA metrics: before and after automation (your real DWTS numbers) */
const DORA = [
  { label: "Deployment lead time", before: "4.2 hours", after: "< 6 min" },
  { label: "Change failure rate", before: "34%", after: "4%" },
  { label: "Time to recovery", before: "—", after: "11 min" },
  { label: "Deployment frequency", before: "baseline", after: "+750%" },
];

function DoraMock({ step }: MockProps) {
  const after = step >= 2;
  return (
    <div className="flex size-full items-end justify-center px-5 pt-8">
      <div className="w-full max-w-sm rounded-t-xl bg-white p-5 shadow-float">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-950">DWTS · DORA metrics</p>
          <span
            className={clsx(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
              after ? "bg-emerald-100 text-emerald-700" : "bg-coral-400/25 text-coral-500",
            )}
          >
            {after ? "With CI/CD" : "Manual deploys"}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {DORA.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-ink-50 p-3">
              <p className="text-[11px] text-ink-500">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold text-ink-950 tabular-nums">
                {after ? metric.after : metric.before}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[11px] text-ink-500">Pipeline automation</p>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full origin-left rounded-full bg-linear-to-r from-brand-500 to-pink-400 transition-transform duration-700"
              style={{ transform: `scaleX(${after ? 1 : 0.15})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5. Code quality: findings get fixed and the quality gate passes */
const QUALITY = [
  { label: "Duplicated code block", fixedAt: 1 },
  { label: "Vulnerable dependency", fixedAt: 2 },
  { label: "Unhandled error path", fixedAt: 3 },
];

function QualityMock({ step }: MockProps) {
  const open = QUALITY.filter((f) => step < f.fixedAt).length;
  const Icon = open > 0 ? ShieldAlert : ShieldCheck;
  return (
    <div className="flex size-full items-end justify-center px-5 pt-8">
      <div className="w-full max-w-sm rounded-t-xl bg-white p-5 shadow-float">
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              "grid size-10 place-items-center rounded-lg transition-colors duration-300",
              open > 0 ? "bg-coral-400/25 text-coral-500" : "bg-emerald-100 text-emerald-700",
            )}
          >
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-950">
              {open > 0 ? "Quality gate failed" : "Quality gate passed"}
            </p>
            <p className="text-xs text-ink-500">SonarQube analysis · build #57</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {QUALITY.map((finding) => {
            const fixed = step >= finding.fixedAt;
            return (
              <li
                key={finding.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 px-3 py-2 text-xs"
              >
                <span
                  className={clsx(
                    "transition-colors",
                    fixed ? "text-ink-400 line-through" : "text-ink-800",
                  )}
                >
                  {finding.label}
                </span>
                <span
                  className={clsx(
                    "shrink-0 rounded-full px-2 py-0.5 font-medium transition-colors",
                    fixed ? "bg-emerald-100 text-emerald-700" : "bg-coral-400/25 text-coral-500",
                  )}
                >
                  {fixed ? "Fixed" : "Open"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* 6. Full stack: a deploy script runs line by line */
const DEPLOY_SCRIPT = [
  "#!/usr/bin/env bash",
  "set -euo pipefail",
  "git pull origin main",
  "docker compose build web",
  "docker compose up -d",
];
const DEPLOY_OUTPUT = ["web image built ✓", "containers up ✓", "Health check passed · live"];

function FullStackMock({ step }: MockProps) {
  return (
    <div className="flex size-full items-end justify-center px-5 pt-8">
      <Window url="deploy.sh" className="w-full max-w-md">
        <div className="bg-ink-950 p-4 font-mono text-[11px] leading-6">
          {DEPLOY_SCRIPT.map((line, i) => (
            <p
              key={line}
              className={clsx(
                "rounded px-2 whitespace-pre transition-colors duration-300",
                i === step ? "bg-brand-600/40 text-white" : "text-ink-300",
              )}
            >
              <span className="mr-3 inline-block w-3 text-right text-ink-500 select-none">
                {i + 1}
              </span>
              {line}
            </p>
          ))}
          <div className="mt-3 border-t border-white/10 pt-3">
            {DEPLOY_OUTPUT.map((line, i) => (
              <p
                key={line}
                className={clsx(
                  "px-2 whitespace-pre transition-opacity duration-300",
                  step >= i + 2 ? "opacity-100" : "opacity-0",
                  i === DEPLOY_OUTPUT.length - 1 ? "text-emerald-300" : "text-ink-200",
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
}

const mocks: Record<FeatureId, ComponentType<MockProps>> = {
  pipelines: PipelineMock,
  containers: KubeMock,
  hosting: HostingMock,
  dora: DoraMock,
  quality: QualityMock,
  fullstack: FullStackMock,
};

export function FeatureMock({ id, playing }: { id: FeatureId; playing: boolean }) {
  const reduced = usePrefersReducedMotion();
  const step = useCycle(playing && !reduced, STEPS, INTERVAL, REST);
  const Mock = mocks[id];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Mock step={step} />
    </div>
  );
}
