"use client";

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

        <div className="relative flex flex-col">
          {content.experience.map((job, i) => {
            const commitHash = "c0m" + (i * 7 + 4321).toString(16).padEnd(5, "a");
            const isLast = i === content.experience.length - 1;

            return (
              <div key={job.company} className="relative flex items-stretch gap-4 sm:gap-8">
                
                {/* Timeline Column with perfectly centered line and glowing node */}
                <div className="relative hidden sm:flex flex-col items-center shrink-0 w-8">
                  {/* Glowing commit node */}
                  <div className="relative z-10 my-6 flex h-7 w-7 items-center justify-center rounded-full border border-(--accent) bg-[#070908] shadow-[0_0_16px_rgba(183,255,114,0.4)] shrink-0">
                    <span className="h-2 w-2 rounded-full bg-(--accent)" />
                  </div>

                  {/* Connecting Line going down */}
                  {!isLast && (
                    <div 
                      className="w-px flex-1 bg-linear-to-b from-(--accent)/40 via-white/10 to-white/5" 
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Terminal Card */}
                <div className="flex-1 pb-8">
                  <Reveal delay={100 + i * 100}>
                    <article className="rounded-2xl border border-white/10 bg-[#090c0a] overflow-hidden shadow-xl transition-all duration-300 hover:border-(--accent)/50 group">
                      
                      {/* Header bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 bg-black/30 px-6 sm:px-8 py-4">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs md:text-sm">
                          <span className="text-(--accent) font-semibold select-none">&gt;</span>
                          <span className="text-white font-bold">{job.company}</span>
                          <span className="text-white/30 select-none">/</span>
                          <span className="text-(--accent)">{job.role}</span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                          <span className="rounded bg-white/5 px-2 py-0.5 border border-white/10 text-white/70">
                            {job.period}
                          </span>
                          <span>{job.location}</span>
                        </div>
                      </div>

                      {/* Meta line */}
                      <div className="flex items-center justify-between px-6 sm:px-8 pt-4 font-mono text-[11px] text-white/40">
                        <span>commit: {commitHash}</span>
                        <span>branch: main</span>
                      </div>

                      {/* Bullet Points */}
                      <ul className="px-6 sm:px-8 py-5 space-y-3">
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 font-mono text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                            <span className="mt-1 shrink-0 text-(--accent) opacity-70 select-none">--</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                    </article>
                  </Reveal>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
