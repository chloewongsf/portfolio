"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2  uMouse;
varying vec2  vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
        dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
    mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
        dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
  u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8660, 0.5, -0.5, 0.8660);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = rot * p * 2.1 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float t  = uTime * 0.055;

  // Subtle mouse pull
  vec2 m = (uMouse - 0.5) * 0.18;

  // Domain warp — two layers
  vec2 q = vec2(
    fbm(uv * 2.2 + t        + m),
    fbm(uv * 2.2 + vec2(5.2, 1.3) + t * 0.9)
  );
  vec2 r = vec2(
    fbm(uv * 2.0 + 1.2 * q + vec2(1.7, 9.2) + 0.14 * t),
    fbm(uv * 2.0 + 1.2 * q + vec2(8.3, 2.8) + 0.11 * t)
  );

  float f = fbm(uv * 1.8 + 1.4 * r + m * 0.5);
  f = clamp((f + 1.0) * 0.5, 0.0, 1.0);

  // Palette — dark base → deep teal → medium teal → dusty rose (faint) → back to dark
  vec3 c0 = vec3(0.067, 0.067, 0.067);  // #111111
  vec3 c1 = vec3(0.105, 0.200, 0.212);  // #1b3336 deep teal
  vec3 c2 = vec3(0.180, 0.420, 0.420);  // #2e6b6b mid teal
  vec3 c3 = vec3(0.227, 0.471, 0.471);  // #3a7878 bright teal
  vec3 c4 = vec3(0.580, 0.340, 0.340);  // #945757 muted rose

  vec3 col = mix(c0, c1, smoothstep(0.00, 0.30, f));
  col = mix(col, c2, smoothstep(0.25, 0.50, f));
  col = mix(col, c3, smoothstep(0.45, 0.65, f));
  col = mix(col, c4, smoothstep(0.62, 0.80, f) * 0.28);
  col = mix(col, c0, smoothstep(0.78, 1.00, f) * 0.55);

  // Vignette — soft edges pull back to dark
  vec2 vc  = vUv - 0.5;
  float vig = 1.0 - smoothstep(0.25, 0.85, length(vc) * 1.9);
  col *= 0.55 + 0.45 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse   = useRef<[number, number]>([0.5, 0.5]);
  const { gl, size } = useThree();

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  }), []);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top)  / rect.height,
      ];
    };
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [gl]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value  = clock.getElapsedTime();
    mat.uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);
  });

  // Full-screen triangle trick — covers viewport exactly, no seams
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(
      new Float32Array([-1, -1, 0,  3, -1, 0,  -1, 3, 0]), 3
    ));
    geo.setAttribute("uv", new THREE.BufferAttribute(
      new Float32Array([0, 0,  2, 0,  0, 2]), 2
    ));
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function PlasmaCell() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
        style={{ display: "block", width: "100%", height: "100%" }}
        frameloop="always"
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
