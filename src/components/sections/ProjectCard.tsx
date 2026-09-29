import Image from "next/image";
import type { PortfolioProject } from "@/types/portfolio";
import SectionNumber from "@/components/ui/SectionNumber";
import EditorialLink from "@/components/ui/EditorialLink";
import { getHiResThumbnail } from "@/lib/getHiResThumbnail";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const thumbnail = project.thumbnail;
  const aspect = thumbnail?.fit === "contain" ? "aspect-video" : "aspect-[4/3]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.015)] transition-colors duration-300 hover:border-[var(--color-border-strong)]">
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

          <div className="relative h-40 w-40 overflow-hidden rounded-[22%] bg-transparent shadow-[0_16px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.05] sm:h-56 sm:w-56 md:h-80 md:w-80 lg:h-128 lg:w-lg xl:h-160 xl:w-160">
            <Image
              src={getHiResThumbnail(thumbnail.appIcon)}
              alt={`${project.title} app icon`}
              fill
              quality={90}
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 512px, (min-width: 768px) 320px, (min-width: 640px) 224px, 160px"
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

      <div className="flex flex-1 flex-col gap-3.5 p-6 sm:p-7">
        <SectionNumber value={String(index + 1).padStart(2, "0")} label="PROJECT" />

        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-2 min-h-[2.3em] text-project-title font-sans font-semibold leading-tight text-[var(--color-text-primary)]">
            {project.title}
          </h3>

          <div className="flex min-h-[1.4em] flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {project.year ? <span>{project.year}</span> : null}
            <span aria-hidden="true">/</span>
            <span>{project.type}</span>
            <span aria-hidden="true">/</span>
            <span>{project.platform.join(", ")}</span>
          </div>
        </div>

        <p className="line-clamp-2 min-h-[3rem] text-sm leading-6 text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        <div className="flex min-h-[1.75rem] flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {project.company}
          </span>
          <EditorialLink href={project.projectUrl} external icon="arrowUpRight">
            View project
          </EditorialLink>
        </div>
      </div>
    </article>
  );
}
