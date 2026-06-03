"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * Full-page transit map with overlay UI matching Figma design.
 * Map background + name-info SVG + navigation buttons + station cards.
 */
export function HomeHeroSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const stationSignsRef = useRef<HTMLDivElement>(null);

  // Scroll to station signs when scroll SVG is clicked
  const handleScrollClick = () => {
    stationSignsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Figma frame dimensions - Fixed Aspect Ratio Container (1440 x 1858)
  const FRAME_WIDTH = 1440;
  const FRAME_HEIGHT = 1858;

  return (
    <section
      ref={mapContainerRef}
      className="relative w-full aspect-[1440/1858] overflow-hidden"
      style={{
        backgroundColor: "#282828",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Transit map background - absolute positioned, fills container - NO PARALLAX */}
      <div className="absolute inset-0 size-full">
        <Image
          src="/maps/home-map-og.svg"
          alt="Portfolio Map"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      {/* Overlay UI layer - with parallax */}
      <div className="absolute inset-0 pointer-events-none">
          {/* 1. NAME TICKET (X:140, Y:81) - exact percentage coordinates from 1440x1858 frame */}
          <ParallaxOverlay
            baseLeft="11.5%"
            baseTop="4.36%"
            baseWidth="27.5%"
            baseHeight="auto"
            rotation={-2.97}
            as="link"
            href="/about"
          >
            <Image
              src="/labels and cards/name-info.svg"
              alt="Chloe Wong"
              width={608}
              height={1025}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* 2. SCROLL TAGS (X:723, Y:564) - exact percentage coordinates from 1440x1858 frame */}
          <ParallaxOverlay
            baseLeft="50.21%"
            baseTop="22%"
            baseWidth="34.8%"
            baseHeight="auto"
            rotation={3.86}
            onClick={handleScrollClick}
          >
            <Image
              src="/labels and cards/scroll.svg"
              alt="Navigation"
              width={608}
              height={608}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* 3. CORE PROJECTS (X:112, Y:1046) - exact percentage coordinates from 1440x1858 frame */}
          <div ref={stationSignsRef} className="absolute" style={{ top: "58%" }} />
          <ParallaxOverlay
            baseLeft="7.78%"
            baseTop="58%"
            baseWidth="34.3%"
            baseHeight="auto"
            as="link"
            href="/core-projects"
          >
            <Image
              src="/labels and cards/core.svg"
              alt="Core Projects"
              width={718}
              height={219}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* 4. CREATIVE TECH (X:855, Y:1108) - exact percentage coordinates from 1440x1858 frame */}
          <ParallaxOverlay
            baseLeft="59.37%"
            baseTop="61.3%"
            baseWidth="34.3%"
            baseHeight="auto"
            as="link"
            href="/creative-technology"
          >
            <Image
              src="/labels and cards/creative tech.svg"
              alt="Creative Tech"
              width={718}
              height={219}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* 5. DATA & RESEARCH (X:233, Y:1333) - exact percentage coordinates from 1440x1858 frame */}
          <ParallaxOverlay
            baseLeft="16.18%"
            baseTop="73.4%"
            baseWidth="34.3%"
            baseHeight="auto"
            as="link"
            href="/data-research"
          >
            <Image
              src="/labels and cards/data.svg"
              alt="Data and Research"
              width={718}
              height={219}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* 6. VISUAL DESIGN (X:747, Y:1568) - exact percentage coordinates from 1440x1858 frame */}
          <ParallaxOverlay
            baseLeft="51.87%"
            baseTop="86%"
            baseWidth="34.3%"
            baseHeight="auto"
            as="link"
            href="/visual-design"
          >
            <Image
              src="/labels and cards/viz design.svg"
              alt="Visual Design"
              width={718}
              height={219}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

      </div>
    </section>
  );
}

// Overlay component for individual elements with scroll animations and hover effects
function ParallaxOverlay({
  children,
  baseLeft,
  baseTop,
  baseWidth,
  baseHeight,
  rotation,
  className = "",
  as = "div",
  href,
  onClick,
}: {
  children: ReactNode;
  baseLeft: string | number;
  baseTop: string | number;
  baseWidth: string | number;
  baseHeight: string | number;
  rotation?: number;
  className?: string;
  as?: "div" | "link";
  href?: string;
  onClick?: () => void;
}) {
  // Container-Relative Coordinate System: Use exact percentage values from Figma
  const baseStyle = {
    position: "absolute" as const,
    left: baseLeft,
    top: baseTop,
    width: baseWidth || "auto",
    height: baseHeight || "auto",
    transformOrigin: rotation ? "top left" : "center center",
  };

  const motionProps = {
    className: `pointer-events-auto ${className}`,
    style: baseStyle,
    initial: { opacity: 0, y: 30, rotate: rotation !== undefined ? rotation : 0, scale: 1 },
    whileInView: { opacity: 1, y: 0, rotate: rotation !== undefined ? rotation : 0, scale: 1 },
    whileHover: { scale: 1.04 },
    viewport: { once: false, margin: "-50px" },
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    onClick: onClick,
  };

  if (as === "link" && href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}
