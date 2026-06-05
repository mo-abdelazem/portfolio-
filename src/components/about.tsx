import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";

interface AboutProps {
  content: SiteContent;
}

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">{content.sections.about.label}</p>
          <h2 id="about-heading" className="section__title">
            {content.sections.about.title}
          </h2>
        </Reveal>
        <div className="about__grid">
          <Reveal delay={100}>
            <p className="about__bio">{content.personal.bio}</p>
          </Reveal>
          <div className="about__details">
            {content.details.map((detail, i) => (
              <Reveal key={detail.label} delay={150 + i * 75}>
                <div className="about__card">
                  <span className="about__card-label">{detail.label}</span>
                  <span className="about__card-value">{detail.value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
