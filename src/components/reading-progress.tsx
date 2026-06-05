"use client";

import { useEffect, useState } from "react";

// Thin bar pinned to the top that fills as you scroll the article, plus a
// floating "back to top" button that appears once you've scrolled down — both
// share one scroll listener.
export function ReadingProgress({ topLabel }: { topLabel: string }) {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      setShowTop(el.scrollTop > 600);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div
          className="reading-progress__bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <button
        type="button"
        className={`to-top ${showTop ? "to-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={topLabel}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5M6 11l6-6 6 6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
