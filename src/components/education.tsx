"use client";

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.education.map((edu, i) => (
            <Reveal key={edu.school} delay={100 + i * 100}>
              <article className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#090c0a] p-8 sm:p-10 overflow-hidden transition-all duration-300 hover:border-(--accent) group min-h-64 shadow-xl">
                {/* Scanline overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(183,255,114,0.4) 2px, rgba(183,255,114,0.4) 3px)",
                    backgroundSize: "100% 6px",
                  }}
                />

                {/* Top bar with Certified badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    0{i + 1}{"//"} {edu.period}
                  </span>
                  <div className="font-mono text-[10px] text-(--accent) border border-(--accent)/40 rounded-md px-2.5 py-1 bg-(--accent)/8 uppercase font-semibold tracking-wider">
                    {content.educationCertifiedBadge ?? "[VERIFIED CREDENTIAL]"}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl text-white font-bold group-hover:text-(--accent) transition-colors">
                    <span className="font-mono text-(--accent)/70 me-1">[</span>
                    {edu.school}
                    <span className="font-mono text-(--accent)/70 ms-1">]</span>
                  </h3>
                  <p className="text-sm md:text-[15px] text-secondary-foreground leading-relaxed">
                    {edu.degree}
                  </p>
                  <p className="font-mono text-xs text-white/50 pt-2">
                    LOC: {edu.location} {"//"} EGYPT
                  </p>
                </div>

                {/* Bottom corner grid decoration */}
                <div
                  className="absolute -bottom-4 -inset-s-4 w-24 h-24 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
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
