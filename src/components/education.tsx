import { EDUCATION } from "@/lib/data";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">Training</p>
          <h2 id="education-heading" className="section__title">
            Education
          </h2>
        </Reveal>
        {EDUCATION.map((edu, i) => (
          <Reveal key={edu.school} delay={100 + i * 100}>
            <article className="education__item">
              <div className="education__main">
                <h3 className="education__school">{edu.school}</h3>
                <p className="education__degree">{edu.degree}</p>
              </div>
              <div className="education__aside">
                <p className="education__period">{edu.period}</p>
                <p className="education__location">{edu.location}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
