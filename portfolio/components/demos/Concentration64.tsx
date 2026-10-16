"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// A faithful port of the deployed Concentration 64 game (minigamelibrary/games/concentration-64).
// Same word lists, aliases, difficulty timings, validation messages and CPU behavior; restyled to
// live inside this page. Lists load from /public only when a category is chosen.

type Category = "animals" | "countries" | "names";
type LogType = "system" | "good" | "bad" | "info";
type Screen = "menu" | "game" | "over";

const CATEGORIES: { key: Category; emoji: string; label: string; file: string }[] = [
  { key: "animals", emoji: "🦁", label: "Animals", file: "/games/concentration-64/animals.txt" },
  { key: "countries", emoji: "🌍", label: "Countries", file: "/games/concentration-64/countries.txt" },
  { key: "names", emoji: "👤", label: "Names", file: "/games/concentration-64/names.txt" },
];

const DIFFICULTIES = [
  { label: "Easy", seconds: 30 },
  { label: "Medium", seconds: 15 },
  { label: "Hard", seconds: 5 },
];

// Copied verbatim from the original game.
const ALIASES: Record<string, string> = {
  usa: "united states",
  us: "united states",
  america: "united states",
  uk: "united kingdom",
  britain: "united kingdom",
  england: "united kingdom",
  uae: "united arab emirates",
  russia: "russian federation",
  "north korea": "korea north",
  "south korea": "korea south",
  burma: "myanmar, {burma}",
  trinidad: "trinidad & tobago",
};

const CPU_DELAY = 2500;
const FALLBACK_COUNTS: Record<Category, string> = { animals: "2,788 entries", countries: "196 entries", names: "about 108,000 entries" };

interface LogEntry {
  id: number;
  text: string;
  type: LogType;
}

const cache: Partial<Record<Category, string[]>> = {};

async function loadCategory(cat: Category): Promise<string[]> {
  if (cache[cat]) return cache[cat]!;
  const file = CATEGORIES.find((c) => c.key === cat)!.file;
  const res = await fetch(file);
  if (!res.ok) throw new Error(`Could not load ${cat}`);
  const text = await res.text();
  const items = text
    .split("\n")
    .map((l) => l.replace(/\r/g, "").trim())
    .filter((l) => l.length > 0);
  cache[cat] = items;
  return items;
}

