type SectionNumberProps = {
  value: string;
  label?: string;
};

export default function SectionNumber({ value, label }: SectionNumberProps) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
      <span className="text-[var(--color-primary-accent)]">{value} /</span>
      {label ? <span className="text-[var(--color-text-muted)]">{label}</span> : null}
    </div>
  );
}
