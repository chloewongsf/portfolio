"use client";

import { type Project } from "@/content/projects";
import { useProjectWindow } from "@/lib/project-window-context";
import { FontGlitchText } from "@/components/font-glitch-text";

interface ProjectRevealLayerProps {
  projects: Project[];
}

export function ProjectRevealLayer({ projects }: ProjectRevealLayerProps) {
  const { openProject } = useProjectWindow();

  return (
    <div
      aria-label="Featured projects"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginTop: "1rem",
      }}
    >
      {projects.map((project, i) => (
        <div
          key={project.slug}
          role="button"
          tabIndex={0}
          data-nav-item
          data-reveal-card
          aria-label={project.title}
          onClick={() => openProject(project)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProject(project);
            }
          }}
          style={{
            display: "block",
            padding: "0.875rem 1rem",
            border: "1px solid #2a2a2a",
            borderRadius: "4px",
            backgroundColor: "#0b0b0b",
            textDecoration: "none",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#555"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#444"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; }}
        >
          {/* Index / year */}
          <div
            style={{
              color: "#444",
              fontSize: "16px",
              letterSpacing: "0.01em",
              fontFamily: "var(--font-dm-mono)",
              marginBottom: "0.35rem",
            }}
          >
            0{i + 1}/{project.year}
          </div>

          {/* Title */}
          <div
            style={{
              color: "#c8c8c8",
              fontSize: "19px",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              marginBottom: "0.4rem",
            }}
          >
            <FontGlitchText>{project.title.toLowerCase()}</FontGlitchText>
          </div>

          {/* Tags */}
          <div
            style={{
              color: "#3a3a3a",
              fontSize: "15px",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.01em",
            }}
          >
            {project.tags.slice(0, 2).join(" · ").toLowerCase()}
          </div>
        </div>
      ))}
    </div>
  );
}
