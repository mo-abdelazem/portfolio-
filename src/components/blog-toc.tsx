"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

interface BlogTocProps {
  items: readonly TocItem[];
  label: string;
}

const DESKTOP_QUERY = "(min-width: 1100px)";

export function BlogToc({ items, label }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  // Closed by default so server HTML and first client render agree (mobile).
  // On desktop we force it open after mount.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setOpen(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <details
      className="blog-toc"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="blog-toc__summary">{label}</summary>
      <nav aria-label={label}>
        <ul className="blog-toc__list">
          {items.map((item) => (
            <li
              key={item.id}
              className="blog-toc__item"
              data-depth={item.depth}
            >
              <a
                href={`#${item.id}`}
                className={`blog-toc__link ${
                  activeId === item.id ? "blog-toc__link--active" : ""
                }`}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
