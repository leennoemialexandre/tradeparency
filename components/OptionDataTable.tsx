import { OptionContractData } from "@/lib/types";
import { SampleDataNotice } from "@/components/DisclaimerBanner";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-navy-50 py-2 last:border-0">
      <span className="data-label">{label}</span>
      <span className="data-value">{value}</span>
    </div>
  );
}

export default function OptionDataTable({ data }: { data: OptionContractData }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-serif text-base text-navy-950">Sample contract terms</h4>
        <SampleDataNotice />
      </div>
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <div>
          <Row label="Underlying" value={data.underlying} />
          <Row label="Underlying price" value={`$${data.underlyingPrice.toFixed(2)}`} />
          <Row label="Strike" value={`$${data.strike.toFixed(2)}`} />
          <Row label="Expiration" value={data.expiration} />
        </div>
        <div>
          <Row label="Bid / Ask" value={`$${data.bid.toFixed(2)} / $${data.ask.toFixed(2)}`} />
          <Row label="Implied volatility" value={`${(data.impliedVolatility * 100).toFixed(1)}%`} />
          <Row label="Delta" value={data.delta.toFixed(2)} />
          <Row label="Theta" value={data.theta.toFixed(3)} />
        </div>
      </div>
      <Row label="Open interest" value={data.openInterest.toLocaleString()} />
      <p className="mt-3 text-xs text-navy-400">
        Sample option data for prototype purposes only. Real option chains change
        continuously during market hours and vary by broker feed.
      </p>
    </div>
  );
}
