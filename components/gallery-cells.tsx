"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Shared silver/white material for all 3D cells
function useSilverMat(roughness = 0.25) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xf0f0f0),
        roughness,
        metalness: 0.35,
      }),
    [roughness]
  );
}

function CellLights() {
  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[4, 6, 4]} intensity={4} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#fff4e0" />
      <directionalLight position={[0, -3, 3]} intensity={0.6} color="#ffffff" />
    </>
  );
}

// ── Crystal (octahedron) ─────────────────────────────────────────────────────
function CrystalMesh({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useSilverMat(0.05);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) t.current += delta;
    const elapsed = t.current;
    ref.current.rotation.y = elapsed * 0.4;
    ref.current.rotation.x = Math.sin(elapsed * 0.3) * 0.2;
    ref.current.position.y = Math.sin(elapsed * 0.5) * 0.06;
  });

  return (
    <mesh ref={ref} material={mat}>
      <octahedronGeometry args={[1, 0]} />
    </mesh>
  );
}

export function CrystalCell({ paused = false }: { paused?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CellLights />
        <CrystalMesh paused={paused} />
      </Canvas>
    </div>
  );
}

// ── Torus ring ───────────────────────────────────────────────────────────────
function TorusMesh({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useSilverMat(0.3);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) t.current += delta;
    const elapsed = t.current;
    ref.current.rotation.y = elapsed * 0.25;
    ref.current.position.y = Math.sin(elapsed * 0.45) * 0.06;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 5, 0, 0]} material={mat}>
      <torusGeometry args={[1, 0.4, 32, 64]} />
    </mesh>
  );
}

export function TorusCell({ paused = false }: { paused?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CellLights />
        <TorusMesh paused={paused} />
      </Canvas>
    </div>
  );
}

// ── Icosahedron ──────────────────────────────────────────────────────────────
function IcosaMesh({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useSilverMat(0.15);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) t.current += delta;
    const elapsed = t.current;
    ref.current.rotation.x = elapsed * 0.2;
    ref.current.rotation.y = elapsed * 0.35;
    ref.current.position.y = Math.sin(elapsed * 0.4) * 0.05;
  });

  return (
    <mesh ref={ref} material={mat}>
      <icosahedronGeometry args={[1, 0]} />
    </mesh>
  );
}

export function IcosaCell({ paused = false }: { paused?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CellLights />
        <IcosaMesh paused={paused} />
      </Canvas>
    </div>
  );
}

// ── Torus knot ───────────────────────────────────────────────────────────────
function KnotMesh({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useSilverMat(0.1);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!paused) t.current += delta;
    const elapsed = t.current;
    ref.current.rotation.x = elapsed * 0.18;
    ref.current.rotation.y = elapsed * 0.3;
    ref.current.position.y = Math.sin(elapsed * 0.45) * 0.05;
  });

  return (
    <mesh ref={ref} material={mat}>
      <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />
    </mesh>
  );
}

export function KnotCell({ paused = false }: { paused?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CellLights />
        <KnotMesh paused={paused} />
      </Canvas>
    </div>
  );
}

// ── SVG extrusion ─────────────────────────────────────────────────────────────
function SVGMesh({
  url,
  mouse,
  scaleFactor = 1,
}: {
  url: string;
  mouse: React.RefObject<{ x: number; y: number }>;
  scaleFactor?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const rotX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);
  const t = useRef(0);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new SVGLoader();
    loader.load(url, (data) => {
      const geos: THREE.BufferGeometry[] = [];

      for (const path of data.paths) {
        // toShapes(true) correctly resolves winding order so holes are actual holes
        const shapes = path.toShapes(true);
        for (const shape of shapes) {
          const geo = new THREE.ExtrudeGeometry(shape, {
            depth: 18,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 1.5,
            bevelSegments: 3,
          });
          geos.push(geo);
        }
      }

      if (geos.length === 0) return;

      // Merge all into one solid geometry
      const merged = mergeGeometries(geos);
      geos.forEach((g) => g.dispose());

      // Centre at origin
      merged.computeBoundingBox();
      const box = merged.boundingBox!;
      const cx = (box.min.x + box.max.x) / 2;
      const cy = (box.min.y + box.max.y) / 2;
      const cz = (box.min.z + box.max.z) / 2;
      merged.translate(-cx, -cy, -cz);

      // Flip Y (SVG Y is inverted vs Three.js)
      merged.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));

      setGeometry(merged);
    });
  }, [url]);

  const mat = useSilverMat(0.2);

  useFrame((_, delta) => {
    if (!ref.current) return;
    t.current += delta;

    // Spring-follow mouse — no auto-rotation
    const targetY = mouse.current.x * 0.35;
    const targetX = -mouse.current.y * 0.12;
    const stiffness = 0.04;
    const damping = 0.80;

    velY.current += (targetY - rotY.current) * stiffness;
    velY.current *= damping;
    rotY.current += velY.current;

    velX.current += (targetX - rotX.current) * stiffness;
    velX.current *= damping;
    rotX.current += velX.current;

    ref.current.rotation.y = rotY.current;
    ref.current.rotation.x = rotX.current;
    ref.current.position.y = Math.sin(t.current * 0.5) * 0.04;
  });

  if (!geometry) return null;

  // Scale to fit viewport
  const box = new THREE.Box3().setFromBufferAttribute(
    geometry.attributes.position as THREE.BufferAttribute
  );
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y);
  const scale = (2.2 / maxDim) * scaleFactor;

  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      <mesh geometry={geometry} material={mat} />
    </group>
  );
}

export function SVGCell({ url, paused = false, scaleFactor = 1 }: { url: string; paused?: boolean; scaleFactor?: number }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CellLights />
        <SVGMesh url={url} mouse={mouse} scaleFactor={scaleFactor} />
      </Canvas>
    </div>
  );
}
