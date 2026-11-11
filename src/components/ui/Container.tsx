import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerProps = { children: ReactNode; className?: string };

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1320px] px-6 lg:px-12", className)}>{children}</div>
  );
}
