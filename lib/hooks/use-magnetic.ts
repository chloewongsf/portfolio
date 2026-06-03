"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";

interface MagneticOptions {
  distance?: number;
  stiffness?: number;
  damping?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { distance = 20, stiffness = 300, damping = 30 } = options;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  const translateX = useTransform(springX, (value) => value);
  const translateY = useTransform(springY, (value) => value);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * (distance / 100);
      const deltaY = (e.clientY - centerY) * (distance / 100);

      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [distance, stiffness, damping, x, y, prefersReducedMotion]);

  return {
    ref,
    style: prefersReducedMotion
      ? {}
      : {
          x: translateX,
          y: translateY,
        },
  };
}
