"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// An illustrative reconstruction of TAFIA's play → reminder → answer → return loop.
// It mirrors the prototype screenshots; it is not the original system and stores nothing.

const SYMBOLS = [
  { glyph: "🎵", name: "music note" },
  { glyph: "🦋", name: "butterfly" },
  { glyph: "🌻", name: "sunflower" },
  { glyph: "🍎", name: "apple" },
  { glyph: "⭐", name: "star" },
  { glyph: "🐟", name: "fish" },
];

const REMINDER_AFTER_MOVES = 3;

type Card = { id: number; symbol: number; matched: boolean };

function shuffledDeck(): Card[] {
  const ids = [...SYMBOLS.keys(), ...SYMBOLS.keys()];
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.map((symbol, id) => ({ id, symbol, matched: false }));
}

const STEPS = [
  {
    title: "Gameplay",
    text: "A senior plays a simple memory game. In the prototype this was the reason to keep the site open.",
    shot: { src: "/images/tafia/gameplay.jpg", w: 800, h: 449, alt: "TAFIA prototype Memory Match game: a grid of face-down cards marked with question marks, two revealed cards showing a music note and a butterfly, and a move counter reading 20." },
  },
  {
    title: "Medication reminder",
    text: "At the scheduled time, a prompt appears over the activity and asks about a named medication.",
    shot: { src: "/images/tafia/reminder.jpg", w: 800, h: 421, alt: "TAFIA prototype reminder dialog over the dimmed game, asking 'Did you take your medication?' with the medication details blurred, and buttons 'Yes I have' and 'No I haven't'." },
  },
  {
    title: "Yes / no response",
    text: "One tap: yes or no. That answer was self-reported status for the caregiver, not proof the dose was taken.",
    shot: { src: "/images/tafia/reminder.jpg", w: 800, h: 421, alt: "The same TAFIA reminder dialog, highlighting the two large answer buttons 'Yes I have' and 'No I haven't'." },
  },
  {
    title: "Return to the activity",
    text: "The prompt closes and the game is right where it was left, so the reminder interrupts briefly instead of ending the session.",
    shot: { src: "/images/tafia/return.jpg", w: 800, h: 394, alt: "TAFIA prototype after the reminder: the Memory Match game shown again with a Back to Games button and the move counter at 23." },
  },
];

