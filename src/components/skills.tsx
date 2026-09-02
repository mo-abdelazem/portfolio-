"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setActive(categories[0]!);
  }, [categories]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % categories.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = categories.length - 1;
    } else {
      return;
    }

    const nextCat = categories[nextIndex]!;
    setActive(nextCat);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          id="skills-heading"
          label={section.label}
          title={section.title}
        />

        {/* Full-Stack Architecture Pipeline Banner */}
        <Reveal delay={100}>
          <div className="mb-10 rounded-2xl border border-white/10 bg-[#090c0a] p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-(--accent)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                <span className="font-semibold uppercase">MERN STACK ARCHITECTURE PIPELINE</span>
              </div>
              <span className="hidden sm:inline text-white/40">END-TO-END FLOW</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="flex flex-col gap-1.5 rounded-xl border border-white/5 bg-black/40 p-4">
                <span className="text-(--accent) font-semibold">01 // CLIENT LAYER</span>
                <span className="text-white text-sm font-medium">React 19 & Next.js</span>
                <span className="text-muted-foreground text-[11px]">SSR, SSG, TypeScript, Tailwind</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl border border-white/5 bg-black/40 p-4">
                <span className="text-(--accent) font-semibold">02 // API & BACKEND</span>
                <span className="text-white text-sm font-medium">Node.js & Express.js</span>
                <span className="text-muted-foreground text-[11px]">RESTful APIs, JWT Auth, Microservices</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl border border-white/5 bg-black/40 p-4">
                <span className="text-(--accent) font-semibold">03 // PERSISTENCE</span>
                <span className="text-white text-sm font-medium">MongoDB & PostgreSQL</span>
                <span className="text-muted-foreground text-[11px]">Mongoose, Schemas, Aggregations</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Tabs & Interactive Skills Grid */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          {/* Terminal-style category sidebar */}
          <Reveal delay={150}>
            <div
              className="flex flex-row flex-wrap gap-2 md:flex-col md:w-56 md:shrink-0"
              role="tablist"
              aria-label="Skill categories"
            >
              {categories.map((cat, index) => {
                const selected = active === cat;
                const indexStr = String(index + 1).padStart(2, "0");
                return (
                  <button
                    key={cat}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={`skills-tab-${cat}`}
                    role="tab"
                    type="button"
                    tabIndex={selected ? 0 : -1}
                    aria-selected={selected}
                    aria-controls="skills-panel"
                    className={cn(
                      "group relative flex items-center justify-between rounded-xl px-4 py-3 font-mono text-xs font-semibold transition-all duration-200 text-start border",
                      selected
                        ? "border-(--accent) bg-(--accent)/10 text-(--accent) shadow-[0_0_16px_rgba(183,255,114,0.15)]"
                        : "border-white/5 bg-[#090c0a] text-secondary-foreground hover:border-white/20 hover:text-white",
                    )}
                    onClick={() => setActive(cat)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-(--accent) opacity-60">&gt;_</span>
                      <span>{cat}</span>
                    </div>
                    <span className="text-[10px] opacity-40 group-hover:opacity-75">{indexStr}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Skill items chips grid */}
          <Reveal delay={200} className="flex-1">
            <div
              key={active}
              id="skills-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`skills-tab-${active}`}
              className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 focus-visible:outline-none"
            >
              {items.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-[#090c0a] px-4 py-3.5 font-mono text-xs font-medium tracking-wide text-white/90 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--accent) hover:shadow-[0_0_20px_rgba(183,255,114,0.15)] select-none"
                >
                  <span aria-hidden="true" className="text-white/30 group-hover:text-(--accent) transition-colors">[</span>
                  <span className="px-1">{skill}</span>
                  <span aria-hidden="true" className="text-white/30 group-hover:text-(--accent) transition-colors">]</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </Container>
    </Section>
  );
}
