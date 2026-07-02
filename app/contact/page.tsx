"use client";

import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main id="main-content" style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        {/* Label */}
        <p style={{ fontSize: "0.6875rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
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
          let&apos;s talk
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#aaaaaa", maxWidth: "480px", margin: "0 0 4rem" }}>
          for work, freelance, collaborations, or just to say hello, reach me here:
        </p>

        {/* Email */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1rem" }}>
            email
          </p>
          <a
            href="mailto:hello@chloewong.me"
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
            hello@chloewong.me
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: BORDER, marginBottom: "3rem" }} />

        {/* Links */}
        <div>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.5rem" }}>
            elsewhere
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/chloewongsf" },
              { label: "GitHub", href: "https://github.com/chloewongsf" },
              { label: "Instagram", href: "https://instagram.com/chlowork" },
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
