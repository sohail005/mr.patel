"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
        <a href="/#hero" className="font-[family:var(--font-display)] text-3xl text-white">
          Sohail Patel
        </a>
        <p>Copyright {currentYear}. Built with Next.js, Framer Motion, and free tooling only.</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
          Directed interface work
        </p>
      </div>
    </footer>
  );
}
