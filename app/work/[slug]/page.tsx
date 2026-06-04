"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import { PageNav } from "@/components/page-nav";
import { CaseStudyScroll } from "@/components/case-study-scroll";
import Image from "next/image";

const BORDER = "1px solid #2a2a2a";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  if (project.scenes && project.scenes.length > 0) {
    return (
      <div style={{ backgroundColor: "#111111" }}>
        <PageNav />
        <CaseStudyScroll scenes={project.scenes} bgColors={project.bgColors} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        {/* Back */}
        <Link
          href="/work"
          style={{ fontSize: "0.8125rem", color: "#666666", textDecoration: "none", letterSpacing: "0.05em", display: "inline-block", marginBottom: "3rem" }}
        >
          ← work
        </Link>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 1.5rem",
          }}
        >
          {project.title}
        </h1>

        <p style={{ fontSize: "1rem", color: "#aaaaaa", lineHeight: 1.7, maxWidth: "60ch", margin: "0 0 2.5rem" }}>
          {project.blurb}
        </p>

        {project.links.length > 0 && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.75rem" }}>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #3a7878",
                  color: "#f2f2f2",
                  textDecoration: "none",
                  padding: "0.72rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "lowercase",
                }}
              >
                view live project ↗
              </a>
            ))}
          </div>
        )}

        {/* Metadata row */}
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", borderTop: BORDER, borderBottom: BORDER, padding: "1.5rem 0", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>Year</p>
            <p style={{ fontSize: "0.875rem", color: "#f2f2f2", margin: 0 }}>{project.year}</p>
          </div>
          {project.platform && (
            <div>
              <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>Platform</p>
              <p style={{ fontSize: "0.875rem", color: "#f2f2f2", margin: 0 }}>{project.platform}</p>
            </div>
          )}
          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>Role</p>
            <p style={{ fontSize: "0.875rem", color: "#f2f2f2", margin: 0 }}>{project.roles.join(", ")}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>Stack</p>
            <p style={{ fontSize: "0.875rem", color: "#f2f2f2", margin: 0 }}>{project.tools.join(" · ")}</p>
          </div>
          {project.links.map((link) => (
            <div key={link.label}>
              <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>Link</p>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.875rem", color: "#f2f2f2", textDecoration: "none", borderBottom: "1px solid #2a2a2a" }}
              >
                {link.label} ↗
              </a>
            </div>
          ))}
        </div>

        {/* Overview */}
        <p style={{ fontSize: "1.0625rem", color: "#f2f2f2", lineHeight: 1.8, margin: "0 0 3rem", maxWidth: "68ch" }}>
          {project.overview}
        </p>

        {/* Persona cards */}
        {project.personas && project.personas.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.5rem" }}>
              Personas
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: BORDER }}>
              {project.personas.map((persona, i) => (
                <div
                  key={persona.name}
                  style={{
                    padding: "1.5rem",
                    borderRight: i < project.personas!.length - 1 ? BORDER : undefined,
                  }}
                >
                  <span style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", color: "#666666", display: "block", marginBottom: "0.75rem" }}>
                    0{i + 1}
                  </span>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#f2f2f2", margin: "0 0 0.5rem" }}>{persona.name}</p>
                  <p style={{ fontSize: "0.8125rem", color: "#aaaaaa", lineHeight: 1.6, margin: "0 0 0.75rem" }}>{persona.description}</p>
                  <div style={{ borderTop: BORDER, paddingTop: "0.75rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "#666666", margin: 0, lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 500 }}>Pain point: </span>{persona.painPoint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case study sections */}
        {project.sections && project.sections.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            {project.sections.map((section) => (
              <div
                key={section.label}
                className="standard-case-section"
                style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", borderTop: BORDER, paddingTop: "2rem", paddingBottom: "2rem" }}
              >
                <p
                  style={{
                    fontSize: "0.5625rem",
                    letterSpacing: "0.2em",
                    textTransform: "lowercase",
                    color: "#666666",
                    margin: "0.2rem 0 0",
                  }}
                >
                  {section.label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.paragraphs.map((para, i) => (
                    <p key={i} style={{ fontSize: "0.9375rem", color: "#f2f2f2", lineHeight: 1.75, margin: 0 }}>
                      {para}
                    </p>
                  ))}
                  {section.keyPoints && section.keyPoints.map((kp, i) => (
                    <p key={i} style={{ fontSize: "0.9375rem", color: "#f2f2f2", lineHeight: 1.75, margin: 0 }}>
                      <span style={{ fontWeight: 600, color: "#f2f2f2" }}>{kp.label}: </span>
                      {kp.text}
                    </p>
                  ))}
                  {section.items && section.items.map((item, i) => (
                    <p key={i} style={{ fontSize: "0.9375rem", color: "#f2f2f2", lineHeight: 1.75, margin: 0, paddingLeft: "1rem", borderLeft: "1px solid #2a2a2a" }}>
                      {item}
                    </p>
                  ))}
                  {section.images && section.images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        marginTop: "0.5rem",
                        maxWidth: img.maxWidth ?? "100%",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.caption ?? ""}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 1100px) 100vw, 920px"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      {img.caption && (
                        <p style={{ fontSize: "0.6875rem", color: "#666666", letterSpacing: "0.08em", margin: "0.5rem 0 0" }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                  {section.videos && section.videos.map((video) => (
                    <div key={video.src} style={{ marginTop: "0.5rem" }}>
                      <video
                        src={video.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                          width: "100%",
                          display: "block",
                          border: BORDER,
                          backgroundColor: "#1c1c1c",
                        }}
                      />
                      {video.caption && (
                        <p style={{ fontSize: "0.6875rem", color: "#666666", letterSpacing: "0.08em", margin: "0.5rem 0 0" }}>
                          {video.caption}
                        </p>
                      )}
                    </div>
                  ))}
                  {section.table && (
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                      <thead>
                        <tr>
                          {section.table.headers.map((h) => (
                            <th key={h} style={{ textAlign: "left", padding: "0.625rem 1rem", borderBottom: BORDER, color: "#3a7878", fontWeight: 500, letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, i) => (
                          <tr key={i} style={{ borderBottom: BORDER }}>
                            <td style={{ padding: "0.875rem 1rem", color: "#f2f2f2", fontWeight: 500, verticalAlign: "top", whiteSpace: "nowrap" }}>{row[0]}</td>
                            <td style={{ padding: "0.875rem 1rem", color: "#aaaaaa", lineHeight: 1.7, verticalAlign: "top" }}>{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: BORDER }} />
          </div>
        )}

        {/* Highlights (for projects without sections) */}
        {project.highlights.length > 0 && !project.sections && (
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "1.5rem" }}>
              Highlights
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {project.highlights.map((highlight, i) => (
                <li key={i} style={{ fontSize: "0.9375rem", color: "#f2f2f2", lineHeight: 1.6, paddingLeft: "1.25rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#666666" }}>—</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools footer */}
        <div style={{ borderTop: BORDER, paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.75rem", color: "#666666", letterSpacing: "0.1em", margin: 0 }}>
            {project.tools.join(" · ")}
          </p>
        </div>
      </main>

    </div>
  );
}
