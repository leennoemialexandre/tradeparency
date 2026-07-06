export default function StatCard({
  label,
  value,
  helpText,
}: {
  label: string;
  value: string;
  helpText?: string;
}) {
  return (
    <div className="card p-5">
      <p className="data-label">{label}</p>
      <p className="mt-1.5 font-mono text-2xl text-navy-950">{value}</p>
      {helpText && <p className="mt-1 text-xs text-navy-400">{helpText}</p>}
    </div>
  );
}
