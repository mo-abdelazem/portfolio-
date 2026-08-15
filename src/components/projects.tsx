import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="1.8"
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
        <div className="flex flex-col gap-3">
          {content.projects.map((project, i) => (
            <Reveal key={project.name} delay={100 + i * 80}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${content.copy.externalProjectLabel} ${project.name}`}
                className="group flex items-center gap-5 md:gap-8 rounded-[var(--radius-xl)] border border-[var(--border)] bg-card px-6 py-6 md:px-10 md:py-7 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[rgba(183,255,114,0.03)] relative overflow-hidden"
              >
                {/* Number */}
                <span
                  className="shrink-0 font-mono text-4xl md:text-5xl font-bold leading-none text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity duration-300 w-12 md:w-16 text-center tabular-nums select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Divider */}
                <div className="hidden md:block shrink-0 h-10 w-px bg-[var(--border)] group-hover:bg-[var(--accent)] group-hover:opacity-30 transition-colors duration-300" />

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-medium text-foreground text-base md:text-lg leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0">
                      {project.period}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-[var(--border)] rounded px-2 py-0.5 group-hover:border-[rgba(183,255,114,0.3)] group-hover:text-[var(--accent)] transition-colors duration-200"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow button */}
                <div className="shrink-0 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-[var(--border)] bg-[rgba(0,0,0,0.2)] text-muted-foreground transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(183,255,114,0.4)]">
                  <ArrowIcon />
                </div>

                {/* Subtle right-side glow on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(270deg, rgba(183,255,114,0.04) 0%, transparent 50%)" }} />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
