"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy that reports the most-visible section among `ids`.
 *
 * Activates the section with the greatest intersection ratio rather than
 * whichever observer entry fired last, so overlapping sections and upward
 * scrolling resolve correctly. Pass an empty list to disable (e.g. off the
 * home page). Returns the active element id, or "" when none is resolved yet.
 */
export function useScrollSpy(
  ids: readonly string[],
  rootMargin = "-15% 0px -45% 0px",
): string {
  const [active, setActive] = useState("");
  // Stable primitive dependency so a fresh array literal each render doesn't
  // re-create the observer.
  const key = ids.join(",");

  useEffect(() => {
    const sectionIds = key.split(",").filter(Boolean);
    if (sectionIds.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [key, rootMargin]);

  return active;
}
