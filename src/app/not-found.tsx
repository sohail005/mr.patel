import LottieAnimation from "@/components/effects/LottieAnimation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-background)] py-24 text-[var(--color-text-primary)]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "var(--color-primary-accent)" }}
      />

      <Container>
        <section className="relative z-10 grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>Error 404</SectionLabel>
            <h1 className="text-hero mt-5 max-w-3xl font-sans font-semibold leading-[1.05] text-[var(--color-text-primary)]">
              This route wandered off the map.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
              The page you are looking for does not exist, moved, or never made it
              into production. Let&apos;s get you back to the working build.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button className="text-(--color-text-primary)" variant="primary" href="/">
                Back home
              </Button>
              <Button className="text-(--color-text-primary)" variant="secondary" href="/#projects">
                View projects
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
            <div className="aspect-square w-full">
              <LottieAnimation />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
