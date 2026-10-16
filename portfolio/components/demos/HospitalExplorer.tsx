"use client";

import Image from "next/image";
import { useState } from "react";

// All numbers, SQL, and charts come from the original project write-up (March 2026).
// Intermediate row counts per filter were not recorded, so none are shown.

const STEPS = [
  {
    title: "Join four tables",
    rule: "Hospitals, financials, utilization, and costs, joined on provider_ccn",
    sql: [
      ["kw", "FROM"], ["", " hospitals h\n"],
      ["kw", "JOIN"], ["", " financials f  "], ["kw", "ON"], ["", " h.provider_ccn = f.provider_ccn\n"],
      ["kw", "JOIN"], ["", " utilization u "], ["kw", "ON"], ["", " h.provider_ccn = u.provider_ccn\n"],
      ["kw", "JOIN"], ["", " costs c       "], ["kw", "ON"], ["", " h.provider_ccn = c.provider_ccn"],
    ],
    why: "The 2023 Medicare cost report arrived as one CSV. I normalized it in PostgreSQL into structural, financial, operational, and cost tables, then joined them back into one analytic dataset.",
    tradeoff: "A shared ID alone doesn't prove one-to-one joins; record grain and duplicates are worth auditing.",
  },
  {
    title: "Short-Term Hospitals only",
    rule: "Keep facility type STH",
    sql: [["kw", "WHERE"], ["", " h.ccn_facility_type = 'STH'"]],
    why: "Comparing every facility type as if they were interchangeable would muddy the comparison.",
    tradeoff: "Results describe short-term hospitals, not every hospital in the dataset.",
  },
  {
    title: "Revenue floor",
    rule: "Net patient revenue above $1 million",
    sql: [["kw", "AND"], ["", " net_patient_revenue > 1000000"]],
    why: "The first margin calculation produced values below −100,000,000%. I traced that to hospitals reporting net patient revenue of 1 or other tiny denominators.",
    tradeoff: "Very small institutions drop out of the sample.",
  },
  {
    title: "Valid denominators",
    rule: "No missing net income; positive costs and bed-days",
    sql: [
      ["kw", "AND"], ["", " f.net_income "], ["kw", "IS NOT NULL"], ["", "\n"],
      ["kw", "AND"], ["", " c.total_costs > 0\n"],
      ["kw", "AND"], ["", " u.total_bed_days_available > 0"],
    ],
    why: "Every ratio needs a real, positive denominator to mean anything.",
    tradeoff: "Records with incomplete reporting are excluded rather than imputed.",
  },
  {
    title: "Ratio between −1 and +1",
    rule: "Analyzed margin ratio within ±100%",
    sql: [["kw", "AND"], ["", " net_income / net_patient_revenue "], ["kw", "BETWEEN"], ["", " -1 "], ["kw", "AND"], ["", " 1"]],
    why: "Extreme outliers remained after the floor. Limiting the ratio to ±100% removed reporting irregularities while keeping real variation.",
    tradeoff: "Genuine extreme distress or windfalls could be excluded too.",
    result: true,
  },
];

const CHARTS = [
  {
    key: "dist",
    label: "Distribution",
    src: "/images/hospital/histogram.png",
    w: 1264,
    h: 892,
    alt: "Histogram titled Distribution of Hospital Operating Margin (STH only). Most of the 3,103 hospitals cluster between about −0.25 and +0.25, peaking just above zero, with thin tails toward −1 and +1.",
    caption:
      "After cleaning, most hospitals sit between −25% and +25%, peaking just above zero. The interquartile range runs from −3.3% to 13.0%; the median is 4.55% and the mean 4.3%.",
  },
  {
    key: "own",
    label: "By ownership",
    src: "/images/hospital/ownership.png",
    w: 1350,
    h: 894,
    alt: "Bar chart titled Average Operating Margin by Ownership Type, ownership types 1 through 13. Type 5 is highest at about 0.125, type 4 about 0.08, type 11 about 0.06; types 8 and 9 are negative at about −0.02; type 13 slightly negative.",
    caption:
      "Average ratio by ownership code. Proprietary partnerships (type 5, ~12%) and corporations (type 4, ~8%) lead; government hospital districts (type 11) are a notable public exception at ~6%; city-county and county governments (types 8 and 9) are negative. Associations only: public hospitals often carry safety-net roles that these ratios don't capture.",
  },
  {
    key: "resid",
    label: "Residuals",
    src: "/images/hospital/residuals.png",
    w: 1296,
    h: 920,
    alt: "Scatter plot titled Residual Plot – OLS, residuals against predicted margin. Points are centered on a zero line with no clear curve, but spread widely from about −1 to +1, with heavier spread at higher predicted values.",
    caption:
      "Residuals from the three-predictor model center on zero with no obvious curve, but they're heavy-tailed (kurtosis ≈ 8.7). That's why I tested Ridge regression as a stability check.",
  },
  {
    key: "pred",
    label: "Actual vs. predicted",
    src: "/images/hospital/actual-vs-predicted.png",
    w: 1438,
    h: 919,
    alt: "Scatter plot titled Actual vs Predicted Margin (Test Set – OLS) with a 45-degree reference line. Predictions bunch tightly between about −0.1 and +0.1 while actual values spread from −0.6 to +0.8.",
    caption:
      "On held-out data, predictions bunch in a narrow band while actual margins spread widely. The model picks up direction, not individual outcomes (test R² ≈ 0.059).",
  },
];

