"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Value noise helpers ───────────────────────────────────────────────────────
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix,        fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix,     iy),     b = hash(ix + 1, iy);
  const c = hash(ix,     iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x: number, y: number, octaves = 5) {
  let v = 0, a = 0.5, scale = 1;
  for (let i = 0; i < octaves; i++) {
    v += a * vnoise(x * scale, y * scale);
    scale *= 2.1; a *= 0.48;
  }
  return v;
}

// ── Letter map: multi-pass blur so letters are gentle hills, not cliffs ───────
function buildLetterMap(W: number, H: number): Uint8ClampedArray {
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);

  const font = `900 ${H * 0.65}px "Arial Black", Arial, sans-serif`;
  ctx.font         = font;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  // Very wide glow — creates the broad base hill, no hard edges at all
  ctx.filter    = "blur(38px)";
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fillText("CHLOE", W / 2, H / 2);

  // Mid glow — adds a slightly sharper ridge along the spine
  ctx.filter    = "blur(14px)";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("CHLOE", W / 2, H / 2);

  // Soft crisp — barely any hard edge at the very top
  ctx.filter    = "blur(5px)";
  ctx.fillStyle = "rgba(255,255,255,0.20)";
  ctx.fillText("CHLOE", W / 2, H / 2);

  // Intentionally NO fully-sharp pass — keeps it geological, not typographic

  return ctx.getImageData(0, 0, W, H).data;
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Terrain() {
  const meshRef  = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const { gl }   = useThree();

  const geometry = useMemo(() => {
    const SEGS_X = 340, SEGS_Y = 220;
    const LW = 768, LH = 384;
    const letterData = buildLetterMap(LW, LH);

    const geo = new THREE.PlaneGeometry(10, 5.8, SEGS_X, SEGS_Y);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const wx = pos.getX(i);
      const wz = pos.getZ(i);

      const nu = wx / 10 + 0.5;
      const nv = wz / 5.8 + 0.5;
      const px = Math.max(0, Math.min(LW - 1, Math.round(nu * LW)));
      const py = Math.max(0, Math.min(LH - 1, Math.round(nv * LH)));
      const letterBright = letterData[(py * LW + px) * 4] / 255;

      // Rolling terrain — large broad undulations feel geological
      const terrain = fbm(wx * 0.38, wz * 0.38) * 0.30
                    + fbm(wx * 0.95, wz * 0.95) * 0.08
                    + fbm(wx * 2.4,  wz * 2.4)  * 0.025;

      // Name is a soft hill — low amplitude, very smooth due to heavy blur
      const nameRidge = letterBright * 0.09;

      pos.setY(i, terrain + nameRidge);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width)  * 2 - 1;
      mouse.current.y = ((e.clientY - r.top)  / r.height) * 2 - 1;
    };
    const onLeave = () => { mouse.current.x = 0; mouse.current.y = 0; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [gl]);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.getElapsedTime();
    // Light rakes across the surface at a low angle — hillshading like NASA
    const lx = Math.cos(t * 0.07) * 8 + mouse.current.x * 5;
    const lz = Math.sin(t * 0.05) * 4 + mouse.current.y * 3;
    lightRef.current.position.set(lx, 2.8, lz);
    lightRef.current.target.position.set(0, 0, 0);
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      {/* Dim warm ambient — shadowed areas stay dark but not black */}
      <ambientLight intensity={0.22} color="#c8b890" />

      {/* Primary raking light — low angle skims surface, creates hillshade */}
      <directionalLight
        ref={lightRef}
        position={[8, 2.8, 2]}
        intensity={3.4}
        color="#fff8f0"
        castShadow={false}
      />

      {/* Cool blue-gray fill from opposite side — simulates sky bounce */}
      <directionalLight position={[-5, 1.5, -3]} intensity={0.12} color="#607080" />

      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial
          color="#3a3428"
          specular="#1c1810"
          shininess={6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function TerrainCell() {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#111111" }}>
      <Canvas
        camera={{ position: [0, 9, 1.2], fov: 36 }}
        gl={{ antialias: true, alpha: false }}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <Terrain />
      </Canvas>
    </div>
  );
}
