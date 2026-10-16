import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Arrow, Blob, Sparkle, Squiggle } from "@/components/Doodles";

const featured = projects.filter((p) => p.featured);

function TafiaVisual() {
  return (
    <div className="stage-visual">
      <div className="frame" style={{ position: "absolute", left: 0, top: 10, width: "84%", transform: "rotate(-3deg)" }}>
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>TAFIA · Memory Match</span>
        </div>
        <Image
          src="/images/tafia/gameplay.jpg"
          width={800}
          height={449}
          sizes="(max-width: 860px) 80vw, 480px"
          alt="The TAFIA prototype's Memory Match game, a grid of face-down cards with two revealed."
        />
      </div>
      <div className="frame" style={{ position: "absolute", right: 0, bottom: 0, width: "62%", transform: "rotate(4deg)" }}>
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>Reminder</span>
        </div>
        <Image
          src="/images/tafia/reminder.jpg"
          width={800}
          height={421}
          sizes="(max-width: 860px) 60vw, 360px"
          alt="The prototype's reminder dialog over the game: 'Did you take your medication?' with Yes and No buttons. Medication details are blurred."
        />
      </div>
      <span className="sticker" style={{ left: "6%", bottom: "4%", background: "var(--paper)", transform: "rotate(-6deg)" }}>
        Real prototype screens
      </span>
    </div>
  );
}

function ConcentrationVisual() {
  return (
    <div className="stage-visual" aria-hidden="true">
      <div className="c64" style={{ position: "absolute", inset: "4% 0 4% 4%", transform: "rotate(2deg)" }}>
        <div className="c64-head">
          <span className="c64-tag">🦁 Animals</span>
          <div className="c64-scores">
            <div className="c64-score you">
              <small>You</small>
              <b>4</b>
            </div>
            <span>—</span>
            <div className="c64-score cpu">
              <small>CPU</small>
              <b>4</b>
            </div>
          </div>
        </div>
        <div className="c64-timer-wrap">
          <div className="c64-timer-bar home-timer" />
        </div>
        <div className="c64-log" style={{ height: "auto" }}>
          <div className="good">✅ Axolotl</div>
          <div className="info">🤖 CPU: Zebra Finch</div>
          <div className="bad">❌ &quot;Unicorn&quot; is not valid.</div>
          <div className="good">✅ Red Panda</div>
          <div className="info">🤖 CPU: Capybara</div>
        </div>
      </div>
      <span className="sticker" style={{ right: "2%", top: "0%", transform: "rotate(8deg)", background: "var(--paper)" }}>
        Playable in your browser
      </span>
    </div>
  );
}

