"use client";

import Link from "next/link";
import SocialLinks from "@/components/sections/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
          <Link href="/#hero" className="italic font-[family-name:var(--font-playfair)] text-[var(--color-text)] text-xl font-semibold">
            Sohail Patel
          </Link>
          <p className="text-sm">Copyright {currentYear}. Built with Next.js and Framer Motion.</p>
          <p className="text-caption font-mono uppercase tracking-[0.26em] text-[var(--color-primary)]">
            Directed interface work
          </p>
        </div>

        <SocialLinks className="mt-8" />
      </div>
    </footer>
  );
}
