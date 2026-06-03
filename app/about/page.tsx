"use client";

import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        {/* Label */}
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          about
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 4rem",
          }}
        >
          designer, researcher,<br />creative technologist
        </h1>

        {/* Bio */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem 5rem", marginBottom: "4rem" }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#f2f2f2", margin: 0 }}>
            I'm a designer, researcher, and creative technologist working at the intersection of
            design, technology, and social impact. My practice spans information design, creative
            code, participatory research, and systems thinking.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#f2f2f2", margin: 0 }}>
            I believe in creating tools and experiences that are not only functional and beautiful,
            but also meaningful and accessible. Whether designing wayfinding systems, building
            interactive installations, or facilitating community workshops, I strive to center
            human needs and foster collaborative problem-solving.
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: BORDER, marginBottom: "3rem" }} />

        {/* Skills + Tools */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.25rem" }}>
              disciplines
            </p>
            <p style={{ fontSize: "0.875rem", color: "#aaaaaa", lineHeight: 2, margin: 0 }}>
              Information Design · UX/UI Design · Design Systems · Editorial Design ·
              Wayfinding &amp; Signage · Creative Coding · Web Development ·
              Data Visualization · Machine Learning · Participatory Design ·
              User Research · Design Research · Speculative Design
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.25rem" }}>
              tools
            </p>
            <p style={{ fontSize: "0.875rem", color: "#aaaaaa", lineHeight: 2, margin: 0 }}>
              Figma · Adobe CC · TypeScript · Python · Git
            </p>

            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", margin: "2rem 0 1.25rem" }}>
              currently
            </p>
            <p style={{ fontSize: "0.875rem", color: "#aaaaaa", lineHeight: 1.8, margin: 0 }}>
              UC Berkeley · Data Science<br />
              Parsons Paris · 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
