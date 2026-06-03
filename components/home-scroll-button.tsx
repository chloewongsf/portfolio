"use client";

/**
 * Navigation buttons matching Figma design.
 * Two black buttons: "Scroll to see more" and "Selected Work"
 */
export function HomeScrollButton() {
  const scrollToWork = () => {
    document.getElementById("selected-work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
      }}
    >
      {/* Scroll to see more button */}
      <button
        onClick={scrollToWork}
        className="transition-transform hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "clamp(1rem, 1.5vw, 1.25rem) clamp(1.5rem, 2.5vw, 2rem)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Scroll to
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          see more
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
            fontWeight: 400,
          }}
        >
          ↓
        </span>
      </button>

      {/* Selected Work button */}
      <button
        onClick={scrollToWork}
        className="transition-transform hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "clamp(1rem, 1.5vw, 1.25rem) clamp(1.5rem, 2.5vw, 2rem)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Selected
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Work
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
            fontWeight: 400,
          }}
        >
          ↓
        </span>
      </button>
    </div>
  );
}
