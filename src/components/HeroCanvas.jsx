import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────
const COUNT          = 2800;
const REPEL_RADIUS   = 1.6;   // world-space units
const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
const REPEL_STRENGTH = 0.055;
const SPRING_K       = 0.042; // pull back to origin
const DAMPING        = 0.86;  // velocity damping per frame
// Approximate screen-to-world scale at z=0 (camera z=4.8, fov=68)
// world_half_width = tan(34deg) * 4.8 ≈ 3.24
const SCREEN_TO_WORLD_X = 3.2;
const SCREEN_TO_WORLD_Y = 2.2;

/** Soft circular sprite — WebGL points are quads; `map` masks them to circles. */
function createCirclePointTexture(size = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const r = size / 2 - 0.5;
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, r);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.65, "rgba(255,255,255,0.92)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Particle Field ───────────────────────────────────────────
const ParticleField = ({ mouseRef, sceneScrollRef }) => {
  const meshRef    = useRef();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const velRef     = useRef(new Float32Array(COUNT * 3)); // velocity buffer
  const { camera } = useThree();

  const circleMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createCirclePointTexture(64);
  }, []);

  useEffect(() => {
    return () => {
      circleMap?.dispose();
    };
  }, [circleMap]);

  // Build geometry + store immutable originals in one pass
  const { geo, originals } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r     = 2.8 + Math.random() * 3.5;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t        = Math.random();
      col[i * 3]     = 0.02 + t * 0.06;
      col[i * 3 + 1] = 0.70 - t * 0.30;
      col[i * 3 + 2] = 0.88 + t * 0.12;
    }

    const g = new THREE.BufferGeometry();
    // BufferAttribute wraps the same Float32Array — we mutate it in-place in useFrame
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));

    return { geo: g, originals: new Float32Array(pos) }; // deep copy for spring target
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;

    // ── Smooth mouse parallax ───────────────────────────────
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    smoothMouse.current.x += (mx - smoothMouse.current.x) * 0.035;
    smoothMouse.current.y += (my - smoothMouse.current.y) * 0.035;

    // ── Scroll-driven camera (global canvas) ────────────────
    // Hero→About transition + overall page scroll both nudge the camera.
    const transition = Math.min(Math.max(sceneScrollRef?.current?.transition ?? 0, 0), 1);
    const scrollProgress = Math.min(
      (sceneScrollRef?.current?.scrollY ?? 0) / window.innerHeight,
      1
    );
    const depth = transition * 1.35 + scrollProgress * 1.1;
    camera.position.x = smoothMouse.current.x * 0.22;
    camera.position.y = smoothMouse.current.y * 0.14;
    camera.position.z = 4.8 + depth;
    camera.lookAt(0, 0, 0);

    // ── Slow group rotation (+ subtle scroll coupling) ─────
    const spinBoost = 0.12 * transition;
    meshRef.current.rotation.y = t * (0.032 + spinBoost);
    meshRef.current.rotation.x = Math.sin(t * 0.016) * 0.09 + transition * 0.04;

    // ── Cursor repulsion physics ────────────────────────────
    // Map normalized mouse (-1..1) to approximate world-space coords at z≈0
    const curX = smoothMouse.current.x * SCREEN_TO_WORLD_X;
    const curY = smoothMouse.current.y * SCREEN_TO_WORLD_Y;

    const posAttr = geo.attributes.position;
    const arr = posAttr.array; // direct Float32Array ref — fast
    const vel = velRef.current;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      const px = arr[i3];
      const py = arr[i3 + 1];
      const pz = arr[i3 + 2];

      // Cursor repulsion (2-D, ignoring z for performance)
      const dx = px - curX;
      const dy = py - curY;
      const distSq = dx * dx + dy * dy;

      if (distSq < REPEL_RADIUS_SQ && distSq > 0.0001) {
        const dist  = Math.sqrt(distSq);
        const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
        vel[i3]     += (dx / dist) * force;
        vel[i3 + 1] += (dy / dist) * force;
      }

      // Spring: pull each particle back toward its original position
      vel[i3]     += (originals[i3]     - px) * SPRING_K;
      vel[i3 + 1] += (originals[i3 + 1] - py) * SPRING_K;
      vel[i3 + 2] += (originals[i3 + 2] - pz) * SPRING_K;

      // Dampen
      vel[i3]     *= DAMPING;
      vel[i3 + 1] *= DAMPING;
      vel[i3 + 2] *= DAMPING;

      arr[i3]     = px + vel[i3];
      arr[i3 + 1] = py + vel[i3 + 1];
      arr[i3 + 2] = pz + vel[i3 + 2];
    }

    posAttr.needsUpdate = true; // upload mutated buffer to GPU
  });

  return (
    <points ref={meshRef} geometry={geo} frustumCulled={false}>
      <pointsMaterial
        map={circleMap ?? undefined}
        alphaTest={0.01}
        size={0.022}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.62}
        depthWrite={false}
      />
    </points>
  );
};

// ─── Canvas wrapper ────────────────────────────────────────────
/**
 * Global background scene. Parent in App is `position: fixed; inset: 0; z-index: -1`.
 * `sceneScrollRef` — `{ transition: 0..1 (Hero→About scrub), scrollY: number }`.
 */
const HeroCanvas = ({ sceneScrollRef }) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 4.8], fov: 68 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)]}
    >
      <Suspense fallback={null}>
        <ParticleField mouseRef={mouseRef} sceneScrollRef={sceneScrollRef} />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
