"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { PageNav } from "@/components/page-nav";

// --- Intro constants ---

const FEED_CARDS = [
  { left: "5%",  top: "8%",  rotation: -3, label: "recommended for you", sub: "based on recent activity",  width: 210, thumb: "linear-gradient(135deg, #1e3a4a, #2d5a72)" },
  { left: "65%", top: "5%",  rotation:  4, label: "keep watching",        sub: "2.4M views",               width: 188, thumb: "linear-gradient(135deg, #1a2f3e, #3a4f6a)" },
  { left: "74%", top: "44%", rotation: -6, label: "you might also like",  sub: "because you watched...",   width: 205, thumb: "linear-gradient(135deg, #0d2030, #1e4060)" },
  { left: "2%",  top: "54%", rotation:  2, label: "trending now",         sub: "#1 in your area",          width: 178, thumb: "linear-gradient(135deg, #1c3040, #2a4a60)" },
  { left: "36%", top: "3%",  rotation: -2, label: "new post",             sub: "@someone · 2m ago",        width: 168, thumb: "linear-gradient(135deg, #162838, #284858)" },
  { left: "20%", top: "74%", rotation:  5, label: "up next",              sub: "autoplay in 3...",         width: 172, thumb: "linear-gradient(135deg, #0f1e2c, #1e3448)" },
  { left: "52%", top: "26%", rotation: -4, label: "suggested",            sub: "47K likes",                width: 192, thumb: "linear-gradient(135deg, #1a2e40, #304860)" },
  { left: "10%", top: "36%", rotation:  3, label: "for you",              sub: "curated · updated daily",  width: 182, thumb: "linear-gradient(135deg, #112030, #1e3450)" },
  { left: "70%", top: "76%", rotation: -5, label: "don't miss this",      sub: "limited time",             width: 195, thumb: "linear-gradient(135deg, #0e1c28, #1c3244)" },
];

const BEAT1_LINES = [
  "the feed is very good at keeping you near it.",
  "you opened your phone for one second.",
  "somehow, 18 minutes passed.",
];

const RECS = [
  "go outside for 20 minutes.",
  "listen to an album front to back.",
  "walk without headphones.",
  "read one chapter.",
  "call someone you miss.",
];

const MAX_CARDS = FEED_CARDS.length;

// --- Research section data ---

const RESEARCH_ITEMS = [
  {
    category: "attention economy",
    body: "nowadays, social media infinite scroll systems and notification loops are intentionally designed to maximize retention and prolong attention. rather than encouraging completion, most platforms optimize for continuation.",
    sourceLabel: "source",
    sourceTitle: "The Attention Economy",
    sourceOrg: "Frontiers in Communication",
    sourceLink: "https://www.frontiersin.org/journals/communication/articles/10.3389/fcomm.2022.931276/full",
  },
  {
    category: "excessive screen time & wellbeing",
    body: "OECD research found associations between excessive screen time and poorer subjective wellbeing outcomes, particularly when paired with isolation, poor sleep, and low physical activity.",
    sourceLabel: "source",
    sourceTitle: "How's Life in the Digital Age?",
    sourceOrg: "OECD",
    sourceLink: "https://www.oecd.org/en/publications/how-s-life-in-the-digital-age_9789264311800-en.html",
  },
  {
    category: "recommendation overload",
    body: "research surrounding algorithmic recommendation systems and infinite choice suggests that too many options can increase cognitive fatigue and decision paralysis rather than helping users act intentionally.",
    sourceLabel: "source",
    sourceTitle: "When Choice is Demotivating",
    sourceOrg: "Iyengar & Lepper",
    sourceLink: "https://academiccommons.columbia.edu/doi/10.7916/D8DZ0Q6B",
  },
  {
    category: "intentional friction",
    body: "most digital products aim to remove friction entirely. with this project, i hope to explore the opposite possibility such as whether small moments of intentional friction can interrupt passive behavior patterns and encourage conscious decision-making.",
    sourceLabel: "source inspiration",
    sourceTitle: "The Humane Use of Humane Design",
    sourceOrg: "Center for Humane Technology",
    sourceLink: "https://www.humanetech.com/insights/the-humane-use-of-humane-design",
  },
];

