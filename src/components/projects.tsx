"use client";

import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
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

        <div className="flex flex-col gap-4">
          {content.projects.map((project, i) => {
            const indexStr = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={project.name} delay={100 + i * 80}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${content.copy.externalProjectLabel} ${project.name}`}
                  className="group relative flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border border-white/10 bg-[#090c0a] p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-(--accent) hover:shadow-[0_0_40px_rgba(183,255,114,0.08)] overflow-hidden"
                >
                  {/* Subtle hover gradient sweep */}
                  <div 
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_80%_50%,rgba(183,255,114,0.06),transparent_60%)]" 
                    aria-hidden="true" 
                  />

                  {/* Left: Project Number & Divider */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className="font-mono text-4xl sm:text-5xl font-black leading-none text-white/30 group-hover:text-(--accent) transition-colors duration-300 tabular-nums select-none"
                      aria-hidden="true"
                    >
                      {indexStr}
                    </span>
                    <div className="hidden md:block h-12 w-px bg-white/10 group-hover:bg-(--accent)/40 transition-colors" />
                  </div>

                  {/* Center: Details */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-(--accent) transition-colors duration-200">
                        {project.name}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                        {project.period}
                      </span>
                    </div>

                    <p className="text-sm sm:text-[15px] text-secondary-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] uppercase tracking-wider text-white/70 border border-white/10 rounded-md px-2.5 py-1 bg-black/30 group-hover:border-(--accent)/30 group-hover:text-(--accent) transition-colors duration-200"
                        >
                          [{tag}]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Circular Launch Button */}
                  <div className="shrink-0 self-end md:self-center flex items-center justify-center h-12 w-12 rounded-full border border-white/15 bg-black/40 text-white/60 transition-all duration-300 group-hover:bg-(--accent) group-hover:text-[#070908] group-hover:border-(--accent) group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(183,255,114,0.4)]">
                    <ArrowIcon />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
