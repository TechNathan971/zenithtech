import clsx from "clsx";
import { useState } from "react";
import { stats } from "@/data/stats";
import { useI18n } from "@/hooks/useI18n";

/* The highlight line fades out at both ends; the glow fades out from the bottom centre */
const LINE_MASK = "linear-gradient(90deg, transparent, #000 50%, transparent)";
const GLOW_MASK = "radial-gradient(closest-side at 50% 100%, #000, transparent)";

export function StatsRow({ accent }: { accent: string }) {
  const { t } = useI18n();
  const [activeStat, setActiveStat] = useState(0);

  return (
    <dl className="grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
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
            {/* soft glow under the active stat, in the chosen colour */}
            <span
              aria-hidden
              className={clsx(
                "pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-current transition-[color,opacity] duration-500",
                active ? "opacity-15" : "opacity-0",
              )}
              style={{ color: accent, maskImage: GLOW_MASK, WebkitMaskImage: GLOW_MASK }}
            />
            {/* highlight lines on the top and bottom edge, in the chosen colour */}
            {["-top-px", "-bottom-px"].map((position) => (
              <span
                key={position}
                aria-hidden
                className={clsx(
                  "pointer-events-none absolute inset-x-4 h-0.5 bg-current transition-[color,opacity] duration-500",
                  position,
                  active ? "opacity-100" : "opacity-0",
                )}
                style={{ color: accent, maskImage: LINE_MASK, WebkitMaskImage: LINE_MASK }}
              />
            ))}
            <dt
              className={clsx(
                "max-w-[16rem] text-sm transition-colors duration-500",
                active ? "text-ink-100" : "text-white/40",
              )}
            >
              {t(stat.label)}
            </dt>
            <dd
              className={clsx(
                "text-4xl font-medium tracking-tight tabular-nums transition-colors duration-500 sm:text-5xl",
                active ? "text-white" : "text-white/40",
              )}
            >
              {stat.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
