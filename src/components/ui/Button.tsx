"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import MagneticButton from "@/components/effects/MagneticButton";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
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
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-sans font-medium transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

type Ripple = { id: number; x: number; y: number; size: number };

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawn = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now();
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size },
    ]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 650);
  };

  const elements = ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full bg-white/30 motion-safe:animate-[ripple_650ms_ease-out_forwards]"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: ripple.size,
        height: ripple.size,
        transform: "translate(-50%, -50%) scale(0)",
      }}
    />
  ));

  return { spawn, elements };
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  onClick,
  type = "button",
  magnetic = true,
}: ButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);
  const { spawn, elements } = useRipples();

  const content = href ? (
    <Link
      href={href}
      className={classes}
      onClick={(event) => spawn(event)}
      data-cursor-label="Open"
    >
      {children}
      {elements}
    </Link>
  ) : (
    <button
      type={type}
      onClick={(event) => {
        spawn(event);
        onClick?.();
      }}
      className={classes}
    >
      {children}
      {elements}
    </button>
  );

  if (!magnetic) return content;

  return (
    <MagneticButton strength={0.25} className={className}>
      {content}
    </MagneticButton>
  );
}
