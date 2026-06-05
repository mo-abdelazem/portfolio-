"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionCopy, Skills as SkillsData } from "@/lib/types";
import { Reveal } from "./reveal";

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
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">{section.label}</p>
          <h2 id="skills-heading" className="section__title">
            {section.title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="skills__tabs" role="tablist" aria-label="Skill categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={active === cat}
                className={`skills__tab ${active === cat ? "skills__tab--active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div
            key={active}
            className="skills__grid"
            role="tabpanel"
            aria-label={`${active} skills`}
          >
            {items.map((skill) => (
              <span key={skill} className="skills__tile">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
