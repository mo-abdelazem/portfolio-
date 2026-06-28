import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ProjectsProps {
  content: SiteContent;
}

export function Projects({ content }: ProjectsProps) {
  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container>
        <SectionHeading
          id="projects-heading"
          label={content.sections.projects.label}
          title={content.sections.projects.title}
        />
        <div className="flex flex-col gap-5">
          {content.projects.map((project, i) => (
            <Reveal key={project.name} delay={100 + i * 100}>
              <Card
                interactive
                className="group relative flex flex-col p-7 md:p-10"
              >
                <div className="mb-3 flex flex-col items-baseline gap-1 md:flex-row md:justify-between md:gap-4">
                  <CardTitle>{project.name}</CardTitle>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    <span className="text-sm tracking-[0.14px] text-muted-foreground">
                      {project.period}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${content.copy.externalProjectLabel} ${project.name}`}
                      className="relative z-[1] inline-flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground shadow-[var(--shadow-inset),var(--shadow-ring)] transition-[color,box-shadow,background-color,transform] duration-[250ms] ease-[var(--ease-spring)] after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] hover:bg-secondary hover:text-foreground hover:shadow-[var(--shadow-inset),var(--shadow-ring),var(--shadow-soft)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-foreground"
                    >
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
                <CardDescription className="mb-5">
                  {project.description}
                </CardDescription>
                <div className="relative z-[1] flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
