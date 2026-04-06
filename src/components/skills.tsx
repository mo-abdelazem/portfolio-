"use client";

import { useState } from "react";
import { SKILLS } from "@/lib/data";
import { Reveal } from "./reveal";

type SkillCategory = keyof typeof SKILLS;
const categories = Object.keys(SKILLS) as SkillCategory[];

export function Skills() {
  const [active, setActive] = useState<SkillCategory>(categories[0]!);
  const items = SKILLS[active];

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">Capabilities</p>
          <h2 id="skills-heading" className="section__title">
            Tech Stack
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
          <div className="skills__chips" role="tabpanel" aria-label={`${active} skills`}>
            {items?.map((skill) => (
              <span key={skill} className="skills__chip">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
