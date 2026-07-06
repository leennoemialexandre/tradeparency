import { Product } from "@/lib/types";
import RiskBadge from "@/components/RiskBadge";

function formatPrice(product: Product) {
  if (product.id === "AAPL_CALL") return `$${product.samplePrice.toFixed(2)} premium`;
  return `$${product.samplePrice.toFixed(2)}`;
}

export default function ProductSelectCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (id: Product["id"]) => void;
}) {
  return (
    <button
      onClick={() => onSelect(product.id)}
      className="card group flex h-full flex-col gap-3 p-5 text-left transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="data-label">{product.productType}</p>
          <h3 className="mt-0.5 text-lg font-semibold text-navy-950">{product.ticker}</h3>
        </div>
        <RiskBadge level={product.riskLevel} />
      </div>
      <p className="text-sm text-navy-600">{product.name}</p>
      <div className="mt-auto flex items-center justify-between border-t border-navy-100 pt-3">
        <span className="data-value">{formatPrice(product)}</span>
        <span className="text-sm font-medium text-accent group-hover:text-accent-hover">
          Explore &rarr;
        </span>
      </div>
    </button>
  );
}
