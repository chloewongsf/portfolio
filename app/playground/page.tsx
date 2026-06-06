"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageNav } from "@/components/page-nav";

const BORDER = "1px solid #2a2a2a";

export default function PlaygroundPage() {
  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-sans)" }}>
      <PageNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "lowercase", color: "#3a7878", marginBottom: "2rem" }}>
          playground
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#f2f2f2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 2rem",
          }}
        >
          interactive experiments
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#aaaaaa", maxWidth: "480px", margin: "0 0 4rem" }}>
          Small experiments exploring motion, physics, and interaction patterns.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: BORDER }}>
          <MagneticCard />
          <SpringCard />
          <GradientCard />
        </div>
      </main>
    </div>
  );
}

function MagneticCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      style={{ borderRight: BORDER, padding: "2rem" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: (e.clientX - rect.left - rect.width / 2) * 0.1, y: (e.clientY - rect.top - rect.height / 2) * 0.1 });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <div style={{ position: "relative", height: "200px", marginBottom: "1.5rem", backgroundColor: "#1c1c1c", overflow: "hidden" }}>
        <motion.div
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "#f0f0f0" }} />
        </motion.div>
      </div>
      <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>01</p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 300, margin: "0 0 0.5rem", color: "#f2f2f2" }}>Magnetic Hover</h3>
      <p style={{ fontSize: "0.8125rem", color: "#aaaaaa", margin: 0, lineHeight: 1.6 }}>Element follows cursor with spring physics</p>
    </div>
  );
}

function SpringCard() {
  return (
    <div style={{ borderRight: BORDER, padding: "2rem" }}>
      <div style={{ height: "200px", marginBottom: "1.5rem", backgroundColor: "#1c1c1c", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          style={{ width: "3rem", height: "3rem", backgroundColor: "#f0f0f0", borderRadius: "0.25rem" }}
          whileHover={{ scale: 1.3, borderRadius: "50%" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        />
      </div>
      <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>02</p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 300, margin: "0 0 0.5rem", color: "#f2f2f2" }}>Spring Physics</h3>
      <p style={{ fontSize: "0.8125rem", color: "#aaaaaa", margin: 0, lineHeight: 1.6 }}>Natural bounce on hover and tap</p>
    </div>
  );
}

function GradientCard() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{ height: "200px", marginBottom: "1.5rem", backgroundColor: "#1c1c1c", position: "relative", overflow: "hidden" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(28,25,23,0.15), transparent 60%)` }} />
      </div>
      <p style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "lowercase", color: "#3a7878", marginBottom: "0.5rem" }}>03</p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 300, margin: "0 0 0.5rem", color: "#f2f2f2" }}>Gradient Follow</h3>
      <p style={{ fontSize: "0.8125rem", color: "#aaaaaa", margin: 0, lineHeight: 1.6 }}>Radial gradient tracks cursor position</p>
    </div>
  );
}
