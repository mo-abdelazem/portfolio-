"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionCopy, Skills as SkillsData } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface SkillsProps {
  skills: SkillsData;
  section: SectionCopy;
}

export function Skills({ skills, section }: SkillsProps) {
  const categories = useMemo(() => Object.keys(skills), [skills]);
  const [active, setActive] = useState(categories[0]!);
  const items = skills[active] ?? [];

  useEffect(() => {
    setActive(categories[0]!);
  }, [categories]);

  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          id="skills-heading"
          label={section.label}
          title={section.title}
        />
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Terminal-style category sidebar */}
          <Reveal delay={100}>
            <div
              className="flex flex-row flex-wrap gap-1 md:flex-col md:w-48 md:flex-shrink-0"
              role="tablist"
              aria-label="Skill categories"
            >
              {categories.map((cat) => {
                const selected = active === cat;
                return (
                  <button
                    key={cat}
                    id={`skills-tab-${cat}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="skills-panel"
                    className={cn(
                      "group relative flex items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2.5 font-mono text-[13px] font-medium transition-all duration-200 text-left",
                      selected
                        ? "border-l-2 border-[var(--accent)] bg-[rgba(183,255,114,0.08)] text-[var(--accent)] pl-[14px]"
                        : "border-l-2 border-transparent text-secondary-foreground hover:border-[var(--border)] hover:text-foreground pl-[14px]",
                    )}
                    onClick={() => setActive(cat)}
                  >
                    <span className={cn(
                      "transition-opacity duration-200 font-mono text-[var(--accent)]",
                      selected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )}>{">"}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div
              key={active}
              id="skills-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`skills-tab-${active}`}
              className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3 animate-[skills-fade_0.4s_var(--ease-spring)] focus-visible:outline-none"
            >
              {items.map((skill) => (
                <span
                  key={skill}
                  className="group flex items-center justify-center gap-0 rounded-[var(--radius-md)] border border-[var(--border)] bg-card px-4 py-3.5 font-mono text-[13px] font-medium tracking-wide text-secondary-foreground shadow-[var(--shadow-card)] transition-all duration-[250ms] ease-[var(--ease-spring)] hover:-translate-y-[2px] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_rgba(183,255,114,0.12)]"
                >
                  <span aria-hidden="true" className="text-[var(--border)] group-hover:text-[var(--accent)] transition-colors duration-200">[</span>
                  <span className="px-1.5">{skill}</span>
                  <span aria-hidden="true" className="text-[var(--border)] group-hover:text-[var(--accent)] transition-colors duration-200">]</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
