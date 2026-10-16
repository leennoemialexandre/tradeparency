"use client";

import { useId, useRef, useState } from "react";
import type { Decision } from "@/lib/story";
import { Rich } from "./Rich";

/**
 * Sticker buttons that open decision stories in place. Nothing is gated: every
 * decision is also covered in the full story below.
 */
export function DecisionNotes({ decisions, heading }: { decisions: Decision[]; heading?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const tokenRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const open = decisions.find((d) => d.id === openId) ?? null;

  const close = () => {
    const id = openId;
    setOpenId(null);
    if (id) tokenRefs.current[id]?.focus();
  };

  return (
    <div className="decisions">
      {heading ? (
        <p className="kicker" style={{ marginBottom: 12 }}>
          {heading}
        </p>
      ) : null}
      <div className="decision-tokens">
        {decisions.map((d) => (
          <button
            key={d.id}
            ref={(el) => {
              tokenRefs.current[d.id] = el;
            }}
            type="button"
            className="token"
            aria-expanded={openId === d.id}
            aria-controls={`${baseId}-panel`}
            onClick={() => setOpenId((cur) => (cur === d.id ? null : d.id))}
          >
            <span className="token-icon" aria-hidden="true">
              {d.icon ?? "✦"}
            </span>
            <span>
              <small>{d.prompt}</small>
              {d.label}
            </span>
          </button>
        ))}
      </div>
      <div id={`${baseId}-panel`} aria-live="polite">
        {open ? (
          <div
            className="note-card"
            role="region"
            aria-label={open.title}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
          >
            <button type="button" className="btn btn--light btn--small note-close" onClick={close}>
              Close<span className="sr-only"> decision story</span>
            </button>
            <span className="kicker">{open.prompt}</span>
            <h3>{open.title}</h3>
            {open.body ? (
              <div className="note-body">
                {open.body.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            ) : null}
            {open.cells ? (
              <dl className="note-grid">
                {open.cells.map((c) => (
                  <div className="note-cell" key={c.term}>
                    <dt>{c.term}</dt>
                    <dd>
                      <Rich text={c.detail} />
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {open.more ? (
              <p className="note-more">
                <a href={open.more.href}>{open.more.label} ↓</a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