export function Concentration64() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [timeLimit, setTimeLimit] = useState(15);
  const [category, setCategory] = useState<Category | null>(null);
  const [counts, setCounts] = useState<Partial<Record<Category, number>>>({});
  const [loading, setLoading] = useState<Category | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [log, setLog] = useState<LogEntry[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [usedCount, setUsedCount] = useState(0);
  const [remaining, setRemaining] = useState(15);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [shake, setShake] = useState(0);
  const [result, setResult] = useState<{ title: string; label: string; reason: string; tone: "win" | "lose" | "tie" } | null>(null);
  const [answer, setAnswer] = useState("");
  const [liveMsg, setLiveMsg] = useState("");

  const validMap = useRef<Map<string, string>>(new Map());
  const used = useRef<Set<string>>(new Set());
  const scores = useRef({ p: 0, c: 0 });
  const timer = useRef<number | null>(null);
  const cpuTimeout = useRef<number | null>(null);
  const gameOver = useRef(false);
  const logId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSecond = useRef<number>(-1);

  const addLog = useCallback((text: string, type: LogType = "system") => {
    logId.current += 1;
    const id = logId.current;
    setLog((l) => [...l, { id, text, type }].slice(-30));
    if (type !== "system") setLiveMsg(text);
  }, []);

  const clearTimers = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (cpuTimeout.current) window.clearTimeout(cpuTimeout.current);
    timer.current = null;
    cpuTimeout.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // Stop the clock if the visitor leaves the tab; a turn shouldn't be lost to a background tab.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden && screen === "game" && !gameOver.current) {
        clearTimers();
        gameOver.current = true;
        setInputEnabled(false);
        setThinking(false);
        setResult({ title: "PAUSED", label: "Game stopped", reason: "You switched tabs, so I stopped the game instead of letting the timer run out.", tone: "tie" });
        setScreen("over");
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [screen, clearTimers]);

  const endGame = useCallback(
    (reason: "timeout" | "empty") => {
      gameOver.current = true;
      clearTimers();
      setInputEnabled(false);
      setThinking(false);
      const { p, c } = scores.current;
      const title = p > c ? "YOU WIN" : p < c ? "CPU WINS" : "DRAW";
      const tone = p > c ? "win" : p < c ? "lose" : "tie";
      setResult(
        reason === "timeout"
          ? { title, tone, label: "Time ran out", reason: `You ran out of time. Final: ${p} vs ${c}.` }
          : { title, tone, label: "Category exhausted", reason: `All ${used.current.size} entries named! Final: ${p} vs ${c}.` },
      );
      window.setTimeout(() => setScreen("over"), 400);
    },
    [clearTimers],
  );

  const startTimer = useCallback(
    (limit: number) => {
      clearTimers();
      const start = Date.now();
      setRemaining(limit);
      lastSecond.current = limit;
      timer.current = window.setInterval(() => {
        const rem = Math.max(0, limit - (Date.now() - start) / 1000);
        setRemaining(rem);
        const sec = Math.ceil(rem);
        if (sec !== lastSecond.current && sec <= 3 && sec > 0) setLiveMsg(`${sec} seconds left`);
        lastSecond.current = sec;
        if (rem <= 0) {
          if (timer.current) window.clearInterval(timer.current);
          timer.current = null;
          if (!gameOver.current) {
            setInputEnabled(false);
            addLog("TIME IS UP!", "bad");
            endGame("timeout");
          }
        }
      }, 50);
    },
    [addLog, clearTimers, endGame],
  );

  const enableInput = useCallback(() => {
    setInputEnabled(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const startGame = useCallback(
    async (cat: Category) => {
      setLoadError(null);
      let items: string[];
      try {
        setLoading(cat);
        items = await loadCategory(cat);
        setCounts((c) => ({ ...c, [cat]: items.length }));
      } catch {
        setLoadError("That word list didn't load. Check your connection and try again.");
        setLoading(null);
        return;
      }
      setLoading(null);
      clearTimers();
      const map = new Map<string, string>();
      items.forEach((item) => map.set(item.toLowerCase(), item));
      validMap.current = map;
      used.current = new Set();
      scores.current = { p: 0, c: 0 };
      gameOver.current = false;
      setCategory(cat);
      setPlayerScore(0);
      setCpuScore(0);
      setUsedCount(0);
      setThinking(false);
      setAnswer("");
      setResult(null);
      setLog([]);
      setScreen("game");
      addLog(`Start naming ${cat}! You have ${timeLimit}s per turn.`, "system");
      enableInput();
      startTimer(timeLimit);
    },
    [addLog, clearTimers, enableInput, startTimer, timeLimit],
  );

  const cpuTurn = useCallback(() => {
    const remainingEntries = [...validMap.current.entries()].filter(([k]) => !used.current.has(k));
    if (remainingEntries.length === 0) {
      addLog("No more entries left!", "info");
      endGame("empty");
      return;
    }
    setThinking(true);
    cpuTimeout.current = window.setTimeout(() => {
      if (gameOver.current) return;
      setThinking(false);
      const [key, label] = remainingEntries[Math.floor(Math.random() * remainingEntries.length)];
      used.current.add(key);
      scores.current.c += 1;
      setCpuScore(scores.current.c);
      setUsedCount(used.current.size);
      addLog(`🤖 CPU: ${label}`, "info");
      enableInput();
      startTimer(timeLimit);
    }, CPU_DELAY);
  }, [addLog, enableInput, endGame, startTimer, timeLimit]);

  const submit = () => {
    if (!inputEnabled || gameOver.current) return;
    const raw = answer.trim();
    if (!raw) return;
    setAnswer("");
    let processed = raw.toLowerCase();
    if (ALIASES[processed]) processed = ALIASES[processed];
    if (!validMap.current.has(processed)) {
      addLog(`❌ "${raw}" is not valid.`, "bad");
      setShake((s) => s + 1);
      return;
    }
    if (used.current.has(processed)) {
      addLog(`❌ "${validMap.current.get(processed)}" was already used!`, "bad");
      setShake((s) => s + 1);
      return;
    }
    clearTimers();
    used.current.add(processed);
    scores.current.p += 1;
    setPlayerScore(scores.current.p);
    setUsedCount(used.current.size);
    addLog(`✅ ${validMap.current.get(processed)}`, "good");
    setInputEnabled(false);
    cpuTurn();
  };

  const goMenu = () => {
    clearTimers();
    gameOver.current = true;
    setInputEnabled(false);
    setThinking(false);
    setScreen("menu");
  };

  // Restart the shake animation on every rejected answer without losing focus.
  useEffect(() => {
    const el = inputRef.current;
    if (!shake || !el) return;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }, [shake]);

  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const pct = Math.max(0, Math.min(1, remaining / timeLimit));
  const low = pct < 0.35;
  const catInfo = CATEGORIES.find((c) => c.key === category);

  return (
    <div className="c64" aria-label="Concentration 64 game">
      <p className="sr-only" aria-live="polite">
        {liveMsg}
      </p>

      {screen === "menu" ? (
        <div>
          <div className="c64-logo">
            CONCENTRATION
            <span>name it before time runs out</span>
          </div>
          <span className="c64-label" id="c64-diff-label">
            Difficulty · seconds per turn
          </span>
          <div className="c64-diff" role="group" aria-labelledby="c64-diff-label">
            {DIFFICULTIES.map((d) => (
              <button key={d.label} type="button" aria-pressed={timeLimit === d.seconds} onClick={() => setTimeLimit(d.seconds)}>
                {d.label}
                <span>{d.seconds}s</span>
              </button>
            ))}
          </div>
          <span className="c64-label" id="c64-cat-label">
            Pick a category to start
          </span>
          <div className="c64-cats" role="group" aria-labelledby="c64-cat-label">
            {CATEGORIES.map((c) => (
              <button key={c.key} type="button" className="c64-cat" onClick={() => startGame(c.key)} disabled={loading !== null}>
                <span>
                  <span aria-hidden="true">{c.emoji}</span> {c.label}
                </span>
                <span className="count">
                  {loading === c.key ? "Loading list…" : counts[c.key] ? `${counts[c.key]!.toLocaleString()} entries` : FALLBACK_COUNTS[c.key]}
                </span>
              </button>
            ))}
          </div>
          {loadError ? (
            <p role="alert" style={{ color: "#ff9c86", marginTop: 12 }}>
              {loadError}
            </p>
          ) : null}
          <p style={{ color: "#b7b0d6", fontSize: "0.9rem", marginTop: 16, marginBottom: 0 }}>
            Type a valid answer before your timer runs out. The CPU answers back. Repeats don&rsquo;t count.
          </p>
        </div>
      ) : null}

      {screen === "game" ? (
        <div>
          <div className="c64-head">
            <span className="c64-tag">
              <span aria-hidden="true">{catInfo?.emoji}</span> {catInfo?.label}
            </span>
            <div className="c64-scores" aria-label={`Score: you ${playerScore}, CPU ${cpuScore}`}>
              <div className="c64-score you">
                <small>You</small>
                <b>{playerScore}</b>
              </div>
              <span aria-hidden="true">—</span>
              <div className="c64-score cpu">
                <small>CPU</small>
                <b>{cpuScore}</b>
              </div>
            </div>
          </div>
          <div className="c64-timer-wrap" aria-hidden="true">
            <div className={`c64-timer-bar ${low ? "low" : ""}`} style={{ transform: `scaleX(${inputEnabled ? pct : thinking ? 1 : pct})` }} />
          </div>
          <div className={`c64-countdown ${low && inputEnabled ? "low" : ""}`} aria-hidden="true">
            {inputEnabled ? Math.ceil(remaining) : thinking ? "…" : Math.ceil(remaining)}
          </div>
          <div className="c64-log" ref={logRef} role="log" aria-label="Game log" tabIndex={0}>
            {log.map((e) => (
              <div key={e.id} className={e.type}>
                {e.text}
              </div>
            ))}
          </div>
          <div className="c64-thinking" aria-hidden={!thinking}>
            {thinking ? "CPU thinking · · ·" : " "}
          </div>
          <form
            className="c64-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor="c64-answer" className="sr-only">
              Your answer
            </label>
            <input
              id="c64-answer"
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={inputEnabled ? "Type your answer and press Enter…" : "Wait for your turn…"}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              disabled={!inputEnabled}
            />
            <button type="submit" className="c64-go" disabled={!inputEnabled}>
              GO
            </button>
          </form>
          <div className="c64-row">
            <button type="button" className="c64-link" onClick={goMenu}>
              ← Menu
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#b7b0d6" }}>{usedCount} used</span>
          </div>
        </div>
      ) : null}

      {screen === "over" && result ? (
        <div className="c64-result" role="status">
          <span className="c64-label" style={{ margin: 0 }}>
            {result.label}
          </span>
          <p className={`big ${result.tone}`}>{result.title}</p>
          <div className="c64-final">
            <span>You {playerScore}</span>
            <span>CPU {cpuScore}</span>
          </div>
          <p style={{ color: "#d7d2ee" }}>{result.reason}</p>
          <div className="c64-actions">
            <button type="button" className="btn" onClick={() => category && startGame(category)}>
              Play again
            </button>
            <button type="button" className="btn btn--light" onClick={goMenu}>
              Change category
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
