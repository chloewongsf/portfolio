"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PageNav } from "@/components/page-nav";
import Image from "next/image";

const RECEIPTS = [
  { rotation: -2, tx: 0, ty: 0 },
  { rotation: 3, tx: 15, ty: -8 },
  { rotation: -5, tx: -10, ty: 5 },
  { rotation: 2, tx: 8, ty: -12 },
  { rotation: -3, tx: -5, ty: 8 },
  { rotation: 4, tx: 12, ty: -5 },
  { rotation: -1, tx: -8, ty: 3 },
];

const BEAT1_CONTENT: { type: "label" | "line"; text: string }[] = [
  { type: "label", text: "but that's not really what this is about." },
  { type: "line", text: "you waited around 5 minutes for that." },
  { type: "line", text: "standing there, absentmindedly scrolling on your phone." },
  { type: "line", text: "sometimes you wait even longer, depending on the line." },
  { type: "line", text: "how many posts on instagram did you scroll past during that time?" },
  { type: "line", text: "do you even remember the second to last post you looked at?" },
];

function TaaraEditorialCaseStudy() {
  return (
    <main style={{ backgroundColor: "#000000", color: "#f2f2f2" }}>
      <section
        className="scrolly-case-hero"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "4rem",
          alignItems: "center",
          padding: "8rem 8vw",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#3a7878",
              marginBottom: "1rem",
            }}
          >
            taara / case study
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
            an argument for slowing down, in tumbler form.
          </h1>
        </div>

        <div
          className="scrolly-case-summary"
          style={{
            borderLeft: "1px solid rgba(242,242,242,0.18)",
            paddingLeft: "2rem",
            maxWidth: "520px",
          }}
        >
          <p style={{ lineHeight: 1.8, color: "#b8b8b8", fontSize: "1rem" }}>
            Taara is a ritual system for chai: part insulated tumbler, part
            refillable pod system, part attempt to make preparation feel possible
            again inside a life optimized for speed.
          </p>

          <div
            className="scrolly-case-meta"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginTop: "2rem",
              fontSize: "0.7rem",
              color: "#777",
            }}
          >
            <div>
              <p style={{ color: "#3a7878", margin: "0 0 0.35rem" }}>year</p>
              <p style={{ margin: 0 }}>2025</p>
            </div>
            <div>
              <p style={{ color: "#3a7878", margin: "0 0 0.35rem" }}>role</p>
              <p style={{ margin: 0 }}>designer</p>
            </div>
            <div>
              <p style={{ color: "#3a7878", margin: "0 0 0.35rem" }}>made at</p>
              <p style={{ margin: 0 }}>Parsons Paris</p>
            </div>
            <div>
              <p style={{ color: "3a7878", margin: "0 0 0.35rem" }}>stack</p>
              <p style={{ margin: 0 }}>product / brand / ritual system</p>
            </div>
          </div>
        </div>
      </section>

      <TaaraRitualScroll />
      <TaaraBrandSection />
      <TaaraReflectionSection />
    </main>
  );
}

