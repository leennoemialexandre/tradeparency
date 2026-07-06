import { getAllEvents, activeBackend } from "@/lib/db";
import { computeAnalytics } from "@/lib/analytics";
import { getQuestionLabel, getProduct } from "@/lib/data/products";
import StatCard from "@/components/StatCard";
import { TopDisclaimer, FooterDisclaimer } from "@/components/DisclaimerBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export default async function AdminPage() {
  const events = await getAllEvents();
  const analytics = computeAnalytics(events);
  const backend = activeBackend();

  return (
    <main className="min-h-screen bg-paper">
      <TopDisclaimer />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="data-label">Tradeparency</p>
            <h1 className="mt-1 text-3xl">PM Dashboard</h1>
            <p className="mt-1 text-sm text-navy-600">
              Real-time aggregation of every logged step through the readiness
              flow. This reflects actual instrumented events, not mock numbers.
            </p>
          </div>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-wide text-navy-500">
            storage: {backend}
          </span>
        </div>

        {analytics.totalSessions === 0 ? (
          <div className="card mt-8 p-6 text-sm text-navy-600">
            No sessions logged yet.{" "}
            <a href="/flow" className="text-accent underline">
              Run the guided flow
            </a>{" "}
            once to see this dashboard populate in real time.
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard label="Total sessions" value={String(analytics.totalSessions)} />
              <StatCard
                label="Session completion rate"
                value={pct(analytics.completionRate)}
                helpText={`${analytics.completedSessions} of ${analytics.totalSessions} sessions reached the summary`}
              />
              <StatCard
                label="First-try pass rate"
                value={pct(analytics.firstTryPassRate)}
                helpText="Share of readiness answers correct on the first try"
              />
              <StatCard
                label="Needed adaptive explanation"
                value={pct(analytics.pctNeededAdaptiveExplanation)}
                helpText="Of sessions that reached the readiness check"
              />
              <StatCard
                label="Proceeded after missing"
                value={pct(analytics.pctProceededAfterMissing)}
                helpText="Of sessions shown the adaptive explanation"
              />
              <StatCard label="Total logged events" value={String(analytics.totalEvents)} />
            </div>

            <section className="mt-10">
              <h2 className="text-xl">Drop-off by step</h2>
              <p className="mt-1 text-sm text-navy-600">
                Distinct sessions reaching each step of the flow, and the
                drop-off relative to the previous step.
              </p>
              <div className="card mt-4 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy-50 text-navy-500">
                    <tr>
                      <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Step</th>
                      <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Sessions</th>
                      <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Drop-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.funnel.map((f) => (
                      <tr key={f.step} className="border-t border-navy-50">
                        <td className="px-4 py-2.5 text-navy-800">{f.label}</td>
                        <td className="px-4 py-2.5 font-mono">{f.sessions}</td>
                        <td className="px-4 py-2.5 font-mono">
                          {f.dropOffFromPrevious === null ? "—" : pct(f.dropOffFromPrevious)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl">Most missed readiness questions</h2>
              <p className="mt-1 text-sm text-navy-600">
                Where comprehension breaks down first — the highest-signal
                place to improve an explainer.
              </p>
              <div className="card mt-4 overflow-hidden">
                {analytics.missedQuestions.length === 0 ? (
                  <p className="p-4 text-sm text-navy-500">No readiness questions answered yet.</p>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead className="bg-navy-50 text-navy-500">
                      <tr>
                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Question</th>
                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Shown</th>
                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Missed</th>
                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide">Miss rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.missedQuestions.map((q) => (
                        <tr key={q.questionId} className="border-t border-navy-50">
                          <td className="px-4 py-2.5 text-navy-800">{getQuestionLabel(q.questionId)}</td>
                          <td className="px-4 py-2.5 font-mono">{q.timesShown}</td>
                          <td className="px-4 py-2.5 font-mono">{q.timesMissed}</td>
                          <td className="px-4 py-2.5 font-mono">{pct(q.missRate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            <section className="mt-10 mb-4">
              <h2 className="text-xl">Selected product breakdown</h2>
              <p className="mt-1 text-sm text-navy-600">
                Which sample products users choose to learn about first.
              </p>
              <div className="card mt-4 divide-y divide-navy-50">
                {analytics.productBreakdown.length === 0 ? (
                  <p className="p-4 text-sm text-navy-500">No products selected yet.</p>
                ) : (
                  analytics.productBreakdown.map((p) => {
                    const product = getProduct(p.productId);
                    return (
                      <div key={p.productId} className="flex items-center gap-4 px-4 py-3">
                        <span className="w-28 shrink-0 font-mono text-sm text-navy-800">
                          {product?.ticker ?? p.productId}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-50">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${Math.max(2, p.share * 100)}%` }}
                          />
                        </div>
                        <span className="w-20 shrink-0 text-right font-mono text-sm text-navy-600">
                          {p.count} &middot; {pct(p.share)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </>
        )}
      </div>
      <FooterDisclaimer />
    </main>
  );
}
