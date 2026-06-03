"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ImageDropStack } from "@/components/image-drop-stack";

interface SpreadProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  size?: "dominant" | "supporting";
  backgroundImage?: string;
  topSquareContent?: ReactNode;
  bottomSquareContent?: ReactNode;
  rightBoxContent?: ReactNode;
}

export function Spread({ left, right, className, size = "dominant", backgroundImage, topSquareContent, bottomSquareContent, rightBoxContent }: SpreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });
  const prefersReducedMotion = useReducedMotion();

  // Subtle opacity/contrast for inspecting objects - very minimal
  const opacity = prefersReducedMotion
    ? 1
    : isInView
      ? 1
      : 0.85;
  const contrast = prefersReducedMotion
    ? 1
    : isInView
      ? 1
      : 0.95;

  const isSupporting = size === "supporting";
  const maxWidth = isSupporting ? "max-w-5xl" : "max-w-7xl";
  const minHeight = isSupporting ? "min-h-[60vh]" : "min-h-screen";

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex snap-start snap-always items-start justify-start",
        minHeight,
        isSupporting ? "px-3 pt-16 pb-12 md:px-8 md:pt-20 md:pb-16" : "px-3 pt-20 pb-6 md:px-6 md:pt-24 md:pb-8",
        className
      )}
    >
      {/* Background Image - original form, offset left of center, smaller width */}
      {backgroundImage && (
        <div className={cn(
          "relative w-auto h-auto z-0",
          size === "dominant" ? "max-w-[60%] ml-[10%]" : "max-w-[75%] ml-[12%]"
        )}>
          <motion.img
            src={backgroundImage}
            alt=""
            className="relative w-auto h-auto object-contain pointer-events-none"
            style={{
              filter: prefersReducedMotion
                ? undefined
                : `contrast(${contrast})`,
              opacity,
            }}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.out,
            }}
          />
          {/* Square overlay - grouped with image, proportional, hangs off left edge - only for dominant */}
          {size === "dominant" && (
            <div 
              className="absolute bottom-[15%] -left-[8%] w-[45%] h-[48%] bg-[#ecede1] pointer-events-none flex items-center justify-center"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Texture effect on edges */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.04) 1px, rgba(0,0,0,0.04) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.04) 1px, rgba(0,0,0,0.04) 2px)
                `,
              }}
            />
            {/* Text box inside the square */}
            {bottomSquareContent && (
              <div 
                className="relative w-[90%] h-[90%] pointer-events-auto flex flex-col justify-start"
                style={{
                  padding: "clamp(0.5rem, 1.2vw, 1rem)",
                  boxSizing: "border-box",
                  overflow: "visible",
                  marginLeft: "-2%",
                }}
              >
                {bottomSquareContent}
              </div>
            )}
          </div>
          )}
          {/* Second square - lighter, shorter, wider, above and to the right - only for dominant */}
          {size === "dominant" && (
            <div 
            className="absolute bottom-[68%] left-[2%] w-[52%] h-[18%] pointer-events-none flex items-center justify-center"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f4f2e8",
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
                radial-gradient(circle at 1px 1px, rgba(0,0,0,0.015) 0.5px, transparent 0)
              `,
              backgroundSize: "100% 100%, 100% 100%, 8px 8px",
            }}
          >
            {/* Enhanced texture effect on edges */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.06) 1px, rgba(0,0,0,0.06) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.06) 1px, rgba(0,0,0,0.06) 2px)
                `,
                maskImage: "linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%), linear-gradient(to bottom, black 0%, transparent 8%, transparent 92%, black 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%), linear-gradient(to bottom, black 0%, transparent 8%, transparent 92%, black 100%)",
              }}
            />
            {/* Text box inside the top square */}
            {topSquareContent && (
              <div 
                className="relative w-[95%] h-[95%] pointer-events-auto flex items-center justify-start"
                style={{
                  paddingTop: "clamp(0.5rem, 1.2vw, 1rem)",
                  paddingRight: "clamp(0.5rem, 1.2vw, 1rem)",
                  paddingBottom: "clamp(0.5rem, 1.2vw, 1rem)",
                  paddingLeft: "clamp(0.75rem, 1.5vw, 1.5rem)",
                  boxSizing: "border-box",
                  overflow: "visible",
                }}
              >
                {topSquareContent}
              </div>
            )}
          </div>
          )}
          {/* Right box - wide, not too tall, ripped edges (straight left) - only for dominant */}
          {size === "dominant" && rightBoxContent && (
            <div 
              className="absolute bottom-[12%] -right-[5%] w-[42%] h-[16%] pointer-events-none flex items-center justify-center z-10"
              style={{
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f5e8d8",
                clipPath: "polygon(0% 0%, 0% 100%, 98% 100%, 100% 95%, 97% 88%, 100% 82%, 98% 75%, 100% 68%, 97% 60%, 100% 52%, 98% 45%, 100% 38%, 97% 30%, 100% 22%, 98% 15%, 100% 8%, 95% 1%, 88% 0%, 82% 2%, 75% 0%, 68% 1%, 60% 3%, 52% 0%, 45% 2%, 38% 0%, 30% 1%, 22% 4%, 15% 0%, 8% 3%, 2% 0%)",
              }}
            >
              {/* Hole punches on the left */}
              <div className="absolute left-[-6px] top-[20%] w-3 h-3 rounded-full bg-[#0a0a0a] opacity-20" />
              <div className="absolute left-[-6px] top-[60%] w-3 h-3 rounded-full bg-[#0a0a0a] opacity-20" />
              {/* Texture effect */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
                    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
                    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.015) 0.5px, transparent 0)
                  `,
                  backgroundSize: "100% 100%, 100% 100%, 8px 8px",
                }}
              />
              {/* Enhanced texture effect on edges */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.06) 1px, rgba(0,0,0,0.06) 2px),
                    repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.06) 1px, rgba(0,0,0,0.06) 2px)
                  `,
                  maskImage: "linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%), linear-gradient(to bottom, black 0%, transparent 8%, transparent 92%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%), linear-gradient(to bottom, black 0%, transparent 8%, transparent 92%, black 100%)",
                }}
              />
              {/* Text box inside */}
              <div 
                className="relative w-[92%] h-[85%] pointer-events-auto flex flex-col justify-start"
                style={{
                  padding: "clamp(0.5rem, 1.2vw, 1rem)",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {rightBoxContent}
              </div>
            </div>
          )}
          {/* Image drop stack - top right corner, behind boxes, hanging off edge - only for dominant */}
          {size === "dominant" && (
            <div 
              className="hidden md:block absolute z-[5]"
              style={{
                top: "8%",
                right: "-2%",
                width: "30%",
                height: "35%",
              }}
            >
              <ImageDropStack />
            </div>
          )}
        </div>
      )}

      {/* Binder Frame - only show if no background image */}
      {!backgroundImage && (
        <motion.div
          className={cn(
            "relative w-full border border-[#1a1a1a] dark:border-[#2a2a2a] bg-[#0a0a0a] dark:bg-[#0f0f0f]",
            maxWidth,
            isSupporting ? "p-1.5 md:p-2" : "p-2 md:p-3"
          )}
          style={{
            filter: prefersReducedMotion
              ? undefined
              : `contrast(${contrast})`,
            opacity,
          }}
          transition={{
            duration: motionTokens.duration.slow,
            ease: motionTokens.easing.out,
          }}
        >

          {/* Minimal binder hardware - tiny ring dots */}
          <div className="absolute left-1.5 top-1.5 hidden h-1 w-1 bg-foreground/15 md:block" />
          <div className="absolute left-1.5 top-4 hidden h-1 w-1 bg-foreground/15 md:block" />
          <div className="absolute left-1.5 top-6.5 hidden h-1 w-1 bg-foreground/15 md:block" />

          {/* Two-Page Spread */}
          <div className="flex flex-col gap-0 md:flex-row md:gap-2">
            {/* Left Page - paper insert feel */}
            <motion.div
              className="flex-1 border border-[#d4d2cf] bg-[#F7F5F2] p-4 md:p-6 dark:border-[#2a2a2a] dark:bg-[#1a1917]"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : {
                      duration: motionTokens.duration.base,
                      delay: 0.05,
                      ease: motionTokens.easing.out,
                    }
              }
            >
              {left}
            </motion.div>

            {/* Spine - clean vertical gap */}
            <div className="h-px w-full bg-transparent md:h-full md:w-2" />

            {/* Right Page - paper insert feel */}
            <motion.div
              className="flex-1 border border-[#d4d2cf] bg-[#F9F7F4] p-4 md:p-6 dark:border-[#2a2a2a] dark:bg-[#1c1b19]"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : {
                      duration: motionTokens.duration.base,
                      delay: 0.1,
                      ease: motionTokens.easing.out,
                    }
              }
            >
              {right}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Content overlay - positioned absolutely over the image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Text content positioned to match squares */}
          <div className="absolute inset-0 pointer-events-auto">
            {left}
          </div>

          {/* Right content */}
          <div className="absolute inset-0 pointer-events-auto">
            {right}
          </div>
        </div>
      )}
    </section>
  );
}
