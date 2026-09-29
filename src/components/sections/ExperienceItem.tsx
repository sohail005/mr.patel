import type { PortfolioExperience } from "@/types/portfolio";
import SectionNumber from "@/components/ui/SectionNumber";

type ExperienceItemProps = {
  experience: PortfolioExperience;
  index: number;
};

export default function ExperienceItem({ experience, index }: ExperienceItemProps) {
  return (
    <div className="relative border-l border-[var(--color-border)] py-2 pl-6 sm:pl-8">
      <span
        aria-hidden="true"
        className={`absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full ${
          experience.duration === "Current"
            ? "bg-[var(--color-primary-accent)]"
            : "bg-[var(--color-text-muted)]"
        }`}
      />

      <SectionNumber value={String(index + 1).padStart(2, "0")} label={experience.type} />

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] sm:text-xl">
          {experience.company}
        </h3>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {experience.period}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-[var(--color-secondary-accent)]">
        {experience.role}
      </p>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
        {experience.focus}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
