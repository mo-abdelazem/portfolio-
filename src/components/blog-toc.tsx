"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/blog";

interface BlogTocProps {
  items: readonly TocItem[];
  label: string;
  openLabel: string;
  closeLabel: string;
}

const DESKTOP_QUERY = "(min-width: 1100px)";

export function BlogToc({ items, label, openLabel, closeLabel }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  // Closed by default so server HTML and first client render agree (mobile).
  // On desktop we force the inline list open after mount.
  const [open, setOpen] = useState(false);
  // The mobile end-drawer, independent of the desktop inline list.
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fabRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  // When a TOC link closes the drawer, remember where to jump so the scroll can
  // run *after* the drawer's scroll lock is released (see the drawer effect).
  const pendingScrollRef = useRef<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      setOpen(media.matches);
      // Leaving mobile width closes the drawer so it can't linger on desktop.
      if (media.matches) setDrawerOpen(false);
    };
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

  // Drawer side effects: lock body scroll, close on Escape, and move focus in
  // on open / back to the trigger on close.
  useEffect(() => {
    if (!drawerOpen) return;

    // Lock the actual scroller (the root element here, not <body>) so the page
    // behind the drawer can't scroll.
    const scroller = document.documentElement;
    const prevOverflow = scroller.style.overflow;
    scroller.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // Focus the first link so keyboard users land inside the drawer.
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore the scroll lock FIRST, then run any pending jump — scrolling
      // while still locked would clamp to the top.
      scroller.style.overflow = prevOverflow;

      const pending = pendingScrollRef.current;
      if (pending) {
        pendingScrollRef.current = null;
        const target = document.getElementById(pending);
        if (target) {
          // Compute the absolute position and jump with the same 100px header
          // offset the headings' scroll-margin-top uses. "instant" avoids the
          // global smooth behavior fighting the scroll-reveal animations.
          const y = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "instant" });
          history.replaceState(null, "", `#${pending}`);
        }
      } else {
        // Closed without navigating (backdrop / Escape / close button): return
        // focus to the FAB that opened it.
        fabRef.current?.focus();
      }
    };
  }, [drawerOpen]);

  if (items.length === 0) return null;

  // Take full control of the jump: prevent the default anchor scroll (it fires
  // while the drawer still has scroll locked and is lost), record the target,
  // and close the drawer. The drawer effect's cleanup performs the jump after
  // it releases the lock. (scroll-margin-top on headings supplies the offset.)
  const closeAndScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    pendingScrollRef.current = id;
    setDrawerOpen(false);
  };

  const list = (
    onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void,
  ) => (
    <ul className="blog-toc__list">
      {items.map((item) => (
        <li key={item.id} className="blog-toc__item" data-depth={item.depth}>
          <a
            href={`#${item.id}`}
            className={`blog-toc__link ${
              activeId === item.id ? "blog-toc__link--active" : ""
            }`}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={onNavigate ? (e) => onNavigate(e, item.id) : undefined}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: inline list inside the sticky sidebar. */}
      <details
        className="blog-toc"
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
      >
        <summary className="blog-toc__summary">{label}</summary>
        <nav aria-label={label}>{list()}</nav>
      </details>

      {/* Mobile: floating trigger that opens an end drawer. */}
      <button
        ref={fabRef}
        type="button"
        className="toc-fab"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={drawerOpen}
        aria-controls="toc-drawer"
        onClick={() => setDrawerOpen(true)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={`toc-drawer-root ${drawerOpen ? "is-open" : ""}`}>
        <div
          className="toc-drawer__backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
        <aside
          ref={drawerRef}
          id="toc-drawer"
          className="toc-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          inert={!drawerOpen}
        >
          <div className="toc-drawer__head">
            <span className="toc-drawer__title">{label}</span>
            <button
              type="button"
              className="toc-drawer__close"
              aria-label={closeLabel}
              onClick={() => setDrawerOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav aria-label={label} className="toc-drawer__nav">
            {list(closeAndScrollTo)}
          </nav>
        </aside>
      </div>
    </>
  );
}
