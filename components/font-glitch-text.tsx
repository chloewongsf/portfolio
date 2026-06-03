"use client";

import { useState, useEffect, useRef } from "react";

interface FontGlitchTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Speed of font cycling in milliseconds
   * @default 180
   */
  glitchSpeed?: number;
  /**
   * Whether to preserve the original width during glitch to prevent layout shift
   * @default true
   */
  preserveWidth?: boolean;
}

const GLITCH_FONTS = [
  "Anthony",
  "TinyFonts",
  "ResistanceGenerale",
  "Feroniapi",
  "Basteleur",
];

export function FontGlitchText({
  children,
  className = "",
  style = {},
  glitchSpeed = 180,
  preserveWidth = true,
}: FontGlitchTextProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);

  // Capture original width on mount
  useEffect(() => {
    if (preserveWidth && containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setOriginalWidth(width);
    }
  }, [preserveWidth]);

  useEffect(() => {
    if (isHovering) {
      // Start font cycling
      intervalRef.current = setInterval(() => {
        setCurrentFontIndex((prev) => (prev + 1) % GLITCH_FONTS.length);
      }, glitchSpeed);
    } else {
      // Stop cycling and reset
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentFontIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, glitchSpeed]);

  const currentFont = isHovering ? GLITCH_FONTS[currentFontIndex] : undefined;

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
      style={{
        ...style,
        fontFamily: currentFont || style.fontFamily,
        display: "inline-block",
        whiteSpace: "nowrap",
        minWidth: preserveWidth && originalWidth ? `${originalWidth}px` : undefined,
        transition: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </span>
  );
}
