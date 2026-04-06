import { EXPERIENCE } from "@/lib/data";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">Career</p>
          <h2 id="experience-heading" className="section__title">
            Experience
          </h2>
        </Reveal>
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.company} delay={100 + i * 100}>
            <article className="experience__item">
              <div className="experience__meta">
                <h3 className="experience__role">{job.role}</h3>
                <p className="experience__company">{job.company}</p>
                <p className="experience__period">
                  {job.period} · {job.location}
                </p>
              </div>
              <ul className="experience__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="experience__bullet">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
