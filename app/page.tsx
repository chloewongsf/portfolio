"use client";

import { useState, useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { LenisProvider, useLenis } from "@/components/lenis-provider";
import { PageNav } from "@/components/page-nav";

const FEATURED_PROJECT_SLUGS = [
  "outward",
  "etro-how-to-arnica",
  "genentech-gene-expression",
  "taara",
  "unplugged",
  "her-and-i",
];

const featuredProjects = FEATURED_PROJECT_SLUGS.map((slug) =>
  projects.find((project) => project.slug === slug)
).filter((project): project is Project => Boolean(project));

const BORDER = "1px solid #2a2a2a";

const P = {
  hinterland: "#2b5459",
  akaroa: "#d4c9b0",
  genoa: "#3a7878",
  lavPink: "#e8a8c0",
  heavyMetal: "#363f2e",
  kidnapper: "#c8d6a8",
  nyPink: "#c47878",
  mondo: "#3a3520",
  millbrook: "#4a3c28",
  deYork: "#82c882",
} as const;

function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
      }}
    />
  );
}

const PALETTE = [
  "rgba(212,201,176,0.92)",
  "rgba(160,88,58,0.90)",
  "rgba(139,94,60,0.90)",
  "rgba(107,115,85,0.88)",
  "rgba(58,120,120,0.88)",
  "rgba(200,184,167,0.86)",
  "rgba(158,123,107,0.90)",
  "rgba(74,60,40,0.92)",
  "rgba(43,84,89,0.88)",
  "rgba(90,78,65,0.90)",
  "rgba(170,150,130,0.86)",
  "rgba(130,110,90,0.88)",
  "rgba(180,130,95,0.90)",
  "rgba(95,100,78,0.88)",
];

interface PhysicsCircle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  restitution: number;
  color: string;
  blur: number;
  settled: boolean;
  wobble: number;
  gravityScale: number;
  airScale: number;
  windStrength: number;
  fallDelayUntil: number;
}

function PageConfetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerEl = containerRef.current as HTMLDivElement;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const isMobile = W <= 768;

    if (isMobile) {
      const mobileDots: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        wobble: number;
      }> = [];
      const mobileEls: HTMLDivElement[] = [];
      const MOBILE_MAX = 28;

      for (let i = 0; i < MOBILE_MAX; i++) {
        const r = 7 + Math.random() * 14;
        const dot = {
          x: r + Math.random() * Math.max(1, W - r * 2),
          y: r + Math.random() * Math.max(1, H - r * 2),
          vx: (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 48),
          vy: (Math.random() < 0.5 ? -1 : 1) * (18 + Math.random() * 42),
          r,
          wobble: Math.random() * 1000,
        };

        mobileDots.push(dot);

        const el = document.createElement("div");
        el.style.cssText = [
          "position:absolute",
          `width:${r * 2}px`,
          `height:${r * 2}px`,
          "border-radius:50%",
          `background:${PALETTE[Math.floor(Math.random() * PALETTE.length)]}`,
          `filter:blur(${(0.25 + Math.random() * 0.8).toFixed(1)}px)`,
          `opacity:${(0.48 + Math.random() * 0.34).toFixed(2)}`,
          "will-change:transform",
          "transform:translate3d(-9999px,-9999px,0)",
          "backface-visibility:hidden",
          "contain:layout paint style",
          "pointer-events:none",
        ].join(";");

        containerEl.appendChild(el);
        mobileEls.push(el);
      }

      let lastTime = -1;
      let rafId: number;

      function loop(now: number) {
        if (lastTime < 0) lastTime = now;
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        for (let i = 0; i < mobileDots.length; i++) {
          const dot = mobileDots[i];
          const driftX = Math.sin(now * 0.0007 + dot.wobble) * 3;
          const driftY = Math.cos(now * 0.0006 + dot.wobble) * 3;

          dot.x += (dot.vx + driftX) * dt;
          dot.y += (dot.vy + driftY) * dt;

          if (dot.x - dot.r <= 0) {
            dot.x = dot.r;
            dot.vx = Math.abs(dot.vx);
          }

          if (dot.x + dot.r >= W) {
            dot.x = W - dot.r;
            dot.vx = -Math.abs(dot.vx);
          }

          if (dot.y - dot.r <= 0) {
            dot.y = dot.r;
            dot.vy = Math.abs(dot.vy);
          }

          if (dot.y + dot.r >= H) {
            dot.y = H - dot.r;
            dot.vy = -Math.abs(dot.vy);
          }

          mobileEls[i].style.transform = `translate3d(${(dot.x - dot.r).toFixed(1)}px, ${(
            dot.y - dot.r
          ).toFixed(1)}px, 0)`;
        }

        rafId = requestAnimationFrame(loop);
      }

      rafId = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(rafId);
        mobileEls.forEach((el) => el.remove());
      };
    }

    const GRAVITY = isMobile ? 420 : 480;
    const AIR = isMobile ? 0.993 : 0.991;
    const MAX = isMobile ? 48 : 95;
    const SPAWN_MS = isMobile ? 165 : 52;
    const MAX_VY = isMobile ? 500 : 560;

    const circles: PhysicsCircle[] = [];
    const els: HTMLDivElement[] = [];

    let maxVisualScrollReached = 0;

    function getVisualScroll() {
      if (isMobile) return 0;
      const sy = window.scrollY;
      if (sy <= H * 2) return sy * 0.5;
      return sy - H;
    }

    function getCurrentFloorY(visualScroll: number) {
      if (isMobile) return H;
      const logicalSection = Math.floor((visualScroll + H * 0.18) / H);
      return (logicalSection + 1) * H;
    }

    function spawnOne() {
      const r = isMobile ? 6 + Math.random() * 15 : 9 + Math.random() * 24;

      const c: PhysicsCircle = {
        x: W * 0.04 + Math.random() * W * 0.92,
        y: -r - Math.random() * (isMobile ? 420 : 180),
        vx: (Math.random() - 0.5) * (isMobile ? 52 : 85),
        vy: 10 + Math.random() * (isMobile ? 45 : 65),
        r,
        restitution: 0.16 + Math.random() * 0.18,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        blur: 0.3 + Math.random() * 0.9,
        settled: false,
        wobble: Math.random() * 1000,
        gravityScale: 0.8 + Math.random() * 0.75,
        airScale: 0.988 + Math.random() * 0.01,
        windStrength: isMobile ? 6 + Math.random() * 22 : 10 + Math.random() * 34,
        fallDelayUntil: 0,
      };

      circles.push(c);

      const el = document.createElement("div");
      el.style.cssText = [
        "position:absolute",
        `width:${r * 2}px`,
        `height:${r * 2}px`,
        "border-radius:50%",
        `background:${c.color}`,
        `filter:blur(${c.blur.toFixed(1)}px)`,
        "will-change:transform",
        "transform:translate3d(-9999px,-9999px,0)",
        "backface-visibility:hidden",
        "contain:layout paint style",
        "pointer-events:none",
      ].join(";");

      containerEl.appendChild(el);
      els.push(el);
    }

    function resolveCollisions() {
      const n = circles.length;

      for (let i = 0; i < n - 1; i++) {
        const a = circles[i];

        for (let j = i + 1; j < n; j++) {
          const b = circles[j];

          if (a.settled && b.settled) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minD = a.r + b.r + 1;
          const d2 = dx * dx + dy * dy;

          if (d2 >= minD * minD || d2 === 0) continue;

          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const sep = (minD - d) * 0.5;

          if (!a.settled) {
            a.x -= nx * sep;
            a.y -= ny * sep;
          }

          if (!b.settled) {
            b.x += nx * sep;
            b.y += ny * sep;
          }

          const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;

          if (rv < 0) {
            const imp =
              rv * (1 + (a.restitution + b.restitution) * 0.5) * 0.5;

            if (!a.settled) {
              a.vx += imp * nx;
              a.vy += imp * ny;
            }

            if (!b.settled) {
              b.vx -= imp * nx;
              b.vy -= imp * ny;
            }
          }
        }
      }
    }

    function clampBounds(floorY: number, now: number) {
      for (const c of circles) {
        if (c.settled && c.y + c.r < floorY - 4) {
          if (c.fallDelayUntil === 0) {
            const distanceFromCenter = Math.abs(c.x - W / 2) / (W / 2);

            c.fallDelayUntil =
              now +
              Math.random() * 650 +
              distanceFromCenter * 260 +
              Math.random() * c.r * 12;
          }

          if (now >= c.fallDelayUntil) {
            c.settled = false;
            c.fallDelayUntil = 0;

            c.vy = 18 + Math.random() * 75;
            c.vx += (Math.random() - 0.5) * 65;
          }
        }

        if (c.y + c.r > floorY) {
          c.y = floorY - c.r;

          if (c.vy > 0) c.vy = -c.vy * c.restitution;
          if (Math.abs(c.vy) < 28) c.vy = 0;

          c.vx *= 0.68;

          if (c.vy === 0 && Math.abs(c.vx) < 10) {
            c.vx *= 0.35;
            c.settled = true;
          }
        }

        if (c.x - c.r < 0) {
          c.x = c.r;
          c.vx = Math.abs(c.vx) * 0.42;
        }

        if (c.x + c.r > W) {
          c.x = W - c.r;
          c.vx = -Math.abs(c.vx) * 0.42;
        }
      }
    }

    let lastSpawn = -Infinity;
    let spawnCount = 0;
    let lastTime = -1;
    let rafId: number;

    function loop(now: number) {
      if (lastTime < 0) lastTime = now;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const visualScroll = getVisualScroll();
      maxVisualScrollReached = Math.max(maxVisualScrollReached, visualScroll);
      const floorY = getCurrentFloorY(maxVisualScrollReached);

      if (spawnCount < MAX && now - lastSpawn >= SPAWN_MS) {
        spawnOne();
        spawnCount++;
        lastSpawn = now;
      }

      for (const c of circles) {
        if (c.settled) {
          continue;
        }

        const wind =
          Math.sin(now * 0.0012 + c.wobble) * c.windStrength +
          Math.sin((c.y + c.wobble) * 0.009) * (c.windStrength * 0.45);

        c.vx += wind * dt;
        c.vy += GRAVITY * c.gravityScale * dt;

        c.vx *= Math.pow(AIR * c.airScale, dt * 60);
        c.vy *= Math.pow(AIR * c.airScale, dt * 60);

        c.vy = Math.min(c.vy, MAX_VY * c.gravityScale);

        c.x += c.vx * dt;
        c.y += c.vy * dt;
      }

      resolveCollisions();
      clampBounds(floorY, now);

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        const screenY = c.y - visualScroll;

        els[i].style.transform = `translate3d(${(c.x - c.r).toFixed(1)}px, ${(
          screenY - c.r
        ).toFixed(1)}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      els.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
        contain: "layout paint style",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
}

function OpeningScene() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        className="hero-copy"
        style={{
          position: "absolute",
          top: "54%",
          left: "2.5rem",
          zIndex: 30,
          opacity: 0,
          transform: "translateY(-50%)",
          animation:
            "heroCopyIn 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.75rem, 5.4vw, 5.75rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            lineHeight: 0.98,
            letterSpacing: 0,
            margin: "0 0 0.95rem",
            maxWidth: "11ch",
          }}
        >
          hi, i&apos;m chloe!
        </p>

        <p
          style={{
            fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)",
            color: "#aaaaaa",
            lineHeight: 1.55,
            margin: "0 0 0.9rem",
            maxWidth: "44ch",
          }}
        >
          creative strategy & design with a technical foundation.
        </p>

        <div
          style={{
            opacity: 0,
            animation: "sceneFadeIn 0.6s ease 1.0s forwards",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              color: "#666666",
              letterSpacing: "0.06em",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            uc berkeley · data science
          </p>
          <p
            style={{
              fontSize: "0.6875rem",
              color: "#666666",
              letterSpacing: "0.06em",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            parsons paris · spring 2026
          </p>
        </div>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: "3.5rem",
          right: "2.5rem",
          fontSize: "0.5625rem",
          letterSpacing: "0.28em",
          color: "#888888",
          textTransform: "uppercase",
          margin: 0,
          zIndex: 20,
          opacity: 0,
          animation: "sceneFadeIn 0.8s ease 1.4s forwards",
        }}
      >
        scroll
      </p>
    </div>
  );
}

function FloatingProjectCard({
  project,
  index,
  style,
  hoverBg = "#1c1c1c",
}: {
  project: Project;
  index: number;
  style: CSSProperties;
  hoverBg?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: style.position ?? "absolute",
        ...style,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: style.minHeight ?? "12rem",
        padding: "1.5rem",
        textDecoration: "none",
        color: "inherit",
        border: BORDER,
        backgroundColor: hovered ? hoverBg : "rgba(17, 17, 17, 0.76)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: hovered
          ? "0 28px 90px rgba(0,0,0,0.45)"
          : "0 18px 70px rgba(0,0,0,0.28)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:
          "background-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div>
        <span
          style={{
            display: "block",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            color: hovered ? "#111111" : "#888888",
            marginBottom: "1.25rem",
            textTransform: "lowercase",
            transition: "color 0.35s ease",
          }}
        >
          0{index + 1}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.15rem, 1.7vw, 1.85rem)",
            fontWeight: 300,
            color: hovered ? "#111111" : "#f2f2f2",
            margin: "0 0 0.625rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            transition: "color 0.35s ease",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.75rem",
            color: hovered ? "#1b1b1b" : "#aaaaaa",
            margin: 0,
            lineHeight: 1.55,
            maxWidth: "31ch",
            transition: "color 0.35s ease",
          }}
        >
          {project.blurb}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            color: hovered ? "#1b1b1b" : "#888888",
            textTransform: "lowercase",
            transition: "color 0.35s ease",
          }}
        >
          {project.year}
        </span>

        {project.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "0.5625rem",
              border: hovered ? "1px solid rgba(17,17,17,0.35)" : BORDER,
              borderRadius: "999px",
              padding: "0.2rem 0.625rem",
              color: hovered ? "#1b1b1b" : "#aaaaaa",
              letterSpacing: "0.05em",
              transition: "color 0.35s ease, border-color 0.35s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

function CategoryTile({
  href,
  label,
  num,
  hoverBg,
  hoverTextColor,
  floatingStyle,
  onClick,
}: {
  href: string;
  label: string;
  num: string;
  hoverBg?: string;
  hoverTextColor?: string;
  floatingStyle: CSSProperties;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bg = hovered ? hoverBg ?? "#1c1c1c" : "rgba(17, 17, 17, 0.76)";
  const tc = hovered ? hoverTextColor ?? "#f2f2f2" : "#f2f2f2";
  const mc = hovered ? hoverTextColor ?? "#888888" : "#888888";

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: floatingStyle.position ?? "absolute",
        ...floatingStyle,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
        border: BORDER,
        textDecoration: "none",
        color: "inherit",
        backgroundColor: bg,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: hovered
          ? "0 28px 90px rgba(0,0,0,0.45)"
          : "0 18px 70px rgba(0,0,0,0.28)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:
          "background-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <span
        style={{
          fontSize: "0.5625rem",
          letterSpacing: "0.2em",
          color: mc,
          textTransform: "lowercase",
          transition: "color 0.35s ease",
        }}
      >
        {num}
      </span>

      <div>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.25rem, 2vw, 2.15rem)",
            fontWeight: 300,
            color: tc,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: "0.625rem",
            transition: "color 0.35s ease",
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontSize: "0.75rem",
            color: mc,
            transition: "color 0.35s ease",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <LenisProvider>
      <HomeContent />
    </LenisProvider>
  );
}

function HomeContent() {
  const lenis = useLenis();
  const heroSectionRef = useRef<HTMLElement>(null);
  const [showExperimentsNotice, setShowExperimentsNotice] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showExperimentsNotice) return;
    modalCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowExperimentsNotice(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showExperimentsNotice]);

  useEffect(() => {
    if (!lenis) return;

    let isSnapping = false;
    let snapTimeout: ReturnType<typeof setTimeout> | null = null;

    const getSnaps = () => {
      const vh = window.innerHeight;
      return [0, vh * 2, vh * 3, vh * 4];
    };

    const onWheel = (e: WheelEvent) => {
      if (isSnapping) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      const scrollY = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1;
      const snaps = getSnaps();

      const vh = window.innerHeight;
      let currentIdx = 0;

      for (let i = snaps.length - 1; i >= 0; i--) {
        if (scrollY >= snaps[i] - vh * 0.3) {
          currentIdx = i;
          break;
        }
      }

      const targetIdx = Math.max(
        0,
        Math.min(snaps.length - 1, currentIdx + direction)
      );
      const targetY = snaps[targetIdx];

      if (Math.abs(scrollY - targetY) < 10) return;

      isSnapping = true;
      e.preventDefault();
      e.stopImmediatePropagation();

      const distance = Math.abs(targetY - scrollY);
      const duration = distance > vh * 1.5 ? 2.2 : 1.8;
      const easing = (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t));

      lenis.scrollTo(targetY, { duration, easing });

      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        isSnapping = false;
      }, duration * 1000 + 150);
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [lenis]);

  return (
    <>
      <PageConfetti />

      <style>{`
        @keyframes sceneFadeIn { to { opacity: 1; } }

        @keyframes sceneFadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroCopyIn {
          from { opacity: 0; transform: translateY(calc(-50% + 12px)); }
          to   { opacity: 1; transform: translateY(-50%); }
        }

        .hero-copy {
          max-width: min(42rem, 45vw);
        }

        @media (max-width: 900px) {
          .hero-copy {
            max-width: calc(100vw - 5rem);
          }
        }

        @media (max-width: 768px) {
          .hero-copy {
            top: 54% !important;
            left: 1rem !important;
            max-width: calc(100vw - 2rem) !important;
          }

          .hero-copy p:first-child {
            font-size: clamp(3rem, 19vw, 5rem) !important;
            max-width: 8ch !important;
          }
        }

      `}</style>

      <GrainOverlay />
      <PageNav />

      <main
        id="main-content"
        style={{
          position: "relative",
          zIndex: 10,
          color: "#f2f2f2",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div className="hero-wrapper" style={{ position: "relative", height: "200vh" }}>
          <section
            ref={heroSectionRef}
            className="hero-section"
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              backgroundColor: "transparent",
              borderBottom: BORDER,
              overflow: "hidden",
            }}
          >
            <OpeningScene />
          </section>
        </div>

        <section
          className="home-section selected-projects-section"
          style={{
            position: "relative",
            height: "100vh",
            backgroundColor: "transparent",
            overflow: "hidden",
            padding: "6.5rem 2.5rem 3rem",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                textTransform: "lowercase",
                color: "#888888",
                margin: 0,
              }}
            >
              Selected Projects
            </p>

            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.18em",
                textTransform: "lowercase",
                color: "#888888",
                margin: 0,
              }}
            >
              work in motion
            </p>

            <Link
              href="/work"
              style={{
                fontSize: "0.5625rem",
                letterSpacing: "0.18em",
                textTransform: "lowercase",
                color: "#aaaaaa",
                textDecoration: "none",
                borderBottom: "1px solid rgba(170,170,170,0.35)",
                paddingBottom: "0.15rem",
              }}
            >
              see all work →
            </Link>
          </div>

          <div
            className="selected-projects-grid"
            style={{
              position: "relative",
              zIndex: 20,
              height: "calc(100vh - 11rem)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FloatingProjectCard
              project={featuredProjects[0]}
              index={0}
              hoverBg={P.nyPink}
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />

            <FloatingProjectCard
              project={featuredProjects[1]}
              index={1}
              hoverBg={P.genoa}
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />

            <FloatingProjectCard
              project={featuredProjects[2]}
              index={2}
              hoverBg={P.millbrook}
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />

            <FloatingProjectCard
              project={featuredProjects[3]}
              index={3}
              hoverBg="#2e2438"
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />

            <FloatingProjectCard
              project={featuredProjects[4]}
              index={4}
              hoverBg={P.hinterland}
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />

            <FloatingProjectCard
              project={featuredProjects[5]}
              index={5}
              hoverBg={P.heavyMetal}
              style={{
                position: "relative",
                width: "auto",
                minHeight: "auto",
              }}
            />
          </div>
        </section>

        <section
          className="home-section explore-mode-section"
          style={{
            position: "relative",
            height: "100vh",
            backgroundColor: "transparent",
            overflow: "hidden",
            padding: "6.5rem 2.5rem 3rem",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 20,
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                textTransform: "lowercase",
                color: "#888888",
                margin: 0,
              }}
            >
              Explore by mode
            </p>
          </div>

          <div
            className="explore-mode-grid"
            style={{
              position: "relative",
              zIndex: 20,
              height: "calc(100vh - 11rem)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            <CategoryTile
              href="/visual-design"
              label="Visual Work"
              num="01"
              hoverBg={P.genoa}
              hoverTextColor={P.lavPink}
              floatingStyle={{
                position: "relative",
                width: "auto",
                height: "auto",
              }}
            />

            <CategoryTile
              href="/cv"
              label="CV"
              num="02"
              hoverBg={P.hinterland}
              hoverTextColor={P.akaroa}
              floatingStyle={{
                position: "relative",
                width: "auto",
                height: "auto",
              }}
            />

            <CategoryTile
              href="/extras"
              label="Extras"
              num="03"
              hoverBg={P.nyPink}
              hoverTextColor={P.mondo}
              floatingStyle={{
                position: "relative",
                width: "auto",
                height: "auto",
              }}
            />

            <CategoryTile
              href="/playground"
              label="Experiments"
              num="04"
              hoverBg={P.heavyMetal}
              hoverTextColor={P.kidnapper}
              onClick={(event) => {
                event.preventDefault();
                setShowExperimentsNotice(true);
              }}
              floatingStyle={{
                position: "relative",
                width: "auto",
                height: "auto",
              }}
            />
          </div>
        </section>

        <section
          className="h-screen flex flex-col justify-end"
          style={{
            position: "relative",
            backgroundColor: "transparent",
            padding: "0 2.5rem 6rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: P.millbrook,
              opacity: 0.82,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 20 }}>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                textTransform: "lowercase",
                color: P.akaroa,
                marginBottom: "1.5rem",
                opacity: 0.7,
              }}
            >
              Get in touch
            </p>

            <a
              href="mailto:hello@chloewong.me"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                fontWeight: 300,
                color: P.deYork,
                textDecoration: "none",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-serif)",
                lineHeight: 1,
              }}
            >
              say hello →
            </a>
          </div>
        </section>
      </main>

      {showExperimentsNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experiments-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowExperimentsNotice(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              width: "min(420px, 100%)",
              border: BORDER,
              backgroundColor: "#000000",
              boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#3a7878",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "lowercase",
                margin: "0 0 1rem",
              }}
            >
              experiments
            </p>
            <p
              id="experiments-modal-title"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#f2f2f2",
                fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 1.5rem",
              }}
            >
              this is a work in progress!
              <br />
              come back again soon
            </p>
            <button
              ref={modalCloseRef}
              type="button"
              onClick={() => setShowExperimentsNotice(false)}
              style={{
                border: BORDER,
                borderRadius: "999px",
                backgroundColor: "transparent",
                color: "#aaaaaa",
                cursor: "pointer",
                font: "inherit",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                padding: "0.7rem 1.5rem",
                textTransform: "lowercase",
                transition: "transform 0.16s cubic-bezier(0.23, 1, 0.32, 1), color 0.2s ease",
              }}
            >
              got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
