import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Adds a magnetic hover effect to the attached element.
 * The element moves toward the cursor with elastic snap-back on leave.
 *
 * @param {number} strength  - How far the element follows the cursor (0–1)
 * @param {number} ease      - GSAP ease for the follow motion
 */
const useMagneticButton = (strength = 0.3, ease = "power2.out") => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease,
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, ease]);

  return ref;
};

export default useMagneticButton;
