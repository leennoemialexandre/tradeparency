"use client";

import { useState } from "react";
import { ReadinessQuestion } from "@/lib/types";

type Phase = "answering" | "correct" | "revisit";

export default function ReadinessQuestionCard({
  question,
  index,
  total,
  onAnswered,
  onAdaptiveShown,
  onProceedAfterExplanation,
  onContinue,
}: {
  question: ReadinessQuestion;
  index: number;
  total: number;
  onAnswered: (correct: boolean, optionId: string) => void;
  onAdaptiveShown: () => void;
  onProceedAfterExplanation: () => void;
  onContinue: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("answering");

  function submit() {
    if (!selected) return;
    const correct = selected === question.correctOptionId;
    onAnswered(correct, selected);
    if (correct) {
      setPhase("correct");
    } else {
      setPhase("revisit");
      onAdaptiveShown();
    }
  }

  function handleContinue() {
    if (phase === "revisit") {
      onProceedAfterExplanation();
    }
    onContinue();
  }

  return (
    <div className="card p-6">
      <p className="data-label">
        Readiness check &middot; {index} of {total}
      </p>
      <p className="mt-2 text-base text-navy-900">{question.prompt}</p>

      {phase === "answering" && (
        <div className="mt-4 space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
                selected === opt.id
                  ? "border-accent bg-accent-light"
                  : "border-navy-100 hover:border-navy-200"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                className="accent-[#1C4E9C]"
                checked={selected === opt.id}
                onChange={() => setSelected(opt.id)}
              />
              {opt.label}
            </label>
          ))}
          <button
            className="btn-primary mt-2"
            disabled={!selected}
            onClick={submit}
          >
            Check my understanding
          </button>
        </div>
      )}

      {phase === "correct" && (
        <div className="mt-4 space-y-4">
          <div className="rounded-md border border-navy-200 bg-navy-50 p-4 text-sm text-navy-700">
            <p className="mb-1 font-medium text-navy-900">That matches how this product works.</p>
            {question.explanationCorrect}
          </div>
          <button className="btn-primary" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}

      {phase === "revisit" && (
        <div className="mt-4 space-y-4">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-navy-700">
            <p className="mb-1 font-medium text-navy-900">{question.revisit.heading}</p>
            {question.revisit.body}
          </div>
          <button className="btn-primary" onClick={handleContinue}>
            Got it &mdash; continue
          </button>
        </div>
      )}
    </div>
  );
}
