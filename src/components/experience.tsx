import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";

interface ExperienceProps {
  content: SiteContent;
}

export function Experience({ content }: ExperienceProps) {
  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <SectionHeading
          id="experience-heading"
          label={content.sections.experience.label}
          title={content.sections.experience.title}
        />
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
      </Container>
    </Section>
  );
}
