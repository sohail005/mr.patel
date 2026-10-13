import SectionLabel from "@/components/ui/SectionLabel";
import { CAPABILITY_LINKS } from "@/data/capabilityLinks";

type CapabilityGroupProps = {
  title: string;
  items: string[];
};

export default function CapabilityGroup({ title, items }: CapabilityGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const href = CAPABILITY_LINKS[item];
          const className =
            "rounded-full border border-[var(--color-border)] px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors duration-200 sm:text-sm";

          if (href) {
            return (
              <a
                key={item}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Visit"
                className={`${className} hover:border-[var(--color-primary-accent)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]`}
              >
                {item}
              </a>
            );
          }

          return (
            <span key={item} className={className}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
