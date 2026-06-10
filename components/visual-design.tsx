"use client";

import { useState, useEffect } from "react";
import { PageNav } from "@/components/page-nav";
import { visuals, VisualItem } from "@/content/visuals";

const BORDER = "1px solid #2a2a2a";

function shuffleVisuals(items: VisualItem[]) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function VisualDesignPage() {
  const [active, setActive] = useState<VisualItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [galleryVisuals, setGalleryVisuals] = useState<VisualItem[]>(visuals);

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setGalleryVisuals(shuffleVisuals(visuals));
    }, 0);

    return () => window.clearTimeout(shuffleTimer);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActiveImageIdx((i) => Math.min(i + 1, (active.images || []).length - 1));
      if (e.key === "ArrowLeft") setActiveImageIdx((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main
        className="visual-work-main"
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "7rem 2rem 6rem",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.25em",
              textTransform: "lowercase",
              color: "#3a7878",
              margin: "0 0 1rem",
            }}
          >
            visual work
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              color: "#f2f2f2",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            visual experiments
          </h1>
        </div>

        <div
          className="visual-work-gallery"
          style={{
            width: "100%",
            columnCount: 4,
            columnGap: "1.25rem",
          }}
        >
          {galleryVisuals.map((v) => (
              <button
                key={v.slug}
                onClick={() => {
                  setActive(v);
                  setActiveImageIdx(0);
                }}
                style={{
                  display: "inline-block",
                  width: "100%",
                  margin: "0 0 1rem",
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  breakInside: "avoid",
                }}
              >
                <div style={{ overflow: "hidden", borderRadius: "6px", border: BORDER, background: "transparent" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: v.aspectRatio,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                    }}
                  >
                    {v.cover?.endsWith(".mp4") ? (
                      <video src={v.cover} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} muted loop autoPlay playsInline />
                    ) : (
                      <img src={v.cover || v.images[0]?.src} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                    )}
                  </div>
                </div>
              </button>
          ))}
        </div>

        {/* Modal */}
        {active && (
          <div
            role="dialog"
            aria-modal
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.8)",
              padding: "2rem",
            }}
            onClick={() => setActive(null)}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", width: "min(1000px, 100%)" }}>
              <div style={{ position: "relative", background: "#111", border: BORDER }}>
                <div style={{ height: "min(70vh, 720px)", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {active.images[activeImageIdx].src.endsWith('.mp4') ? (
                    <video
                      src={active.images[activeImageIdx].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ maxHeight: "70vh", width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <img src={active.images[activeImageIdx].src} alt={active.images[activeImageIdx].caption || active.title} style={{ maxHeight: "70vh", width: "100%", height: "100%", objectFit: "contain" }} />
                  )}
                </div>

                <div style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}>{active.title}</div>
                    <div style={{ color: "#aaaaaa", fontSize: "0.9rem" }}>{active.year} • {active.tags?.join(' · ')}</div>
                    {active.images[activeImageIdx].caption && (
                      <div style={{ color: "#888", marginTop: "0.5rem" }}>{active.images[activeImageIdx].caption}</div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <button onClick={() => setActiveImageIdx((i) => Math.max(i - 1, 0))} style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#f2f2f2", padding: "0.5rem 0.75rem", cursor: "pointer" }}>←</button>
                    <button onClick={() => setActiveImageIdx((i) => Math.min(i + 1, active.images.length - 1))} style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#f2f2f2", padding: "0.5rem 0.75rem", cursor: "pointer" }}>→</button>
                    <button onClick={() => setActive(null)} style={{ background: "transparent", border: "none", color: "#aaaaaa", cursor: "pointer", fontSize: "0.95rem" }}>close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
