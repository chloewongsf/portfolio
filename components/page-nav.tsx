"use client";

import Link from "next/link";

const BORDER = "1px solid #2a2a2a";
const GENOA = "#3a7878";

export function PageNav() {
  return (
    <nav
      className="page-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "clamp(1rem, 2.5vw, 1.75rem)",
        backgroundColor: "#111111",
        borderBottom: BORDER,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "#f2f2f2",
          textDecoration: "none",
        }}
      >
        Chloe Wong
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {[
          { href: "/work", label: "work" },
          { href: "/about", label: "about" },
          { href: "/contact", label: "contact" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "#aaaaaa",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