function TaaraRitualScroll() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      eyebrow: "01 / problem",
      title: "ritual is disappearing",
      body: "modern life keeps asking us to become more efficient. faster mornings, faster purchases, faster habits, faster work ethic. but in all that compression, we end up losing the small rituals that help us feel connected to ourselves begin to disappear.",
    },
    {
      eyebrow: "02 / question",
      title: "can ritual survive contemporary life?",
      body: "how might ritual survive contemporary life without losing what makes it meaningful?",
    },
    {
      eyebrow: "03 / chai is but one answer. why?",
      title: "chai hasn't been captured yet!",
      body: "matcha got absorbed by the the 'clean girl' aesthetic. it's earthy green, photogenic, 'instagrammable', and just exotic enough to feel elevated without being bizarre. but in that process, the cultural heritage that made it meaningful in the first place became harder to find. thus, i chose chai because it has not been captured and erased in the same way yet. and then, most importantly, i had to make sure i was not the one doing to chai what others did to matcha.",
    },
    {
      eyebrow: "04 / the thing",
      title: "One ritual, two ways.",
      body: "taara is a system that compresses the ritual of preparing chai into something that survives modern and rushed commuter life without stripping it of what makes it maeaningful.",
    },
    {
      eyebrow: "05 / how it works",
      title: "slow at home, abbreviated for on-the-go.",
      body: "at home, with time, you are meant to prepare it at your own pace. but for people like me who have five minutes to spare before class, i need something that saves me money while giving me a sense of peacefulness and wellness in my day. i live by routine. if i do not wake up and follow a certain rhythm, i find it hard to adjust to the day. rituals like this cannot be erased, otherwise it feels like i have become a slave to time.",
    },
    {
      eyebrow: "06 / harder questions",
      title: "proof of possibility is not permission.",
      body: "i could see it happening: the same trajectory matcha took, the same aesthetic capture and same stripping of context. therefore, and i was aware that by building a product around chai, i could be part of that process if i wasn't careful. for instance, imagine telling someone in china during the tang dynasty, where matcha's origins can be traced, about the 'performative matcha male' trend.",
    },
    {
      eyebrow: "07 / business reality",
      title: "a ritual system still has to work as a product.",
      body: "taara uses a starter kit and refill model: the tumbler is the long-term object, while pods, tins, and pouches create the recurring system around it. the global chai market is growing, and matcha proved that ritual beverages can become lifestyle brands. using the same market conditions matcha created, taara is an attempt to do it differently."
    },
    {
      eyebrow: "08 / seasonal collections",
      title: "seasonal drops keep the ritual returning.",
      body: "seasonal collections give taara a way to generate additional recurring revenue throughout the year. each drop can reinterpret chai through a different mood, flavor profile, and visual world while keeping the core ritual system recognizable.",
    },
  ];

  useEffect(() => {
    const updateActiveStep = () => {
      const viewportTarget = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportTarget);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveStep(closestIndex);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <>
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
      <div>
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            style={{
              minHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              opacity: activeStep === index ? 1 : 0.22,
              transition: "opacity 0.4s ease",
            }}
          >
            <p
              style={{
                color: "#3a7878",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {step.eyebrow}
            </p>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.95rem, 3.35vw, 3.65rem)",
                letterSpacing: "-0.025em",
                maxWidth: "15ch",
                fontWeight: 300,
                lineHeight: 1.08,
                margin: "0 0 1.25rem",
              }}
            >
              {step.title}
            </h2>

            <p
              style={{
                color: "#b8b8b8",
                lineHeight: 1.8,
                maxWidth: "520px",
                fontSize: "1rem",
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TaaraStickyVisual activeStep={activeStep} />
      </div>
    </section>
    <section className="scrolly-mobile-stack">
      {steps.map((step, index) => (
        <div key={step.title} className="scrolly-mobile-section">
          <div>
            <p
              style={{
                color: "#3a7878",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                margin: "0 0 0.8rem",
              }}
            >
              {step.eyebrow}
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
              {step.title}
            </h2>

            <p
              style={{
                color: "#b8b8b8",
                lineHeight: 1.75,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              {step.body}
            </p>
          </div>

          <div className="scrolly-mobile-visual">
            <TaaraStickyVisual activeStep={index} />
          </div>
        </div>
      ))}
    </section>
    </>
  );
}

function TaaraStickyVisual({ activeStep }: { activeStep: number }) {
  if (activeStep === 0) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara 1.jpg"
        alt="Taara problem visual"
        aspectRatio="500 / 390"
      />
    );
  }
  if (activeStep === 1) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara 2.jpg"
        alt="Taara question visual"
        aspectRatio="658 / 466"
      />
    );
  }
  if (activeStep === 2) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara-mockup-4.png"
        alt="Taara mockup"
        aspectRatio="2346 / 1564"
      />
    );
  }
  if (activeStep === 3) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara-mockup-2.png"
        alt="Taara product mockup"
        aspectRatio="2924 / 1950"
      />
    );
  }
  if (activeStep === 4) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara 4.jpg"
        alt="Taara system visual"
        aspectRatio="959 / 656"
      />
    );
  }
  if (activeStep === 5) {
    return (
      <TaaraImageVisual
        src="/taara assets/taara 3.jpg"
        alt="Taara harder questions visual"
        aspectRatio="941 / 695"
      />
    );
  }
  if (activeStep === 6) return <BusinessVisual />;
  return <SeasonalCollectionsVisual />;
}

