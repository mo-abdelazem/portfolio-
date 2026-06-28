"use client";

import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/types";

function hashId(href: string) {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : null;
}

interface SectionNavProps {
  navLinks: readonly NavLink[];
  label: string;
}

// Fixed vertical dot navigator for the home-page sections, with scroll-spy.
export function SectionNav({ navLinks, label }: SectionNavProps) {
  const sections = navLinks
    .map((link) => {
      const id = hashId(link.href);
      return id ? { id, label: link.label } : null;
    })
    .filter((s): s is { id: string; label: string } => s !== null);

  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navLinks
      .map((link) => hashId(link.href))
      .filter((id): id is string => id !== null);

    // Track each section's visibility and activate the most-visible one, so
    // overlapping sections (and upward scrolling) resolve correctly instead of
    // letting whichever entry fired last win.
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
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -45% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [navLinks]);

  if (sections.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="section-nav" aria-label={label}>
      <ul className="section-nav__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`section-nav__item ${
                active === section.id ? "section-nav__item--active" : ""
              }`}
              onClick={(e) => handleClick(e, section.id)}
              aria-current={active === section.id ? "true" : undefined}
            >
              <span className="section-nav__label">{section.label}</span>
              <span className="section-nav__dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
