"use client";

import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

export default function WitchcraftPage() {
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          witchcraft
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 2rem",
          }}
        >
          interactive experiments
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#aaaaaa", maxWidth: "540px", margin: "0 0 4rem" }}>
          A collection of micro-interactions, creative code sketches, and digital
          playfulness — explorations in interaction design, animation, and craft.
        </p>

        <div style={{ borderTop: BORDER, paddingTop: "3rem" }}>
          <p style={{ fontSize: "0.875rem", color: "#666666", letterSpacing: "0.05em" }}>
            experiments coming soon
          </p>
        </div>
      </main>
    </div>
  );
}