function TaaraImageVisual({
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
        border: "1px solid rgba(242,242,242,0.12)",
        borderRadius: "22px",
        backgroundColor: "#14110d",
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

function BusinessVisual() {
  const images = [
    {
      src: "/taara assets/taara-ritual-pods.png",
      alt: "Taara ritual pods",
      aspectRatio: "3654 / 1152",
    },
    {
      src: "/taara assets/taara-tumblers.png",
      alt: "Taara tumblers",
      aspectRatio: "3132 / 1376",
    },
    {
      src: "/taara assets/taara-canisters.png",
      alt: "Taara canisters",
      aspectRatio: "2984 / 1408",
    },
  ];

  return (
    <div
      style={{
        width: "min(460px, 76%)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        transform: "translateY(1.2rem)",
      }}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          style={{
            width: index === 0 ? "88%" : index === 1 ? "76%" : "70%",
            aspectRatio: image.aspectRatio,
            alignSelf: index === 1 ? "flex-end" : "flex-start",
            position: "relative",
            transform: `rotate(${[-0.8, 0.8, -0.6][index]}deg)`,
            border: "1px solid rgba(242,242,242,0.12)",
            borderRadius: "14px",
            backgroundColor: "#14110d",
            boxShadow: "0 12px 32px rgba(0,0,0,0.34)",
            overflow: "hidden",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 76vw, 460px"
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}

function SeasonalCollectionsVisual() {
  const seasons = [
    { src: "/taara assets/taara-spring.png", label: "spring", aspectRatio: "874 / 582" },
    { src: "/taara assets/taara-summer.png", label: "summer", aspectRatio: "874 / 582" },
    { src: "/taara assets/taara-fall.png", label: "fall", aspectRatio: "874 / 582" },
    { src: "/taara assets/taara-winter.png", label: "winter", aspectRatio: "874 / 582" },
  ];

  return (
    <div
      style={{
        width: "min(500px, 78%)",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "0.65rem",
        transform: "translateY(0.8rem)",
      }}
    >
      {seasons.map((season, index) => (
        <div
          key={season.label}
          style={{
            position: "relative",
            aspectRatio: season.aspectRatio,
            transform: `rotate(${[-0.8, 0.8, -0.6, 0.6][index]}deg)`,
            border: "1px solid rgba(242,242,242,0.12)",
            borderRadius: "14px",
            backgroundColor: "#14110d",
            boxShadow: "0 12px 32px rgba(0,0,0,0.34)",
            overflow: "hidden",
          }}
        >
          <Image
            src={season.src}
            alt={`Taara ${season.label} collection`}
            fill
            sizes="(max-width: 900px) 39vw, 245px"
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}

function TaaraBrandSection() {
  return (
    <section
      style={{
        padding: "8rem 8vw",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
        gap: "4rem",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            color: "#3a7878",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          brand identity
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
          warm, material, seasonal.
        </h2>

        <p style={{ color: "#b8b8b8", lineHeight: 1.8 }}>
          The visual language of Taara is spice-toned and easy on the eyes:
          warm enough to feel domestic, structured enough to work as a product
          system, and flexible enough to carry seasonal collections without
          losing recognition.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          aspectRatio: "2880 / 1620",
          border: "1px solid rgba(242,242,242,0.12)",
          borderRadius: "22px",
          backgroundColor: "#14110d",
          boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/taara assets/taara-brand-identity.png"
          alt="Taara brand identity system"
          fill
          sizes="(max-width: 900px) 92vw, 760px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}

function TaaraReflectionSection() {
  return (
    <section
      style={{
        padding: "8rem 8vw 10rem",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
        gap: "4rem",
        alignItems: "start",
      }}
    >
      <div>
        <p
          style={{
            color: "#3a7878",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          reflection
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.95rem, 3.35vw, 3.65rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: "15ch",
            margin: 0,
          }}
        >
          ritual keeps us connected.
        </h2>

        <div
          style={{
            position: "relative",
            width: "min(360px, 100%)",
            aspectRatio: "960 / 408",
            marginTop: "1.5rem",
            border: "1px solid rgba(242,242,242,0.12)",
            borderRadius: "16px",
            backgroundColor: "#14110d",
            boxShadow: "0 14px 38px rgba(0,0,0,0.34)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/taara assets/ritual.jpg"
            alt="Taara ritual detail"
            fill
            sizes="(max-width: 900px) 80vw, 360px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div style={{ color: "#b8b8b8", lineHeight: 1.9, fontSize: "1rem" }}>
        <p>
          Ritual is one of the only ways in this world that allows us to remain
          connected with ourselves.
        </p>
        <p>
          Various cultures have their own practices, routines, and rituals, and
          these things connect us to the origins of those practices themselves,
          thereby connecting us to the people who have all been a part of them.
          in a world that continues to become more efficient and more optimized
          for convenience, we slowly lose what is actually valuable about living.
        </p>
        <p>
          life without other people and those who have come before is meaningless.
          meaning is often derived from even the smallest everyday things:
          routines, preparation, repetition, care. a chai ritual might seem
          insignificant, but those small rituals are often what keep us connected
          to ourselves, to others, and to the pace of life we actually want to
          live at.
        </p>
        <p>
          overall, as a designer i am a steward of the rituals that I engage with. There is a
          line between adapting a ritual for a busy person and stripping it of
          its context, and Taara is an attempt to walk it.
        </p>
      </div>
    </section>
  );
}

export default function TaaraPage() {
  const [beat, setBeat] = useState(0);
  const [receiptCount, setReceiptCount] = useState(0);

  const [textVisible, setTextVisible] = useState(false);
  const [arrowVisible0, setArrowVisible0] = useState(false);

  const [linesShown, setLinesShown] = useState(0);
  const [reflectionVisible, setReflectionVisible] = useState(false);
  const [arrowVisible1, setArrowVisible1] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const formattedTimer = `${Math.floor(timerSeconds / 60)}:${String(
    timerSeconds % 60
  ).padStart(2, "0")}`;

  const [pivotVisible, setPivotVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  const caseStudyRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | undefined>(undefined);

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

  const advance = useCallback(() => {
    if (cooldownRef.current) return;

    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 600);

    if (beat === 0) {
      if (receiptCount < 3) {
        setReceiptCount((prev) => prev + 1);
      } else if (textVisible) {
        setTimerSeconds(0);
        setLinesShown(0);
        setReflectionVisible(false);
        setArrowVisible0(false);
        setBeat(1);
      }
    } else if (beat === 1 && reflectionVisible) {
      setBeat(2);
    }
  }, [beat, receiptCount, textVisible, reflectionVisible]);

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

  useEffect(() => {
    if (receiptCount < 3) return;

    const t1 = setTimeout(() => setTextVisible(true), 400);
    const t2 = setTimeout(() => setArrowVisible0(true), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [receiptCount]);

  useEffect(() => {
    if (beat !== 1) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    BEAT1_CONTENT.forEach((_, i) => {
      timers.push(setTimeout(() => setLinesShown(i + 1), i * 450));
    });

    const afterLines = BEAT1_CONTENT.length * 450;

    const fastTimer = setInterval(() => {
      setTimerSeconds((prev) => Math.min(prev + 7, 300));
    }, 35);

    intervals.push(fastTimer);

    timers.push(
      setTimeout(() => {
        clearInterval(fastTimer);
        setTimerSeconds(300);
        setReflectionVisible(true);
      }, afterLines + 700)
    );

    timers.push(setTimeout(() => setArrowVisible1(true), afterLines + 1300));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    }
  }, [beat]);

  useEffect(() => {
    if (beat !== 2) return;

    const t1 = setTimeout(() => setPivotVisible(true), 100);
    const t2 = setTimeout(() => setBtnVisible(true), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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

  const receiptVisible = (i: number) => {
    if (i === 0) return receiptCount >= 1;
    if (i === 1) return receiptCount >= 2;
    return receiptCount >= 3;
  };

  const receiptTransition = (i: number) =>
    i >= 2
      ? "opacity 0.15s ease, transform 0.15s ease"
      : "opacity 0.5s ease, transform 0.5s ease";

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#f2f2f2",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @keyframes bounce-down {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(5px); }
        }

        @keyframes pulse-hint {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 800px) {
          section {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <PageNav />

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
          color: "#3a7878",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        skip to case study ↓
      </a>

      <div
        className="scrolly-desktop-only"
        onClick={() => {
          if (beat !== 2) advance();
        }}
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          cursor: beat < 2 ? "pointer" : "default",
        }}
      >
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
          <p
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.5625rem",
              letterSpacing: "0.25em",
              color: "#3a7878",
              margin: 0,
              whiteSpace: "nowrap",
              animation: "pulse-hint 2s ease-in-out infinite",
              opacity: receiptCount === 0 ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          >
            scroll
          </p>

          <div style={{ position: "relative", width: "300px", height: "230px" }}>
            {RECEIPTS.map((r, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "260px",
                  backgroundColor: "#f5f0e8",
                  color: "#2a1f14",
                  borderRadius: "4px",
                  padding: "1.5rem 2rem",
                  fontSize: "0.75rem",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                  transform: `translate(-50%, -50%) rotate(${r.rotation}deg) translate(${r.tx}px, ${r.ty}px)`,
                  opacity: receiptVisible(i) ? 1 : 0,
                  transition: receiptTransition(i),
                  zIndex: i,
                }}
              >
                <p
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "#3a7878",
                    textTransform: "uppercase",
                    margin: "0 0 0.875rem",
                  }}
                >
                  pret a manger
                </p>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #c8bdb0",
                    margin: "0 0 0.875rem",
                  }}
                />

                <p style={{ margin: "0 0 0.35rem" }}>oat milk chai latte</p>
                <p style={{ margin: "0 0 0.875rem", fontWeight: 500 }}>£4.75</p>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #c8bdb0",
                    margin: "0 0 0.875rem",
                  }}
                />

                <p
                  style={{
                    fontSize: "0.625rem",
                    color: "#8a7a6a",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  thank you
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#aaaaaa",
              maxWidth: "360px",
              textAlign: "center",
              marginTop: "2rem",
              lineHeight: 1.7,
              opacity: textVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            buying this once or twice a day, every day, runs you somewhere
            between £115 and £230 a month.
          </p>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#3a7878",
              marginTop: "1.25rem",
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

        <section
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "2rem",
            opacity: beat === 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: beat === 1 ? "auto" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "13%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(4rem, 11vw, 11rem)",
              fontWeight: 300,
              color: "rgba(242,242,242,0.08)",
              letterSpacing: "-0.06em",
              pointerEvents: "none",
            }}
          >
            {formattedTimer}
          </div>

          {BEAT1_CONTENT.map((item, i) => (
            <p
              key={i}
              style={{
                fontSize:
                  item.type === "label"
                    ? "0.6rem"
                    : "clamp(1rem, 1.8vw, 1.2rem)",
                letterSpacing: item.type === "label" ? "0.2em" : undefined,
                color: item.type === "label" ? "#3a7878" : "#f2f2f2",
                textTransform: item.type === "label" ? "lowercase" : undefined,
                lineHeight: 1.9,
                textAlign: "center",
                maxWidth: "520px",
                margin: i === 0 ? "0 0 2rem" : "0",
                opacity: i < linesShown ? 1 : 0,
                transform: i < linesShown ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {item.text}
            </p>
          ))}

          <p
            style={{
              fontSize: "0.875rem",
              color: "#666666",
              fontStyle: "italic",
              marginTop: "2.5rem",
              maxWidth: "460px",
              textAlign: "center",
              lineHeight: 1.7,
              opacity: reflectionVisible ? 1 : 0,
              transform: reflectionVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            35 to 70 minutes a week just scrolling on instagram while someone
            else makes your drink that you won&apos;t even remember tasting. it&apos;s
            just habit at this point.
          </p>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#3a7878",
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

        <section
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "2rem",
            opacity: beat === 2 ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: beat === 2 ? "auto" : "none",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3vw, 3rem)",
              fontWeight: 300,
              color: "#f2f2f2",
              textAlign: "center",
              margin: 0,
              opacity: pivotVisible ? 1 : 0,
              transform: pivotVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            what if those 5 minutes were yours?
          </h2>

          <button
            onClick={(e) => {
              e.stopPropagation();
              unlockAndScroll();
            }}
            style={{
              border: "1px solid #3a7878",
              color: "#3a7878",
              backgroundColor: "transparent",
              padding: "0.75rem 2rem",
              borderRadius: "2px",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              cursor: "pointer",
              marginTop: "2.5rem",
              opacity: btnVisible ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            let&apos;s talk about that →
          </button>
        </section>
      </div>

      <div ref={caseStudyRef} id="case-study">
        <p className="scrolly-mobile-note">
          the interactive opening for this case study is available on desktop.
          this mobile version stacks the case study and visuals for easier reading.
        </p>
        <TaaraEditorialCaseStudy />
      </div>

      <footer
        style={{
          paddingTop: "4rem",
          paddingBottom: "6rem",
          textAlign: "center",
          background: "radial-gradient(circle at top, #1a160f 0%, #000000 38%, #090909 100%)",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "#444444",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          taara · parsons paris · design, development & production · 2025
        </p>
      </footer>
    </div>
  );
}
