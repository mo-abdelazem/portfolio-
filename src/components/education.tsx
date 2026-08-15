import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";

interface EducationProps {
  content: SiteContent;
}

export function Education({ content }: EducationProps) {
  return (
    <Section id="education" aria-labelledby="education-heading">
      <Container>
        <SectionHeading
          id="education-heading"
          label={content.sections.education.label}
          title={content.sections.education.title}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.education.map((edu, i) => (
            <Reveal key={edu.school} delay={100 + i * 100}>
              <article className="relative flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-[var(--accent)] group min-h-[200px]">
                {/* Scanline overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(183,255,114,0.5) 2px, rgba(183,255,114,0.5) 3px)",
                    backgroundSize: "100% 6px",
                  }}
                />

                {/* Certified badge */}
                <div className="absolute top-4 end-4 font-mono text-[10px] text-[var(--accent)] border border-[var(--accent)] border-opacity-40 rounded px-2 py-0.5 bg-[rgba(183,255,114,0.06)] uppercase tracking-wider">
                  [CERTIFIED]
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">
                    {edu.period} · {edu.location}
                  </p>
                  <h3 className="font-mono text-base text-foreground font-medium mb-2 pe-24">
                    [{edu.school}]
                  </h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    {edu.degree}
                  </p>
                </div>

                {/* Bottom corner grid decoration */}
                <div
                  className="absolute -bottom-4 -start-4 w-20 h-20 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
