import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";

interface EducationProps {
  content: SiteContent;
}

export function Education({ content }: EducationProps) {
  return (
    <section id="education" className="section" aria-labelledby="education-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">{content.sections.education.label}</p>
          <h2 id="education-heading" className="section__title">
            {content.sections.education.title}
          </h2>
        </Reveal>
        <div className="timeline">
          {content.education.map((edu, i) => (
            <Reveal key={edu.school} delay={100 + i * 100}>
              <article className="timeline__item">
                <span className="timeline__marker" aria-hidden="true" />
                <div className="timeline__content">
                  <div className="timeline__head">
                    <h3 className="timeline__title">{edu.school}</h3>
                    <span className="timeline__period">{edu.period}</span>
                  </div>
                  <p className="timeline__subtitle">{edu.degree}</p>
                  <p className="timeline__meta">{edu.location}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
