import { PERSONAL } from "@/lib/data";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__inner">
        <Reveal>
          <p className="hero__eyebrow">{PERSONAL.title}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="hero__title">
            Building <em>performant</em> web experiences
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="hero__description">{PERSONAL.heroDescription}</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              View Projects
            </a>
            <a href="#contact" className="hero__btn hero__btn--outline">
              Get in Touch
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
