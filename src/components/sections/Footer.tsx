import Link from "next/link";
import SocialLinks from "@/components/sections/SocialLinks";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <Container>
        <div className="flex flex-col gap-4 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
          <Link
            href="/#hero"
            className="rounded-sm font-mono text-sm font-medium uppercase tracking-[0.24em] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            Sohail Patel
          </Link>
          <p className="text-sm">Copyright {currentYear}. Built with Next.js and Framer Motion.</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-primary-accent)]">
            Directed interface work
          </p>
        </div>

        <SocialLinks className="mt-8" />
      </Container>
    </footer>
  );
}
