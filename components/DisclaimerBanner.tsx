export function TopDisclaimer() {
  return (
    <div className="border-b border-navy-100 bg-navy-950 px-4 py-2 text-center text-xs text-navy-100">
      Educational prototype only &mdash; not investment advice, not a real trading
      platform, no orders are placed, and not affiliated with JPMorgan Chase.
    </div>
  );
}

export function SampleDataNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`data-label ${className}`}>
      Illustrative sample data &middot; not live market data
    </p>
  );
}

export function FooterDisclaimer() {
  return (
    <footer className="border-t border-navy-100 bg-white px-4 py-6 text-xs text-navy-400">
      <div className="mx-auto max-w-4xl space-y-1">
        <p>Tradeparency is an educational prototype built as a portfolio piece.</p>
        <ul className="list-disc space-y-0.5 pl-4">
          <li>This is not investment advice and not a recommendation to buy or sell anything.</li>
          <li>This is not a real trading platform. No orders are ever placed and no money moves.</li>
          <li>Product data shown is illustrative or delayed sample data unless a real market data source is connected.</li>
          <li>Not affiliated with, endorsed by, or representing JPMorgan Chase &amp; Co. or any brokerage.</li>
        </ul>
      </div>
    </footer>
  );
}
