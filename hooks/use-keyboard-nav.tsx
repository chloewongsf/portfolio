"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Page navigation map: defines which page to go to for left/right
const pageNavigationMap: Record<string, { left?: string; right?: string }> = {
  "/": {
    right: "/work",
  },
  "/work": {
    right: "/about",
    left: "/",
  },
  "/about": {
    right: "/contact",
    left: "/work",
  },
  "/contact": {
    left: "/about",
  },
};

export function useKeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset to first item when page changes
    setCurrentIndex(0);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      let direction: "up" | "down" | "left" | "right" | null = null;

      // Arrow keys
      if (e.key === "ArrowUp") direction = "up";
      if (e.key === "ArrowDown") direction = "down";
      if (e.key === "ArrowLeft") direction = "left";
      if (e.key === "ArrowRight") direction = "right";

      // WASD keys
      if (e.key === "w" || e.key === "W") direction = "up";
      if (e.key === "s" || e.key === "S") direction = "down";
      if (e.key === "a" || e.key === "A") direction = "left";
      if (e.key === "d" || e.key === "D") direction = "right";

      // Handle Enter key to activate selected item
      if (e.key === "Enter") {
        e.preventDefault();
        const navItems = document.querySelectorAll("[data-nav-item]");
        const activeItem = navItems[currentIndex];

        // If it's a link, click it
        if (activeItem instanceof HTMLAnchorElement) {
          activeItem.click();
        } else {
          // Otherwise, find the closest parent link and click it
          const parentLink = activeItem?.closest("a");
          if (parentLink) {
            parentLink.click();
          }
        }
        return;
      }

      if (direction) {
        e.preventDefault();

        // Handle up/down navigation within page
        if (direction === "up" || direction === "down") {
          const navItems = document.querySelectorAll("[data-nav-item]");
          if (navItems.length === 0) return;

          // Remove active class from current item
          navItems.forEach((item) => item.classList.remove("nav-active"));

          let newIndex = currentIndex;
          if (direction === "down") {
            newIndex = Math.min(currentIndex + 1, navItems.length - 1);
          } else {
            newIndex = Math.max(currentIndex - 1, 0);
          }

          setCurrentIndex(newIndex);
          navItems[newIndex].classList.add("nav-active");

          // Prevent default scroll behavior
          navItems[newIndex].scrollIntoView({ behavior: "instant", block: "nearest" });
        }

        // Handle left/right navigation between pages
        if (direction === "left" || direction === "right") {
          if (!pathname) return;
          const currentNav = pageNavigationMap[pathname];
          if (currentNav && currentNav[direction]) {
            router.push(currentNav[direction]!);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname, currentIndex]);

  useEffect(() => {
    // Set initial active state
    const navItems = document.querySelectorAll("[data-nav-item]");
    if (navItems.length > 0) {
      navItems[0].classList.add("nav-active");
    }
  }, [pathname]);
}