function JobaholicVisual() {
  const cols = [
    { name: "Applied", color: "#3b82f6", cards: [["Orbit & Oak", "2d left"], ["Sundial Retail Co."]] },
    { name: "Phone Screen", color: "#f59e0b", cards: [["Brightloom Learning"]] },
    { name: "Interview", color: "#0891b2", cards: [["Lanternworks Studio", "★ prep"]] },
    { name: "Offer", color: "#10b981", cards: [["Cobalt Commons"]] },
  ];
  return (
    <div className="stage-visual" aria-hidden="true">
      <div className="jh" style={{ position: "absolute", inset: "6% 0 2% 0", transform: "rotate(-2deg)" }}>
        <div className="jh-top" style={{ padding: "10px 14px" }}>
          <span className="jh-logo">
            Job<span>aholic</span>
          </span>
          <span className="jh-sample">Sample data</span>
        </div>
        <div className="jh-board" style={{ padding: 12, gridAutoColumns: "minmax(120px, 1fr)", overflow: "hidden" }}>
          {cols.map((c) => (
            <div key={c.name} className="jh-col" style={{ ["--col" as string]: c.color, ["--col-text" as string]: "#334155", minHeight: 170 }}>
              <h3>{c.name}</h3>
              {c.cards.map(([name, badge]) => (
                <div key={name} className="jh-card" style={{ cursor: "default" }}>
                  <strong style={{ fontSize: "0.82rem" }}>{name}</strong>
                  {badge ? (
                    <span className="jh-dl" style={{ color: "#92400e", background: "#fffbeb", borderColor: "#fde68a" }}>
                      {badge}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="sticker" style={{ right: "2%", top: "-2%", transform: "rotate(5deg)" }}>
        Try it with sample data
      </span>
    </div>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  tafia: TafiaVisual,
  "concentration-64": ConcentrationVisual,
  jobaholic: JobaholicVisual,
};

const CTA: Record<string, string> = {
  tafia: "Try the walkthrough",
  "concentration-64": "Play the game",
  jobaholic: "Explore the workspace",
};

const ONE_LINERS: Record<string, string> = {
  tafia: "Seniors left before the reminder appeared, so we gave them a reason to stay.",
  "concentration-64": "Students showed me what felt unfair, and the rules changed.",
  jobaholic: "Tracking, deadlines, and interview prep in one place.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Blob className="float-shape" color="var(--lavender)" style={{ width: 220, right: "-60px", top: 30, opacity: 0.6 }} />
        <Sparkle className="float-shape delay" color="var(--cobalt)" style={{ width: 34, left: "46%", top: 40 }} />
        <Sparkle className="float-shape" color="var(--coral)" style={{ width: 22, left: "4%", bottom: 40 }} />
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">Hi, I&rsquo;m {site.name}</p>
            <h1 id="hero-title" className="display-xl hero-name">
              <span className="line">Product work</span>
              <span className="line">
                you can{" "}
                <span className="squiggle-under accent-word">
                  play
                  <Squiggle />
                </span>
                .
              </span>
            </h1>
            <p className="hero-intro">
              I&rsquo;m a recent NYU Stern grad heading into product management. I talk to the people I&rsquo;m building for, decide what&rsquo;s worth making,
              get it into their hands, and can tell you why every piece is there.
            </p>
            <div className="hero-meta">
              <span className="tag" style={{ background: "var(--butter)" }}>
                Associate PM candidate
              </span>
              <span className="tag">{site.location}</span>
            </div>
          </div>
          <aside className="hero-card" aria-labelledby="try-title">
            <h2 id="try-title">Three things to try</h2>
            <ol>
              {featured.map((p, i) => (
                <li key={p.slug}>
                  <span className="num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <Link href={`/work/${p.slug}`} style={{ fontWeight: 700 }}>
                      {p.title}
                    </Link>
                    <br />
                    <span style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>{ONE_LINERS[p.slug]}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section aria-labelledby="featured-title" style={{ position: "relative" }}>
        <div className="wrap">
          <div className="featured-head">
            <h2 id="featured-title" className="display-l">
              Pick one and poke at it.
            </h2>
            <p className="lede" style={{ maxWidth: "36ch", margin: 0 }}>
              Each project lets you try the thing first, then open the decisions behind it, then read the whole story.
            </p>
          </div>
          <ol className="stage-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {featured.map((p, i) => {
              const Visual = VISUALS[p.slug];
              return (
                <li key={p.slug} className={`stage stage--${p.theme}`}>
                  <div className="stage-copy">
                    <span className="stage-number" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <p className="kicker" style={{ marginTop: 10 }}>
                      {p.kind}
                      {p.when ? ` · ${p.when}` : ""}
                    </p>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="stage-tags">
                      {p.categories.map((c) => (
                        <span key={c} className="tag">
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link href={`/work/${p.slug}`} className="btn">
                      {CTA[p.slug]} <span className="sr-only">: {p.title}</span>
                      <Arrow />
                    </Link>
                  </div>
                  <Visual />
                </li>
              );
            })}
          </ol>
          <p style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/work" className="link-arrow" style={{ fontSize: "1.15rem" }}>
              See all eight projects <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
