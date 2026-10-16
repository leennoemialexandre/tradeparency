"use client";

import { useMemo, useRef, useState } from "react";

// A sample workspace rebuilt from the Jobaholic source (pages/index.js and pages/prep/[id].js):
// same seven stages and colors, same deadline thresholds, same dashboard formulas, same STAR
// prep and mock mode. Every record below is synthetic. Nothing is saved or sent anywhere.

const STAGES = ["Saved", "Applied", "HireVue", "Phone Screen", "Interview", "Offer", "Rejected"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_COLORS: Record<Stage, { accent: string; bg: string; text: string }> = {
  Saved: { accent: "#94a3b8", bg: "#f1f5f9", text: "#475569" },
  Applied: { accent: "#3b82f6", bg: "#eff6ff", text: "#1d4ed8" },
  HireVue: { accent: "#8b5cf6", bg: "#f5f3ff", text: "#6d28d9" },
  "Phone Screen": { accent: "#f59e0b", bg: "#fffbeb", text: "#92400e" },
  Interview: { accent: "#0891b2", bg: "#ecfeff", text: "#0e7490" },
  Offer: { accent: "#10b981", bg: "#ecfdf5", text: "#047857" },
  Rejected: { accent: "#ef4444", bg: "#fef2f2", text: "#b91c1c" },
};

type QType = "Behavioral" | "Technical" | "Case" | "Culture";
const TYPE_COLORS: Record<QType, { color: string; bg: string; border: string }> = {
  Behavioral: { color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  Technical: { color: "#6d28d9", bg: "#f5f3ff", border: "#ddd6fe" },
  Case: { color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
  Culture: { color: "#047857", bg: "#ecfdf5", border: "#a7f3d0" },
};

interface Question {
  id: string;
  question: string;
  type: QType;
  answer?: string;
  star?: { s: string; t: string; a: string; r: string };
}
interface Round {
  id: string;
  name: string;
  dateOffset?: number;
  interviewer?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  questions: Question[];
}
interface Prep {
  notes: string;
  links: string[];
  rounds: Round[];
}
interface App {
  id: string;
  company: string;
  role: string;
  status: Stage;
  industry: string;
  jobType: string;
  workType: string;
  location: string;
  addedOffset: number; // days relative to today (negative = past)
  deadlineOffset?: number;
  prep?: Prep;
}

function dayString(offset: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Same thresholds as Jobaholic's deadlineStatus().
function deadlineStatus(diff: number | undefined) {
  if (diff === undefined) return null;
  if (diff < 0) return { label: "Expired", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" };
  if (diff === 0) return { label: "Due today!", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" };
  if (diff <= 3) return { label: `${diff}d left`, color: "#92400e", bg: "#fffbeb", border: "#fde68a" };
  if (diff <= 7) return { label: `${diff}d left`, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" };
  return null;
}

const SAMPLE: App[] = [
  {
    id: "a1", company: "Lanternworks Studio", role: "Associate Product Manager", status: "Interview", industry: "Media", jobType: "Full-time", workType: "Hybrid", location: "Los Angeles, CA", addedOffset: -9,
    prep: {
      notes: "Sample notes: small team building interactive guides for live venues. Read their latest launch post before the product-sense round.",
      links: ["Company blog (sample)", "Product walkthrough video (sample)"],
      rounds: [
        {
          id: "r1", name: "Recruiter screen", status: "Completed", interviewer: "Sample Recruiter",
          questions: [
            { id: "q1", type: "Culture", question: "Why this studio?", answer: "Sample answer: their guides are built around what visitors do on site, and that is the kind of problem I want to work on." },
          ],
        },
        {
          id: "r2", name: "Product sense", status: "Upcoming", dateOffset: 3, interviewer: "Sample PM, Senior Product Manager",
          questions: [
            {
              id: "q2", type: "Behavioral", question: "Tell me about a time user feedback changed your plan.",
              star: {
                s: "Sample: a class team's study-planner prototype lost most testers after the first week.",
                t: "Sample: figure out why and decide what to change before the final demo.",
                a: "Sample: interviewed five testers, found the setup took too long, cut it to one screen.",
                r: "Sample: more testers finished setup in the second round. (Synthetic STAR example.)",
              },
            },
            { id: "q3", type: "Case", question: "How would you improve onboarding for a venue's mobile guide?", answer: "Sample notes: clarify who the first-time visitor is, find the step where they drop, test one change at a time." },
            { id: "q4", type: "Technical", question: "How would you know whether a new feature is working?", answer: "Sample notes: define the behavior it should change, pick a metric tied to that behavior, and decide the comparison before launch." },
          ],
        },
      ],
    },
  },
  { id: "a2", company: "Brightloom Learning", role: "Product Analyst", status: "Phone Screen", industry: "Education", jobType: "Full-time", workType: "Remote", location: "Chicago, IL", addedOffset: -5,
    prep: { notes: "Sample: ed-tech company, ask about how they measure learning outcomes.", links: [], rounds: [{ id: "r3", name: "Phone screen", status: "Upcoming", dateOffset: 1, questions: [{ id: "q5", type: "Behavioral", question: "Walk me through a project you led.", answer: "Sample notes: pick one with a clear decision and a clear result." }] }] } },
  { id: "a3", company: "Orbit & Oak", role: "Product Operations Associate", status: "Applied", industry: "Retail", jobType: "Full-time", workType: "On-site", location: "New York, NY", addedOffset: -2, deadlineOffset: 2 },
  { id: "a4", company: "Kettle Health", role: "APM, Care Experience", status: "Saved", industry: "Healthcare", jobType: "Full-time", workType: "Hybrid", location: "Boston, MA", addedOffset: -1, deadlineOffset: 0 },
  { id: "a5", company: "Northpaw Games", role: "Associate Producer", status: "HireVue", industry: "Technology", jobType: "Full-time", workType: "Hybrid", location: "Seattle, WA", addedOffset: -3 },
  { id: "a6", company: "Meridian Transit Lab", role: "Strategy Analyst", status: "Saved", industry: "Government", jobType: "Full-time", workType: "On-site", location: "Newark, NJ", addedOffset: 0, deadlineOffset: 6 },
  { id: "a7", company: "Pebble Finance", role: "Business Analyst", status: "Rejected", industry: "Finance", jobType: "Full-time", workType: "Remote", location: "Jersey City, NJ", addedOffset: -12 },
  { id: "a8", company: "Tidepool Media", role: "Product Intern", status: "Applied", industry: "Media", jobType: "Internship", workType: "Remote", location: "Orlando, FL", addedOffset: 0, deadlineOffset: -1 },
  { id: "a9", company: "Cobalt Commons", role: "Associate Product Manager", status: "Offer", industry: "Non-profit", jobType: "Full-time", workType: "Hybrid", location: "Philadelphia, PA", addedOffset: -13 },
  { id: "a10", company: "Sundial Retail Co.", role: "Product Associate", status: "Applied", industry: "Retail", jobType: "Full-time", workType: "On-site", location: "Atlanta, GA", addedOffset: -1 },
  { id: "a11", company: "Fernway Consulting", role: "Business Analyst", status: "Saved", industry: "Consulting", jobType: "Full-time", workType: "Hybrid", location: "Washington, DC", addedOffset: -4, deadlineOffset: 10 },
];

type Tab = "tracker" | "dashboard" | "deadlines";

export function JobaholicSandbox() {
  const [apps, setApps] = useState<App[]>(SAMPLE);
  const [tab, setTab] = useState<Tab>("tracker");
  const [view, setView] = useState<"board" | "list">("board");
  const [filterStage, setFilterStage] = useState<"All" | Stage>("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [prepFor, setPrepFor] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setApps(SAMPLE);
    setTab("tracker");
    setView("board");
    setFilterStage("All");
    setSearch("");
    setSelectedId(null);
    setPrepFor(null);
    setAnnounce("Sample workspace reset.");
  };

  const filtered = apps.filter((a) => {
    const ms = filterStage === "All" || a.status === filterStage;
    const q = search.trim().toLowerCase();
    const mq = !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
    return ms && mq;
  });

  const selected = apps.find((a) => a.id === selectedId) ?? null;
  const prepApp = apps.find((a) => a.id === prepFor) ?? null;

  const open = (id: string) => {
    setSelectedId(id);
    setPrepFor(null);
    window.setTimeout(() => detailRef.current?.focus(), 20);
  };

  const move = (id: string, status: Stage) => {
    setApps((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
    const a = apps.find((x) => x.id === id);
    setAnnounce(`${a?.company} moved to ${status}.`);
  };

  return (
    <div>
      <div className="notice" role="note">
        <span className="notice-icon" aria-hidden="true">i</span>
        <span>
          <strong>Sample workspace with synthetic data.</strong> Rebuilt from the Jobaholic source so you can try it without an account. Stages, deadline rules,
          formulas, and prep behavior follow the original code; every company and answer is invented. Nothing you do here is saved.
        </span>
      </div>
      <div className="jh">
        <div className="jh-top">
          <span className="jh-logo">
            Job<span>aholic</span>
          </span>
          <span style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span className="jh-sample">Sample data</span>
            <button type="button" className="btn btn--small btn--light" onClick={reset}>
              ↺ Reset
            </button>
          </span>
        </div>
        <div className="jh-tabs" role="tablist" aria-label="Workspace sections">
          {(
            [
              ["tracker", "Tracker"],
              ["dashboard", "Dashboard"],
              ["deadlines", "Deadline rules"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`jh-tab-${key}`}
              aria-selected={tab === key}
              aria-controls={`jh-panel-${key}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>

        {tab === "tracker" ? (
          <div className="jh-body" role="tabpanel" id="jh-panel-tracker" aria-labelledby="jh-tab-tracker">
            {prepApp ? (
              <PrepView app={prepApp} onBack={() => setPrepFor(null)} />
            ) : (
              <>
                <div className="jh-controls">
                  <div className="seg" role="group" aria-label="View">
                    <button type="button" aria-pressed={view === "board"} onClick={() => setView("board")}>
                      ▦ Board
                    </button>
                    <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
                      ☰ List
                    </button>
                  </div>
                  <label className="sr-only" htmlFor="jh-stage">
                    Filter by stage
                  </label>
                  <select id="jh-stage" value={filterStage} onChange={(e) => setFilterStage(e.target.value as Stage | "All")}>
                    <option value="All">All stages</option>
                    {STAGES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <label className="sr-only" htmlFor="jh-search">
                    Search company or role
                  </label>
                  <input id="jh-search" type="search" placeholder="Search company or role…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {view === "board" ? (
                  <div className="jh-board" aria-label="Kanban board">
                    {STAGES.map((s) => {
                      const items = filtered.filter((a) => a.status === s);
                      const c = STAGE_COLORS[s];
                      return (
                        <section key={s} className="jh-col" style={{ ["--col" as string]: c.accent, ["--col-text" as string]: c.text }} aria-label={`${s}, ${items.length}`}>
                          <h3>
                            <span>{s}</span>
                            <span>{items.length}</span>
                          </h3>
                          {items.map((a) => {
                            const dl = deadlineStatus(a.deadlineOffset);
                            return (
                              <button key={a.id} type="button" className="jh-card" onClick={() => open(a.id)}>
                                <strong>{a.company}</strong>
                                <span>{a.role}</span>
                                {dl ? (
                                  <span className="jh-dl" style={{ color: dl.color, background: dl.bg, borderColor: dl.border }}>
                                    ⏰ {dl.label}
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  <div className="jh-scroll">
                    <table className="jh-table">
                      <caption className="sr-only">Applications</caption>
                      <thead>
                        <tr>
                          <th scope="col">Company</th>
                          <th scope="col">Role</th>
                          <th scope="col">Stage</th>
                          <th scope="col">Industry</th>
                          <th scope="col">Location</th>
                          <th scope="col">Deadline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((a) => {
                          const dl = deadlineStatus(a.deadlineOffset);
                          const c = STAGE_COLORS[a.status];
                          return (
                            <tr key={a.id}>
                              <td>
                                <button type="button" onClick={() => open(a.id)}>
                                  {a.company}
                                </button>
                              </td>
                              <td>{a.role}</td>
                              <td>
                                <span className="jh-stage-pill" style={{ color: c.text, background: c.bg }}>
                                  {a.status}
                                </span>
                              </td>
                              <td>{a.industry}</td>
                              <td>{a.location}</td>
                              <td>
                                {dl ? (
                                  <span className="jh-dl" style={{ marginTop: 0, color: dl.color, background: dl.bg, borderColor: dl.border }}>
                                    {dl.label}
                                  </span>
                                ) : a.deadlineOffset !== undefined ? (
                                  dayString(a.deadlineOffset)
                                ) : (
                                  "—"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {filtered.length === 0 ? <p style={{ color: "#64748b" }}>No applications match.</p> : null}

                {selected ? (
                  <div className="jh-detail" ref={detailRef} tabIndex={-1} role="region" aria-label={`${selected.company} details`}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <h3>{selected.company}</h3>
                        <p className="muted" style={{ margin: 0 }}>
                          {selected.role}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "start" }}>
                        <button type="button" className="btn btn--small btn--accent" onClick={() => setPrepFor(selected.id)}>
                          ★ Interview prep
                        </button>
                        <button type="button" className="btn btn--small btn--light" onClick={() => setSelectedId(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                    <p className="kicker" style={{ margin: "14px 0 0", color: "#64748b" }} id="jh-move-label">
                      Move to stage
                    </p>
                    <div className="jh-stage-buttons" role="group" aria-labelledby="jh-move-label">
                      {STAGES.map((s) => {
                        const c = STAGE_COLORS[s];
                        const on = selected.status === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            aria-pressed={on}
                            onClick={() => move(selected.id, s)}
                            style={{ color: on ? "#fff" : c.text, borderColor: c.accent, background: on ? c.accent : "#fff" }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <dl className="jh-fields">
                      {[
                        ["Job type", selected.jobType],
                        ["Work type", selected.workType],
                        ["Industry", selected.industry],
                        ["Location", selected.location],
                        ["Date added", dayString(selected.addedOffset)],
                        ["Deadline", selected.deadlineOffset !== undefined ? dayString(selected.deadlineOffset) : "—"],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="jh-callout" style={{ margin: 0 }}>
                      In the real app this panel also holds the posting link, contact email, salary range, notes, and an uploaded résumé and cover letter.
                    </p>
                  </div>
                ) : (
                  <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 12, marginBottom: 0 }}>
                    Select any application to inspect it, move it between stages, or open its interview prep.
                  </p>
                )}
              </>
            )}
          </div>
        ) : null}

        {tab === "dashboard" ? (
          <div className="jh-body" role="tabpanel" id="jh-panel-dashboard" aria-labelledby="jh-tab-dashboard">
            <Dashboard apps={apps} />
          </div>
        ) : null}

        {tab === "deadlines" ? (
          <div className="jh-body" role="tabpanel" id="jh-panel-deadlines" aria-labelledby="jh-tab-deadlines">
            <DeadlineSim />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Dashboard({ apps }: { apps: App[] }) {
  const stats = useMemo(() => {
    // Same definitions as Jobaholic's DashboardTab.
    const total = apps.length;
    const applied = apps.filter((a) => a.status !== "Saved").length;
    const interviews = apps.filter((a) => ["Interview", "HireVue", "Phone Screen"].includes(a.status)).length;
    const offers = apps.filter((a) => a.status === "Offer").length;
    const rejected = apps.filter((a) => a.status === "Rejected").length;
    const responseRate = applied > 0 ? Math.round(((interviews + offers) / applied) * 100) : 0;
    const rejectionRate = applied > 0 ? Math.round((rejected / applied) * 100) : 0;
    const responded = apps.filter((a) => ["Interview", "HireVue", "Phone Screen", "Offer", "Rejected"].includes(a.status));
    const avgDays = responded.length ? Math.round(responded.reduce((s, a) => s + -a.addedOffset, 0) / responded.length) : null;
    const activeDays = new Set(apps.filter((a) => a.status !== "Saved").map((a) => a.addedOffset));
    let streak = 0;
    while (activeDays.has(-streak)) streak++;
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const off = i - 13;
      return { off, label: dayString(off), count: apps.filter((a) => a.addedOffset === off && a.status !== "Saved").length };
    });
    const byStatus = STAGES.map((s) => ({ s, count: apps.filter((a) => a.status === s).length })).filter((x) => x.count > 0);
    const ind: Record<string, number> = {};
    apps.forEach((a) => (ind[a.industry] = (ind[a.industry] ?? 0) + 1));
    const byInd = Object.entries(ind).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { total, applied, offers, responseRate, rejectionRate, avgDays, streak, last14, byStatus, byInd, interviews, rejected };
  }, [apps]);

  const maxDay = Math.max(...stats.last14.map((d) => d.count), 1);
  const maxSt = Math.max(...stats.byStatus.map((x) => x.count), 1);
  const maxInd = Math.max(...stats.byInd.map((x) => x[1]), 1);

  return (
    <>
      <div className="jh-stats">
        {[
          [stats.total, "Total applications"],
          [stats.applied, "Actually applied"],
          [`${stats.responseRate}%`, "Response rate"],
          [`${stats.rejectionRate}%`, "Rejection rate"],
          [stats.offers, "Offers received"],
          [stats.avgDays !== null ? `${stats.avgDays}d` : "—", "Avg. days active"],
          [`${stats.streak} 🔥`, "Day streak"],
        ].map(([n, l]) => (
          <div className="jh-stat" key={String(l)}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="jh-callout" style={{ marginTop: 0, marginBottom: 14 }}>
        <strong>How these are calculated (from the source):</strong> &ldquo;Actually applied&rdquo; is every application not in Saved. Response rate is (HireVue +
        Phone Screen + Interview + Offer) ÷ applied = ({stats.interviews} + {stats.offers}) ÷ {stats.applied}. Rejection rate is Rejected ÷ applied ={" "}
        {stats.rejected} ÷ {stats.applied}. The streak counts consecutive days, back from today, with at least one non-Saved application added. Move a card on the
        Tracker tab and these update.
      </p>
      <div className="jh-panel">
        <h3>Applications · last 14 days</h3>
        <div className="jh-bars" role="img" aria-label={`Applications added per day over the last 14 days: ${stats.last14.map((d) => d.count).join(", ")}`}>
          {stats.last14.map((d) => (
            <div key={d.off}>
              {d.count > 0 ? <small>{d.count}</small> : null}
              <i className={d.count ? "" : "zero"} style={{ height: `${Math.max((d.count / maxDay) * 80, d.count ? 8 : 2)}px` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="jh-two">
        <div className="jh-panel">
          <h3>By status</h3>
          {stats.byStatus.map(({ s, count }) => (
            <div className="jh-hbar" key={s}>
              <div>
                <span style={{ color: STAGE_COLORS[s].text }}>{s}</span>
                <b>{count}</b>
              </div>
              <div className="track">
                <div className="fill" style={{ width: `${(count / maxSt) * 100}%`, background: STAGE_COLORS[s].accent }} />
              </div>
            </div>
          ))}
        </div>
        <div className="jh-panel">
          <h3>By industry</h3>
          {stats.byInd.map(([ind, count]) => (
            <div className="jh-hbar" key={ind}>
              <div>
                <span>{ind}</span>
                <b>{count}</b>
              </div>
              <div className="track">
                <div className="fill" style={{ width: `${(count / maxInd) * 100}%`, background: "#8b5cf6" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>
        The real app also plots application cities on a map. I left that out of the sample because it relies on outside map and geocoding services.
      </p>
    </>
  );
}

function DeadlineSim() {
  const [days, setDays] = useState(2);
  const dl = deadlineStatus(days);
  return (
    <div>
      <p style={{ marginTop: 0 }}>
        Drag to change how far away a deadline is. The badge uses the same thresholds as the original code, and every state carries a text label, not color
        alone.
      </p>
      <div className="jh-sim">
        <div className="range-field">
          <label htmlFor="jh-days">
            Days until deadline <output htmlFor="jh-days">{days}</output>
          </label>
          <input id="jh-days" type="range" min={-3} max={12} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </div>
        <div className="jh-card" style={{ width: 220, cursor: "default" }} aria-live="polite">
          <strong>Sample application</strong>
          <span>Deadline {dayString(days)}</span>
          {dl ? (
            <span className="jh-dl" style={{ color: dl.color, background: dl.bg, borderColor: dl.border }}>
              ⏰ {dl.label}
            </span>
          ) : (
            <span style={{ marginTop: 6 }}>No warning yet</span>
          )}
        </div>
      </div>
      <div className="table-wrap" style={{ marginTop: 16 }} role="region" aria-label="Deadline rules" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Days left</th>
              <th scope="col">Badge</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">Past due</th><td>Expired (red)</td></tr>
            <tr><th scope="row">0</th><td>Due today! (red)</td></tr>
            <tr><th scope="row">1–3</th><td>&ldquo;Nd left&rdquo; (amber)</td></tr>
            <tr><th scope="row">4–7</th><td>&ldquo;Nd left&rdquo; (blue)</td></tr>
            <tr><th scope="row">8+ or none</th><td>No badge</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrepView({ app, onBack }: { app: App; onBack: () => void }) {
  const prep = app.prep ?? { notes: "", links: [], rounds: [] };
  const [activeRound, setActiveRound] = useState(prep.rounds[0]?.id ?? null);
  const [mock, setMock] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<"All" | QType>("All");
  const round = prep.rounds.find((r) => r.id === activeRound);
  const qs = (round?.questions ?? []).filter((q) => filterType === "All" || q.type === filterType);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        <div>
          <button type="button" className="btn btn--small btn--light" onClick={onBack}>
            ← Back to tracker
          </button>
          <h3 style={{ fontFamily: "var(--font-body)", letterSpacing: 0, fontSize: "1.2rem", fontWeight: 800, marginTop: 10 }}>
            Interview prep · {app.company}
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>{app.role}</p>
        </div>
        <button
          type="button"
          className={`btn btn--small ${mock ? "btn--accent" : "btn--light"}`}
          aria-pressed={mock}
          onClick={() => {
            setMock((m) => !m);
            setRevealed({});
          }}
        >
          {mock ? "◉ Exit mock mode" : "◎ Mock mode"}
        </button>
      </div>

      {prep.rounds.length === 0 ? (
        <p className="jh-callout">
          No rounds yet for this application. In the real app, a prep page is created the first time you open it, and you add rounds and questions as
          interviews get scheduled. Try Lanternworks Studio or Brightloom Learning to see a filled-in example.
        </p>
      ) : (
        <div className="jh-prep">
          <div>
            <p className="kicker" style={{ color: "#64748b", marginBottom: 8 }}>
              Rounds
            </p>
            {prep.rounds.map((r) => (
              <button key={r.id} type="button" className="jh-round" aria-pressed={r.id === activeRound} onClick={() => setActiveRound(r.id)}>
                <strong>{r.name}</strong>
                <small>
                  {r.status}
                  {r.dateOffset !== undefined ? ` · ${dayString(r.dateOffset)}` : ""}
                </small>
                {r.interviewer ? <small>👤 {r.interviewer}</small> : null}
              </button>
            ))}
            <p className="kicker" style={{ color: "#64748b", margin: "14px 0 6px" }}>
              Company notes
            </p>
            <p style={{ fontSize: "0.88rem", margin: 0 }}>{prep.notes}</p>
            {prep.links.length ? (
              <>
                <p className="kicker" style={{ color: "#64748b", margin: "14px 0 6px" }}>
                  Useful links
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.88rem" }}>
                  {prep.links.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <div>
            <div className="seg" role="group" aria-label="Filter questions by type" style={{ marginBottom: 12, flexWrap: "wrap" }}>
              {(["All", "Behavioral", "Technical", "Case", "Culture"] as const).map((t) => (
                <button key={t} type="button" aria-pressed={filterType === t} onClick={() => setFilterType(t)}>
                  {t}
                </button>
              ))}
            </div>
            {mock ? (
              <p className="jh-callout" style={{ marginTop: 0 }}>
                Mock mode hides your answers so you can practice out loud, then reveal them one at a time to check yourself.
              </p>
            ) : null}
            {qs.length === 0 ? <p style={{ color: "#64748b" }}>No questions of this type in this round.</p> : null}
            {qs.map((q) => {
              const tc = TYPE_COLORS[q.type];
              const hidden = mock && !revealed[q.id];
              return (
                <article key={q.id} className="jh-q">
                  <span className="jh-type" style={{ color: tc.color, background: tc.bg, borderColor: tc.border }}>
                    {q.type}
                  </span>
                  <p style={{ fontWeight: 700 }}>{q.question}</p>
                  {hidden ? (
                    <button
                      type="button"
                      className="btn btn--small btn--light"
                      style={{ marginTop: 10 }}
                      onClick={() => setRevealed((r) => ({ ...r, [q.id]: true }))}
                    >
                      Reveal answer
                    </button>
                  ) : q.star ? (
                    <div className="star">
                      {(
                        [
                          ["S", "Situation", q.star.s],
                          ["T", "Task", q.star.t],
                          ["A", "Action", q.star.a],
                          ["R", "Result", q.star.r],
                        ] as const
                      ).map(([letter, label, val]) => (
                        <div key={letter}>
                          <b>
                            {letter} · {label}
                          </b>
                          {val}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#475569" }}>{q.answer}</p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
