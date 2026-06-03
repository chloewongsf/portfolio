"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

const PROJECT_PREVIEWS: Record<string, { src: string; type: "image" | "video" }> = {
  outward: { src: "/outward preview.mp4", type: "video" },
  "chroma-akinator": { src: "/chroma akinator preview.mp4", type: "video" },
  "it-starts-earlier": { src: "/it-starts-earlier preview.mp4", type: "video" },
  "personal-flight-telemetry": { src: "/flight telemetry preview.mov", type: "video" },
  "etro-how-to-arnica": { src: "/etro preview.mp4", type: "video" },
  "ucsf-sis-portal": { src: "/ucsf preview.mp4", type: "video" },
  "nlp-narrative-analysis": { src: "/berkeley-social-welfare-preview.svg", type: "image" },
  unplugged: { src: "/unplugged preview.png", type: "image" },
  taara: { src: "/taara ritual chai preview.png", type: "image" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

type Filter = "all" | "personal" | "professional";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",          label: "all" },
  { key: "personal",     label: "projects" },
  { key: "professional", label: "professional" },
];

export default function WorkPage() {
  const [active, setActive] = useState<Filter>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams?.get("category");
  const filterParam = searchParams?.get("filter");

  const CATEGORY_TAG_MAP: Record<string, string[]> = {
    "creative-technology": ["Creative Code", "AI Design", "Creative Tech", "Web App"],
    "data-research": ["Data Viz", "Data Research", "Research", "NLP", "Policy", "Bioinformatics", "Personal Informatics", "Machine Learning"],
    "visual-design": ["Print Design", "Typography", "Branding", "Visual Design", "Service Design", "Speculative Design", "UX Design", "Enterprise"],
  };

  let filtered: typeof projects = projects;

  if (categoryParam) {
    const tags = CATEGORY_TAG_MAP[categoryParam];
    if (tags) {
      filtered = projects.filter((p) => p.tags.some((t) => tags.includes(t)));
    }
  } else if (filterParam === "featured") {
    filtered = projects.filter((p) => (p as any).featured);
  } else {
    filtered = active === "all" ? projects : projects.filter((p) => p.projectType === active);
  }

  const activeLabel = categoryParam
    ? categoryParam.replace(/-/g, " ")
    : filterParam
    ? filterParam
    : active === "all"
    ? null
    : active;

  function clearFilters() {
    router.push("/work");
  }
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <style>{`
        @keyframes workPreviewPan {
          0%, 100% { transform: scale(1.04) translate3d(-1.5%, -1.5%, 0); }
          50% { transform: scale(1.1) translate3d(1.5%, 1.5%, 0); }
        }

        @keyframes workPreviewScan {
          0% { transform: translateX(-120%) rotate(10deg); opacity: 0; }
          20% { opacity: 0.38; }
          55% { opacity: 0.14; }
          100% { transform: translateX(140%) rotate(10deg); opacity: 0; }
        }

        @keyframes workPreviewPulse {
          0%, 100% { opacity: 0.55; transform: translate3d(0, 0, 0) scale(1); }
          50% { opacity: 0.82; transform: translate3d(3%, -2%, 0) scale(1.08); }
        }
      `}</style>
      <PageNav />

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}
        >
          selected work
        </motion.p>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
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
            work
          </motion.h1>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  padding: "0.35rem 0.875rem",
                  borderRadius: "999px",
                  border: BORDER,
                  backgroundColor: active === key ? "#f2f2f2" : "transparent",
                  color: active === key ? "#111111" : "#666666",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>

        {activeLabel && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#3a7878", textTransform: "lowercase" }}>filtered:</span>
            <span style={{ fontSize: "0.875rem", padding: "0.35rem 0.75rem", border: BORDER, borderRadius: "999px", background: "rgba(17,17,17,0.6)" }}>{activeLabel}</span>
            <button onClick={clearFilters} style={{ background: "transparent", border: "none", color: "#aaaaaa", cursor: "pointer", fontSize: "0.875rem" }}>clear</button>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((project, i) => {
            const preview = PROJECT_PREVIEWS[project.slug];

            return (
            <motion.div
              key={project.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              style={{ minHeight: "21rem" }}
            >
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(project.slug)}
                onBlur={() => setHoveredSlug(null)}
                style={{
                  position: "relative",
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  overflow: "hidden",
                  border: BORDER,
                  backgroundColor: "rgba(17, 17, 17, 0.76)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background-color 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: hoveredSlug === project.slug ? 0.78 : 0,
                    transform:
                      hoveredSlug === project.slug
                        ? "translateY(0) scale(1)"
                        : "translateY(10px) scale(1.04)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      backgroundColor: "#1c1c1c",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: preview?.type === "image"
                          ? `linear-gradient(rgba(17,17,17,0.08), rgba(17,17,17,0.42)), url("${preview.src}")`
                          : "radial-gradient(circle at 28% 35%, rgba(232,168,192,0.85) 0 16%, transparent 17%), radial-gradient(circle at 70% 68%, rgba(130,200,130,0.68) 0 18%, transparent 19%), linear-gradient(135deg, rgba(58,120,120,0.78), rgba(74,60,40,0.92))",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        animation: "workPreviewPan 4.2s ease-in-out infinite",
                      }}
                    />

                    {preview?.type === "video" && (
                      <video
                        src={preview.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          animation: "workPreviewPan 4.2s ease-in-out infinite",
                        }}
                      />
                    )}

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent, rgba(242,242,242,0.26), transparent)",
                        animation: "workPreviewScan 2.1s ease-in-out infinite",
                      }}
                    />

                    {!preview && (
                      <div
                        style={{
                          position: "absolute",
                          inset: "18%",
                          border: "1px solid rgba(242,242,242,0.18)",
                          animation: "workPreviewPulse 3.4s ease-in-out infinite",
                        }}
                      />
                    )}
                  </div>
                </div>

                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: "0.65rem",
                    top: "0.25rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(5.5rem, 10vw, 9rem)",
                    color: "#f2f2f2",
                    opacity: hoveredSlug === project.slug ? 0.025 : 0.08,
                    lineHeight: 0.9,
                    pointerEvents: "none",
                    userSelect: "none",
                    letterSpacing: "-0.06em",
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.2em",
                      color: hoveredSlug === project.slug ? "#f2f2f2" : "#666666",
                      marginBottom: "1.25rem",
                      textTransform: "lowercase",
                      opacity: hoveredSlug === project.slug ? 0.78 : 1,
                      transition: "color 0.35s ease, opacity 0.35s ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {project.year}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.25rem, 2vw, 2rem)",
                      fontWeight: 300,
                      color: "#f2f2f2",
                      textShadow:
                        hoveredSlug === project.slug
                          ? "0 12px 34px rgba(0,0,0,0.68)"
                          : "none",
                      margin: "0 0 0.625rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      transition: "text-shadow 0.35s ease",
                    }}
                  >
                    {project.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#aaaaaa",
                      margin: 0,
                      lineHeight: 1.55,
                      maxWidth: "32ch",
                      opacity: hoveredSlug === project.slug ? 0 : 1,
                      transform:
                        hoveredSlug === project.slug
                          ? "translateY(-4px)"
                          : "translateY(0)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    {project.blurb}
                  </p>
                </div>

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.5625rem",
                          border: BORDER,
                          borderRadius: "999px",
                          padding: "0.2rem 0.625rem",
                          color: hoveredSlug === project.slug ? "#f2f2f2" : "#aaaaaa",
                          backgroundColor:
                            hoveredSlug === project.slug
                              ? "rgba(17,17,17,0.38)"
                              : "transparent",
                          letterSpacing: "0.05em",
                          backdropFilter:
                            hoveredSlug === project.slug ? "blur(10px)" : "none",
                          WebkitBackdropFilter:
                            hoveredSlug === project.slug ? "blur(10px)" : "none",
                          transition:
                            "background-color 0.35s ease, color 0.35s ease, backdrop-filter 0.35s ease",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span style={{ fontSize: "0.875rem", color: "#3a7878" }}>→</span>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
