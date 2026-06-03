"use client";

import { useEffect, useRef, useState } from "react";
import { PageNav } from "@/components/page-nav";
import Image from "next/image";

const SCENES = [
  {
    eyebrow: "01 / problem",
    title: "the phone became the default companion.",
    body: "This project began with a simple observation: even at dinner, even with other people, the phone is always available as an escape hatch. It fills silence, boredom, waiting, awkwardness, and the tiny pauses that used to belong to the table.",
  },
  {
    eyebrow: "02 / question",
    title: "what could compete with the phone?",
    body: "A phone ban feels punitive. It asks people to give something up without offering anything compelling in return. The question became: what is the only meaningful alternative to phone use at a table? Presence, connection, and something tactile enough to interrupt the reflex.",
  },
  {
    eyebrow: "03 / research",
    title: "we designed for the gap moments.",
    body: "Through fly-on-the-wall observation in cafés and restaurants, we focused on the moments when people instinctively reach for their phones: waiting for food, waiting for the check, sitting through a lull, or losing momentum in conversation.",
  },
  {
    eyebrow: "04 / intervention",
    title: "prompt cards as the threshold.",
    body: "The cards became the transformation. Instead of removing the phone through shame or restriction, #unplugged offers a physical replacement: a small analog object that gives people something else to reach for.",
  },
  {
    eyebrow: "05 / system",
    title: "solo, group, and stranger-to-stranger.",
    body: "The system works across three modes: solo reflection, group conversation, and asynchronous exchange between diners. A table can use the cards privately, contribute permanent prompts, or leave seat-specific notes for future guests.",
  },
  {
    eyebrow: "06 / brand",
    title: "analog, warm, deliberately not tech.",
    body: "The visual language avoids the clean, frictionless aesthetic of the digital products it critiques. It is tactile, imperfect, printed, and warm — closer to a deck of cards, a café zine, or something passed across a table.",
  },
  {
    eyebrow: "07 / reflection",
    title: "intentional friction can be generous.",
    body: "This project reminded me that UX does not have to happen on a screen. Sometimes the best-designed interaction is the one that helps someone look away from the interface entirely.",
  },
];

export default function UnpluggedPage() {
  const [activeScene, setActiveScene] = useState(0);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #2a2117 0%, #12100d 42%, #090807 100%)",
        color: "#f5efe6",
        fontFamily: "var(--font-sans)",
      }}
    >
      <PageNav />

      <section
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
              color: "#d16f4c",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            #unplugged / case study
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 5.2vw, 5.8rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              maxWidth: "10ch",
              margin: 0,
            }}
          >
            the interface between us.
          </h1>
        </div>

        <div
          style={{
            borderLeft: "1px solid rgba(245,239,230,0.18)",
            paddingLeft: "2rem",
          }}
        >
          <p style={{ color: "#c8b8a7", lineHeight: 1.85 }}>
            A tactile service design intervention that replaces the phone at the
            dinner table with prompt cards designed to reclaim presence.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginTop: "2rem",
              fontSize: "0.72rem",
              color: "#8f8172",
            }}
          >
            <Meta label="year" value="2026" />
            <Meta label="role" value="designer & researcher" />
            <Meta label="class" value="Research & Development Methods" />
            <Meta label="stack" value="service design / prompt cards / physical prototype" />
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(360px, 1.1fr)",
          gap: "5rem",
          padding: "4rem 8vw 8rem",
        }}
      >
        <div>
          {SCENES.map((scene, index) => (
            <div
              key={scene.title}
              ref={(el) => {
                sceneRefs.current[index] = el;
              }}
              style={{
                minHeight: "92vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: activeScene === index ? 1 : 0.22,
                transition: "opacity 0.4s ease",
              }}
            >
              <p
                style={{
                  color: "#d16f4c",
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

              <p
                style={{
                  color: "#c8b8a7",
                  lineHeight: 1.85,
                  maxWidth: "560px",
                  fontSize: "1rem",
                }}
              >
                {scene.body}
              </p>
            </div>
          ))}
        </div>

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
          <UnpluggedVisual activeScene={activeScene} />
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ color: "#d16f4c", margin: "0 0 0.35rem" }}>{label}</p>
      <p style={{ margin: 0 }}>{value}</p>
    </div>
  );
}

function UnpluggedVisual({ activeScene }: { activeScene: number }) {
  if (activeScene === 0) {
    return (
      <UnpluggedImageVisual
        src="/rd methods/main visual.png"
        alt="#unplugged table concept"
        aspectRatio="555 / 326"
      />
    );
  }
  if (activeScene === 1) {
    return (
      <UnpluggedImageVisual
        src="/rd methods/Group 4.png"
        alt="#unplugged research board"
        aspectRatio="8369 / 5399"
      />
    );
  }
  if (activeScene === 2) {
    return (
      <UnpluggedImageVisual
        src="/rd methods/Group 6.png"
        alt="#unplugged observation synthesis"
        aspectRatio="14439 / 10445"
      />
    );
  }
  if (activeScene === 3) {
    return (
      <UnpluggedImageVisual
        src="/rd methods/Group 15.png"
        alt="#unplugged prompt card prototype"
        aspectRatio="473 / 353"
      />
    );
  }
  if (activeScene === 4) return <UnpluggedSystemVisual />;
  if (activeScene === 5) {
    return (
      <UnpluggedImageVisual
        src="/rd methods/brand kit.png"
        alt="#unplugged brand kit"
        aspectRatio="3534 / 2907"
      />
    );
  }
  return (
    <UnpluggedImageVisual
      src="/unplugged preview.png"
      alt="#unplugged project preview"
      aspectRatio="1 / 1"
    />
  );
}

function UnpluggedImageVisual({
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
        width: "min(560px, 88%)",
        aspectRatio,
        position: "relative",
        border: "1px solid rgba(245,239,230,0.16)",
        borderRadius: "22px",
        backgroundColor: "#18130f",
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 88vw, 560px"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

function UnpluggedSystemVisual() {
  return (
    <div
      style={{
        width: "min(520px, 84%)",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "0.85rem",
      }}
    >
      {[
        ["solo", "reflection"],
        ["group", "conversation"],
        ["stranger", "asynchronous exchange"],
      ].map(([label, value], i) => (
        <div
          key={label}
          style={{
            minHeight: "12rem",
            borderRadius: "18px",
            border: "1px solid rgba(245,239,230,0.18)",
            backgroundColor: i === 1 ? "#f5efe6" : "rgba(245,239,230,0.08)",
            color: i === 1 ? "#18130f" : "#f5efe6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            transform: `rotate(${[-1.2, 0.9, -0.7][i]}deg)`,
            boxShadow: "0 14px 38px rgba(0,0,0,0.32)",
          }}
        >
          <p style={{ color: i === 1 ? "#d16f4c" : "#d16f4c", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {label}
          </p>
          <p style={{ margin: 0 }}>{value}</p>
        </div>
      ))}
    </div>
  );
}
