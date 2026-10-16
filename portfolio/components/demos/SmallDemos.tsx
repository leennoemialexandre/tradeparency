"use client";

import { useState } from "react";

/* ---------------- Entry-Preneur: the hypothesis flip ---------------- */

const FLIPS = [
  { kicker: "The assumption", front: "Sales are soft. What did leadership want to try?", back: "More personalized sales outreach: better-tailored pitches to schools and families." },
  { kicker: "The evidence", front: "What did 50 customer interviews actually surface?", back: "People saw \"just another children's education book\" and had no reason yet to trust the brand. A trust gap, not only a pitch problem." },
  { kicker: "The decision", front: "So what did I recommend?", back: "Earn trust before asking for the sale: a content-first strategy and a blog that educates first. It shipped." },
];

export function HypothesisFlip() {
  const [open, setOpen] = useState<boolean[]>([false, false, false]);
  return (
    <div>
      <div className="flipper">
        {FLIPS.map((f, i) => (
          <button
            key={f.kicker}
            type="button"
            className="flip-card"
            aria-pressed={open[i]}
            onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))}
          >
            <span className="kicker">
              {i + 1} · {f.kicker}
            </span>
            <h3>{open[i] ? f.back : f.front}</h3>
            <span className="flip-hint" aria-hidden="true">
              {open[i] ? "↺ Flip back" : "Tap to reveal →"}
            </span>
          </button>
        ))}
      </div>
      <p style={{ marginTop: 14, color: "var(--ink-soft)", fontSize: "0.95rem" }}>
        <button type="button" className="btn btn--small btn--light" onClick={() => setOpen([true, true, true])}>
          Reveal all three
        </button>
      </p>
    </div>
  );
}

/* ---------------- Paramount: the balance ---------------- */

const LEVERS = [
  { id: "voices", label: "Bring in younger, fresh creative voices", side: 1 },
  { id: "original", label: "Develop more original storytelling", side: 1 },
  { id: "social", label: "Strengthen social media engagement", side: 1 },
  { id: "mentor", label: "Mentorship and knowledge transfer (my memo)", side: 1 },
  { id: "franchise", label: "Keep leaning on reboots and spinoffs", side: -1 },
];

