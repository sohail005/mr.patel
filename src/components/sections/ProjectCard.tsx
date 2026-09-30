import Image from "next/image";
import type { PortfolioProject } from "@/types/portfolio";
import SectionNumber from "@/components/ui/SectionNumber";
import { getHiResThumbnail } from "@/lib/getHiResThumbnail";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const thumbnail = project.thumbnail;
  const aspect = thumbnail?.fit === "contain" ? "aspect-video" : "aspect-[4/3]";

  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.015)] transition-colors duration-300 hover:border-[var(--color-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
    >
      {thumbnail?.appIcon ? (
        <div
          className={`relative flex w-full ${aspect} items-center justify-center overflow-hidden bg-[var(--color-surface)]`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4] transition-opacity duration-500 group-hover:opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--color-text-primary) 14%, transparent) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 42%, color-mix(in srgb, var(--color-primary-accent) 16%, transparent), transparent 72%)",
            }}
          />

          {thumbnail.source ? (
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_72%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] backdrop-blur-sm sm:bottom-4 sm:left-4">
              {thumbnail.source}
            </span>
          ) : null}

          {thumbnail.rating ? (
            <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_72%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] backdrop-blur-sm sm:right-4 sm:top-4">
              <span className="text-[var(--color-primary-accent)]" aria-hidden="true">★</span>
              {thumbnail.rating}
            </span>
          ) : null}

          <div className="relative h-10 w-10 overflow-hidden rounded-[22%] bg-transparent shadow-[0_16px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.05] sm:h-14 sm:w-14 md:h-18 md:w-18 lg:h-22 lg:w-22 xl:h-26 xl:w-26">
            <Image
              src={getHiResThumbnail(thumbnail.appIcon)}
              alt={`${project.title} app icon`}
              fill
              quality={90}
              sizes="(min-width: 1280px) 104px, (min-width: 1024px) 88px, (min-width: 768px) 72px, (min-width: 640px) 56px, 40px"
              className="object-contain"
            />
          </div>
        </div>
      ) : thumbnail ? (
        <div className={`relative w-full ${aspect} overflow-hidden bg-surface`}>
          <Image
            src={getHiResThumbnail(thumbnail.src)}
            alt={thumbnail.alt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`transition-transform duration-500 group-hover:scale-[1.02] ${
              thumbnail.fit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-3.5">
        <SectionNumber value={String(index + 1).padStart(2, "0")} label="PROJECT" />

        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-2 py-5 min-h-[1.15em] text-3xl font-sans font-semibold leading-tight text-[var(--color-text-primary)]">
            {project.title}
          </h3>

          <div className="flex min-h-[0.7em] flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {project.year ? <span>{project.year}</span> : null}
            <span aria-hidden="true">/</span>
            <span>{project.type}</span>
            <span aria-hidden="true">/</span>
            <span>{project.platform.join(", ")}</span>
          </div>
        </div>

        <p className="line-clamp-2 min-h-6 text-sm leading-6 text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        <div className="flex min-h-[0.9rem] flex-wrap gap-1 py-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-[var(--color-border)] pt-2.5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {project.company}
          </span>
        </div>
      </div>
    </a>
  );
}
