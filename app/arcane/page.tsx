"use client";

import { useState } from "react";
import Link from "next/link";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

const WORDS = [
  { slug: "eclectic",  display: "eclectic",  preview: "drawing from everywhere", hoverBg: "#363f2e", hoverText: "#c8d6a8", arrow: "#82c882" },
  { slug: "curious",   display: "curious",   preview: "asking why and what if",  hoverBg: "#3a7878", hoverText: "#e8a8c0", arrow: "#e8a8c0" },
  { slug: "syncretic", display: "syncretic", preview: "blending and merging",    hoverBg: "#2b5459", hoverText: "#d4c9b0", arrow: "#d4c9b0" },
  { slug: "observant", display: "observant", preview: "noticing the details",    hoverBg: "#4a3c28", hoverText: "#82c882", arrow: "#82c882" },
  { slug: "fun",       display: "FUN!",      preview: "sparking joy",            hoverBg: "#c47878", hoverText: "#3a3520", arrow: "#3a3520" },
];

function WordRow({ word }: { word: typeof WORDS[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/arcane/${word.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.75rem 0",
        borderBottom: BORDER,
        textDecoration: "none",
        color: "inherit",
        backgroundColor: hovered ? word.hoverBg : "transparent",
        transition: "background-color 0.3s ease",
        marginLeft: "-2.5rem",
        marginRight: "-2.5rem",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
      }}
    >
      <div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem, 2.5vw, 2rem)", fontWeight: 300, color: hovered ? word.hoverText : "#f2f2f2", margin: "0 0 0.25rem", letterSpacing: "-0.01em", transition: "color 0.3s ease" }}>
          {word.display}
        </p>
        <p style={{ fontSize: "0.8125rem", color: hovered ? word.hoverText : "#666666", margin: 0, transition: "color 0.3s ease", opacity: hovered ? 0.7 : 1 }}>{word.preview}</p>
      </div>
      <span style={{ fontSize: "0.875rem", color: hovered ? word.arrow : "#666666", transition: "transform 0.2s ease, color 0.3s ease", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>→</span>
    </Link>
  );
}

export default function ArcanePage() {
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          arcane
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 1.5rem",
          }}
        >
          five dimensions
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#aaaaaa", maxWidth: "52ch", margin: "0 0 4rem" }}>
          Congratulations on finding the hidden layer. Each word is a facet of who I am.
        </p>

        {/* Word list */}
        <div style={{ borderTop: BORDER }}>
          {WORDS.map((word) => (
            <WordRow key={word.slug} word={word} />
          ))}
        </div>

        {/* Achievement */}
        <div style={{ marginTop: "3rem", padding: "1.5rem 2rem", border: BORDER }}>
          <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>
            Achievement unlocked
          </p>
          <p style={{ fontSize: "0.875rem", color: "#aaaaaa", margin: 0, fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic" }}>
            "seeker of hidden paths"
          </p>
        </div>
      </main>
    </div>
  );
}
