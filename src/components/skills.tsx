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
        <Reveal delay={100}>
          <div
            className="mb-8 flex flex-wrap gap-2"
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
                    "rounded-full px-[18px] py-2 text-sm font-medium tracking-[0.14px] transition-[background-color,color,box-shadow] duration-200",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground shadow-[var(--shadow-ring)] hover:bg-secondary",
                  )}
                  onClick={() => setActive(cat)}
                >
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
            className="grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3 animate-[skills-fade_0.4s_var(--ease-spring)] focus-visible:outline-none"
          >
            {items.map((skill) => (
              <span
                key={skill}
                className="group flex items-center gap-[11px] rounded-[var(--radius-md)] bg-card px-[18px] py-4 text-[15px] font-medium tracking-[0.1px] text-foreground shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[250ms] ease-[var(--ease-spring)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-ring),rgba(0,0,0,0.05)_0px_6px_16px]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--text-muted)] transition-[transform,background-color] duration-[250ms] ease-[var(--ease-spring)] group-hover:scale-150 group-hover:bg-[var(--text)]"
                />
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
