"use client";

import { useEffect, useRef } from "react";

interface Band {
  y: number;
  h: number;
  offset: number;
  alpha: number;
  life: number;
  totalLife: number;
}

export function GlitchCell() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    // Offscreen canvas holds the "clean" frame — bands sample from it
    const off    = document.createElement("canvas");
    const octx   = off.getContext("2d")!;

    let raf: number;
    let W = 0, H = 0;
    let bands: Band[] = [];
    let nextBand = 0;       // timestamp for next band spawn
    let t = 0;              // frame counter

    const resize = () => {
      W = canvas.width  = off.width  = wrap.offsetWidth;
      H = canvas.height = off.height = wrap.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── Measure font size so text fills ~88% of width ──────────────────────
    const getFontSize = (text: string, maxW: number, maxH: number) => {
      octx.font = `900 10px "Arial Black", "Arial", sans-serif`;
      const ratio = octx.measureText(text).width / 10;
      return Math.min(maxW / ratio, maxH);
    };

    const spawnBand = (now: number) => {
      const offset = (Math.random() < 0.5 ? 1 : -1) * (10 + Math.random() * 45);
      bands.push({
        y:         Math.random() * H,
        h:         Math.random() * 6 + 2,
        offset,
        alpha:     0,
        life:      0,
        totalLife: 40 + Math.random() * 60,
      });
      nextBand = now + 900 + Math.random() * 1800;
    };

    const drawFrame = (now: number) => {
      t++;

      // ── Offscreen: clean text frame ─────────────────────────────────────
      octx.fillStyle = "#111111";
      octx.fillRect(0, 0, W, H);

      // Font size: "chloe" is wider so size it to fill width, cap at ~42% H
      const fs = getFontSize("chloe", W * 0.88, H * 0.42);
      octx.font         = `900 ${fs}px "Arial Black", "Arial", sans-serif`;
      octx.textAlign    = "center";
      octx.textBaseline = "alphabetic";

      const cx   = W / 2;
      const gap  = fs * 0.06;
      const totalH = fs * 2 + gap;
      const y1   = (H - totalH) / 2 + fs;        // baseline of "chloe"
      const y2   = y1 + fs + gap;                 // baseline of "wong"

      // Chromatic aberration — teal left / white center / rose right
      // Using low-opacity additive draws so the center stays near-white
      const aberr = 3.5 + Math.sin(now * 0.0008) * 1.5;

      octx.globalCompositeOperation = "screen";

      octx.fillStyle = `rgba(58, 120, 120, 0.82)`;   // teal left
      octx.fillText("chloe", cx - aberr, y1);
      octx.fillText("wong",  cx - aberr, y2);

      octx.fillStyle = `rgba(230, 230, 230, 0.95)`;  // white center
      octx.fillText("chloe", cx, y1);
      octx.fillText("wong",  cx, y2);

      octx.fillStyle = `rgba(196, 120, 120, 0.78)`;  // rose right
      octx.fillText("chloe", cx + aberr, y1);
      octx.fillText("wong",  cx + aberr, y2);

      octx.globalCompositeOperation = "source-over";

      // Subtle scanline texture
      octx.globalAlpha = 0.06;
      octx.fillStyle   = "#000";
      for (let y = 0; y < H; y += 3) octx.fillRect(0, y, W, 1);
      octx.globalAlpha = 1;

      // ── Main canvas: copy offscreen + apply band glitches ───────────────
      ctx.drawImage(off, 0, 0);

      // Spawn new band?
      if (now >= nextBand) spawnBand(now);

      // Update + draw bands
      bands = bands.filter(b => b.life <= b.totalLife);
      for (const b of bands) {
        b.life++;
        const prog = b.life / b.totalLife;
        // Ease in, hold, ease out
        b.alpha = prog < 0.15
          ? prog / 0.15
          : prog > 0.75
          ? (1 - prog) / 0.25
          : 1;

        const sy = Math.max(0, Math.floor(b.y));
        const sh = Math.min(Math.ceil(b.h), H - sy);
        if (sh <= 0) continue;

        const dx = Math.round(b.offset * b.alpha);

        // Draw wrapped horizontal slice at offset
        if (dx > 0) {
          ctx.drawImage(off, 0, sy, W - dx, sh, dx,   sy, W - dx, sh);
          ctx.drawImage(off, W - dx, sy, dx, sh, 0,   sy, dx,     sh);
        } else if (dx < 0) {
          const adx = -dx;
          ctx.drawImage(off, adx, sy, W - adx, sh, 0,   sy, W - adx, sh);
          ctx.drawImage(off, 0,   sy, adx,     sh, W - adx, sy, adx,  sh);
        }

        // Faint teal tint on the band
        ctx.globalAlpha = b.alpha * 0.18;
        ctx.fillStyle   = "#3a7878";
        ctx.fillRect(0, sy, W, sh);
        ctx.globalAlpha = 1;
      }

      // Rare single-pixel flash lines
      if (Math.random() < 0.004) {
        ctx.globalAlpha = 0.55 + Math.random() * 0.35;
        ctx.fillStyle   = Math.random() < 0.6 ? "#3a7878" : "#c47878";
        ctx.fillRect(0, Math.random() * H, W, 1);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(drawFrame);
    };

    raf = requestAnimationFrame(drawFrame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#111111" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
