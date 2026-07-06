import { ComparisonView as ComparisonViewType } from "@/lib/types";

export default function ComparisonView({ comparison }: { comparison: ComparisonViewType }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl">{comparison.title}</h3>
        <p className="mt-1 text-sm text-navy-600">{comparison.intro}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {comparison.alternatives.map((alt) => (
          <div key={alt.name} className="card flex flex-col gap-3 p-5">
            <div>
              <h4 className="font-serif text-base text-navy-950">{alt.name}</h4>
              <p className="mt-1 text-sm text-navy-600">{alt.description}</p>
            </div>
            <ul className="mt-auto list-disc space-y-1.5 pl-4 text-sm text-navy-700">
              {alt.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
