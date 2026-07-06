import Link from "next/link";
import { TopDisclaimer, FooterDisclaimer } from "@/components/DisclaimerBanner";

const PRINCIPLES = [
  {
    title: "What you're actually buying",
    body: "Every product starts with the plain-English mechanics — not the marketing.",
  },
  {
    title: "How it compares",
    body: "See the product next to its closest adjacent alternatives before deciding anything.",
  },
  {
    title: "A readiness check, not a gate",
    body: "Two short comprehension questions. Miss one and we revisit it together — you're never blocked.",
  },
  {
    title: "A simulated trade",
    body: "Practice confirming an order with a clear risk acknowledgement. No real money, ever.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper">
      <TopDisclaimer />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="data-label">Tradeparency</p>
        <h1 className="mt-2 text-4xl leading-tight">
          Understand what you're buying &mdash; before you buy it.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-700">
          Tradeparency is a readiness and education flow for complex investing
          products &mdash; spot Bitcoin ETFs, options contracts, and leveraged
          ETFs &mdash; built for self-directed investors who want to understand
          a product before they act on it, without losing their agency to do so.
        </p>

        <div className="mt-8 flex gap-3">
          <Link href="/flow" className="btn-primary">
            Start the guided walkthrough
          </Link>
          <Link href="/admin" className="btn-secondary">
            View the PM dashboard
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="card p-5">
              <h3 className="font-serif text-base text-navy-950">{p.title}</h3>
              <p className="mt-1.5 text-sm text-navy-600">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 card border-navy-200 bg-navy-50 p-5 text-sm text-navy-700">
          <p className="font-medium text-navy-900">A note on what this is.</p>
          <p className="mt-1.5">
            Tradeparency is a portfolio piece exploring product decisions around
            trust, friction, and comprehension in self-directed investing. It is
            not a real trading platform, not investment advice, and not
            affiliated with JPMorgan Chase. Every product, price, and option
            quote you'll see is illustrative sample data.
          </p>
        </div>
      </div>
      <FooterDisclaimer />
    </main>
  );
}
