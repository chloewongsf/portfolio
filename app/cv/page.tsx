import { cookies } from "next/headers";
import { PageNav } from "@/components/page-nav";
import { CVAccessForm } from "@/components/cv-access-form";
import { CV_ACCESS_COOKIE, isValidCVAccessToken } from "@/lib/cv-access";

const CV_PATH = "/chloe_wong_2026 copy.pdf";

export default async function CVPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(CV_ACCESS_COOKIE)?.value;
  const hasAccess = isValidCVAccessToken(accessToken);

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      {!hasAccess ? (
        <CVAccessForm />
      ) : (
        <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
          <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>cv</p>

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#f2f2f2", margin: "0 0 1.25rem" }}>curriculum vitae</h1>

          <p style={{ color: "#aaaaaa", maxWidth: "60ch", lineHeight: 1.75, margin: "0 0 2rem" }}>
            a current copy of my cv is available below.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#f2f2f2",
                textDecoration: "none",
                border: "1px solid #3a7878",
                borderRadius: "999px",
                padding: "0.72rem 1rem",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
              }}
            >
              open pdf ↗
            </a>

            <a
              href={CV_PATH}
              download
              style={{
                color: "#3a7878",
                textDecoration: "none",
                border: "1px solid #2a2a2a",
                borderRadius: "999px",
                padding: "0.72rem 1rem",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
              }}
            >
              download pdf ↓
            </a>
          </div>

          <div
            style={{
              border: "1px solid #2a2a2a",
              backgroundColor: "#0d0d0d",
              height: "min(78vh, 900px)",
              minHeight: "620px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={CV_PATH}
              title="Chloe Wong CV"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                display: "block",
              }}
            />
          </div>
        </main>
      )}
    </div>
  );
}
