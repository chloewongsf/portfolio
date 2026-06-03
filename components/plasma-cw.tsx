"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Shaders ───────────────────────────────────────────────────────────────────

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const frag = `
uniform float uTime;
uniform vec2  uMouse;
uniform sampler2D uLetterMask;
varying vec2 vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(
    mix(dot(hash(i+vec2(0,0)),f-vec2(0,0)), dot(hash(i+vec2(1,0)),f-vec2(1,0)), u.x),
    mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)), dot(hash(i+vec2(1,1)),f-vec2(1,1)), u.x),
  u.y);
}
float fbm(vec2 p) {
  float v=0.0, a=0.5;
  mat2 rot = mat2(0.866,0.5,-0.5,0.866);
  for(int i=0;i<6;i++){v+=a*noise(p);p=rot*p*2.1+vec2(100.0);a*=0.5;}
  return v;
}

void main() {
  vec2 uv = vUv;
  float t  = uTime * 0.05;
  vec2 m   = (uMouse - 0.5) * 0.14;

  // Domain-warped FBM
  vec2 q = vec2(fbm(uv*2.2+t+m),       fbm(uv*2.2+vec2(5.2,1.3)+t*0.9));
  vec2 r = vec2(fbm(uv*2.0+1.2*q+vec2(1.7,9.2)+0.14*t),
                fbm(uv*2.0+1.2*q+vec2(8.3,2.8)+0.11*t));
  float f = fbm(uv*1.8+1.4*r+m*0.5);
  f = clamp((f+1.0)*0.5, 0.0, 1.0);

  // Letter mask — blurred on canvas so edges are already soft
  float raw  = texture2D(uLetterMask, vUv).r;
  float mask = smoothstep(0.08, 0.55, raw);   // letter fill
  float glow = smoothstep(0.01, 0.30, raw) * 0.45; // wider glow halo
  float m2   = clamp(mask + glow, 0.0, 1.0);

  // Background: near-black, barely any hue
  vec3 bg = mix(
    vec3(0.063, 0.063, 0.063),   // #101010
    vec3(0.085, 0.10,  0.10),    // darkest teal tint
    f * 0.22
  );

  // Letter fill: vivid flowing plasma
  vec3 lc0 = vec3(0.10,  0.20,  0.21);   // deep teal
  vec3 lc1 = vec3(0.18,  0.43,  0.43);   // #2e6e6e
  vec3 lc2 = vec3(0.23,  0.47,  0.47);   // #3a7878
  vec3 lc3 = vec3(0.47,  0.65,  0.58);   // teal-sage
  vec3 lc4 = vec3(0.58,  0.34,  0.34);   // muted rose
  vec3 lc5 = vec3(0.77,  0.47,  0.47);   // #c47878 dusty rose

  vec3 letter = mix(lc0, lc1, smoothstep(0.15, 0.40, f));
  letter = mix(letter, lc2, smoothstep(0.35, 0.58, f));
  letter = mix(letter, lc3, smoothstep(0.52, 0.70, f) * 0.7);
  letter = mix(letter, lc4, smoothstep(0.66, 0.82, f) * 0.4);
  letter = mix(letter, lc5, smoothstep(0.78, 0.94, f) * 0.25);

  // Glow halo color (slightly dimmer version of letter)
  vec3 halo = letter * 0.55;

  // Composite: bg → halo → full letter
  vec3 col = mix(bg, halo, glow);
  col      = mix(col, letter, mask);

  // Vignette
  vec2 vc  = vUv - 0.5;
  float vig = 1.0 - smoothstep(0.22, 0.88, length(vc) * 2.0);
  col *= 0.5 + 0.5 * vig;

  gl_FragColor = vec4(col, 1.0);
}`;

// ── Letter mask texture ───────────────────────────────────────────────────────
function makeLetterMask(): THREE.Texture {
  const S = 512;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d")!;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, S, S);

  // Wide blur pass → soft glow halo
  ctx.filter = "blur(14px)";
  ctx.fillStyle = "#fff";
  ctx.font = `bold 200px "Arial Black", Arial, sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("CW", S / 2, S / 2);

  // Medium blur → inner glow
  ctx.filter = "blur(5px)";
  ctx.fillText("CW", S / 2, S / 2);

  // Sharp letters on top
  ctx.filter = "none";
  ctx.fillText("CW", S / 2, S / 2);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// ── Scene mesh ────────────────────────────────────────────────────────────────
function ShaderPlane() {
  const ref   = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { gl } = useThree();

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uLetterMask: { value: null as THREE.Texture | null },
  }), []);

  // Build mask texture in browser
  useEffect(() => {
    uniforms.uLetterMask.value = makeLetterMask();
  }, [uniforms]);

  // Mouse tracking relative to canvas bounds
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.set(
        (e.clientX - r.left)  / r.width,
        1 - (e.clientY - r.top) / r.height,
      );
    };
    const onLeave = () => mouse.current.set(0.5, 0.5);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [gl]);

  // Full-screen triangle — covers viewport perfectly with no seams
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(
      new Float32Array([-1,-1,0, 3,-1,0, -1,3,0]), 3
    ));
    g.setAttribute("uv", new THREE.BufferAttribute(
      new Float32Array([0,0, 2,0, 0,2]), 2
    ));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value  = clock.getElapsedTime();
    mat.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh ref={ref} geometry={geo} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export function PlasmaCW() {
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
