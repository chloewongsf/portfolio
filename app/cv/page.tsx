import { PageNav } from "@/components/page-nav";

export default function CVPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>cv</p>

        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#f2f2f2", margin: "0 0 1.25rem" }}>curriculum vitae</h1>

        <p style={{ color: "#aaaaaa", maxWidth: "60ch" }}>This page is a placeholder for your downloadable CV and a condensed timeline of experience. I can wire in a PDF download, a printable layout, or a structured timeline view — tell me which you prefer and I will implement it.</p>

        <div style={{ marginTop: "2.5rem", padding: "1.25rem", border: "1px solid #2a2a2a" }}>
          <a href="/cv.pdf" style={{ color: "#3a7878", textDecoration: "none" }}>Download PDF →</a>
        </div>
      </main>
    </div>
  );
}
