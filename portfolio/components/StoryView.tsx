import type { Block, Story } from "@/lib/story";
import { Rich } from "./Rich";
import { Frame } from "./Frame";
import { StoryToc } from "./StoryToc";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3>
          <Rich text={block.text} />
        </h3>
      );
    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i}>
          <Rich text={item} />
        </li>
      ));
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case "table":
      return (
        <div className="table-wrap" role="region" aria-label={block.caption ?? "Table"} tabIndex={0}>
          <table>
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className={block.numeric?.includes(i) ? "num" : undefined}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" style={{ fontWeight: 600 }}>
                        <Rich text={cell} />
                      </th>
                    ) : (
                      <td key={c} className={block.numeric?.includes(c) ? "num" : undefined}>
                        <Rich text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className={`callout ${block.tone === "limit" ? "callout--limit" : ""}`}>
          {block.title ? <span className="callout-title">{block.title}</span> : null}
          <p>
            <Rich text={block.text} />
          </p>
        </div>
      );
    case "question":
      return (
        <p className="big-question">
          <Rich text={block.text} />
        </p>
      );
    case "figure":
      return (
        <figure className="figure">
          <Frame src={block.src} alt={block.alt} width={block.width} height={block.height} label={block.label} />
          <figcaption>
            <Rich text={block.caption} />
          </figcaption>
        </figure>
      );
  }
}

/** The "Read deeply" layer: a sticky table of contents plus the full narrative. */
export function StoryView({ story }: { story: Story }) {
  return (
    <div className="story-layout">
      <StoryToc items={story.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <article className="story">
        <div className="at-a-glance">
          {story.glance.map((g) => (
            <div className="glance-card" key={g.label}>
              <h3>{g.label}</h3>
              <p>
                <Rich text={g.text} />
              </p>
            </div>
          ))}
        </div>
        {story.sections.map((section, i) => (
          <section key={section.id} id={section.id} className="story-section" aria-labelledby={`${section.id}-h`}>
            <span className="kicker">{section.kicker ?? String(i + 1).padStart(2, "0")}</span>
            <h2 id={`${section.id}-h`}>{section.title}</h2>
            {section.blocks.map((b, j) => (
              <BlockView key={j} block={b} />
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
