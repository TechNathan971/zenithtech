import clsx from "clsx";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
  ghost: "text-brand-700 hover:text-brand-900",
  inverse: "bg-white text-ink-900 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

/** Reusable on <button> elements later (forms), not just links. */
export function buttonStyles(opts: { variant?: Variant; size?: Size; className?: string } = {}) {
  const { variant = "primary", size = "md", className } = opts;
  return clsx(base, variants[variant], sizes[size], className);
}

type ButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      {arrow && (
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
