import { ImageResponse } from "next/og";

export const alt = "Leen-Noemi Alexandre: product work you can play";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, rendered at build time. Uses system fonts so it needs no network.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff6ea",
          padding: 70,
          fontFamily: "Georgia, serif",
          color: "#211a3b",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {["#cfc0ff", "#ffd95a", "#a8ecce", "#ffbb9f"].map((c) => (
            <div key={c} style={{ width: 44, height: 44, borderRadius: 22, background: c, border: "4px solid #211a3b" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, letterSpacing: 2, textTransform: "uppercase", color: "#4b4468" }}>Leen-Noemi Alexandre</div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, marginTop: 16 }}>Product work</div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, display: "flex" }}>
            you can&nbsp;<span style={{ color: "#2a44de", fontStyle: "italic" }}>play.</span>
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#4b4468" }}>TAFIA · Concentration 64 · Jobaholic · and more</div>
      </div>
    ),
    size,
  );
}
