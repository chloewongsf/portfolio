"use client";

import { useEffect, useRef } from "react";
import { TRANSIT_LINES } from "@/lib/transit-config";
import { useTransit } from "@/lib/transit-context";

/**
 * Watches station sections via IntersectionObserver and updates the active
 * transit line in context. Only runs on the home page where stations exist.
 *
 * Trigger threshold: section must occupy ≥30% of viewport to become active,
 * using a negative top margin so the first section activates on mount.
 */
export function useScrollTrain() {
  const { setActiveId } = useTransit();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = TRANSIT_LINES.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(`station-${id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

        if (visible.length > 0) {
          const id = visible[0].target.id.replace("station-", "") as (typeof ids)[number];
          setActiveId(id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [setActiveId]);
}
