import clsx from "clsx";
import { Check, CloudUpload, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { presets, stages, type Preset, type PresetId } from "@/data/devops";
import { useI18n } from "@/hooks/useI18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { loopGeometry, loopPoint, loopTop } from "@/lib/loop";
import { LoopCanvas } from "./LoopCanvas";
import { StatsRow } from "./StatsRow";

const stageTs = stages.map((stage) => stage.t);

function PresetMenu({ value, onChange }: { value: Preset; onChange: (id: PresetId) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t(["Visual theme", "Thème visuel"])} : ${t(value.label)}`}
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <Palette aria-hidden className="size-5" />
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute top-12 right-0 z-20 w-60 rounded-xl border border-white/15 bg-[#0c1433] p-1 shadow-float"
        >
          {presets.map((preset) => {
            const active = preset.id === value.id;
            return (
              <li key={preset.id} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    onChange(preset.id);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-white/15 text-white" : "text-ink-200 hover:bg-white/10",
                  )}
                >
                  <span className="flex -space-x-1">
                    <span className="size-4 rounded-full" style={{ background: preset.dev }} />
                    <span className="size-4 rounded-full" style={{ background: preset.ops }} />
                  </span>
                  {t(preset.label)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function LoopSection() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [presetId, setPresetId] = useState<PresetId>("aurora");
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const preset = presets.find((p) => p.id === presetId) ?? presets[0];
  const stage = stages[active];

  const choose = (index: number) => {
    setActive(index);
    setTouched(true);
  };

  // The stages advance on their own until the visitor picks one
  useEffect(() => {
    if (touched || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 4500);
    return () => clearInterval(id);
  }, [touched, reduced]);

  // Measure the stage area so the clickable dots sit exactly on the loop
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const geom = size.width > 0 ? loopGeometry(size.width, size.height) : null;

  return (
    <section
      aria-label={t(["DevOps lifecycle", "Cycle de vie DevOps"])}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#070d24] text-white"
    >
      {presets.map((p) => (
        <div
          key={p.id}
          aria-hidden
          className="absolute inset-0 -z-10 transition-opacity duration-1000"
          style={{ background: p.background, opacity: p.id === preset.id ? 1 : 0 }}
        />
      ))}

      <Container className="relative pt-10 sm:pt-14">
        <StatsRow accent={preset.accent} />
      </Container>

      <Container className="relative pt-14 sm:pt-20">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand-200 uppercase">
              {t(["DevOps lifecycle", "Cycle de vie DevOps"])}
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
              <span className="text-white">
                {t([
                  "One loop, from commit to production and back.",
                  "Une seule boucle, du commit à la production et retour.",
                ])}
              </span>{" "}
              <span className="text-ink-300">
                {t([
                  "Build, release, observe and improve, continuously. Hover a stage to see the tools and results behind it.",
                  "Construire, livrer, observer et améliorer, en continu. Survolez une étape pour voir les outils et les résultats derrière.",
                ])}
              </span>
            </h2>
          </div>
          <PresetMenu value={preset} onChange={setPresetId} />
        </div>
      </Container>

      <div ref={stageRef} className="relative h-[28rem] sm:h-[32rem] lg:h-[36rem]">
        <LoopCanvas
          colors={preset}
          stageTs={stageTs}
          active={active}
          className="absolute inset-0 size-full"
        />
        {geom && (
          <>
            <div
              aria-hidden
              className="absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_0_40px_8px_rgba(125,162,255,0.3)]"
              style={{ left: geom.cx, top: Math.max(36, loopTop(geom) - 44) }}
            >
              <CloudUpload className="size-6" />
            </div>
            {stages.map((s, i) => {
              const point = loopPoint(s.t, geom);
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={t(s.label)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") choose(i);
                  }}
                  onFocus={() => choose(i)}
                  onClick={() => choose(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 outline-offset-8"
                  style={{ left: point.x, top: point.y }}
                >
                  <span
                    className={clsx(
                      "block rounded-full border-2 transition-all duration-300",
                      isActive
                        ? "size-5 border-white bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.45)]"
                        : "size-3.5 border-white/60 bg-white/20",
                    )}
                  />
                  <span
                    className={clsx(
                      "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors sm:block",
                      s.side === "left" ? "right-full mr-4" : "left-full ml-4",
                      isActive
                        ? "border-white/40 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-ink-200",
                    )}
                  >
                    {t(s.label)}
                  </span>
                </button>
              );
            })}
          </>
        )}
      </div>

      <Container className="relative pb-14 sm:pb-20">
        <div
          role="group"
          aria-label={t(["Lifecycle stages", "Étapes du cycle"])}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {stages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => choose(i)}
              className={clsx(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                i === active
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/10 text-ink-300 hover:border-white/25 hover:text-white",
              )}
            >
              <span className="block text-xs text-ink-400 tabular-nums">0{i + 1}</span>
              <span className="block text-sm font-medium">{t(s.label)}</span>
            </button>
          ))}
        </div>

        <div
          aria-live="polite"
          className="mt-6 grid gap-8 rounded-card border border-white/15 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <h3 className="text-2xl font-medium text-white">{t(stage.label)}</h3>
            <p className="mt-3 max-w-xl text-ink-200">{t(stage.summary)}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {stage.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-ink-100"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              {stage.points.map((point) => (
                <li key={t(point)} className="flex gap-3 text-sm text-ink-100">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-300" />
                  {t(point)}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={stage.href} variant="inverse" arrow>
                {t(stage.cta)}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
