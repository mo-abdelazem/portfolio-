import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";

interface HeroProps {
  content: SiteContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__inner">
        <Reveal>
          <p className="hero__eyebrow">{content.personal.title}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="hero__title">{content.personal.heroHeadline}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="hero__description">{content.personal.heroDescription}</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              {content.copy.heroPrimaryCta}
              <svg
                className="hero__btn-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--outline">
              {content.copy.heroSecondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">{content.copy.scrollLabel}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