export function ParamountBalance() {
  const [on, setOn] = useState<Record<string, boolean>>({ franchise: true });
  const tilt = LEVERS.reduce((s, l) => s + (on[l.id] ? l.side : 0), 0);
  const angle = Math.max(-9, Math.min(9, tilt * 3));
  return (
    <div className="balance">
      <p className="notice" role="note" style={{ marginBottom: 20 }}>
        <span className="notice-icon" aria-hidden="true">i</span>
        <span>
          <strong>An illustration of the tension, not a model.</strong> Nothing here is weighted by data; it shows which way each recommendation pulls.
        </span>
      </p>
      <div className="beam-wrap" aria-hidden="true">
        <div className="beam" style={{ transform: `rotate(${angle}deg)` }}>
          <span className="beam-pan left">Existing TV revenue base</span>
          <span className="beam-pan right">Future streaming audiences</span>
        </div>
        <span className="fulcrum" />
      </div>
      <p aria-live="polite" style={{ fontWeight: 600 }}>
        {tilt > 0
          ? "Leaning toward future streaming audiences, which is where our team's recommendations pushed."
          : tilt < 0
            ? "Leaning on the familiar: the existing approach we questioned."
            : "Balanced. Familiar IP and new bets, which is the framing I'd use in hindsight."}
      </p>
      <div className="rec-toggles" role="group" aria-label="Strategic levers">
        {LEVERS.map((l) => (
          <button key={l.id} type="button" className="chip" aria-pressed={!!on[l.id]} onClick={() => setOn((o) => ({ ...o, [l.id]: !o[l.id] }))}>
            {l.side > 0 ? "→ " : "← "}
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Loopify: the loop logic ---------------- */

type Mode = "single" | "playlist";

export function LoopifyLogic() {
  const [mode, setMode] = useState<Mode>("single");
  const [loopOn, setLoopOn] = useState(true);
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState(false);
  const [plays, setPlays] = useState(1);
  const [status, setStatus] = useState("▶ Playing");
  const [stopped, setStopped] = useState(false);
  const tracks = mode === "single" ? ["Sample video"] : ["Track 1", "Track 2", "Track 3"];

  const resetAll = (m: Mode = mode) => {
    setMode(m);
    setIndex(0);
    setBroken(false);
    setPlays(1);
    setStopped(false);
    setStatus("▶ Playing");
  };

  const playIndex = (i: number) => {
    if (mode === "playlist" && broken && i === 1) {
      setIndex(1);
      setStatus("Skipping unavailable track...");
      window.setTimeout(() => {
        setIndex(2);
        setStatus("▶ Playing Track 3");
      }, 700);
      return;
    }
    setIndex(i);
    setStatus(`▶ Playing ${tracks[i]}`);
  };

  // Mirrors onVideoEnded() and advanceToNext() in Loopify's index.html.
  const videoEnds = () => {
    if (stopped) return;
    if (mode === "playlist") {
      if (index < tracks.length - 1) playIndex(index + 1);
      else if (loopOn) playIndex(0);
      else {
        setStopped(true);
        setStatus("Playlist ended.");
      }
      return;
    }
    if (loopOn) {
      setPlays((p) => p + 1);
      setStatus("↻ seekTo(0) → playing again");
    } else {
      setStopped(true);
      setStatus("Ended.");
    }
  };

  return (
    <div className="loop-sim">
      <div className="loop-player" aria-label="Simulated Loopify player">
        <div className="loop-logo">
          LOOPIFY<small>simulation</small>
        </div>
        <div className="loop-track" aria-hidden="true">
          <i style={{ width: stopped ? "100%" : "45%" }} />
        </div>
        <p className="loop-status" aria-live="polite">
          {status}
          {mode === "single" && !stopped ? ` · play ${plays}` : ""}
        </p>
        <ul className="loop-queue">
          {tracks.map((t, i) => (
            <li key={t} data-current={i === index && !stopped} data-broken={mode === "playlist" && broken && i === 1}>
              <span>{t}</span>
              <span>{mode === "playlist" && broken && i === 1 ? "unavailable" : i === index && !stopped ? "now" : ""}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#8a8a8a", margin: "12px 0 0" }}>Loop: {loopOn ? "on" : "off"}</p>
      </div>
      <div>
        <div className="notice" role="note">
          <span className="notice-icon" aria-hidden="true">i</span>
          <span>
            <strong>A simulation of Loopify&rsquo;s rules, not the live tool.</strong> No video loads here. Each button triggers the same branch the real code takes. The real thing is linked at the top of this page.
          </span>
        </div>
        <div className="seg" role="group" aria-label="What you loaded" style={{ marginBottom: 14 }}>
          <button type="button" aria-pressed={mode === "single"} onClick={() => resetAll("single")}>
            One video
          </button>
          <button type="button" aria-pressed={mode === "playlist"} onClick={() => resetAll("playlist")}>
            A playlist
          </button>
        </div>
        <div className="loop-events">
          <button type="button" className="btn btn--accent" onClick={videoEnds} disabled={stopped}>
            ⏭ The current video reaches its end
          </button>
          <button type="button" className="btn btn--light" aria-pressed={loopOn} onClick={() => setLoopOn((v) => !v)}>
            ↻ Loop is {loopOn ? "on" : "off"} (toggle)
          </button>
          {mode === "playlist" ? (
            <button type="button" className="btn btn--light" aria-pressed={broken} onClick={() => setBroken((b) => !b)}>
              ⚠ Track 2 is {broken ? "unavailable" : "available"} (toggle)
            </button>
          ) : null}
          <button type="button" className="btn btn--small" onClick={() => resetAll()}>
            ↺ Reset
          </button>
        </div>
        <pre className="loop-code" aria-label="Excerpt from Loopify's source">
          <code>{`function onVideoEnded() {
  if (isPlaylist) { advanceToNext(); return; }
  if (loopOn) {
    player.seekTo(0, true);
    player.playVideo();
  } else {
    setPlaying(false, 'Ended.');
  }
}`}</code>
        </pre>
      </div>
    </div>
  );
}
