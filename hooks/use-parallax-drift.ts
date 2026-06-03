"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const MAX_OFFSET = 12; // Max 12px movement (subtle, between 6-18px range)

export function useParallaxDrift() {
  const prefersReducedMotion = useReducedMotion();
  
  // Target values that update directly with mouse
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth spring animation for inertia - these animate towards targetX/Y
  const springConfig = {
    stiffness: 50,
    damping: 30,
    mass: 0.5,
  };

  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) {
      targetX.set(0);
      targetY.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to viewport center (-1 to 1)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / centerX; // -1 to 1
      const offsetY = (e.clientY - centerY) / centerY; // -1 to 1

      // Update target values - spring will smoothly animate x/y towards these
      targetX.set(offsetX * MAX_OFFSET);
      targetY.set(offsetY * MAX_OFFSET);
    };

    // Reset to center when mouse leaves
    const handleMouseLeave = () => {
      targetX.set(0);
      targetY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, targetX, targetY]);

  return { x, y };
}
