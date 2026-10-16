// Hand-drawn decorative shapes. All are decorative (aria-hidden) unless labelled.

type P = { className?: string; style?: React.CSSProperties };

export function BrandMark({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 2.5l4.2 6.6 7.7-1.6-1.6 7.7 6.6 4.2-6.6 4.2 1.6 7.7-7.7-1.6L20 36.5l-4.2-6.6-7.7 1.6 1.6-7.7L3.1 19.6l6.6-4.2-1.6-7.7 7.7 1.6z"
        fill="#ffd95a"
        stroke="#211a3b"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text x="20" y="25" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="14" fill="#211a3b">
        L
      </text>
    </svg>
  );
}

export function Squiggle({ className, color = "#ffd95a" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M2 10 C 20 2, 35 16, 52 8 S 85 2, 102 9 S 135 15, 152 7 S 182 3, 198 9"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ className, style, color = "#2a44de" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path d="M20 0 C22 13 27 18 40 20 C27 22 22 27 20 40 C18 27 13 22 0 20 C13 18 18 13 20 0Z" fill={color} />
    </svg>
  );
}

export function Blob({ className, style, color = "#cfc0ff" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <path
        d="M43.5,-58.6C55.4,-49.8,63.4,-35.3,67.6,-19.9C71.8,-4.6,72.2,11.6,66.2,25.3C60.2,39,47.8,50.2,33.6,58.3C19.4,66.4,3.4,71.4,-13.6,70.2C-30.7,68.9,-48.8,61.4,-59.6,48C-70.4,34.6,-73.9,15.3,-71.2,-2.4C-68.5,-20.1,-59.7,-36.3,-46.6,-45.2C-33.5,-54.2,-16.7,-56,-0.3,-55.6C16.2,-55.2,31.6,-67.5,43.5,-58.6Z"
        transform="translate(100 100)"
        fill={color}
        stroke="#211a3b"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Arrow({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="20" height="20" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
