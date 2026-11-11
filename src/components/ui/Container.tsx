import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerProps = { children: ReactNode; className?: string };

// The page frame in Layout sets the maximum width, so this only adds the side padding.
export function Container({ children, className }: ContainerProps) {
  return <div className={clsx("mx-auto w-full px-6 lg:px-12", className)}>{children}</div>;
}