// --- Editorial scene data ---

const SCENES: Array<{
  eyebrow: string;
  title: string;
  body?: string;
  cta?: boolean;
}> = [
  {
    eyebrow: "01 / problem",
    title: "we are losing the ability to want things on purpose.",
    body: "algorithmic feeds flatten desire into passive consumption; bed-rotting and scrolling are not just laziness, but symptoms of systems designed to keep us still.",
  },
  {
    eyebrow: "02 / question",
    title: "what would a recommendation system look like if it optimized for agency instead of retention?",
    body: "instead of giving users infinite options, Outward gives them one meaningful nudge.",
  },
  {
    eyebrow: "03 / attention economy",
    title: "the feed is very good at keeping you near it.",
    body: "infinite scroll creates decision paralysis and makes intentional action feel harder than passive consumption.",
  },
  {
    eyebrow: "04 / the system",
    title: "not more options. one small push.",
    body: "Outward gives one daily suggestion per category, reducing choice fatigue and making intentionality feel reachable.",
  },
  {
    eyebrow: "05 / personalization",
    title: "a suggestion should understand the life it enters.",
    body: "AI-generated recommendations are shaped by whatever the user chooses to share. they can describe what they want, what they do not want, or what feels true that day, then tweak the suggestion at any time.",
  },
  {
    eyebrow: "06 / digital window",
    title: "the interface remembers the outside world exists.",
    body: "the background mirrors the sky/time of day, subtly reconnecting the user to the world beyond the screen.",
  },
  {
    eyebrow: "07 / ethics",
    title: "success is not time-on-app.",
    body: "Outward is designed as a launchpad, not a destination. the best outcome is the user closing it and doing the thing.",
  },
  {
    eyebrow: "08 / reflection",
    title: "the best interface is sometimes the one that convinces you to close it.",
    body: "technology should help us return to life instead of replacing it.",
  },
  {
    eyebrow: "try it",
    title: "try outward!",
    cta: true,
  },
];

