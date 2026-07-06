import Link from "next/link";
import { Product } from "@/lib/types";

export default function SessionComplete({
  product,
  missedCount,
  onRestart,
}: {
  product: Product;
  missedCount: number;
  onRestart: () => void;
}) {
  return (
    <div className="card p-6">
      <p className="data-label">Walkthrough complete</p>
      <h3 className="mt-1 text-xl">
        You worked through {product.ticker} end to end
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-700">
        You saw what you'd actually be buying, how it compares to adjacent
        alternatives, and confirmed a simulated trade &mdash; not a real one.
        {missedCount > 0
          ? " You revisited one or more concepts along the way, which is exactly what this checkpoint is for."
          : " You answered both readiness checks correctly on the first try."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-navy-100 p-3">
          <p className="data-label">Product</p>
          <p className="data-value">{product.ticker}</p>
        </div>
        <div className="rounded-md border border-navy-100 p-3">
          <p className="data-label">Risk level</p>
          <p className="data-value">{product.riskLevel}</p>
        </div>
        <div className="rounded-md border border-navy-100 p-3">
          <p className="data-label">Concepts revisited</p>
          <p className="data-value">{missedCount}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={onRestart}>
          Try another product
        </button>
        <Link href="/admin" className="btn-secondary">
          View the PM dashboard
        </Link>
      </div>
    </div>
  );
}
