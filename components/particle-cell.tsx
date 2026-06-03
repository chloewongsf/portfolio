"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const N        = 4500;
const ATTRACT  = 0.018;   // how fast particles pull toward target
const REPEL_R  = 0.55;    // radius of mouse repulsion
const REPEL_F  = 0.12;    // strength of mouse repulsion

// Soft radial gradient sprite so particles look like glowing dots
function makeSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,    "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.75)");
  g.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Render text to offscreen canvas → collect bright pixel positions → sample N of them
function sampleText(text: string, count: number): Float32Array {
  const W = 600, H = 280;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.font = `bold 210px "Arial Black", Arial, sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2);

  const { data } = ctx.getImageData(0, 0, W, H);
  const pool: [number, number][] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4] > 120) {
        pool.push([x / W, 1 - y / H]);
      }
    }
  }

  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [nx, ny] = pool[Math.floor(Math.random() * pool.length)];
    // map to scene space — X: –1.9…1.9, Y: –0.85…0.85
    out[i * 3]     = (nx - 0.5) * 3.8 + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 1] = (ny - 0.5) * 1.7 + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
  }
  return out;
}

function Field() {
  const { gl } = useThree();
  const ref  = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const targets = useRef<Float32Array | null>(null);

  // Geometry built once with random scatter positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 5.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  // Sprite texture
  const sprite = useMemo(() => makeSprite(), []);

  // Sample target positions once in browser
  useEffect(() => {
    targets.current = sampleText("CW", N);
  }, []);

  // Mouse tracking relative to the canvas bounds
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const r  = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left)  / r.width;
      const ny = 1 - (e.clientY - r.top) / r.height;
      mouse.current.set((nx - 0.5) * 3.8, (ny - 0.5) * 1.7);
    };
    const onLeave = () => mouse.current.set(9999, 9999);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [gl]);

  useFrame(() => {
    if (!ref.current || !targets.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos  = attr.array as Float32Array;
    const tgt  = targets.current;
    const mx   = mouse.current.x;
    const my   = mouse.current.y;

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      let x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];

      // Repulsion
      const dx = x - mx, dy = y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPEL_R * REPEL_R && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = ((REPEL_R - d) / REPEL_R) * REPEL_F;
        x += (dx / d) * f;
        y += (dy / d) * f;
      }

      // Attract toward letter target
      x += (tgt[i3]     - x) * ATTRACT;
      y += (tgt[i3 + 1] - y) * ATTRACT;
      z += (tgt[i3 + 2] - z) * ATTRACT;

      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.032}
        map={sprite}
        color="#3a7878"
        transparent
        opacity={0.9}
        sizeAttenuation
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleCell() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 58 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Field />
      </Canvas>
    </div>
  );
}
