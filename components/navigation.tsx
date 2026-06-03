"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { href: "/core-projects", label: "core" },
  { href: "/creative-technology", label: "creative tech" },
  { href: "/data-research", label: "data&research" },
  { href: "/visual-design", label: "visual design" },
  { href: "/about", label: "about" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let accumulatedDelta = 0;
    let timeoutId: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      accumulatedDelta += e.deltaY;
      
      // Clear any pending timeout
      clearTimeout(timeoutId);
      
      // Debounce and check accumulated scroll
      timeoutId = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 5) {
          const isScrollingDown = accumulatedDelta > 0;
          
          if (isScrollingDown) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          accumulatedDelta = 0;
        }
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      {/* Test button - remove after testing */}
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{ position: 'fixed', top: '100px', right: '20px', zIndex: 9999, padding: '10px', background: 'red', color: 'white' }}
      >
        Toggle Nav (Test)
      </button>
      
      <motion.nav 
        className="fixed top-0 z-50 w-full bg-black"
        animate={{ 
          y: isVisible ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          height: "clamp(32px, 2.2vw, 56px)",
        }}
      >
        <div 
          className="flex items-center justify-between w-full h-full"
          style={{
            paddingLeft: "clamp(1rem, 2vw, 2rem)",
            paddingRight: "clamp(1rem, 2vw, 2rem)",
          }}
        >
        <Link
          href="/"
          className="font-bold text-white transition-opacity hover:opacity-70"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
            letterSpacing: "-0.03em",
          }}
        >
          CHLOE WONG
        </Link>
        <div 
          className="flex items-center"
          style={{
            gap: "clamp(0.75rem, 1.5vw, 1.5rem)",
          }}
        >
          <div 
            className="flex items-center"
            style={{
              gap: "clamp(0.25rem, 0.5vw, 0.5rem)",
            }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-bold transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  )}
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
                    letterSpacing: "-0.03em",
                    paddingLeft: "clamp(0.5rem, 1vw, 0.75rem)",
                    paddingRight: "clamp(0.5rem, 1vw, 0.75rem)",
                    paddingTop: "clamp(0.25rem, 0.5vw, 0.5rem)",
                    paddingBottom: "clamp(0.25rem, 0.5vw, 0.5rem)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        </div>
      </motion.nav>
      {/* Spacer to push content down when nav is visible */}
      <motion.div
        className="w-full bg-black"
        animate={{
          height: isVisible ? "clamp(32px, 2.2vw, 56px)" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </>
  );
}
