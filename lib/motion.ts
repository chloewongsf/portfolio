// Motion tokens for consistent animation timing and easing
// Archival binder aesthetic: subtle, intentional, like inspecting objects
export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
    slower: 0.8,
  },
  easing: {
    default: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Subtle ease-out, no bounce
    in: [0.4, 0, 1, 1] as [number, number, number, number],
    out: [0, 0, 0.2, 1] as [number, number, number, number], // Linear ease-out for placing objects
    inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    inspect: [0.2, 0, 0.2, 1] as [number, number, number, number], // For hover/inspect interactions
  },
};

// Reduced motion variants
export const reducedMotion = {
  transition: { duration: 0.01 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
