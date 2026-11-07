import { useSyncExternalStore } from "react";

const RATE_PER_SECOND = 12_400; // fictional dollars per second
const TICK_MS = 100;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, TICK_MS);
  return () => clearInterval(id);
}

// Returns the current 100ms tick, so the value stays stable between calls within one render.
const getSnapshot = (): number | null => Math.floor(Date.now() / TICK_MS);

// The server has no "now" that matches the browser, so it renders a placeholder.
const getServerSnapshot = (): number | null => null;

export function VolumeCounter() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let display = "—";
  if (tick !== null) {
    const now = tick * TICK_MS;
    const yearStart = Date.UTC(new Date(now).getUTCFullYear(), 0, 1);
    display = currency.format(((now - yearStart) / 1000) * RATE_PER_SECOND);
  }

  return (
    <p className="inline-flex flex-wrap items-baseline gap-x-2 text-sm">
      <span className="font-medium text-ink-950">Processed on ZenithTech this year:</span>
      <span
        aria-hidden
        className="inline-block min-w-[16ch] font-medium text-brand-600 tabular-nums"
      >
        {display}
      </span>
      <span className="sr-only">hundreds of billions of dollars</span>
    </p>
  );
}
