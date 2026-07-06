"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCTS, getProduct } from "@/lib/data/products";
import { FlowStep, ProductId } from "@/lib/types";
import { getOrCreateSessionId, resetSessionId, trackEvent } from "@/lib/track";
import ProgressSteps from "@/components/ProgressSteps";
import ProductSelectCard from "@/components/ProductSelectCard";
import Explainer from "@/components/Explainer";
import ComparisonView from "@/components/ComparisonView";
import ReadinessQuestionCard from "@/components/ReadinessQuestionCard";
import TradeConfirmation from "@/components/TradeConfirmation";
import SessionComplete from "@/components/SessionComplete";
import { TopDisclaimer, FooterDisclaimer } from "@/components/DisclaimerBanner";

export default function FlowPage() {
  const [sessionId, setSessionId] = useState("");
  const [step, setStep] = useState<FlowStep>("select_asset");
  const [productId, setProductId] = useState<ProductId | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const { id, isNew } = getOrCreateSessionId();
    setSessionId(id);
    if (isNew) {
      trackEvent({ sessionId: id, eventType: "session_started", step: "select_asset" });
    }
  }, []);

  useEffect(() => {
    if (!sessionId || !productId) return;
    if (step === "explainer") {
      trackEvent({ sessionId, eventType: "explainer_viewed", step, productId });
    }
    if (step === "comparison") {
      trackEvent({ sessionId, eventType: "comparison_viewed", step, productId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, sessionId, productId]);

  const product = productId ? getProduct(productId) : undefined;

  function handleSelectProduct(id: ProductId) {
    setProductId(id);
    trackEvent({ sessionId, eventType: "product_selected", step: "select_asset", productId: id });
    setStep("explainer");
  }

  function handleRestart() {
    const newId = resetSessionId();
    setSessionId(newId);
    setStep("select_asset");
    setProductId(null);
    setQuestionIndex(0);
    setMissedCount(0);
    trackEvent({ sessionId: newId, eventType: "session_started", step: "select_asset" });
  }

  return (
    <main className="min-h-screen bg-paper">
      <TopDisclaimer />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <ProgressSteps current={step} />
        </div>

        {step === "select_asset" && (
          <div>
            <h2 className="text-2xl">Pick a product to understand before you act</h2>
            <p className="mt-2 text-sm text-navy-600">
              Choose any of the three sample products below. Each one walks
              through a plain-English explainer, a comparison to adjacent
              alternatives, and a short readiness check before a simulated
              trade.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PRODUCTS.map((p) => (
                <ProductSelectCard key={p.id} product={p} onSelect={handleSelectProduct} />
              ))}
            </div>
          </div>
        )}

        {step === "explainer" && product && (
          <div className="space-y-6">
            <Explainer product={product} />
            <button className="btn-primary" onClick={() => setStep("comparison")}>
              Continue to comparison
            </button>
          </div>
        )}

        {step === "comparison" && product && (
          <div className="space-y-6">
            <ComparisonView comparison={product.comparison} />
            <button className="btn-primary" onClick={() => setStep("readiness_check")}>
              Continue to readiness check
            </button>
          </div>
        )}

        {step === "readiness_check" && product && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl">Let's make sure this is landing correctly</h2>
              <p className="mt-2 text-sm text-navy-600">
                Before continuing, let's make sure this product is being
                understood correctly. Two quick questions &mdash; there's no
                penalty for missing one, we'll just revisit it together.
              </p>
            </div>
            <ReadinessQuestionCard
              key={product.readinessQuestions[questionIndex].id}
              question={product.readinessQuestions[questionIndex]}
              index={questionIndex + 1}
              total={product.readinessQuestions.length}
              onAnswered={(correct, optionId) =>
                trackEvent({
                  sessionId,
                  eventType: "readiness_question_answered",
                  step: "readiness_check",
                  productId: product.id,
                  questionId: product.readinessQuestions[questionIndex].id,
                  correct,
                  metadata: { selectedOptionId: optionId },
                })
              }
              onAdaptiveShown={() => {
                setMissedCount((c) => c + 1);
                trackEvent({
                  sessionId,
                  eventType: "adaptive_explanation_shown",
                  step: "readiness_check",
                  productId: product.id,
                  questionId: product.readinessQuestions[questionIndex].id,
                });
              }}
              onProceedAfterExplanation={() =>
                trackEvent({
                  sessionId,
                  eventType: "user_proceeded_after_explanation",
                  step: "readiness_check",
                  productId: product.id,
                  questionId: product.readinessQuestions[questionIndex].id,
                })
              }
              onContinue={() => {
                if (questionIndex < product.readinessQuestions.length - 1) {
                  setQuestionIndex((i) => i + 1);
                } else {
                  setStep("trade_confirmation");
                }
              }}
            />
          </div>
        )}

        {step === "trade_confirmation" && product && (
          <TradeConfirmation
            product={product}
            onConfirm={() =>
              trackEvent({
                sessionId,
                eventType: "simulated_trade_confirmed",
                step: "trade_confirmation",
                productId: product.id,
              })
            }
            onContinue={() => {
              trackEvent({
                sessionId,
                eventType: "session_completed",
                step: "summary",
                productId: product.id,
                metadata: { missedCount },
              });
              setStep("summary");
            }}
          />
        )}

        {step === "summary" && product && (
          <SessionComplete product={product} missedCount={missedCount} onRestart={handleRestart} />
        )}
      </div>
      <FooterDisclaimer />
    </main>
  );
}
