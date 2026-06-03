"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useProjectWindow } from "@/lib/project-window-context";
import { type Project } from "@/content/projects";
import { FontGlitchText } from "@/components/font-glitch-text";

const WIN_H = 520;

function getWindowWidth(project: Project): number {
  if (project.windowStyle === "editorial") return 860;
  if (project.windowStyle === "chroma") return 820;
  return 640;
}

// ─── Editorial window content ───────────────────────────────────────────────

function EditorialContent({ project }: { project: Project }) {
  const questrial = "var(--font-questrial)";
  const peddana = "var(--font-peddana)";
  const meddon = "var(--font-meddon)";
  const fg = "#4a3f35";
  const muted = "#8b7d6b";
  const border = "#d4c4b8";
  const card = "#f5ede6";

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#E8DDD4",
        padding: "1.75rem 2rem",
      }}
    >
      {/* Title + metadata */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h1
          style={{
            fontFamily: meddon,
            color: fg,
            fontSize: "3.25rem",
            fontWeight: "normal",
            margin: "0 0 0.35rem",
            lineHeight: 1.05,
          }}
        >
          <FontGlitchText>{project.title}</FontGlitchText>
        </h1>
        <p
          style={{
            fontFamily: questrial,
            color: muted,
            fontSize: "1.125rem",
            margin: "0 0 0.75rem",
          }}
        >
          {project.blurb}
        </p>
        <div
          style={{
            fontFamily: questrial,
            color: muted,
            fontSize: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.1rem",
          }}
        >
          <span>Year: {project.year}</span>
          {project.platform && <span>Platform: {project.platform}</span>}
          <span>Stack: {project.tools.join(" / ")}</span>
          <span>Role: {project.roles.join(", ")}</span>
          {project.links.map((link) => (
            <span key={link.label}>
              Link:{" "}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: muted, textDecoration: "underline" }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${border}`, marginBottom: "1.25rem" }} />

      {/* Overview */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            fontFamily: peddana,
            color: fg,
            fontSize: "1.375rem",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {project.overview}
        </p>
      </div>

      {/* Persona cards */}
      {project.personas && project.personas.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginBottom: "1.75rem",
          }}
        >
          {project.personas.map((persona, i) => (
            <div
              key={persona.name}
              style={{
                backgroundColor: card,
                border: `1px solid ${border}`,
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: questrial,
                  color: muted,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  marginBottom: "0.4rem",
                }}
              >
                0{i + 1}
              </div>
              <div
                style={{
                  fontFamily: questrial,
                  color: fg,
                  fontSize: "1.0625rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {persona.name}
              </div>
              <div
                style={{
                  fontFamily: peddana,
                  color: fg,
                  fontSize: "1.1875rem",
                  lineHeight: 1.55,
                  marginBottom: "0.6rem",
                }}
              >
                {persona.description}
              </div>
              <div
                style={{
                  borderTop: `1px solid ${border}`,
                  paddingTop: "0.5rem",
                  fontFamily: peddana,
                  color: muted,
                  fontSize: "1.0625rem",
                  lineHeight: 1.55,
                }}
              >
                pain point: {persona.painPoint}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case study sections */}
      {project.sections && project.sections.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {project.sections.map((section) => (
            <div
              key={section.label}
              style={{
                display: "grid",
                gridTemplateColumns: "170px 1fr",
                gap: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <div
                style={{
                  fontFamily: questrial,
                  color: fg,
                  fontWeight: "600",
                  fontSize: "1.125rem",
                  paddingTop: "0.1rem",
                }}
              >
                <FontGlitchText>{section.label}:</FontGlitchText>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: peddana,
                      color: fg,
                      fontSize: "1.3125rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Chroma window content ──────────────────────────────────────────────────

function ChromaContent({ project }: { project: Project }) {
  const roboto = "var(--font-roboto-flex)";
  const bg = "#d4db9f";
  const fg = "#3d4a10";
  const muted = "#6b7a3a";
  const border = "#b8c47a";

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: bg,
        padding: "2rem 2.25rem",
        fontFamily: roboto,
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: roboto,
          color: fg,
          fontSize: "3.5rem",
          fontWeight: "300",
          textTransform: "lowercase",
          letterSpacing: "0.04em",
          margin: "0 0 1.5rem",
          lineHeight: 1,
        }}
      >
        <FontGlitchText>{project.title}</FontGlitchText>
      </h1>

      {/* Overview + metadata two-column */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: "2rem",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <p style={{ fontFamily: roboto, color: fg, fontSize: "1.125rem", lineHeight: 1.65, margin: 0 }}>
          {project.overview}
        </p>
        <div style={{ fontFamily: roboto, color: fg, fontSize: "1rem", lineHeight: 1.7 }}>
          <div style={{ fontWeight: "700", marginBottom: "0.4rem" }}>Project Metadata:</div>
          <div>Year: {project.year}</div>
          {project.platform && <div>Platform: {project.platform}</div>}
          <div>Stack: {project.tools.join(" / ")}</div>
          <div>Role: {project.roles.join(", ")}</div>
          {project.links.map((link) => (
            <div key={link.label}>
              Link:{" "}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: fg, textDecoration: "underline" }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {project.sections && project.sections.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {project.sections.map((section) => (
            <div
              key={section.label}
              style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1.5rem" }}
            >
              <div
                style={{
                  fontFamily: roboto,
                  color: fg,
                  fontWeight: "700",
                  fontSize: "1.25rem",
                  paddingTop: "0.1rem",
                }}
              >
                <FontGlitchText>{section.label}:</FontGlitchText>
              </div>
              <div>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{ fontFamily: roboto, color: fg, fontSize: "1.125rem", lineHeight: 1.65, margin: "0 0 0.5rem" }}
                  >
                    {para}
                  </p>
                ))}
                {section.items && section.items.length > 0 && (
                  <ol style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        style={{ fontFamily: roboto, color: fg, fontSize: "1.125rem", lineHeight: 1.65 }}
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Terminal window content (default) ──────────────────────────────────────

function TerminalContent({ project }: { project: Project }) {
  const monoFont = "ui-monospace, 'Courier New', monospace";

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1.75rem 2rem",
        fontFamily: monoFont,
        fontSize: "1.0625rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            color: "var(--fg)",
            fontSize: "1.375rem",
            fontWeight: "bold",
            margin: "0 0 0.5rem",
          }}
        >
          ~/{project.slug}
        </h1>
        <p style={{ color: "var(--muted)", margin: "0 0 0.6rem", lineHeight: 1.55 }}>
          {project.blurb.toLowerCase()}
        </p>
        <div
          style={{
            color: "var(--muted)",
            fontSize: "0.9375rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem",
          }}
        >
          <span>year: {project.year}</span>
          {project.platform && (
            <span>platform: {project.platform.toLowerCase()}</span>
          )}
          <span>stack: {project.tools.join(" / ").toLowerCase()}</span>
          <span>role: {project.roles.join(", ").toLowerCase()}</span>
          {project.links.map((link) => (
            <span key={link.label}>
              link:{" "}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--muted)", textDecoration: "underline" }}
              >
                {link.label.toLowerCase()}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Overview */}
      <div style={{ marginBottom: "1.75rem" }}>
        <p style={{ color: "var(--fg)", lineHeight: 1.65, margin: 0 }}>
          {project.overview}
        </p>
      </div>

      {/* Persona cards */}
      {project.personas && project.personas.length > 0 && (
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
            }}
          >
            {project.personas.map((persona, i) => (
              <div
                key={persona.name}
                style={{
                  border: "1px solid #2a2a2a",
                  borderRadius: "4px",
                  padding: "0.75rem",
                  backgroundColor: "#0b0b0b",
                }}
              >
                <div
                  style={{
                    color: "#555",
                    fontSize: "0.8125rem",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    color: "var(--fg)",
                    fontSize: "0.9375rem",
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                  }}
                >
                  {persona.name}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    marginBottom: "0.5rem",
                  }}
                >
                  {persona.description}
                </div>
                <div
                  style={{
                    color: "#444",
                    fontSize: "0.8125rem",
                    lineHeight: 1.5,
                    borderTop: "1px solid #1e1e1e",
                    paddingTop: "0.4rem",
                  }}
                >
                  pain point: {persona.painPoint}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case study sections */}
      {project.sections && project.sections.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          {project.sections.map((section) => (
            <div
              key={section.label}
              style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem" }}
            >
              <div
                style={{
                  color: "var(--fg)",
                  fontWeight: "500",
                  fontSize: "0.9375rem",
                  paddingTop: "0.1rem",
                }}
              >
                {section.label.toLowerCase()}:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      color: "var(--fg)",
                      lineHeight: 1.65,
                      margin: 0,
                      fontSize: "1rem",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standard highlights (for projects without sections) */}
      {project.highlights.length > 0 && !project.sections && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              color: "var(--fg)",
              fontWeight: "500",
              fontSize: "1.0625rem",
              margin: "0 0 0.5rem",
            }}
          >
            highlights
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              color: "var(--fg)",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {project.highlights.map((h, i) => (
              <li key={i}>— {h.toLowerCase()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools footer */}
      <div
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid var(--border)",
          color: "var(--muted)",
          fontSize: "0.9375rem",
        }}
      >
        {project.tools.join(" · ").toLowerCase()}
      </div>
    </div>
  );
}

// ─── Main window shell ───────────────────────────────────────────────────────

export function ProjectWindow() {
  const { activeProject, closeProject } = useProjectWindow();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const isDraggingRef = useRef(false);
  const dragOriginRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  useEffect(() => {
    if (activeProject) {
      const w = getWindowWidth(activeProject);
      setIsFullscreen(false);
      setReady(false);
      setPosition({
        x: Math.max(0, (window.innerWidth - w) / 2),
        y: Math.max(0, (window.innerHeight - WIN_H) / 2),
      });
      requestAnimationFrame(() => setReady(true));
    } else {
      setReady(false);
    }
  }, [activeProject?.slug]);

  const handleTitlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isFullscreen) return;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      dragOriginRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        winX: position.x,
        winY: position.y,
      };
    },
    [isFullscreen, position]
  );

  const handleTitlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragOriginRef.current.mouseX;
      const dy = e.clientY - dragOriginRef.current.mouseY;
      setPosition({
        x: Math.max(0, dragOriginRef.current.winX + dx),
        y: Math.max(0, dragOriginRef.current.winY + dy),
      });
    },
    []
  );

  const handleTitlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  if (!activeProject) return null;

  const isEditorial = activeProject.windowStyle === "editorial";
  const isChroma = activeProject.windowStyle === "chroma";
  const winW = getWindowWidth(activeProject);

  const titleBarStyle = isEditorial
    ? { backgroundColor: "#ccc0b3", borderBottom: "1px solid #bdb0a3" }
    : isChroma
    ? { backgroundColor: "#bcc87a", borderBottom: "1px solid #a8b860" }
    : { backgroundColor: "#1c1c1c", borderBottom: "1px solid #2a2a2a" };

  const titleTextColor = isEditorial ? "#6b5d51" : isChroma ? "#3d4a10" : "#555";
  const titleFont = isEditorial
    ? "var(--font-questrial)"
    : isChroma
    ? "var(--font-roboto-flex)"
    : "ui-monospace, 'Courier New', monospace";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={
          isFullscreen
            ? {
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: isEditorial ? "#E8DDD4" : isChroma ? "#d4db9f" : "var(--card)",
                border: isEditorial ? "1px solid #d4c4b8" : isChroma ? "1px solid #b8c47a" : "1px solid var(--border)",
                pointerEvents: "auto",
                opacity: ready ? 1 : 0,
              }
            : {
                position: "absolute",
                left: position.x,
                top: position.y,
                width: winW,
                maxHeight: "82vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: isEditorial ? "#E8DDD4" : isChroma ? "#d4db9f" : "var(--card)",
                border: isEditorial ? "1px solid #d4c4b8" : isChroma ? "1px solid #b8c47a" : "1px solid var(--border)",
                borderRadius: "10px",
                boxShadow: isEditorial
                  ? "0 24px 64px rgba(100,80,60,0.18)"
                  : isChroma
                  ? "0 24px 64px rgba(60,75,10,0.2)"
                  : "0 24px 64px rgba(0,0,0,0.7)",
                pointerEvents: "auto",
                overflow: "hidden",
                opacity: ready ? 1 : 0,
                transition: "opacity 0.12s ease",
              }
        }
      >
        {/* ── Title bar ── */}
        <div
          onPointerDown={handleTitlePointerDown}
          onPointerMove={handleTitlePointerMove}
          onPointerUp={handleTitlePointerUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: isFullscreen ? 0 : "10px 10px 0 0",
            cursor: isFullscreen ? "default" : "grab",
            userSelect: "none",
            flexShrink: 0,
            ...titleBarStyle,
          }}
        >
          <div
            role="button"
            aria-label="Close"
            onClick={closeProject}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <div
            role="button"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => setIsFullscreen((f) => !f)}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "#28c840",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              flex: 1,
              textAlign: "center",
              color: titleTextColor,
              fontFamily: titleFont,
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}
          >
            {isEditorial || isChroma ? activeProject.title : `~/${activeProject.slug}`}
          </span>
        </div>

        {/* ── Content ── */}
        {isEditorial ? (
          <EditorialContent project={activeProject} />
        ) : isChroma ? (
          <ChromaContent project={activeProject} />
        ) : (
          <TerminalContent project={activeProject} />
        )}
      </div>
    </div>
  );
}