export default function OutwardPage() {
  // Intro state
  const [beat, setBeat] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [trapText, setTrapText] = useState(false);
  const [arrowVisible0, setArrowVisible0] = useState(false);
  const [timerMin, setTimerMin] = useState(2);
  const [linesShown, setLinesShown] = useState(0);
  const [b1Reflection, setB1Reflection] = useState(false);
  const [arrowVisible1, setArrowVisible1] = useState(false);
  const [recIndex, setRecIndex] = useState(0);
  const [b2Text, setB2Text] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  // Editorial state
  const [activeScene, setActiveScene] = useState(0);

  const caseStudyRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cooldownRef = useRef(false);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | undefined>(undefined);

  // Scroll lock
  useEffect(() => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      document.body.style.overflow = "unset";
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Track the scene closest to the viewport center so the final section can activate reliably.
  useEffect(() => {
    const updateActiveScene = () => {
      const viewportTarget = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sceneRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sceneCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sceneCenter - viewportTarget);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveScene(closestIndex);
    };

    updateActiveScene();
    window.addEventListener("scroll", updateActiveScene, { passive: true });
    window.addEventListener("resize", updateActiveScene);

    return () => {
      window.removeEventListener("scroll", updateActiveScene);
      window.removeEventListener("resize", updateActiveScene);
    };
  }, []);

  const advance = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 600);

    if (beat === 0) {
      if (cardCount < MAX_CARDS) {
        setCardCount((prev) => prev + 1);
      } else if (trapText) {
        setTimerMin(2);
        setLinesShown(0);
        setB1Reflection(false);
        setArrowVisible1(false);
        setBeat(1);
      }
    } else if (beat === 1 && b1Reflection) {
      setBeat(2);
    }
  }, [beat, cardCount, trapText, b1Reflection]);

  // Wheel handler
  useEffect(() => {
    if (window.matchMedia("(max-width: 800px)").matches) return;

    const onWheel = (e: WheelEvent) => {
      if (beat < 2 && e.deltaY > 0 && Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        advance();
      }
    };
    wheelHandlerRef.current = onWheel;
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [advance, beat]);

  // Beat 0: trap text after all cards shown
  useEffect(() => {
    if (cardCount < MAX_CARDS) return;
    const t1 = setTimeout(() => setTrapText(true), 400);
    const t2 = setTimeout(() => setArrowVisible0(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [cardCount]);

  // Beat 1: auto-play timer + lines
  useEffect(() => {
    if (beat !== 1) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    let current = 2;
    const timerInterval = setInterval(() => {
      current = Math.min(current + 1, 18);
      setTimerMin(current);
      if (current >= 18) clearInterval(timerInterval);
    }, 95);
    intervals.push(timerInterval);

    BEAT1_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLinesShown(i + 1), 700 + i * 700));
    });

    const afterLines = 700 + BEAT1_LINES.length * 700;
    timers.push(setTimeout(() => setB1Reflection(true), afterLines + 400));
    timers.push(setTimeout(() => setArrowVisible1(true), afterLines + 1100));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [beat]);

  // Beat 2: recommendation cycling + fade-in sequence
  useEffect(() => {
    if (beat !== 2) return;
    const t1 = setTimeout(() => setB2Text(true), 400);
    const t2 = setTimeout(() => setBtnVisible(true), 1300);
    const interval = setInterval(() => {
      setRecIndex((prev) => (prev + 1) % RECS.length);
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [beat]);

  const unlockAndScroll = () => {
    if (wheelHandlerRef.current) {
      window.removeEventListener("wheel", wheelHandlerRef.current);
    }
    document.body.style.overflow = "unset";
    requestAnimationFrame(() => {
      caseStudyRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#0c1520",
        color: "#e8f0f7",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @keyframes pulse-hint {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-down {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(5px); }
        }
        @keyframes visual-swap {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <PageNav />

      <p className="scrolly-mobile-note">
        the interactive opening for this case study is available on desktop.
        this mobile version stacks the case study and visuals for easier reading.
      </p>

      {/* Skip link */}
      <a
        className="scrolly-desktop-only"
        href="#case-study"
        onClick={(e) => {
          e.preventDefault();
          unlockAndScroll();
        }}
        style={{
          position: "fixed",
          top: "5rem",
          right: "2rem",
          zIndex: 50,
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "lowercase",
          color: "#6ba3c4",
          textDecoration: "none",
          cursor: "pointer",
          opacity: 0.7,
        }}
      >
        skip to case study ↓
      </a>

      {/* ── INTRO SEQUENCE ── */}
      <div
        className="scrolly-desktop-only"
        onClick={() => {
          if (beat < 2) advance();
        }}
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          cursor: beat < 2 ? "pointer" : "default",
        }}
      >
        {/* Feed cards layer — visible beats 0 + 1, blurred in beat 1 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: beat < 2 ? 1 : 0,
            filter:
              beat === 1
                ? "blur(2px) brightness(0.45) saturate(0.7)"
                : "none",
            transition: "opacity 1s ease, filter 0.9s ease",
          }}
        >
          {FEED_CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: card.left,
                top: card.top,
                width: `${card.width}px`,
                transform: `rotate(${card.rotation}deg)`,
                opacity: i < cardCount ? 1 : 0,
                transition:
                  i < 3
                    ? "opacity 0.45s ease, transform 0.45s ease"
                    : "opacity 0.18s ease",
                background: "#0e1e2e",
                border: "1px solid rgba(107,163,196,0.22)",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
              }}
            >
              <div style={{ height: "56px", background: card.thumb }} />
              <div style={{ padding: "0.6rem 0.85rem 0.8rem" }}>
                <p
                  style={{
                    color: "#6ba3c4",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    margin: "0 0 0.2rem",
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    color: "#8fa8c0",
                    fontSize: "0.62rem",
                    margin: 0,
                    opacity: 0.65,
                  }}
                >
                  {card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── BEAT 0 — THE FEED ── */}
        <section
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            opacity: beat === 0 ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: beat === 0 ? "auto" : "none",
          }}
        >
          {/* Initial prompt */}
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              color: "#6ba3c4",
              margin: 0,
              animation: "pulse-hint 2.2s ease-in-out infinite",
              opacity: cardCount === 0 ? 0.7 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            just checking your phone for a second.
          </p>

          <p
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.28em",
              color: "#6ba3c4",
              margin: "0.75rem 0 0",
              animation: "pulse-hint 2.2s ease-in-out infinite 0.4s",
              opacity: cardCount === 0 ? 0.45 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            scroll
          </p>

          {/* Trap text — shown after all cards are placed */}
          <p
            style={{
              position: "absolute",
              bottom: "28%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.9rem",
              color: "#8fa8c0",
              fontStyle: "italic",
              whiteSpace: "nowrap",
              margin: 0,
              opacity: trapText ? 1 : 0,
              transition: "opacity 0.9s ease",
            }}
          >
            you weren&apos;t supposed to still be here.
          </p>

          <p
            style={{
              position: "absolute",
              bottom: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "1.25rem",
              color: "#6ba3c4",
              margin: 0,
              opacity: arrowVisible0 ? 1 : 0,
              transition: "opacity 0.5s ease",
              animation: arrowVisible0
                ? "bounce-down 1.5s ease-in-out infinite"
                : "none",
            }}
          >
            ↓
          </p>
        </section>

        {/* ── BEAT 1 — TIME LOSS ── */}
        <section
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            opacity: beat === 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: beat === 1 ? "auto" : "none",
          }}
        >
          {/* Radial vignette to make text readable over blurred cards */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(12,21,32,0.6) 0%, rgba(12,21,32,0.96) 68%)",
              pointerEvents: "none",
            }}
          />

          {/* Ghost timer — huge, low opacity, behind everything */}
          <p
            style={{
              position: "absolute",
              top: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(5rem, 14vw, 13rem)",
              fontWeight: 300,
              letterSpacing: "-0.06em",
              color: "rgba(107,163,196,0.055)",
              margin: 0,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 0,
            }}
          >
            {timerMin} min
          </p>

          {/* Lines */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "560px",
              textAlign: "center",
              padding: "0 2rem",
            }}
          >
            {BEAT1_LINES.map((line, i) => (
              <p
                key={i}
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                  color: "#e8f0f7",
                  lineHeight: 1.85,
                  margin: 0,
                  opacity: i < linesShown ? 1 : 0,
                  transform:
                    i < linesShown ? "translateY(0)" : "translateY(7px)",
                  transition: "opacity 0.55s ease, transform 0.55s ease",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Reflection stat */}
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "0.78rem",
              color: "#4a6a84",
              fontStyle: "italic",
              marginTop: "2rem",
              maxWidth: "380px",
              textAlign: "center",
              lineHeight: 1.7,
              opacity: b1Reflection ? 1 : 0,
              transform: b1Reflection ? "translateY(0)" : "translateY(7px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
          >
            the average person unlocks their phone 96 times a day.
          </p>

          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "1.25rem",
              color: "#6ba3c4",
              marginTop: "1.5rem",
              opacity: arrowVisible1 ? 1 : 0,
              transition: "opacity 0.5s ease",
              animation: arrowVisible1
                ? "bounce-down 1.5s ease-in-out infinite"
                : "none",
            }}
          >
            ↓
          </p>
        </section>

        {/* ── BEAT 2 — INTERRUPTION ── */}
        <section
          style={{
            position: "absolute",
            inset: 0,
            background: "#0c1520",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "2rem",
            opacity: beat === 2 ? 1 : 0,
            transition: "opacity 1.1s ease",
            pointerEvents: beat === 2 ? "auto" : "none",
          }}
        >
          {/* Recommendation card — rotating */}
          <div
            style={{
              position: "relative",
              width: "min(380px, 88vw)",
              height: "155px",
              marginBottom: "2.5rem",
            }}
          >
            {RECS.map((rec, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#e8f0f7",
                  borderRadius: "20px",
                  padding: "1.75rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  opacity: recIndex === i ? 1 : 0,
                  transition: "opacity 0.75s ease",
                  boxShadow: "0 20px 55px rgba(0,0,0,0.35)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    lineHeight: 1.2,
                    margin: 0,
                    color: "#0c1520",
                  }}
                >
                  {rec}
                </p>
                <p
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6ba3c4",
                    margin: 0,
                  }}
                >
                  today&apos;s nudge · outward
                </p>
              </div>
            ))}
          </div>

          {/* Final question */}
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "#8fa8c0",
              textAlign: "center",
              maxWidth: "400px",
              lineHeight: 1.75,
              margin: "0 0 2.25rem",
              opacity: b2Text ? 1 : 0,
              transform: b2Text ? "translateY(0)" : "translateY(7px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
          >
            what if a recommendation system wanted you to leave?
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              unlockAndScroll();
            }}
            style={{
              border: "1px solid rgba(107,163,196,0.45)",
              color: "#6ba3c4",
              backgroundColor: "transparent",
              padding: "0.75rem 2.25rem",
              borderRadius: "2px",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              cursor: "pointer",
              opacity: btnVisible ? 1 : 0,
              transition: "opacity 0.4s ease, border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(107,163,196,0.9)";
              e.currentTarget.style.color = "#a8cbdf";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(107,163,196,0.45)";
              e.currentTarget.style.color = "#6ba3c4";
            }}
          >
            enter the case study →
          </button>
        </section>
      </div>

      {/* ── EDITORIAL CASE STUDY ── */}
      <div ref={caseStudyRef} id="case-study">
        <main
          style={{
            minHeight: "100vh",
            background:
              "radial-gradient(circle at top right, #0e1f30 0%, #0c1520 45%, #080d12 100%)",
            color: "#e8f0f7",
            fontFamily: "var(--font-sans)",
          }}
        >
          {/* Hero */}
          <section
            className="scrolly-case-hero"
            style={{
              minHeight: "100vh",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.85fr) minmax(360px, 1fr)",
              gap: "4rem",
              alignItems: "center",
              padding: "9rem 8vw 6rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#6ba3c4",
                  fontSize: "0.7rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                outward / case study
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(4rem, 8vw, 7.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: "-0.06em",
                  maxWidth: "7ch",
                  margin: 0,
                }}
              >
                one small push.
              </h1>
            </div>

            <div
              className="scrolly-case-summary"
              style={{
                borderLeft: "1px solid rgba(232,240,247,0.16)",
                paddingLeft: "2rem",
              }}
            >
              <p style={{ color: "#8fa8c0", lineHeight: 1.85 }}>
                an AI-powered daily activity companion designed to interrupt
                passive scrolling by offering one intentional nudge toward the
                world beyond the screen.
              </p>

              <a
                href="https://outwwward.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(107,163,196,0.45)",
                  color: "#e8f0f7",
                  textDecoration: "none",
                  padding: "0.72rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "lowercase",
                  marginTop: "1.25rem",
                }}
              >
                view live project ↗
              </a>

              <div
                className="scrolly-case-meta"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                  marginTop: "2rem",
                  fontSize: "0.72rem",
                  color: "#5a7a94",
                }}
              >
                <Meta label="year" value="2026" />
                <Meta label="role" value="sole developer & designer" />
                <Meta label="stack" value="Next.js · Gemini API · Vercel" />
                <Meta
                  label="type"
                  value="AI activity companion / behavioral design tool"
                />
              </div>
            </div>
          </section>

          <OutwardResearchSection />

          {/* Scrollytelling */}
          <section
            className="scrolly-desktop-only"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(360px, 1.1fr)",
              gap: "5rem",
              padding: "4rem 8vw 8rem",
            }}
          >
            {/* Left: scenes */}
            <div>
              {SCENES.map((scene, index) => (
                <div
                  key={scene.title}
                  ref={(el) => {
                    sceneRefs.current[index] = el;
                  }}
                  style={{
                    minHeight: "104vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    opacity: activeScene === index ? 1 : 0.2,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <p
                    style={{
                      color: "#6ba3c4",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    {scene.eyebrow}
                  </p>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.95rem, 3.35vw, 3.65rem)",
                      fontWeight: 300,
                      lineHeight: 1.08,
                      letterSpacing: "-0.025em",
                      maxWidth: "15ch",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {scene.title}
                  </h2>

                  {scene.cta ? (
                    <a
                      href="https://outwwward.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-start",
                        border: "1px solid rgba(107,163,196,0.45)",
                        color: "#e8f0f7",
                        textDecoration: "none",
                        padding: "0.72rem 1rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "lowercase",
                      }}
                    >
                      view live project ↗
                    </a>
                  ) : (
                    <p
                      style={{
                        color: "#8fa8c0",
                        lineHeight: 1.85,
                        maxWidth: "520px",
                        fontSize: "1rem",
                      }}
                    >
                      {scene.body}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right: sticky visual */}
            <div
              style={{
                position: "sticky",
                top: "6.35rem",
                height: "calc(100vh - 6.35rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "start",
              }}
            >
              <div
                key={activeScene}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "visual-swap 0.28s ease both",
                }}
              >
                <OutwardVisual activeScene={activeScene} />
              </div>
            </div>
          </section>

          <section className="scrolly-mobile-stack">
            {SCENES.map((scene, index) => (
              <div key={scene.title} className="scrolly-mobile-section">
                <div>
                  <p
                    style={{
                      color: "#6ba3c4",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      margin: "0 0 0.8rem",
                    }}
                  >
                    {scene.eyebrow}
                  </p>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 13vw, 3.15rem)",
                      fontWeight: 300,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      margin: "0 0 1rem",
                    }}
                  >
                    {scene.title}
                  </h2>

                  {scene.cta ? (
                    <a
                      href="https://outwwward.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(107,163,196,0.45)",
                        color: "#e8f0f7",
                        textDecoration: "none",
                        padding: "0.72rem 1rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "lowercase",
                      }}
                    >
                      view live project ↗
                    </a>
                  ) : (
                    <p
                      style={{
                        color: "#8fa8c0",
                        lineHeight: 1.75,
                        fontSize: "0.95rem",
                        margin: 0,
                      }}
                    >
                      {scene.body}
                    </p>
                  )}
                </div>

                <div className="scrolly-mobile-visual">
                  <OutwardVisual activeScene={index} />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ color: "#6ba3c4", margin: "0 0 0.35rem" }}>{label}</p>
      <p style={{ margin: 0 }}>{value}</p>
    </div>
  );
}

