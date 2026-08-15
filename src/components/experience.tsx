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
        <div className="flex flex-col gap-4">
          {content.experience.map((job, i) => (
            <Reveal key={job.company} delay={100 + i * 100}>
              <article
                className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-card overflow-hidden transition-all duration-300 hover:border-[var(--accent)] group"
              >

                {/* Terminal header */}
                <div className="flex flex-col gap-2 border-b border-[var(--border)] px-8 pt-6 pb-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm">
                    <span className="text-[var(--accent)] select-none">&gt;</span>
                    <span className="text-[var(--accent)] font-medium">{job.period}</span>
                    <span className="text-[var(--border)] select-none">/</span>
                    <span className="text-foreground font-medium">{job.company}</span>
                    <span className="text-[var(--border)] select-none">/</span>
                    <span className="text-secondary-foreground">{job.role}</span>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                    {job.location}
                  </span>
                </div>

                {/* Terminal output lines */}
                <ul className="px-8 py-5 space-y-3">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 font-mono text-sm text-secondary-foreground">
                      <span className="mt-0.5 shrink-0 text-[var(--accent)] opacity-60 select-none">--</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
