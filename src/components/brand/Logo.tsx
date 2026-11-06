import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-7">
        <rect width="32" height="32" rx="8" className="fill-brand-600" />
        <path
          d="M8.5 22 16 9l7.5 13"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight">ZenithTech</span>
    </span>
  );
}
