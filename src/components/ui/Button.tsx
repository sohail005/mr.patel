"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
};

type ButtonProps = ButtonBaseProps &
  (
    | { href: string; onClick?: never; type?: never }
    | { href?: never; onClick?: () => void; type?: "button" | "submit" }
  );

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-primary-accent)] text-[var(--color-background)] hover:bg-[var(--color-secondary-accent)]",
  secondary:
    "bg-transparent border border-[rgba(255,255,255,0.16)] text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.06)]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-sans font-medium transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
