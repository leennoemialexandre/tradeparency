"use client";

import { useState } from "react";

// The team's bottom-up chain, as presented in the Pinsionaries deck (slides 11–13).
// Moving any slider produces new illustrative arithmetic that was not part of the original project.

const BASE = { mau: 537, share: 25, conv: 1.5, aov: 50, leak: 50, take: 3 };
type Inputs = typeof BASE;

const FIELDS: { key: keyof Omit<Inputs, "mau">; label: string; min: number; max: number; step: number; fmt: (v: number) => string; note: string }[] = [
  { key: "share", label: "Share of users who actively shop", min: 5, max: 60, step: 1, fmt: (v) => `${v}%`, note: "Team assumption: 25% of MAUs" },
  { key: "conv", label: "Monthly conversion rate", min: 0.5, max: 5, step: 0.1, fmt: (v) => `${v.toFixed(1)}%`, note: "Team assumption: 1.5%" },
  { key: "aov", label: "Average order value", min: 20, max: 150, step: 5, fmt: (v) => `$${v}`, note: "Team assumption: $50" },
  { key: "leak", label: "Share of affiliate sales Pinterest recaptures", min: 10, max: 100, step: 5, fmt: (v) => `${v}%`, note: "Team assumption: the 50% leaking to Amazon/LTK (100% = full recapture)" },
  { key: "take", label: "Pinterest platform commission", min: 1, max: 6, step: 0.5, fmt: (v) => `${v}%`, note: "Team assumption: 3%" },
];

function money(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${Math.round(n).toLocaleString()}`;
}

export function PinterestModel() {
  const [v, setV] = useState<Inputs>(BASE);
  const isBase = (Object.keys(BASE) as (keyof Inputs)[]).every((k) => v[k] === BASE[k]);
  const isFull = v.leak === 100 && v.share === BASE.share && v.conv === BASE.conv && v.aov === BASE.aov && v.take === BASE.take;

  const shoppers = v.mau * 1e6 * (v.share / 100);
  const monthly = shoppers * (v.conv / 100) * v.aov;
  const annual = monthly * 12;
  const recaptured = annual * (v.leak / 100);
  const revenue = recaptured * (v.take / 100);

  return (
    <div>
      <div className="notice" role="note">
        <span className="notice-icon" aria-hidden="true">i</span>
        <span>
          <strong>Academic team proposal.</strong> The starting values are the assumptions from our deck, and 537M users was Pinterest&rsquo;s reported Q3 2024
          audience, not today&rsquo;s. Move a slider and you&rsquo;re doing <strong>new, illustrative arithmetic</strong> that wasn&rsquo;t part of the original
          project. Every output is modeled revenue, not actual revenue or profit.
        </span>
      </div>
      <div className="model">
        <form className="model-inputs" onSubmit={(e) => e.preventDefault()} aria-label="Model assumptions">
          <div className="range-field">
            <span style={{ fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
              Monthly active users <output>537M</output>
            </span>
            <span className="pin-mark">Fixed: Q3 2024 figure used by the team</span>
          </div>
          {FIELDS.map((f) => (
            <div className="range-field" key={f.key}>
              <label htmlFor={`pm-${f.key}`}>
                {f.label} <output htmlFor={`pm-${f.key}`}>{f.fmt(v[f.key])}</output>
              </label>
              <input
                id={`pm-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v[f.key]}
                onChange={(e) => setV((cur) => ({ ...cur, [f.key]: Number(e.target.value) }))}
              />
              <span className={`pin-mark ${v[f.key] !== BASE[f.key] ? "off" : ""}`}>
                📌 {f.note}
                {v[f.key] !== BASE[f.key] ? " · changed" : ""}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn btn--small" onClick={() => setV(BASE)} disabled={isBase}>
              ↺ Team base case
            </button>
            <button type="button" className="btn btn--small btn--light" onClick={() => setV({ ...BASE, leak: 100 })} disabled={isFull}>
              Team full-recapture case
            </button>
          </div>
        </form>

        <div aria-live="polite">
          <span className={`status-pill ${isBase || isFull ? "team" : "mine"}`}>
            {isBase ? "Team base case" : isFull ? "Team full-recapture scenario" : "Illustrative scenario · not from the project"}
          </span>
          <ol className="chain" aria-label="Revenue chain">
            <li>
              <span>
                Shopping-focused users<small>537M × {v.share}%</small>
              </span>
              <b>{(shoppers / 1e6).toFixed(2)}M</b>
            </li>
            <li>
              <span>
                Affiliate sales per month<small>users × {v.conv.toFixed(1)}% × ${v.aov}</small>
              </span>
              <b>{money(monthly)}</b>
            </li>
            <li>
              <span>
                Annual affiliate sales<small>× 12 months</small>
              </span>
              <b>{money(annual)}</b>
            </li>
            <li>
              <span>
                Sales Pinterest could recapture<small>× {v.leak}% recaptured</small>
              </span>
              <b>{money(recaptured)}</b>
            </li>
            <li>
              <span>
                Modeled annual platform revenue<small>× {v.take}% commission</small>
              </span>
              <b>{isBase ? "$18.15M" : isFull ? "$36.3M" : money(revenue)}</b>
            </li>
          </ol>
          {isBase || isFull ? (
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginTop: 12 }}>
              The deck rounds annual sales to $1.21B before applying the remaining steps, which gives {isBase ? "$605M and $18.15M" : "$36.3M"}. Unrounded, the
              same chain gives {money(revenue)}.
            </p>
          ) : (
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginTop: 12 }}>
              Notice how directly the result scales with each input. The harder question is whether they move independently: a higher commission might make
              creators less willing to join.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
