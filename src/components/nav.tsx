"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, PERSONAL } from "@/lib/data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Primary navigation">
        <button
          className="nav__logo"
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
        >
          MA
        </button>

        <ul className="nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav__link ${activeSection === link.href ? "nav__link--active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={`mailto:${PERSONAL.email}`} className="nav__cta">
          Say Hello
        </a>

        <button
          className={`nav__hamburger ${menuOpen ? "nav__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="nav__overlay" role="dialog" aria-label="Navigation menu">
          <ul className="nav__overlay-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav__overlay-link ${activeSection === link.href ? "nav__overlay-link--active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="nav__overlay-cta"
            onClick={() => setMenuOpen(false)}
          >
            Say Hello
          </a>
        </div>
      )}
    </header>
  );
}
