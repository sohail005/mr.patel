import type { LucideIcon } from "lucide-react";
import type { PortfolioService } from "@/types/portfolio";
import SectionNumber from "@/components/ui/SectionNumber";

type ServiceItemProps = {
  service: PortfolioService;
  icon: LucideIcon;
  index: number;
};

export default function ServiceItem({ service, icon: Icon, index }: ServiceItemProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-[var(--color-border)] py-8 first:border-t-0 first:pt-0 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <SectionNumber value={String(index + 1).padStart(2, "0")} />
        <Icon size={22} strokeWidth={1.5} className="text-[var(--color-primary-accent)]" />
      </div>

      <h3 className="text-xl font-semibold leading-tight text-[var(--color-text-primary)] sm:text-2xl">
        {service.title}
      </h3>

      <p className="max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
        {service.description}
      </p>

      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {service.capabilities.map((capability) => (
          <li
            key={capability}
            className="flex gap-2 font-mono text-xs leading-6 text-[var(--color-text-muted)]"
          >
            <span aria-hidden="true" className="text-[var(--color-primary-accent)]">
              /
            </span>
            <span>{capability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
