"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageNav } from "@/components/page-nav";
import extras from "@/content/extras.json";

const BORDER = "1px solid #2a2a2a";

type WritingExtra = (typeof extras)[number];

type RandomImageExtra = {
  id: string;
  type: "photo";
  src: string;
  aspectRatio: string;
};

type GalleryItem =
  | { kind: "writing"; id: string; item: WritingExtra; variant: number }
  | { kind: "image"; id: string; item: RandomImageExtra; variant: number };

const RANDOM_IMAGES: RandomImageExtra[] = [
  {
    id: "extra-random-19d4860d",
    type: "photo",
    src: "/extra random/19d4860d58407418c90df26ae01bcb58.jpg",
    aspectRatio: "1057 / 884",
  },
  {
    id: "extra-random-2d49cf45",
    type: "photo",
    src: "/extra random/2d49cf452e05a2c9043b1899b07f35a3.jpg",
    aspectRatio: "736 / 726",
  },
  {
    id: "extra-random-210f9a6",
    type: "photo",
    src: "/extra random/210f9a67063a422efdeffceb5316e175.jpg",
    aspectRatio: "1199 / 879",
  },
  {
    id: "extra-random-c09a4b",
    type: "photo",
    src: "/extra random/c09a4bd8654bc194c924394b75e44082.jpg",
    aspectRatio: "1080 / 1350",
  },
  {
    id: "extra-random-1bf3fb",
    type: "photo",
    src: "/extra random/1bf3fb49f66896a629eab92455757920.jpg",
    aspectRatio: "735 / 1165",
  },
  {
    id: "extra-random-b002d9",
    type: "photo",
    src: "/extra random/b002d9ce0562dd3e7b167f5ff77624f1.jpg",
    aspectRatio: "735 / 479",
  },
  {
    id: "extra-random-357a50",
    type: "photo",
    src: "/extra random/357a50d332780a54473c0bf404e76467.jpg",
    aspectRatio: "468 / 404",
  },
  {
    id: "extra-random-dd00e4",
    type: "photo",
    src: "/extra random/dd00e45858365cba470cfe75a0b2c75b.jpg",
    aspectRatio: "1170 / 1044",
  },
];

function shuffleItems<T>(items: T[]) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function makeGalleryItems(): GalleryItem[] {
  const baseItems: GalleryItem[] = [
    ...extras.map((item) => ({
      kind: "writing" as const,
      id: item.id,
      item,
      variant: Math.floor(Math.random() * 3),
    })),
    ...RANDOM_IMAGES.map((item) => ({
      kind: "image" as const,
      id: item.id,
      item,
      variant: Math.floor(Math.random() * 3),
    })),
  ];

  return shuffleItems(baseItems);
}

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
  const [selectedImage, setSelectedImage] = useState<RandomImageExtra | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    [
      ...extras.map((item) => ({
        kind: "writing" as const,
        id: item.id,
        item,
        variant: 0,
      })),
      ...RANDOM_IMAGES.map((item) => ({
        kind: "image" as const,
        id: item.id,
        item,
        variant: 0,
      })),
    ]
  );
  const selectedItem = extras.find((item) => item.id === selectedId);

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setGalleryItems(makeGalleryItems());
    }, 0);

    return () => window.clearTimeout(shuffleTimer);
  }, []);

  useEffect(() => {
    if (!selectedItem && !selectedImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        setSelectedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem, selectedImage]);

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
            width: "100%",
            maxWidth: "1180px",
            margin: "0 auto",
            columnWidth: "18rem",
            columnGap: "1.25rem",
          }}
        >
          {galleryItems.map((galleryItem, index) =>
            galleryItem.kind === "writing" ? (
              <button
                id={galleryItem.item.id}
                key={galleryItem.id}
                type="button"
                onClick={() => setSelectedId(galleryItem.item.id)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: "100%",
                  minHeight: galleryItem.variant === 1 ? "20rem" : "17.5rem",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  margin: "0 0 1rem",
                  overflow: "hidden",
                  border: BORDER,
                  backgroundColor: "rgba(17, 17, 17, 0.76)",
                  boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
                  color: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                  breakInside: "avoid",
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
                      {galleryItem.item.type ?? "extra"}
                    </span>

                    <span
                      style={{
                        color: "#555555",
                        fontSize: "0.72rem",
                        textAlign: "right",
                      }}
                    >
                      {galleryItem.item.date}
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
                    {galleryItem.item.title}
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
                    {excerptFrom(galleryItem.item.body)}
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
            ) : (
              <button
                key={galleryItem.id}
                type="button"
                onClick={() => setSelectedImage(galleryItem.item)}
                style={{
                  display: "inline-block",
                  width: "100%",
                  padding: 0,
                  margin: "0 0 1rem",
                  border: BORDER,
                  background: "transparent",
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
                  breakInside: "avoid",
                  transform: "translateY(0)",
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
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: galleryItem.item.aspectRatio,
                    backgroundColor: "transparent",
                  }}
                >
                  <Image
                    src={galleryItem.item.src}
                    alt="extra random photo"
                    fill
                    sizes="(max-width: 768px) 100vw, 21rem"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </button>
            )
          )}
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

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="extra random photo"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            backgroundColor: "rgba(0,0,0,0.78)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(1000px, 100%)",
              height: "min(82vh, 900px)",
              border: BORDER,
              backgroundColor: "#0d0d0d",
              boxShadow: "0 34px 110px rgba(0,0,0,0.62)",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close photo"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                border: BORDER,
                backgroundColor: "#111111",
                color: "#aaaaaa",
                cursor: "pointer",
                fontSize: "1rem",
                zIndex: 2,
              }}
            >
              x
            </button>

            <Image
              src={selectedImage.src}
              alt="extra random photo"
              fill
              sizes="100vw"
              style={{ objectFit: "contain", padding: "1rem" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
