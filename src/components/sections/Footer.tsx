"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
        <Link href="/#hero" className="font-[family:var(--font-display)] text-3xl text-[var(--color-text)]">
          Sohail Patel
        </Link>
        <p>Copyright {currentYear}. Built with Next.js and Framer Motion.</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
          Directed interface work
        </p>
      </div>
    </footer>
  );
}