function OutwardResearchSection() {
  return (
    <section
      style={{
        padding: "8rem 8vw",
        borderTop: "1px solid rgba(107,163,196,0.1)",
      }}
    >
      <p
        style={{
          color: "#6ba3c4",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          margin: "0 0 4rem",
        }}
      >
        research
      </p>

      <div
        className="scrolly-research-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: "5rem",
          rowGap: "0",
        }}
      >
        {RESEARCH_ITEMS.map((item) => (
          <div
            key={item.category}
            style={{
              borderTop: "1px solid rgba(107,163,196,0.18)",
              paddingTop: "2rem",
              paddingBottom: "2.75rem",
            }}
          >
            <p
              style={{
                color: "#6ba3c4",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 1rem",
              }}
            >
              {item.category}
            </p>

            <p
              style={{
                color: "#8fa8c0",
                fontSize: "0.875rem",
                lineHeight: 1.82,
                margin: "0 0 1.75rem",
              }}
            >
              {item.body}
            </p>

            <a
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                borderTop: "1px solid rgba(107,163,196,0.1)",
                paddingTop: "1rem",
              }}
            >
              <p
                style={{
                  color: "#3a5a74",
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 0.3rem",
                }}
              >
                {item.sourceLabel}
              </p>
              <p
                style={{
                  color: "#c8dce8",
                  fontSize: "0.8rem",
                  margin: "0 0 0.2rem",
                  letterSpacing: "0.01em",
                }}
              >
                {item.sourceTitle}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "#3a5a74", fontSize: "0.72rem", margin: 0 }}>
                  {item.sourceOrg}
                </p>
                <span style={{ color: "#6ba3c4", fontSize: "0.72rem" }}>↗</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutwardVisual({ activeScene }: { activeScene: number }) {
  if (activeScene === 0) {
    return (
      <SuggestionImageVisual
        src="/outward suggestions/outward 1.jpg"
        alt="Outward app suggestion screen"
      />
    );
  }
  if (activeScene === 1) {
    return (
      <AccompanyingImageVisual
        src="/outward suggestions/agency img.jpg"
        alt="Agency concept image"
        aspectRatio="1177 / 761"
      />
    );
  }
  if (activeScene === 2) return <AttentionVisual />;
  if (activeScene === 3) {
    return (
      <AccompanyingImageVisual
        src="/outward suggestions/music rec.jpg"
        alt="Music recommendation image"
        aspectRatio="625 / 520"
      />
    );
  }
  if (activeScene === 4) {
    return (
      <StackedImageVisual
        primary={{
          src: "/outward suggestions/outward taste.png",
          alt: "Outward taste suggestion",
          aspectRatio: "1564 / 246",
        }}
        secondary={{
          src: "/outward suggestions/taste add.jpg",
          alt: "Taste supporting image",
          aspectRatio: "664 / 327",
        }}
      />
    );
  }
  if (activeScene === 5) return <WindowVisual />;
  if (activeScene === 6) {
    return (
      <AccompanyingImageVisual
        src="/outward suggestions/close app.png"
        alt="Close app prompt"
        aspectRatio="1199 / 879"
      />
    );
  }
  if (activeScene === 7) return <ReflectionVisual />;
  return <OutwardPreviewVisual />;
}

