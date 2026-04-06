import { PROJECTS } from "@/lib/data";
import { Reveal } from "./reveal";

function ExternalLinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.75 6.75L15.75 2.25M15.75 2.25H11.25M15.75 2.25L9.75 8.25M7.5 3.75H5.85C4.59 3.75 3.96 3.75 3.48 3.99C3.06 4.2 2.7 4.56 2.49 4.98C2.25 5.46 2.25 6.09 2.25 7.35V12.15C2.25 13.41 2.25 14.04 2.49 14.52C2.7 14.94 3.06 15.3 3.48 15.51C3.96 15.75 4.59 15.75 5.85 15.75H10.65C11.91 15.75 12.54 15.75 13.02 15.51C13.44 15.3 13.8 14.94 14.01 14.52C14.25 14.04 14.25 13.41 14.25 12.15V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">Work</p>
          <h2 id="projects-heading" className="section__title">
            Key Projects
          </h2>
        </Reveal>
        <div className="projects__list">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={100 + i * 100}>
              <article className="projects__card">
                <div className="projects__card-header">
                  <h3 className="projects__card-title">{project.name}</h3>
                  <div className="projects__card-meta">
                    <span className="projects__card-period">{project.period}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__link"
                      aria-label={`Visit ${project.name} (opens in new tab)`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
                <p className="projects__card-description">{project.description}</p>
                <div className="projects__card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
