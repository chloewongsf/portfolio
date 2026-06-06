"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

const CREATIVE_TAGS = ["Creative Code", "AI Design", "Creative Tech", "Web App"];

const categoryProjects = projects.filter((p) =>
  p.tags.some((t) => CREATIVE_TAGS.includes(t))
);

export default function CreativeTechPage() {
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          category
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 4rem",
          }}
        >
          creative technology
        </h1>

        <div style={{ borderTop: BORDER }}>
          {categoryProjects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto",
                gap: "2rem",
                alignItems: "start",
                padding: "2rem 0",
                borderBottom: BORDER,
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1c1c1c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              <span style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", color: "#3a7878", paddingTop: "0.4rem" }}>
                0{i + 1}
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, color: "#f2f2f2", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "#aaaaaa", margin: 0, lineHeight: 1.5 }}>
                  {project.blurb}
                </p>
              </div>
              <div style={{ textAlign: "right", paddingTop: "0.2rem" }}>
                <p style={{ fontSize: "0.75rem", color: "#666666", margin: "0 0 0.5rem" }}>{project.year}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#3a7878", border: "1px solid #2a2a2a", padding: "0.2rem 0.5rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
