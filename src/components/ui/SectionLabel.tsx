import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
