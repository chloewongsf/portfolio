"use client";

import Image from "next/image";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

const ABOUT_PHOTOS = [
  {
    src: "/about pics/61284E24-8E38-4EE2-B216-5D518E1263F6.JPG",
    alt: "personal photo",
    aspectRatio: "4032 / 3024",
  },
  {
    src: "/about pics/IMG_4428.jpeg",
    alt: "personal photo",
    aspectRatio: "4032 / 3024",
  },
  {
    src: "/about pics/img4422.JPG",
    alt: "personal photo",
    aspectRatio: "2650 / 1945",
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <style>{`
        @media (max-width: 768px) {
          .about-hero {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .about-portrait {
            width: min(14rem, 62vw) !important;
            justify-self: start !important;
          }

          .about-bio,
          .about-details {
            grid-template-columns: 1fr !important;
          }

          .about-photo-grid {
            grid-template-columns: 1fr !important;
          }

          .about-photo-card {
            transform: none !important;
          }
        }
      `}</style>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        {/* Label */}
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          about
        </p>

        {/* Heading */}
        <div
          className="about-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 13rem",
            gap: "4rem",
            alignItems: "end",
            margin: "0 0 4rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "#f2f2f2",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            designer, researcher,<br />creative technologist
          </h1>

          <div
            className="about-portrait"
            style={{
              position: "relative",
              width: "13rem",
              aspectRatio: "1 / 1",
              borderRadius: "999px",
              border: "1px solid rgba(242,242,242,0.18)",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
              boxShadow: "0 24px 70px rgba(0,0,0,0.38)",
              justifySelf: "end",
            }}
          >
            <Image
              src="/about pics/IMG_4549.png"
              alt="Chloe Wong"
              fill
              sizes="(max-width: 768px) 62vw, 13rem"
              priority
              style={{
                objectFit: "cover",
                transform: "scale(1.72) translateY(6%)",
              }}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="about-bio" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem 5rem", marginBottom: "3rem" }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#f2f2f2", margin: 0 }}>
            I&apos;m Chloe Wong, a UC Berkeley Data Science student working across creative technology
            and strategy, digital design, visual storytelling, and technical systems. That combination
            means I&apos;m usually thinking about both structure and feeling: what people respond to,
            why it resonates, and how to turn that into something tangible.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#f2f2f2", margin: 0 }}>
            After a semester at Parsons Paris studying strategic design, creative direction, and
            interactive media, I&apos;m especially interested in brand systems, social-first campaigns,
            audience research, and digital experiences that feel culturally aware and emotionally
            specific.
          </p>
        </div>

        <div
          className="about-photo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.9fr 1fr",
            gap: "1rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          {ABOUT_PHOTOS.map((photo, index) => (
            <div
              key={photo.src}
              className="about-photo-card"
              style={{
                position: "relative",
                aspectRatio: photo.aspectRatio,
                border: "1px solid rgba(242,242,242,0.14)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
                boxShadow: "0 18px 55px rgba(0,0,0,0.3)",
                transform: `translateY(${[0, 18, 7][index]}px) rotate(${[-0.8, 0.9, -0.4][index]}deg)`,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: BORDER, marginBottom: "3rem" }} />

        {/* Skills + Tools */}
        <div className="about-details" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
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
