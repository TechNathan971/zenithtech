import clsx from "clsx";
import { CloudSun, Moon, MoonStar, Sun, Sunrise, Sunset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

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

/* A half-circle of fine strands with a dot at each tip. Plain arithmetic keeps server and browser identical. */
const STRANDS = 110;
const round = (n: number) => Math.round(n * 10) / 10;
const strands = Array.from({ length: STRANDS }, (_, i) => {
  const angle = (190 + (i / (STRANDS - 1)) * 160) * (Math.PI / 180);
  const length = 150 + ((i * 47) % 140) + ((i * 13) % 60);
  return {
    x1: round(600 + Math.cos(angle) * 24),
    y1: round(440 + Math.sin(angle) * 24),
    x2: round(600 + Math.cos(angle) * length),
    y2: round(440 + Math.sin(angle) * length),
    o: 0.3 + ((i * 29) % 70) / 100,
  };
});

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
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col-reverse gap-2">
              <dt
                className={clsx(
                  "max-w-[16rem] text-sm transition-colors duration-700",
                  current.dark ? "text-ink-200" : "text-ink-600",
                )}
              >
                {t(stat.label)}
              </dt>
              <dd
                className={clsx(
                  "text-5xl font-semibold tracking-tight tabular-nums transition-colors duration-700 sm:text-6xl",
                  current.dark ? "text-white" : "text-ink-950",
                )}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="relative">
        <svg
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
          className="block h-80 w-full transition-[color] duration-700 sm:h-96"
          style={{ color: current.stroke }}
        >
          {strands.map((s, i) => (
            <g key={i}>
              <line
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity={s.o}
              />
              <circle cx={s.x2} cy={s.y2} r="2.4" fill="currentColor" fillOpacity={s.o} />
            </g>
          ))}
        </svg>
        <div className="absolute top-4 right-4 sm:right-8">
          <ThemeMenu value={current} onChange={setOverride} />
        </div>
      </div>
    </section>
  );
}
