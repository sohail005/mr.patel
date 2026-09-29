import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EditorialLinkProps = {
  href: string;
  children: ReactNode;
  icon?: "arrow" | "arrowUpRight";
  external?: boolean;
  className?: string;
};

export default function EditorialLink({
  href,
  children,
  icon = "arrow",
  external = false,
  className,
}: EditorialLinkProps) {
  const Icon = icon === "arrowUpRight" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      {children}
      <Icon
        size={16}
        strokeWidth={1.75}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </>
  );

  const linkClassName = cn(
    "group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={linkClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {content}
    </Link>
  );
}
