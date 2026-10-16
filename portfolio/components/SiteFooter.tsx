import Link from "next/link";
import { site } from "@/content/site";
import { Sparkle } from "./Doodles";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="kicker" style={{ color: "var(--butter)" }}>
              Say hello
            </p>
            <h2 className="footer-title">
              Let&rsquo;s talk about what&rsquo;s worth building next.
            </h2>
          </div>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${site.email}`}>
                <span className="kicker">Email</span> {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} rel="noopener noreferrer" target="_blank">
                <span className="kicker">LinkedIn</span> leennoemialexandre
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.github} rel="noopener noreferrer" target="_blank">
                <span className="kicker">GitHub</span> leennoemialexandre
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Sparkle color="#ffd95a" style={{ width: 14, height: 14 }} />
            <Link href="/work">See all work</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
