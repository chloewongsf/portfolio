"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CVAccessForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cv-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("incorrect password");
        return;
      }

      setPassword("");
      router.refresh();
    } catch {
      setError("unable to verify password");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "34rem",
        margin: "0 auto",
        padding: "clamp(9rem, 20vh, 13rem) 2.5rem 6rem",
      }}
    >
      <p
        style={{
          margin: "0 0 2rem",
          color: "#3a7878",
          fontSize: "0.5625rem",
          letterSpacing: "0.25em",
          textTransform: "lowercase",
        }}
      >
        cv
      </p>

      <h1
        style={{
          margin: "0 0 1rem",
          color: "#f2f2f2",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1.05,
        }}
      >
        password required
      </h1>

      <p style={{ margin: "0 0 2rem", color: "#888888", fontSize: "0.875rem", lineHeight: 1.7 }}>
        enter the password to view and download my cv.
      </p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="cv-password"
          style={{
            display: "block",
            marginBottom: "0.6rem",
            color: "#aaaaaa",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            textTransform: "lowercase",
          }}
        >
          password
        </label>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            id="cv-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "cv-password-error" : undefined}
            style={{
              flex: "1 1 15rem",
              minWidth: 0,
              height: "3rem",
              padding: "0 0.9rem",
              border: `1px solid ${error ? "#c47878" : "#2a2a2a"}`,
              borderRadius: 0,
              backgroundColor: "#0d0d0d",
              color: "#f2f2f2",
              font: "inherit",
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              height: "3rem",
              padding: "0 1.2rem",
              border: "1px solid #3a7878",
              borderRadius: 0,
              backgroundColor: "#3a7878",
              color: "#050505",
              font: "inherit",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              cursor: isSubmitting ? "wait" : "pointer",
              opacity: isSubmitting ? 0.65 : 1,
            }}
          >
            {isSubmitting ? "checking..." : "enter"}
          </button>
        </div>

        {error && (
          <p id="cv-password-error" role="alert" style={{ margin: "0.75rem 0 0", color: "#c47878", fontSize: "0.75rem" }}>
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
