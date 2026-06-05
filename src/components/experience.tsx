import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";

interface ExperienceProps {
  content: SiteContent;
}

export function Experience({ content }: ExperienceProps) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">{content.sections.experience.label}</p>
          <h2 id="experience-heading" className="section__title">
            {content.sections.experience.title}
          </h2>
        </Reveal>
        <div className="timeline">
          {content.experience.map((job, i) => (
            <Reveal key={job.company} delay={100 + i * 100}>
              <article className="timeline__item">
                <span className="timeline__marker" aria-hidden="true" />
                <div className="timeline__content">
                  <div className="timeline__head">
                    <h3 className="timeline__title">{job.role}</h3>
                    <span className="timeline__period">
                      {job.period} · {job.location}
                    </span>
                  </div>
                  <p className="timeline__subtitle">{job.company}</p>
                  <ul className="timeline__bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="timeline__bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
