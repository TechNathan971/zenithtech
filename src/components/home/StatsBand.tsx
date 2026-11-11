import clsx from "clsx";
import { CloudSun, Moon, MoonStar, Sun, Sunrise, Sunset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";
import { BurstCanvas } from "./BurstCanvas";

type ThemeId = "predawn" | "sunrise" | "daytime" | "dusk" | "sunset" | "night";

type Theme = {
  id: ThemeId;
  label: Text;
  icon: LucideIcon;
  background: string;
  stroke: string;
  dark: boolean;
};

const themes: Theme[] = [
  {
    id: "predawn",
    label: ["Pre-dawn", "Avant l’aube"],
    icon: MoonStar,
    background: "radial-gradient(70% 90% at 50% 100%, #d9c7ff 0%, #f5f0ff 55%, #ffffff 100%)",
    stroke: "#8b3cf0",
    dark: false,
  },
  {
    id: "sunrise",
    label: ["Sunrise", "Lever du soleil"],
    icon: Sunrise,
    background: "radial-gradient(70% 90% at 50% 100%, #ffc9a8 0%, #ffeef0 55%, #ffffff 100%)",
    stroke: "#f26d5b",
    dark: false,
  },
  {
    id: "daytime",
    label: ["Daytime", "Journée"],
    icon: Sun,
    background: "radial-gradient(70% 90% at 50% 100%, #bcd4ff 0%, #eef4ff 55%, #ffffff 100%)",
    stroke: "#3d5cff",
    dark: false,
  },
  {
    id: "dusk",
    label: ["Dusk", "Crépuscule"],
    icon: CloudSun,
    background: "radial-gradient(70% 90% at 50% 100%, #c3b5ff 0%, #f1ecff 50%, #fff4ee 100%)",
    stroke: "#6d4cf2",
    dark: false,
  },
  {
    id: "sunset",
    label: ["Sunset", "Coucher du soleil"],
    icon: Sunset,
    background: "radial-gradient(70% 90% at 50% 100%, #ff9a7a 0%, #ffe2d6 55%, #fff7f3 100%)",
    stroke: "#e8456b",
    dark: false,
  },
  {
    id: "night",
    label: ["Night", "Nuit"],
    icon: Moon,
    background: "radial-gradient(70% 90% at 50% 100%, #1d2a6b 0%, #0f1838 55%, #0a1226 100%)",
    stroke: "#7da2ff",
    dark: true,
  },
];

/* The highlight line fades out at both ends; the glow fades out from the bottom centre */
const LINE_MASK = "linear-gradient(90deg, transparent, #000 50%, transparent)";
const GLOW_MASK = "radial-gradient(closest-side at 50% 100%, #000, transparent)";

/* The theme that matches the visitor's local time */
function autoTheme(): ThemeId {
  const hour = new Date().getHours();
  if (hour < 4) return "night";
  if (hour < 6) return "predawn";
  if (hour < 9) return "sunrise";
  if (hour < 17) return "daytime";
  if (hour < 19) return "dusk";
  if (hour < 21) return "sunset";
  return "night";
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

function ThemeMenu({ value, onChange }: { value: Theme; onChange: (id: ThemeId) => void }) {
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

  const Icon = value.icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t(["Time of day", "Moment de la journée"])} : ${t(value.label)}`}
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-lg border border-ink-200 bg-white/85 text-brand-700 transition-colors hover:bg-white"
      >
        <Icon aria-hidden className="size-5" />
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute top-12 right-0 z-10 w-48 rounded-xl border border-ink-100 bg-white p-1 shadow-float"
        >
          {themes.map((theme) => {
            const ItemIcon = theme.icon;
            const active = theme.id === value.id;
            return (
              <li key={theme.id} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    onChange(theme.id);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50",
                  )}
                >
                  <ItemIcon aria-hidden className="size-4" />
                  {t(theme.label)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function StatsBand() {
  const { t } = useI18n();
  const auto = useSyncExternalStore(subscribe, autoTheme, (): ThemeId => "daytime");
  const [override, setOverride] = useState<ThemeId | null>(null);
  const [activeStat, setActiveStat] = useState(0);
  const current = themes.find((theme) => theme.id === (override ?? auto)) ?? themes[2];

  return (
    <section
      aria-label={t(["Highlights", "Chiffres clés"])}
      className="relative isolate overflow-hidden border-y border-ink-100"
    >
      {themes.map((theme) => (
        <div
          key={theme.id}
          aria-hidden
          className="absolute inset-0 -z-10 transition-opacity duration-700"
          style={{ background: theme.background, opacity: theme.id === current.id ? 1 : 0 }}
        />
      ))}

      <Container>
        <dl
          className={clsx(
            "mt-14 grid grid-cols-2 border-y transition-colors duration-700 lg:grid-cols-4",
            current.dark ? "border-white/10" : "border-ink-100",
          )}
        >
          {stats.map((stat, index) => {
            const active = index === activeStat;
            return (
              <div
                key={stat.value}
                tabIndex={0}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveStat(index);
                }}
                onFocus={() => setActiveStat(index)}
                onClick={() => setActiveStat(index)}
                className="relative flex cursor-default flex-col-reverse items-center gap-2 px-3 py-9 text-center outline-offset-[-4px]"
              >
                {/* soft glow under the active stat, in the theme colour */}
                <span
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-current transition-[color,opacity] duration-500",
                    active ? "opacity-15" : "opacity-0",
                  )}
                  style={{
                    color: current.stroke,
                    maskImage: GLOW_MASK,
                    WebkitMaskImage: GLOW_MASK,
                  }}
                />
                {/* highlight lines on the top and bottom edge, in the theme colour */}
                {["-top-px", "-bottom-px"].map((position) => (
                  <span
                    key={position}
                    aria-hidden
                    className={clsx(
                      "pointer-events-none absolute inset-x-4 h-0.5 bg-current transition-[color,opacity] duration-500",
                      position,
                      active ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      color: current.stroke,
                      maskImage: LINE_MASK,
                      WebkitMaskImage: LINE_MASK,
                    }}
                  />
                ))}
                <dt
                  className={clsx(
                    "max-w-[16rem] text-sm transition-colors duration-500",
                    active
                      ? current.dark
                        ? "text-ink-100"
                        : "text-ink-800"
                      : current.dark
                        ? "text-white/40"
                        : "text-ink-400",
                  )}
                >
                  {t(stat.label)}
                </dt>
                <dd
                  className={clsx(
                    "text-4xl font-medium tracking-tight tabular-nums transition-colors duration-500 sm:text-5xl",
                    active
                      ? current.dark
                        ? "text-white"
                        : "text-ink-950"
                      : current.dark
                        ? "text-white/40"
                        : "text-ink-400",
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>

      <div className="relative">
        <BurstCanvas
          color={current.stroke}
          className="block h-80 w-full sm:h-[26rem] lg:h-[30rem]"
        />
        <div className="absolute top-4 right-4 sm:right-8">
          <ThemeMenu value={current} onChange={setOverride} />
        </div>
      </div>
    </section>
  );
}
