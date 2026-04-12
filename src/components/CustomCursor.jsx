import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-layer custom cursor:
 *  • Dot  — snappy, follows cursor exactly
 *  • Ring — laggy spring, creates a trailing effect
 *
 * Only activates on fine-pointer (mouse) devices.
 * Uses CSS transform (x/y) — no layout recalculation.
 */
const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Raw mouse position
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot: tight spring
  const dotX = useSpring(rawX, { stiffness: 600, damping: 40, mass: 0.4 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 40, mass: 0.4 });

  // Ring: loose spring (lags behind)
  const ringX = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    // Skip on touch/stylus devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    // Hover detection via event delegation — works on dynamically added elements
    const onOver = (e) => {
      setHovered(!!e.target.closest("a, button, [data-hover='true'], input, textarea, select"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  // DOT_R / RING_R: radius values used for the negative offset centering trick
  // Position: fixed top:0 left:0, then x/y translate to cursor.
  // The negative top/left of half-size centers the element on the cursor point.
  const DOT = 6;
  const RING = 36;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: -(DOT / 2),
          left: -(DOT / 2),
          width: DOT,
          height: DOT,
          borderRadius: "50%",
          backgroundColor: "#22d3ee", // cyan-400
          pointerEvents: "none",
          zIndex: 9999,
          x: dotX,
          y: dotY,
        }}
        animate={{ scale: hovered ? 2.2 : 1 }}
        transition={{ scale: { duration: 0.18, ease: "easeOut" } }}
      />

      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: -(RING / 2),
          left: -(RING / 2),
          width: RING,
          height: RING,
          borderRadius: "50%",
          border: "1.5px solid rgba(34,211,238,0.4)",
          pointerEvents: "none",
          zIndex: 9998,
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderColor: hovered
            ? "rgba(34,211,238,0.75)"
            : "rgba(34,211,238,0.35)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
};

export default CustomCursor;