const CORR = [
  { name: "Occupancy rate", r: 0.197, color: "var(--cobalt)" },
  { name: "Labor cost ratio", r: -0.127, color: "var(--coral)" },
  { name: "Uncompensated care ratio", r: -0.133, color: "var(--butter)" },
];

export function HospitalExplorer() {
  const [step, setStep] = useState(0);
  const [chart, setChart] = useState("dist");
  const s = STEPS[step];
  const c = CHARTS.find((x) => x.key === chart)!;

  return (
    <div>
      <h3 className="display-m" style={{ fontSize: "1.6rem", marginBottom: 6 }}>
        1 · Clean the data before reading it
      </h3>
      <p style={{ color: "var(--ink-soft)", maxWidth: "60ch" }}>Step through the filters that turned raw cost reports into a comparable sample.</p>
      <div className="pipeline">
        <ol className="pipe-steps" aria-label="Cleaning steps">
          {STEPS.map((st, i) => (
            <li key={st.title}>
              <button type="button" aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
                <span className="n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{st.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="pipe-detail" aria-live="polite">
          <span className="kicker">
            Step {step + 1} of {STEPS.length}
          </span>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", margin: "6px 0 4px" }}>{s.rule}</h4>
          <pre aria-label="SQL">
            <code>
              {s.sql.map(([cls, txt], i) => (
                <span key={i} className={cls || undefined}>
                  {txt}
                </span>
              ))}
            </code>
          </pre>
          <p>
            <strong>Why:</strong> {s.why}
          </p>
          <p style={{ marginBottom: s.result ? 16 : 0 }}>
            <strong>Tradeoff:</strong> {s.tradeoff}
          </p>
          {s.result ? (
            <div className="callout" style={{ margin: 0 }}>
              <span className="callout-title">Final analytic sample</span>
              <p>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>3,103 hospitals</strong>
                <br />
                Ratio range −97.9% to 99.5% · mean 4.3% · median 4.55%
              </p>
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button type="button" className="btn btn--small btn--light" onClick={() => setStep((x) => Math.max(0, x - 1))} disabled={step === 0}>
              ← Previous
            </button>
            <button type="button" className="btn btn--small" onClick={() => setStep((x) => Math.min(STEPS.length - 1, x + 1))} disabled={step === STEPS.length - 1}>
              Next filter →
            </button>
          </div>
        </div>
      </div>

      <h3 className="display-m" style={{ fontSize: "1.6rem", margin: "48px 0 6px" }}>
        2 · How strong are the relationships?
      </h3>
      <p style={{ color: "var(--ink-soft)", maxWidth: "62ch" }}>
        Pearson correlations with the analyzed margin ratio, placed on the full −1 to +1 scale. All three sit close to zero: weak associations, not effects.
      </p>
      <div className="corr" role="img" aria-label="Correlation strip: occupancy rate +0.197, uncompensated care ratio −0.133, labor cost ratio −0.127, all near zero on a scale from −1 to +1.">
        <div className="corr-axis">
          {CORR.map((x) => (
            <span key={x.name} className="corr-dot" style={{ left: `${((x.r + 1) / 2) * 100}%`, background: x.color }} />
          ))}
        </div>
        <div className="corr-labels" aria-hidden="true">
          <span>−1 perfect negative</span>
          <span>0</span>
          <span>+1 perfect positive</span>
        </div>
      </div>
      <ul className="corr-key">
        {CORR.map((x) => (
          <li key={x.name}>
            <i style={{ background: x.color }} aria-hidden="true" />
            <span>
              {x.name}: <strong>r = {x.r > 0 ? "+" : "−"}{Math.abs(x.r).toFixed(3)}</strong>
            </span>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)", marginTop: 12 }}>
        r = +0.197 doesn&rsquo;t mean a 19.7% increase in margin. It describes how tightly two measures move together across hospitals, and here the answer is
        &ldquo;not very.&rdquo;
      </p>

      <h3 className="display-m" style={{ fontSize: "1.6rem", margin: "48px 0 6px" }}>
        3 · The actual outputs
      </h3>
      <p style={{ color: "var(--ink-soft)", maxWidth: "62ch" }}>Real charts from my notebook. The original paper labels the ratio &ldquo;operating margin.&rdquo;</p>
      <div className="chart-tabs" role="group" aria-label="Choose a chart">
        {CHARTS.map((x) => (
          <button key={x.key} type="button" className="chip" aria-pressed={chart === x.key} onClick={() => setChart(x.key)}>
            {x.label}
          </button>
        ))}
      </div>
      <figure className="chart-panel">
        <div className="frame">
          <div className="frame-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>Jupyter notebook output</span>
          </div>
          <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="(max-width: 900px) 100vw, 700px" style={{ background: "#fff" }} />
        </div>
        <figcaption style={{ fontSize: "1rem", lineHeight: 1.6 }}>{c.caption}</figcaption>
      </figure>
    </div>
  );
}
