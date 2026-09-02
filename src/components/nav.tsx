"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { motion } from "framer-motion";
import type { Locale, NavLink, SiteCopy } from "@/lib/types";

interface NavProps {
  locale: Locale;
  navLinks: readonly NavLink[];
  copy: SiteCopy;
}

function getHash(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex) : null;
}

export function Nav({ locale, navLinks, copy }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const targetLocale = locale === "ar" ? "en" : "ar";

  const sectionIds =
    pathname === "/"
      ? navLinks
          .map((link) => getHash(link.href)?.replace("#", ""))
          .filter((id): id is string => Boolean(id))
      : [];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const scroller = document.documentElement;
    const prevOverflow = scroller.style.overflow;
    scroller.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      scroller.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (menuOpen) {
      setMenuOpen(false);
      hamburgerRef.current?.focus();
    }

    const hash = getHash(href);
    const targetPathname = href.split("#")[0] || "/";

    if (!hash || pathname !== targetPathname) {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: "smooth" });
  }

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (menuOpen) {
      setMenuOpen(false);
    }
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function isActiveLink(href: string) {
    const hash = getHash(href);
    if (hash) {
      return pathname === "/" && activeSection === hash.slice(1);
    }
    return href === "/blog" && pathname.startsWith("/blog");
  }

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <nav className="nav__inner" aria-label={copy.navAriaLabel}>
        {/* Brand Logo [MA] */}
        <Link
          href="/"
          className="nav__logo"
          aria-label={copy.navTopLabel}
          onClick={handleLogoClick}
        >
          <span className="nav__logo-bracket">[</span>
          MA
          <span className="nav__logo-bracket">]</span>
        </Link>

        {/* Numbered Monospaced Navigation */}
        <ul
          className="nav__links"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((link, idx) => {
            const isActive = isActiveLink(link.href);
            const indexStr = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setHoveredPath(link.href)}
              >
                {hoveredPath === link.href && (
                  <motion.div
                    layoutId="nav-hover"
                    className="nav__hover-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Link
                  href={link.href}
                  className={`nav__link ${isActive ? "nav__link--active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="font-mono text-[10px] opacity-40 group-hover:opacity-75">
                      {indexStr}{"//"}
                    </span>
                    <span className="uppercase">{link.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger Toggle */}
        <button
          ref={hamburgerRef}
          className={`nav__hamburger ${menuOpen ? "nav__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? copy.navCloseLabel : copy.navOpenLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-sheet"
        >
          <span />
          <span />
        </button>

        {/* Language switch actions */}
        <div className="nav__actions">
          <Link
            href={pathname}
            locale={targetLocale}
            className="nav__lang-toggle"
            hrefLang={targetLocale}
            lang={targetLocale}
            aria-label={copy.languageSwitchLabel}
          >
            <span className={`nav__lang-option ${locale === "en" ? "nav__lang-option--active" : ""}`}>EN</span>
            <span className={`nav__lang-option ${locale === "ar" ? "nav__lang-option--active" : ""}`}>AR</span>
          </Link>
        </div>
      </nav>

      {/* Bottom slide-up sheet */}
      {menuOpen && (
        <div
          className="nav__overlay"
          role="dialog"
          aria-modal="true"
          aria-label={copy.navMenuLabel}
          onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
        >
          <div ref={sheetRef} id="mobile-nav-sheet" className="nav__sheet">
            <div className="nav__sheet-handle" aria-hidden="true" />
            <ul className="nav__overlay-links">
              {navLinks.map((link, idx) => {
                const indexStr = String(idx + 1).padStart(2, "0");
                const isActive = isActiveLink(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav__overlay-link ${isActive ? "nav__overlay-link--active" : ""}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span className="font-mono text-xs opacity-40">{indexStr}{"//"}</span>
                      <span className="uppercase">{link.label}</span>
                      {isActive && (
                        <span className="nav__overlay-active-dot ms-auto" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="nav__sheet-footer">
              <Link
                href={pathname}
                locale={targetLocale}
                className="nav__lang-toggle"
                hrefLang={targetLocale}
                lang={targetLocale}
                aria-label={copy.languageSwitchLabel}
                onClick={() => setMenuOpen(false)}
              >
                <span className={`nav__lang-option ${locale === "en" ? "nav__lang-option--active" : ""}`}>EN</span>
                <span className={`nav__lang-option ${locale === "ar" ? "nav__lang-option--active" : ""}`}>AR</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
