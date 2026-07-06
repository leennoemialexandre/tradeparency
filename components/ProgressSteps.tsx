const STEPS: { key: string; label: string }[] = [
  { key: "select_asset", label: "Select" },
  { key: "explainer", label: "Understand" },
  { key: "comparison", label: "Compare" },
  { key: "readiness_check", label: "Readiness" },
  { key: "trade_confirmation", label: "Simulate" },
  { key: "summary", label: "Summary" },
];

export default function ProgressSteps({ current }: { current: string }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center justify-between gap-1 px-1">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.key} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] ${
                active
                  ? "bg-accent text-white"
                  : done
                  ? "bg-navy-800 text-white"
                  : "bg-navy-100 text-navy-400"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-center text-[11px] leading-tight ${
                active ? "font-medium text-navy-900" : "text-navy-400"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
