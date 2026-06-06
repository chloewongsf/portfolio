"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

interface WordPageProps {
  params: Promise<{ word: string }>;
}

const WORD_DEFINITIONS: Record<string, { title: string; definition: string[] }> = {
  eclectic: {
    title: "eclectic",
    definition: [
      "I draw from everywhere—and I mean everywhere. One day I'm designing wayfinding systems for physical spaces, the next I'm building interactive data visualizations, the next I'm facilitating participatory design workshops.",
      "My toolkit includes Figma and Adobe Creative Suite, but also Python and TypeScript. I read academic papers on human-computer interaction alongside design theory and speculative fiction. Data science meets Parsons Paris. Berkeley rigor meets creative experimentation.",
      "I don't see these as contradictions. The problems I care about—social impact, accessible design, meaningful interaction—don't fit neatly into disciplinary boxes. So why should my practice? The best solutions come from unexpected combinations.",
    ],
  },
  curious: {
    title: "curious",
    definition: [
      "I ask 'why' compulsively. Why does this interface feel intuitive? Why do people move through space this way? Why does this data pattern emerge? Every project starts with a question, or usually twenty.",
      "Curiosity isn't passive wondering—it's active investigation. It's learning a new tool because a project demands it. It's reading research papers at 2am because something doesn't make sense. It's conducting user interviews not just to validate, but to genuinely understand.",
      "The best part? Curiosity compounds. The more you learn across domains, the more connections you see. Editorial design principles inform my approach to data viz. Participatory research methods shape my UX process. Everything feeds everything else.",
    ],
  },
  syncretic: {
    title: "syncretic",
    definition: [
      "I'm a synthesis machine. I take technical precision and creative expression and fuse them until you can't tell where one ends and the other begins. Design systems that feel alive. Code that's crafted with aesthetic intention. Research that tells stories.",
      "Synthesis isn't about compromise or finding middle ground. It's about creating something new that carries the strengths of both origins. It's design thinking applied to systems analysis. It's analytical rigor in service of emotional resonance.",
      "This portfolio is syncretic—careful information architecture meets playful interaction, professional presentation meets personality. It's all of me at once.",
    ],
  },
  observant: {
    title: "observant",
    definition: [
      "I notice things. The way someone's eye path follows unexpected routes through an interface. The micro-hesitation before clicking. The body language that contradicts the words in a user interview. The patterns hiding in seemingly random data.",
      "Observation is my superpower and my practice. In user research, I'm watching what people do, not just what they say. In design, I'm seeing how tiny details—letter spacing, transition timing, color temperature—create entirely different emotional experiences.",
      "This attention to detail isn't just about perfection. It's about empathy. About truly seeing the systems and people in front of me, understanding how they work, where they struggle, what they need.",
    ],
  },
  fun: {
    title: "FUN!",
    definition: [
      "If it's not fun, what's the point? I'm deadly serious about this. Design should spark joy, even when it's solving serious problems. Especially when it's solving serious problems.",
      "Fun is the 3D shape that pauses when you hover. It's the hidden sections for people who pay attention. It's this entire arcane section—an easter egg within an easter egg, a reward for curiosity.",
      "But fun isn't frivolous. Playfulness builds engagement. Surprise creates memorable experiences. Delight makes people want to explore further, learn more, come back. When interaction feels like discovery rather than transaction, that's when magic happens.",
    ],
  },
};

export default function WordPage({ params }: WordPageProps) {
  const { word } = use(params);
  const wordData = WORD_DEFINITIONS[word];

  if (!wordData) {
    notFound();
  }

  const allWords = Object.keys(WORD_DEFINITIONS);
  const currentIdx = allWords.indexOf(word);
  const nextWord = allWords[(currentIdx + 1) % allWords.length];

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <Link
          href="/arcane"
          style={{ fontSize: "0.8125rem", color: "#666666", textDecoration: "none", letterSpacing: "0.05em", display: "inline-block", marginBottom: "3rem" }}
        >
          ← arcane
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: "0 0 4rem",
          }}
        >
          {wordData.title}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "5rem" }}>
          {wordData.definition.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 0 ? "1.0625rem" : "0.9375rem",
                color: i === 0 ? "#f2f2f2" : "#aaaaaa",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: "64ch",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ borderTop: BORDER, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/arcane" style={{ fontSize: "0.8125rem", color: "#666666", textDecoration: "none" }}>
            all dimensions
          </Link>
          <Link href={`/arcane/${nextWord}`} style={{ fontSize: "0.8125rem", color: "#aaaaaa", textDecoration: "none" }}>
            {nextWord} →
          </Link>
        </div>
      </main>
    </div>
  );
}
