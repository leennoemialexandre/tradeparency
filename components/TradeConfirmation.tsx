"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

export default function TradeConfirmation({
  product,
  onConfirm,
  onContinue,
}: {
  product: Product;
  onConfirm: () => void;
  onContinue: () => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const isOption = product.id === "AAPL_CALL";
  const unitLabel = isOption ? "contract" : "shares";
  const quantity = 1;
  const estimatedCost = isOption
    ? product.samplePrice * (product.optionData?.contractMultiplier ?? 100) * quantity
    : product.samplePrice * quantity;

  function handleConfirm() {
    setConfirmed(true);
    onConfirm();
  }

  return (
    <div className="card p-6">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-950 px-3 py-1 text-xs font-mono uppercase tracking-wide text-white">
        Simulated trade &middot; no real money &middot; no brokerage connection
      </div>

      <h3 className="text-xl">Review your simulated order</h3>
      <p className="mt-1 text-sm text-navy-600">
        This is a practice ticket so you can see what confirming a trade would
        feel like. Nothing here is sent to a broker or exchange.
      </p>

      <div className="mt-4 divide-y divide-navy-50 rounded-md border border-navy-100">
        <div className="flex justify-between px-4 py-2.5">
          <span className="data-label">Instrument</span>
          <span className="data-value">{product.ticker}</span>
        </div>
        <div className="flex justify-between px-4 py-2.5">
          <span className="data-label">Action</span>
          <span className="data-value">Buy to open</span>
        </div>
        <div className="flex justify-between px-4 py-2.5">
          <span className="data-label">Quantity</span>
          <span className="data-value">
            {quantity} {unitLabel}
          </span>
        </div>
        <div className="flex justify-between px-4 py-2.5">
          <span className="data-label">Sample price</span>
          <span className="data-value">${product.samplePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between px-4 py-2.5">
          <span className="data-label">Estimated cost</span>
          <span className="data-value">${estimatedCost.toFixed(2)}</span>
        </div>
      </div>

      {!confirmed ? (
        <div className="mt-5 space-y-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-navy-100 p-4 text-sm text-navy-700">
            <input
              type="checkbox"
              className="mt-0.5 accent-[#1C4E9C]"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span>
              I understand this product carries a <strong>{product.riskLevel.toLowerCase()}</strong> risk
              level, this is a simulated order only, no real money will move, and
              this is not a recommendation to buy or sell anything.
            </span>
          </label>
          <button className="btn-primary" disabled={!acknowledged} onClick={handleConfirm}>
            Confirm simulated trade
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="rounded-md border border-navy-200 bg-navy-50 p-4 text-sm text-navy-800">
            <p className="font-medium">Simulated order confirmed.</p>
            <p className="mt-1 text-navy-600">
              No real order was placed. This confirmation exists only to complete
              the educational walkthrough.
            </p>
          </div>
          <button className="btn-primary" onClick={onContinue}>
            Continue to summary
          </button>
        </div>
      )}
    </div>
  );
}
