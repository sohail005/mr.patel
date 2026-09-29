import SectionLabel from "@/components/ui/SectionLabel";

type CapabilityGroupProps = {
  title: string;
  items: string[];
};

export default function CapabilityGroup({ title, items }: CapabilityGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--color-border)] px-3 py-2 font-mono text-xs text-[var(--color-text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