function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "min(680px, 95%)",
        aspectRatio: "1.25 / 1",
        position: "relative",
        border: "1px solid rgba(107,163,196,0.14)",
        borderRadius: "28px",
        background:
          "radial-gradient(circle at 70% 20%, rgba(107,163,196,0.14), transparent 45%), #0c1824",
        boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function SuggestionImageVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        width: "min(560px, 88%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        transform: "translateY(-2.5rem)",
      }}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          aspectRatio: "750 / 370",
          alignSelf: "flex-start",
          position: "relative",
          border: "1px solid rgba(107,163,196,0.14)",
          borderRadius: "18px",
          backgroundColor: "#f4ecec",
          boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 86vw, 520px"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          width: "min(190px, 38vw)",
          marginTop: "-0.45rem",
          marginRight: "0.75rem",
          position: "relative",
          border: "1px solid rgba(107,163,196,0.14)",
          borderRadius: "16px",
          backgroundColor: "#050a0f",
          boxShadow: "0 18px 50px rgba(0,0,0,0.44)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pinimg.com/736x/46/9c/21/469c2173dbc971117d429139273c6a32.jpg"
          alt="Bjork in a field"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

function AccompanyingImageVisual({
  src,
  alt,
  aspectRatio,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
}) {
  return (
    <div
      style={{
        width: "min(500px, 84%)",
        aspectRatio,
        position: "relative",
        border: "1px solid rgba(107,163,196,0.14)",
        borderRadius: "18px",
        backgroundColor: "#050a0f",
        boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 84vw, 500px"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}

function AttentionVisual() {
  const items = Array.from({ length: 6 });
  return (
    <VisualShell>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "140px",
          height: "270px",
          borderRadius: "22px",
          background: "#050a0f",
          border: "1px solid rgba(107,163,196,0.18)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "1rem 0.75rem" }}>
          {items.map((_, i) => (
            <div key={i} style={{ marginBottom: "0.6rem" }}>
              <div
                style={{
                  height: "56px",
                  borderRadius: "6px",
                  background: `rgba(107,163,196,${0.08 + i * 0.02})`,
                  marginBottom: "0.4rem",
                }}
              />
              <div
                style={{
                  height: "6px",
                  width: "70%",
                  borderRadius: "3px",
                  background: "rgba(143,168,192,0.18)",
                  marginBottom: "0.25rem",
                }}
              />
              <div
                style={{
                  height: "6px",
                  width: "50%",
                  borderRadius: "3px",
                  background: "rgba(143,168,192,0.1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#6ba3c4",
          fontSize: "0.68rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          opacity: 0.7,
        }}
      >
        scroll continues forever ↓
      </p>
    </VisualShell>
  );
}

function OutwardPreviewVisual() {
  return (
    <div
      style={{
        width: "min(560px, 88%)",
        aspectRatio: "16 / 10",
        position: "relative",
        border: "1px solid rgba(107,163,196,0.14)",
        borderRadius: "22px",
        backgroundColor: "#050a0f",
        boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
        overflow: "hidden",
      }}
    >
      <video
        src="/outward preview.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function StackedImageVisual({
  primary,
  secondary,
}: {
  primary: { src: string; alt: string; aspectRatio: string };
  secondary: { src: string; alt: string; aspectRatio: string };
}) {
  return (
    <div
      style={{
        width: "min(620px, 92%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: primary.aspectRatio,
          alignSelf: "flex-start",
          position: "relative",
          transform: "rotate(-1.4deg)",
          border: "1px solid rgba(107,163,196,0.14)",
          borderRadius: "18px",
          backgroundColor: "#050a0f",
          boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
          overflow: "hidden",
        }}
      >
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes="(max-width: 900px) 88vw, 560px"
          style={{
            objectFit: "contain",
            transform: "translate(-0.15%, -0.45%) scale(1.045)",
          }}
        />
      </div>

      <div
        style={{
          width: "min(260px, 48vw)",
          aspectRatio: secondary.aspectRatio,
          marginTop: "0.8rem",
          marginRight: "0.5rem",
          position: "relative",
          border: "1px solid rgba(107,163,196,0.14)",
          borderRadius: "16px",
          backgroundColor: "#050a0f",
          boxShadow: "0 18px 50px rgba(0,0,0,0.44)",
          overflow: "hidden",
        }}
      >
        <Image
          src={secondary.src}
          alt={secondary.alt}
          fill
          sizes="(max-width: 900px) 48vw, 260px"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}

function WindowVisual() {
  return (
    <VisualShell>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #5b93b8 0%, #8ab8d4 28%, #c4d9e8 55%, #e8efe8 78%, rgba(12,24,36,0.8) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "18%",
          right: "18%",
          top: "12%",
          bottom: "20%",
          border: "2px solid rgba(232,240,247,0.55)",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "18%",
          right: "18%",
          top: "67%",
          height: "1px",
          background: "rgba(232,240,247,0.3)",
        }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(232,240,247,0.55)",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        golden hour · 5:42 pm
      </p>
    </VisualShell>
  );
}

function ReflectionVisual() {
  const images = [
    {
      src: "/outward suggestions/outward go.png",
      alt: "Outward go suggestion",
      aspectRatio: "748 / 772",
      width: "42%",
      rotate: "-2deg",
    },
    {
      src: "/outward suggestions/outward listen.png",
      alt: "Outward listen suggestion",
      aspectRatio: "746 / 772",
      width: "42%",
      rotate: "2.5deg",
    },
    {
      src: "/outward suggestions/outward read.png",
      alt: "Outward read suggestion",
      aspectRatio: "1558 / 570",
      width: "74%",
      rotate: "-1deg",
    },
  ];

  return (
    <div
      style={{
        width: "min(560px, 88%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "0.9rem",
        }}
      >
        {images.slice(0, 2).map((image) => (
          <div
            key={image.src}
            style={{
              width: image.width,
              aspectRatio: image.aspectRatio,
              position: "relative",
              transform: `rotate(${image.rotate})`,
              border: "1px solid rgba(107,163,196,0.14)",
              borderRadius: "18px",
              backgroundColor: "#eef1ed",
              boxShadow: "0 18px 54px rgba(0,0,0,0.42)",
              overflow: "hidden",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 900px) 38vw, 235px"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          width: images[2].width,
          aspectRatio: images[2].aspectRatio,
          position: "relative",
          transform: `translateX(1.2rem) rotate(${images[2].rotate})`,
          border: "1px solid rgba(107,163,196,0.14)",
          borderRadius: "18px",
          backgroundColor: "#eef1ed",
          boxShadow: "0 18px 54px rgba(0,0,0,0.42)",
          overflow: "hidden",
        }}
      >
        <Image
          src={images[2].src}
          alt={images[2].alt}
          fill
          sizes="(max-width: 900px) 68vw, 415px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
