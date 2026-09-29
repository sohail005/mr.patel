import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[rgba(255,255,255,0.025)] border border-[var(--color-border)] rounded-2xl transition-colors duration-300 hover:border-[var(--color-border-strong)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
