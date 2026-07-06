import { EventType, FlowStep, ProductId } from "@/lib/types";

interface TrackParams {
  sessionId: string;
  eventType: EventType;
  step?: FlowStep | null;
  productId?: ProductId | null;
  questionId?: string | null;
  correct?: boolean | null;
  metadata?: Record<string, unknown> | null;
}

export async function trackEvent(params: TrackParams): Promise<void> {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: params.sessionId,
        event_type: params.eventType,
        step: params.step ?? null,
        product_id: params.productId ?? null,
        question_id: params.questionId ?? null,
        correct: params.correct ?? null,
        metadata: params.metadata ?? null,
      }),
      keepalive: true,
    });
  } catch (err) {
    // Instrumentation should never break the user-facing flow.
    console.error("trackEvent failed", err);
  }
}

const SESSION_KEY = "tradeparency_session_id";

export function getOrCreateSessionId(): { id: string; isNew: boolean } {
  if (typeof window === "undefined") return { id: "", isNew: false };
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return { id: existing, isNew: false };
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, id);
  return { id, isNew: true };
}

export function resetSessionId(): string {
  const id = crypto.randomUUID();
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}
