import { RiskLevel } from "@/lib/types";

const STYLES: Record<RiskLevel, string> = {
  Moderate: "bg-amber-50 text-risk-moderate border-amber-200",
  High: "bg-orange-50 text-risk-high border-orange-200",
  "Very High": "bg-red-50 text-risk-veryhigh border-red-200",
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-wide ${STYLES[level]}`}
    >
      {level} risk
    </span>
  );
}
