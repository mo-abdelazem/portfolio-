"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
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

function GlobeIcon() {
  return (
    <svg
      className="nav__lang-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M12 21C14.2 18.8 15.3333 15.8 15.3333 12C15.3333 8.2 14.2 5.2 12 3M12 21C9.8 18.8 8.66667 15.8 8.66667 12C8.66667 8.2 9.8 5.2 12 3M3.5 9H20.5M3.5 15H20.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav({ locale, navLinks, copy }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const targetLocale = locale === "ar" ? "en" : "ar";

  // Scroll-spy only applies on the home page, where the nav links are in-page
  // anchors. The shared hook returns the most-visible section id ("" elsewhere).
  const sectionIds =
    pathname === "/"
      ? navLinks
          .map((link) => getHash(link.href)?.replace("#", ""))
          .filter((id): id is string => Boolean(id))
      : [];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);

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
    setMenuOpen(false);
    // Already home → just scroll up; otherwise let the link navigate home.
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
        <Link
          href="/"
          className="nav__logo"
          aria-label={copy.navTopLabel}
          onClick={handleLogoClick}
        >
          MA
        </Link>

        <ul className="nav__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav__link ${isActiveLink(link.href) ? "nav__link--active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`nav__hamburger ${menuOpen ? "nav__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? copy.navCloseLabel : copy.navOpenLabel}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>

        <div className="nav__actions">
          <ThemeToggle label={copy.themeToggleLabel} className="nav__theme" />
          <Link
            href={pathname}
            locale={targetLocale}
            className="nav__lang"
            hrefLang={targetLocale}
            lang={targetLocale}
            aria-label={copy.languageSwitchLabel}
          >
            <GlobeIcon />
            <span className="nav__lang-text">{copy.languageSwitchLabel}</span>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav__overlay" role="dialog" aria-label={copy.navMenuLabel}>
          <ul className="nav__overlay-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav__overlay-link ${isActiveLink(link.href) ? "nav__overlay-link--active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
