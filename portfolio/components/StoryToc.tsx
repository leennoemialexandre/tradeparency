"use client";

import { useEffect, useState } from "react";

export function StoryToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  // Expanded beside the story on wide screens; collapsed above it on small ones.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const sync = () => setOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="Case study sections">
      <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
        <summary className="kicker">In this story</summary>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} data-active={active === item.id}>
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
