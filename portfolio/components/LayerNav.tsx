"use client";

import { useEffect, useState } from "react";

export function LayerNav({ layers }: { layers: { id: string; label: string; color: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    layers.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [layers]);

  return (
    <nav className="layer-nav" aria-label="Sections of this project">
      <ul>
        {layers.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} data-active={active === l.id} aria-current={active === l.id ? "location" : undefined}>
              <span className="dot" style={{ background: l.color }} aria-hidden="true" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
