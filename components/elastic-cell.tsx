"use client";

import { useRef, useEffect } from "react";

const BASE   = "chloe";
const MAX_ES = 22;
const SPEED  = 0.04; // lerp per frame — feels elastic/slow release

export function ElasticCell() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const progRef   = useRef(0);       // 0 = stretched, 1 = hover
  const hoverRef  = useRef(false);

  // Precomputed metrics (set once after fonts load, updated on resize)
  const stretchRef    = useRef(7);   // scaleY needed to fill cell height at base font-size
  const baseWRef      = useRef(100); // width of "chloe" at 100px
  const eWRef         = useRef(10);  // width added per extra "e" at 100px
  const cellWRef      = useRef(400); // usable cell width

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const measure = () => {
      // Probe character widths via a hidden element (respects CSS var font)
      const probe = document.createElement("span");
      probe.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;visibility:hidden;" +
        "font-family:var(--font-serif);font-size:100px;line-height:1;" +
        "white-space:nowrap;pointer-events:none;";
      document.body.appendChild(probe);

      probe.textContent = BASE;
      const baseW = probe.offsetWidth;
      probe.textContent = BASE + "e".repeat(MAX_ES);
      const maxW = probe.offsetWidth;
      document.body.removeChild(probe);

      baseWRef.current = baseW;
      eWRef.current    = (maxW - baseW) / MAX_ES;
      cellWRef.current = wrap.offsetWidth * 0.94;

      // Set font-size so "chloe" fills the cell width, measure natural height
      const fs0 = (cellWRef.current / baseW) * 100;
      text.style.fontSize  = `${fs0}px`;
      text.style.transform = "scaleY(1)";
      text.textContent     = BASE;
      void text.offsetWidth; // reflow

      stretchRef.current   = wrap.offsetHeight / text.offsetHeight;
      text.style.transform = `scaleY(${stretchRef.current})`;
    };

    document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // RAF loop — drives both e-count and scaleY simultaneously
  useEffect(() => {
    const step = () => {
      const target = hoverRef.current ? 1 : 0;
      progRef.current += (target - progRef.current) * SPEED;
      const p = progRef.current;

      const text = textRef.current;
      if (text) {
        const extraEs = Math.round(p * MAX_ES);
        const word    = BASE + "e".repeat(extraEs);
        if (text.textContent !== word) text.textContent = word;

        // Shrink font-size as word grows so it always fits the cell width
        const wordW = baseWRef.current + extraEs * eWRef.current;
        text.style.fontSize = `${(cellWRef.current / wordW) * 100}px`;

        // Release vertical stretch: tall → natural height
        text.style.transform =
          `scaleY(${stretchRef.current + (1 - stretchRef.current) * p})`;
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#111111",
        cursor: "default",
      }}
    >
      <div
        ref={textRef}
        style={{
          fontFamily: "var(--font-serif)",
          color: "#f2f2f2",
          lineHeight: 1,
          whiteSpace: "nowrap",
          transformOrigin: "center center",
          userSelect: "none",
        }}
      >
        {BASE}
      </div>
    </div>
  );
}
