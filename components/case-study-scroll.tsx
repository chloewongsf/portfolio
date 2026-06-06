"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SceneType = "TITLE" | "CONTEXT" | "PROCESS" | "REFLECTION";

export interface Bubble {
  text: string;
  side: "left" | "right";
  verticalPercent?: number;
}

export interface Scene {
  type: SceneType;
  hook?: string;                               // TITLE: big display text
  title?: string;                              // section label (all types)
  body?: string | string[];                    // main content paragraphs
  metadata?: { label: string; value: string }[]; // TITLE: small metadata row
  points?: { label: string; text: string }[];  // PROCESS: bold-label bullets
  highlight?: string;                          // PROCESS / REFLECTION: large serif pull quote
  imageGrid?: {                                // PROCESS: inline image grid inside card
    containerStyle?: React.CSSProperties;
    items: { src: string; alt: string; style?: React.CSSProperties }[];
  };
  bubbles?: Bubble[];                          // PROCESS / REFLECTION only
}

interface CaseStudyScrollProps {
  scenes: Scene[];
  bgColors?: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const clamp   = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// ── Bubble annotation ─────────────────────────────────────────────────────────

const ROTATIONS = [-2, 1.5, -1, 2, -0.5, 1, -1.5, 0.5];

function BubbleAnnotation({
  bubble,
  index,
  visible,
}: {
  bubble: Bubble;
  index: number;
  visible: boolean;
}) {
  const rotation   = ROTATIONS[index % ROTATIONS.length];
  const entryDelay = 0.35 + index * 0.18;
  const topPct     = bubble.verticalPercent ?? (index === 0 ? 35 : 58);
  const offscreen  = bubble.side === "left" ? "-2.5rem" : "2.5rem";

  return (
    <div
      style={{
        position: "absolute",
        [bubble.side === "left" ? "left" : "right"]: "3vw",
        top: `${topPct}%`,
        maxWidth: "200px",
        backgroundColor: "rgba(235, 235, 240, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "18px",
        ...(bubble.side === "left"
          ? { borderBottomLeftRadius: "4px" }
          : { borderBottomRightRadius: "4px" }),
        padding: "0.6rem 1rem",
        fontSize: "0.75rem",
        color: "#1a1a1a",
        fontFamily: "var(--font-sans)",
        lineHeight: 1.5,
        boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
        transform: visible
          ? `rotate(${rotation}deg) translateX(0)`
          : `rotate(${rotation}deg) translateX(${offscreen})`,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ease ${entryDelay}s, transform 0.55s ease ${entryDelay}s`,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {bubble.text}
    </div>
  );
}

// ── Scene layouts ─────────────────────────────────────────────────────────────

function SceneLabel({ label }: { label: string }) {
  return (
    <p
      style={{
        fontSize: "0.5625rem",
        letterSpacing: "0.25em",
        textTransform: "lowercase",
        color: "#3a7878",
        margin: "0 0 1.75rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      {label}
    </p>
  );
}

function TitleScene({ scene }: { scene: Scene }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.75rem, 3vw, 3rem)",
          fontWeight: 300,
          color: "#f2f2f2",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          margin: "0 0 3rem",
          maxWidth: "20ch",
        }}
      >
        {scene.hook}
      </h1>
      {scene.metadata && scene.metadata.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
            borderTop: "1px solid #2a2a2a",
            paddingTop: "2rem",
          }}
        >
          {scene.metadata.map((m, i) => (
            <div key={i}>
              <p
                style={{
                  fontSize: "0.5625rem",
                  letterSpacing: "0.2em",
                  color: "#3a7878",
                  textTransform: "lowercase",
                  margin: "0 0 0.4rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#aaaaaa",
                  margin: 0,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContextScene({ scene }: { scene: Scene }) {
  const paragraphs = Array.isArray(scene.body)
    ? scene.body
    : scene.body
    ? [scene.body]
    : [];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem clamp(2rem, 10vw, 10rem)",
      }}
    >
      {scene.title && <SceneLabel label={scene.title} />}
      <div style={{ maxWidth: "30ch" }}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
              color: "#f2f2f2",
              lineHeight: 1.6,
              margin: i < paragraphs.length - 1 ? "0 0 2rem" : 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProcessScene({ scene }: { scene: Scene }) {
  const paragraphs = Array.isArray(scene.body)
    ? scene.body
    : scene.body
    ? [scene.body]
    : [];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem clamp(2rem, 12vw, 12rem)",
      }}
    >
      {scene.title && <SceneLabel label={scene.title} />}
      {scene.highlight && (
        <p
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontFamily: "var(--font-serif)",
            color: "#f2f2f2",
            marginBottom: "2rem",
            lineHeight: 1.2,
            fontWeight: 300,
          }}
        >
          {scene.highlight}
        </p>
      )}
      <div style={{ maxWidth: "620px" }}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: "1rem",
              color: "#f2f2f2",
              lineHeight: 1.8,
              margin: i < paragraphs.length - 1 ? "0 0 1.25rem" : 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            {p}
          </p>
        ))}
        {scene.points?.map((pt, i) => (
          <p
            key={i}
            style={{
              fontSize: "1rem",
              color: "#f2f2f2",
              lineHeight: 1.8,
              margin: i < (scene.points!.length - 1) ? "0 0 1.25rem" : 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            <span style={{ fontWeight: 600 }}>{pt.label}</span>
            {" — "}
            {pt.text}
          </p>
        ))}
      </div>
      {scene.imageGrid && (
        <div style={{ marginTop: "1.5rem", ...scene.imageGrid.containerStyle }}>
          {scene.imageGrid.items.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              width={1200}
              height={1200}
              style={{ width: "100%", display: "block", objectFit: "cover", ...img.style }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReflectionScene({ scene }: { scene: Scene }) {
  const paragraphs = Array.isArray(scene.body)
    ? scene.body
    : scene.body
    ? [scene.body]
    : [];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem clamp(2rem, 15vw, 16rem)",
      }}
    >
      {scene.title && <SceneLabel label={scene.title} />}
      {scene.highlight && (
        <p
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            fontFamily: "var(--font-serif)",
            color: "#f2f2f2",
            marginBottom: "1.5rem",
            lineHeight: 1.3,
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          {scene.highlight}
        </p>
      )}
      <div style={{ maxWidth: "480px" }}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: "0.9375rem",
              color: "#888888",
              lineHeight: 1.9,
              margin: i < paragraphs.length - 1 ? "0 0 1.25rem" : 0,
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Color interpolation ───────────────────────────────────────────────────────

function lerpColor(a: string, b: string, t: number): string {
  const ah = a.replace("#", "");
  const bh = b.replace("#", "");
  const ar = parseInt(ah.slice(0, 2), 16);
  const ag = parseInt(ah.slice(2, 4), 16);
  const ab = parseInt(ah.slice(4, 6), 16);
  const br = parseInt(bh.slice(0, 2), 16);
  const bg = parseInt(bh.slice(2, 4), 16);
  const bb = parseInt(bh.slice(4, 6), 16);
  const r  = Math.round(ar + (br - ar) * t);
  const g  = Math.round(ag + (bg - ag) * t);
  const b2 = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${b2})`;
}

// ── Main component ────────────────────────────────────────────────────────────

export function CaseStudyScroll({ scenes, bgColors }: CaseStudyScrollProps) {
  const panelsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const rafRef        = useRef<number>(0);
  const prevScrollRef = useRef(-1);

  const dwellTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>(
    scenes.map(() => null)
  );

  const [bubblesVisible, setBubblesVisible] = useState<boolean[]>(
    scenes.map(() => false)
  );

  useEffect(() => {
    const n = scenes.length;

    const update = () => {
      const scrollY = window.scrollY;

      // Skip if scroll position hasn't changed
      if (scrollY === prevScrollRef.current) {
        rafRef.current = requestAnimationFrame(update);
        return;
      }
      prevScrollRef.current = scrollY;

      const vh = window.innerHeight;

      // ── Background color interpolation ───────────────────────────────────
      if (bgColors && bgColors.length > 1 && stickyRef.current) {
        const rawScene    = scrollY / vh;
        const sceneIndex  = clamp(Math.floor(rawScene), 0, bgColors.length - 1);
        const sceneProgress = rawScene - Math.floor(rawScene);
        const colorA = bgColors[sceneIndex];
        const colorB = bgColors[clamp(sceneIndex + 1, 0, bgColors.length - 1)];
        stickyRef.current.style.backgroundColor = lerpColor(colorA, colorB, easeOut(sceneProgress));
      }

      for (let i = 0; i < n; i++) {
        const panel = panelsRef.current[i];
        if (!panel) continue;

        // ── Slide-hold-slide — holds full opacity for middle 50% of scroll
        //    range, transitions only in the outer 25% on each side.
        const panelOffset       = scrollY / vh - i;
        const TRANSITION_WINDOW = 0.25;

        let opacity: number;
        let translateY: number;

        if (panelOffset < -1) {
          opacity    = 0;
          translateY = 80;
        } else if (panelOffset < -(1 - TRANSITION_WINDOW)) {
          const t    = (panelOffset + 1) / TRANSITION_WINDOW;
          const ease = t * t * (3 - 2 * t);
          opacity    = ease;
          translateY = (1 - ease) * 80;
        } else if (panelOffset <= TRANSITION_WINDOW) {
          opacity    = 1;
          translateY = 0;
        } else if (panelOffset <= 1) {
          const t    = (panelOffset - TRANSITION_WINDOW) / TRANSITION_WINDOW;
          const ease = t * t * (3 - 2 * t);
          opacity    = 1 - ease;
          translateY = -ease * 80;
        } else {
          opacity    = 0;
          translateY = -80;
        }

        panel.style.opacity   = String(Math.max(0, Math.min(1, opacity)));
        panel.style.zIndex    = String(Math.round(opacity * 10));
        panel.style.transform = `translateY(${translateY}px)`;

        // ── Bubble dwell timing ──────────────────────────────────────────
        const isSettled = Math.abs(panelOffset) < 0.02;
        if (isSettled) {
          if (!dwellTimers.current[i]) {
            dwellTimers.current[i] = setTimeout(() => {
              setBubblesVisible(bv => {
                const next = [...bv];
                next[i] = true;
                return next;
              });
            }, 900);
          }
        } else {
          if (dwellTimers.current[i]) {
            clearTimeout(dwellTimers.current[i]!);
            dwellTimers.current[i] = null;
          }
          setBubblesVisible(bv => {
            if (!bv[i]) return bv; // bail out — no re-render needed
            const next = [...bv];
            next[i] = false;
            return next;
          });
        }
      }

      // ── Scene counter ─────────────────────────────────────────────────
      const currentScene = clamp(Math.floor(scrollY / vh), 0, n - 1);
      if (counterRef.current) {
        counterRef.current.textContent =
          `${String(currentScene + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    const timers = dwellTimers.current;
    
    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [scenes.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Outer div gives the page its scrollable height
    <div style={{ height: `${scenes.length * 100}vh` }}>

      {/* Sticky viewport — the "table" the cards sit on */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        {/* Cards — each panel is a floating card with visible margins */}
        {scenes.map((scene, i) => (
          <div
            key={i}
            ref={el => { panelsRef.current[i] = el; }}
            style={{
              position: "absolute",
              top: "8vh",
              bottom: "8vh",
              left: "12vw",
              right: "12vw",
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1a",
                borderRadius: "6px",
                border: "1px solid #2a2a2a",
                boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
                overflow: "hidden",
              }}
            >
              {scene.type === "TITLE"      && <TitleScene      scene={scene} />}
              {scene.type === "CONTEXT"    && <ContextScene    scene={scene} />}
              {scene.type === "PROCESS"    && <ProcessScene    scene={scene} />}
              {scene.type === "REFLECTION" && <ReflectionScene scene={scene} />}
            </div>
          </div>
        ))}

        {/* Bubbles — siblings to cards, bleed into the margin space */}
        {scenes.map((scene, i) =>
          scene.bubbles?.map((bubble, j) => (
            <BubbleAnnotation
              key={`${i}-${j}`}
              bubble={bubble}
              index={j}
              visible={bubblesVisible[i]}
            />
          ))
        )}

        {/* Counter — overlay that matches the card bounds, not clipped by overflow:hidden */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "6vh",
            bottom: "6vh",
            left: "8vw",
            right: "8vw",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 20,
          }}
        >
          <span
            ref={counterRef}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              fontSize: "0.5625rem",
              letterSpacing: "0.22em",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "var(--font-sans)",
              color: "#333333",
              textTransform: "lowercase",
            }}
          >
            01 / {String(scenes.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
