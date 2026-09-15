import Link from "next/link";
import LottieAnimation from "@/components/effects/LottieAnimation";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#040d15] px-6 py-24 text-white sm:px-10 lg:px-12">
      <div className="atmosphere" />
      <div className="terrain-grid absolute inset-0 opacity-[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(143,199,255,0.12)] blur-[130px]" />

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker">Error 404</p>
          <h1 className="text-hero mt-5 max-w-3xl text-white">
            this route wandered off the map.
          </h1>
          <p className="text-body-lg prose-measure mt-6 text-[var(--color-text-muted)]">
            The page you are looking for does not exist, moved, or never made it
            into production. Let&apos;s get you back to the working build.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="text-button rounded-full border border-[rgba(143,199,255,0.26)] bg-[rgba(143,199,255,0.12)] px-6 py-3 text-center font-mono uppercase tracking-[0.28em] text-white"
            >
              Back home
            </Link>
            <Link
              href="/#projects"
              className="text-button rounded-full border border-white/12 px-6 py-3 text-center font-mono uppercase tracking-[0.28em] text-[var(--color-text-muted)] hover:text-white"
            >
              View projects
            </Link>
          </div>
        </div>

        <div className="story-card rounded-[2rem] p-6 sm:p-8">
          <div className="aspect-square w-full">
            <LottieAnimation />
          </div>
        </div>
      </section>
    </main>
  );
}
