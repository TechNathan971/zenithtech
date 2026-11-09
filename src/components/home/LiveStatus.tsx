import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useI18n } from "@/hooks/useI18n";

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

const getSnapshot = (): number | null => Math.floor(Date.now() / 1000);

// The server cannot know the visitor's exact second, so it renders a placeholder.
const getServerSnapshot = (): number | null => null;

const pad = (n: number) => String(n).padStart(2, "0");

export function LiveStatus() {
  const { t } = useI18n();
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let clock = "--:--:--";
  if (seconds !== null) {
    const d = new Date(seconds * 1000);
    clock = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  }

  return (
    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <Link href="/status" className="inline-flex items-center gap-2 font-medium text-ink-950">
        <span aria-hidden className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        {t(["All systems operational", "Tous les systèmes sont opérationnels"])}
      </Link>
      <span aria-hidden className="text-ink-300">
        ·
      </span>
      <span className="text-ink-600">
        {t(["Server time", "Heure du serveur"])}{" "}
        <span aria-hidden className="font-medium text-brand-600 tabular-nums">
          {clock}
        </span>{" "}
        UTC
      </span>
    </p>
  );
}
