"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

const CoreProjectsPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full bg-[#282828] min-h-screen">
      {/* 1. ASPECT RATIO CONTAINER: Locks the 1440x1858 Figma grid */}
      <div 
        ref={mapContainerRef}
        className="relative w-full aspect-[1440/1858] overflow-hidden"
      >
        
        {/* BACKGROUND MAP - NO PARALLAX */}
        <div className="absolute inset-0 size-full">
          <Image 
            src="/maps/core-map.svg"
            alt="Core Projects Map"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Overlay UI layer - with parallax */}
        <div className="absolute inset-0 pointer-events-none">
          {/* CORE PROJECTS SIGN */}
          <ParallaxOverlay
            baseLeft="6.25%"
            baseTop="10.06%"
            baseWidth="34.37%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core.svg"
              alt="Core Projects Sign"
              width={718}
              height={219}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          {/* PROJECT CARDS (Core 1-6) */}
          <ParallaxOverlay
            baseLeft="20.48%"
            baseTop="22.17%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 1.svg"
              alt="Project 1"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          <ParallaxOverlay
            baseLeft="58.12%"
            baseTop="25.72%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 2.svg"
              alt="Project 2"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          <ParallaxOverlay
            baseLeft="20.48%"
            baseTop="41.98%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 3.svg"
              alt="Project 3"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          <ParallaxOverlay
            baseLeft="58.12%"
            baseTop="45.53%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 4.svg"
              alt="Project 4"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          <ParallaxOverlay
            baseLeft="20.48%"
            baseTop="61.78%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 5.svg"
              alt="Project 5"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>

          <ParallaxOverlay
            baseLeft="58.12%"
            baseTop="65.33%"
            baseWidth="34.51%"
            baseHeight="auto"
          >
            <Image
              src="/labels and cards/core 6.svg"
              alt="Project 6"
              width={500}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </ParallaxOverlay>
        </div>

      </div>
    </main>
  );
};

// Overlay component for individual elements with scroll animations and hover effects
function ParallaxOverlay({
  children,
  baseLeft,
  baseTop,
  baseWidth,
  baseHeight,
  rotation,
  className = "",
}: {
  children: ReactNode;
  baseLeft: string | number;
  baseTop: string | number;
  baseWidth: string | number;
  baseHeight: string | number;
  rotation?: number;
  className?: string;
}) {
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
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
}

export default CoreProjectsPage;
