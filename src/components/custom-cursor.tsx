"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch / fine pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;

    const render = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      rafId = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }

      if (cursor.style.opacity !== "1") {
        cursor.style.opacity = "1";
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.closest("[role='tab']");

      if (isInteractive) {
        cursor.classList.add("cursor--pointer");
      } else {
        cursor.classList.remove("cursor--pointer");
      }
    };

    const onMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100 h-3 w-3 rounded-full bg-(--accent) opacity-0 transition-[width,height,opacity,background-color] duration-150 ease-out will-change-transform [&.cursor--pointer]:h-7 [&.cursor--pointer]:w-7 [&.cursor--pointer]:opacity-40 [&.cursor--pointer]:backdrop-blur-xs"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    />
  );
}

