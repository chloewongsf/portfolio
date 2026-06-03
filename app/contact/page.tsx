"use client";

import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        {/* Label */}
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          contact
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
            margin: "0 0 2rem",
          }}
        >
          let's talk
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#aaaaaa", maxWidth: "480px", margin: "0 0 4rem" }}>
          I'm always interested in new opportunities, collaborations, and conversations about design, technology, and social impact.
        </p>

        {/* Email */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1rem" }}>
            email
          </p>
          <a
            href="mailto:hello@chloewong.com"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "#f2f2f2",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              borderBottom: "1px solid #f2f2f2",
              paddingBottom: "0.25rem",
            }}
          >
            hello@chloe-wong.com
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: BORDER, marginBottom: "3rem" }} />

        {/* Links */}
        <div>
          <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.5rem" }}>
            elsewhere
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/chloewong" },
              { label: "GitHub", href: "https://github.com/chloewong" },
              { label: "Twitter", href: "https://twitter.com/chloewong" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "1rem",
                  color: "#aaaaaa",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>{label}</span>
                <span style={{ fontSize: "0.75rem" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
