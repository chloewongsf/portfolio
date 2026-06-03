"use client";

const ITEMS = [
  "data visualization",
  "creative code",
  "ux design",
  "nlp & text analysis",
  "bioinformatics",
  "ai design",
  "information architecture",
  "web development",
  "interaction design",
  "data research",
];

const SEP = " ✦ ";
const TICKER = ITEMS.join(SEP) + SEP;

export function Marquee({ speed = 22, color = "#666666" }: { speed?: number; color?: string }) {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: `marquee-scroll ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* Duplicate 4× so the loop is seamless at any container width */}
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.2em",
              textTransform: "lowercase",
              color,
              fontFamily: "var(--font-sans)",
            }}
          >
            {TICKER}
          </span>
        ))}
      </div>
    </div>
  );
}
