"use client";

import { useEffect, useState } from "react";
import { PageNav } from "@/components/page-nav";
import extras from "@/content/extras.json";

const BORDER = "1px solid #2a2a2a";

function excerptFrom(body: string) {
  const firstParagraph = body.split("\n\n")[0] ?? body;
  return firstParagraph.length > 180
    ? `${firstParagraph.slice(0, 180).trim()}...`
    : firstParagraph;
}

const EMPHASIZED_PARAGRAPHS = new Set([
  "If leftist, why not devote your life to leftism?",
  "Structural privilege enables leftist belief.",
  "Why not be someone that contributes something to the world then? Be a teacher or food bank worker!",
  "My point on working within capitalism.",
  "Ultimately…",
]);

export default function ExtrasPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = extras.find((item) => item.id === selectedId);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

  return (
    <div
      style={{
        backgroundColor: "#111111",
        minHeight: "100vh",
        color: "#f2f2f2",
        fontFamily: "var(--font-sans)",
      }}
    >
      <PageNav />

      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "8rem 1.5rem 6rem",
        }}
      >
        <p
          style={{
            fontSize: "0.5625rem",
            letterSpacing: "0.25em",
            textTransform: "lowercase",
            color: "#3a7878",
            marginBottom: "2rem",
          }}
        >
          extras
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
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
            writing & photos
          </h1>

          <p
            style={{
              color: "#666666",
              maxWidth: "34ch",
              margin: 0,
              lineHeight: 1.6,
              fontSize: "0.875rem",
            }}
          >
            essays, fragments, photo galleries, and other miscellany.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 21rem))",
            gap: "1rem",
            justifyContent: "start",
          }}
        >
          {extras.map((item, index) => (
            <button
              id={item.id}
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              style={{
                position: "relative",
                minHeight: "17.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.5rem",
                overflow: "hidden",
                border: BORDER,
                backgroundColor: "rgba(17, 17, 17, 0.76)",
                boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
                color: "inherit",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-5px)";
                event.currentTarget.style.borderColor = "#3a7878";
                event.currentTarget.style.boxShadow = "0 24px 80px rgba(0,0,0,0.36)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
                event.currentTarget.style.borderColor = "#2a2a2a";
                event.currentTarget.style.boxShadow = "0 18px 70px rgba(0,0,0,0.28)";
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  right: "-0.2rem",
                  top: "-1.2rem",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(8rem, 16vw, 13rem)",
                  lineHeight: 0.8,
                  color: "rgba(242,242,242,0.045)",
                  letterSpacing: "-0.08em",
                  pointerEvents: "none",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "#3a7878",
                      fontSize: "0.65rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.type ?? "extra"}
                  </span>

                  <span
                    style={{
                      color: "#555555",
                      fontSize: "0.72rem",
                      textAlign: "right",
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.45rem, 2vw, 1.95rem)",
                    fontWeight: 300,
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                    maxWidth: "11ch",
                    margin: "0 0 1rem",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    color: "#9a9a9a",
                    lineHeight: 1.7,
                    fontSize: "0.875rem",
                    maxWidth: "34ch",
                    margin: 0,
                  }}
                >
                  {excerptFrom(item.body)}
                </p>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginTop: "2rem",
                }}
              >
                <span
                  style={{
                    border: BORDER,
                    borderRadius: "999px",
                    padding: "0.35rem 0.7rem",
                    color: "#aaaaaa",
                    fontSize: "0.68rem",
                    letterSpacing: "0.08em",
                    textTransform: "lowercase",
                  }}
                >
                  read
                </span>
                <span
                  style={{
                    border: BORDER,
                    borderRadius: "999px",
                    padding: "0.35rem 0.7rem",
                    color: "#666666",
                    fontSize: "0.68rem",
                    letterSpacing: "0.08em",
                    textTransform: "lowercase",
                  }}
                >
                  saved fragment
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="extra-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedId(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            backgroundColor: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(10px)",
          }}
        >
          <article
            style={{
              position: "relative",
              width: "min(860px, 100%)",
              maxHeight: "min(82vh, 900px)",
              overflow: "auto",
              border: BORDER,
              backgroundColor: "#111111",
              boxShadow: "0 34px 110px rgba(0,0,0,0.62)",
              padding: "clamp(1.25rem, 3vw, 3rem)",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close essay"
              style={{
                position: "sticky",
                top: 0,
                float: "right",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                border: BORDER,
                backgroundColor: "#111111",
                color: "#aaaaaa",
                cursor: "pointer",
                fontSize: "1rem",
                marginLeft: "1rem",
                zIndex: 1,
              }}
            >
              x
            </button>

            <p
              style={{
                color: "#3a7878",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 1rem",
              }}
            >
              {selectedItem.type ?? "extra"} · {selectedItem.date}
            </p>

            <h2
              id="extra-modal-title"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4.5vw, 4.25rem)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                maxWidth: "12ch",
                margin: "0 0 2rem",
              }}
            >
              {selectedItem.title}
            </h2>

            <div
              style={{
                color: "#d6d6d6",
                lineHeight: 1.85,
                fontSize: "1rem",
                maxWidth: "68ch",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedItem.body.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    margin: "0 0 1.35rem",
                    color: EMPHASIZED_PARAGRAPHS.has(paragraph)
                      ? "#f2f2f2"
                      : undefined,
                    fontWeight: EMPHASIZED_PARAGRAPHS.has(paragraph)
                      ? 700
                      : undefined,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