export function TafiaWalkthrough() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [step, setStep] = useState(0);
  const [reminderShown, setReminderShown] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [announce, setAnnounce] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);

  useEffect(() => setDeck(shuffledDeck()), []);

  const reset = useCallback(() => {
    setDeck(shuffledDeck());
    setFlipped([]);
    setMoves(0);
    setStep(0);
    setReminderShown(false);
    setAnswer(null);
    lockRef.current = false;
    setAnnounce("Walkthrough reset. New game.");
  }, []);

  const triggerReminder = useCallback(() => {
    setReminderShown(true);
    setStep(1);
    setAnnounce("A medication reminder appeared over the game.");
  }, []);

  useEffect(() => {
    if (reminderShown) dialogRef.current?.focus();
  }, [reminderShown]);

  const flip = (card: Card) => {
    if (lockRef.current || reminderShown || card.matched || flipped.includes(card.id)) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      lockRef.current = true;
      const [a, b] = next.map((id) => deck.find((c) => c.id === id)!);
      const newMoves = moves + 1;
      setMoves(newMoves);
      const isMatch = a.symbol === b.symbol;
      setAnnounce(isMatch ? `Match: ${SYMBOLS[a.symbol].name}.` : "Not a match.");
      window.setTimeout(() => {
        if (isMatch) setDeck((d) => d.map((c) => (c.id === a.id || c.id === b.id ? { ...c, matched: true } : c)));
        setFlipped([]);
        lockRef.current = false;
        if (step === 0 && newMoves >= REMINDER_AFTER_MOVES && !answer) triggerReminder();
      }, isMatch ? 450 : 900);
    }
  };

  const respond = (value: "yes" | "no") => {
    setAnswer(value);
    setStep(2);
    setAnnounce(value === "yes" ? "You answered yes." : "You answered no.");
  };

  const returnToGame = () => {
    setReminderShown(false);
    setStep(3);
    setAnnounce("Back to the game, right where you left it.");
    window.setTimeout(() => boardRef.current?.querySelector<HTMLButtonElement>("button:not([disabled])")?.focus(), 30);
  };

  const allMatched = deck.length > 0 && deck.every((c) => c.matched);
  const current = STEPS[step];

  return (
    <div className="tafia-demo">
      <div className="notice" role="note">
        <span className="notice-icon" aria-hidden="true">i</span>
        <span>
          <strong>Illustrative walkthrough.</strong> I rebuilt this loop from the prototype screenshots so you can feel the flow. It isn&rsquo;t the original
          system or a medical tool: there&rsquo;s no account, nothing is saved, and the medication is a placeholder.
        </span>
      </div>

      <div className="tafia-grid">
        <div className="tafia-device">
          <div className="tafia-screen">
            <div className="tafia-appbar">
              <span className="tafia-title">
                <span aria-hidden="true">🧠</span> Memory Match
              </span>
              <span className="tafia-moves">Moves: {moves}</span>
            </div>
            <div className="memory-board" ref={boardRef} inert={reminderShown} aria-label="Memory game board">
              {deck.map((card, i) => {
                const faceUp = card.matched || flipped.includes(card.id);
                const s = SYMBOLS[card.symbol];
                return (
                  <button
                    key={card.id}
                    type="button"
                    className="memory-card"
                    data-face={faceUp ? "up" : "down"}
                    data-matched={card.matched}
                    disabled={card.matched}
                    onClick={() => flip(card)}
                    aria-label={faceUp ? `Card ${i + 1}: ${s.name}${card.matched ? ", matched" : ""}` : `Card ${i + 1}, face down`}
                  >
                    <span aria-hidden="true">{faceUp ? s.glyph : "?"}</span>
                  </button>
                );
              })}
            </div>
            {allMatched ? <p className="tafia-done">All pairs matched. Nice!</p> : null}

            {reminderShown ? (
              <div className="tafia-overlay">
                <div className="tafia-dialog" role="dialog" aria-modal="false" aria-labelledby="tafia-q" tabIndex={-1} ref={dialogRef}>
                  <div className="tafia-pill" aria-hidden="true">💊</div>
                  {answer === null ? (
                    <>
                      <h3 id="tafia-q">Did you take your medication?</h3>
                      <p>
                        Did you take your <strong>evening medication</strong> (sample) at 6:00 PM?
                      </p>
                      <button type="button" className="tafia-yes" onClick={() => respond("yes")}>
                        Yes I have
                      </button>
                      <button type="button" className="tafia-no" onClick={() => respond("no")}>
                        No I haven&rsquo;t
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 id="tafia-q">{answer === "yes" ? "Thanks for letting us know." : "Okay, noted."}</h3>
                      <p className="tafia-small">
                        In the prototype, this tap became a self-reported status visible to the assigned caregiver. Here, it goes nowhere.
                      </p>
                      <button type="button" className="tafia-yes" onClick={returnToGame}>
                        Back to my game
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="demo-toolbar" style={{ marginTop: 14, marginBottom: 0 }}>
            <button type="button" className="btn btn--light btn--small" onClick={triggerReminder} disabled={reminderShown || step >= 1}>
              Skip ahead: show the reminder
            </button>
            <button type="button" className="btn btn--small" onClick={reset}>
              ↺ Reset
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {announce}
          </p>
        </div>

        <div className="tafia-side">
          <ol className="tafia-steps" aria-label="Walkthrough steps">
            {STEPS.map((s, i) => (
              <li key={s.title} data-state={i < step ? "done" : i === step ? "current" : "todo"} aria-current={i === step ? "step" : undefined}>
                <span className="tafia-step-num" aria-hidden="true">
                  {i < step ? "✓" : i + 1}
                </span>
                <span>
                  <strong>{s.title}</strong>
                  {i === step ? <span className="tafia-step-text">{s.text}</span> : null}
                </span>
              </li>
            ))}
          </ol>
          <figure className="tafia-shot">
            <div className="frame">
              <div className="frame-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>From the actual prototype · step {step + 1}</span>
              </div>
              <Image src={current.shot.src} alt={current.shot.alt} width={current.shot.w} height={current.shot.h} sizes="(max-width: 900px) 100vw, 480px" />
            </div>
            <figcaption>Real screenshot from our final presentation{step > 0 && step < 3 ? "; medication details blurred for privacy" : ""}.</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
