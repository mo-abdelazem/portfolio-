"use client";

import type { NavLink } from "@/lib/types";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

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

  const active = useScrollSpy(sections.map((s) => s.id));

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
