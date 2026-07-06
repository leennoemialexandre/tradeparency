import { Product } from "@/lib/types";
import RiskBadge from "@/components/RiskBadge";
import OptionDataTable from "@/components/OptionDataTable";
import { SampleDataNotice } from "@/components/DisclaimerBanner";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h4 className="font-serif text-base text-navy-950">{title}</h4>
      <div className="mt-2 text-sm leading-relaxed text-navy-700">{children}</div>
    </div>
  );
}

export default function Explainer({ product }: { product: Product }) {
  return (
    <div className="space-y-5">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <p className="data-label">{product.productType}</p>
          <h3 className="text-xl">{product.ticker} &mdash; {product.name}</h3>
        </div>
        <div className="flex items-center gap-3">
          <RiskBadge level={product.riskLevel} />
          <div className="text-right">
            <p className="data-label">Sample price</p>
            <p className="data-value text-base">${product.samplePrice.toFixed(2)}</p>
          </div>
          {product.sampleExpenseRatio !== null && (
            <div className="text-right">
              <p className="data-label">Expense ratio</p>
              <p className="data-value text-base">
                {(product.sampleExpenseRatio * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>
      <SampleDataNotice />

      {product.optionData && <OptionDataTable data={product.optionData} />}

      <Section title="What are you actually buying?">{product.whatYoureBuying}</Section>
      <Section title="What gives this product value?">{product.whatGivesValue}</Section>
      <Section title="What can go wrong?">
        <ul className="list-disc space-y-1.5 pl-4">
          {product.whatCanGoWrong.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
      <Section title="Who might misunderstand this product?">
        <ul className="list-disc space-y-1.5 pl-4">
          {product.whoMisunderstands.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
      <div className="card border-navy-200 bg-navy-50 p-4 text-sm text-navy-600">
        <span className="font-medium text-navy-800">Return &amp; volatility note: </span>
        {product.returnVolatilityNote}
      </div>
    </div>
  );
}
