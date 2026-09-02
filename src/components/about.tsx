"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/animated-counter";

interface AboutProps {
  content: SiteContent;
}

const DEFAULT_STATS = [
  { label: "Years experience", target: 1, suffix: "+" },
  { label: "Projects shipped", target: 20, suffix: "+" },
  { label: "Lighthouse score", target: 85, suffix: "+" },
  { label: "Frameworks", target: 4, suffix: "" },
];

export function About({ content }: AboutProps) {
  const stats = content.aboutStats ?? DEFAULT_STATS;
  const [activeTab, setActiveTab] = useState<"bio" | "stack" | "focus">("bio");
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Damietta / Cairo time (UTC+2 / UTC+3 depending on DST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeading
          id="about-heading"
          label={content.sections.about.label}
          title={content.sections.about.title}
        />

        {/* Live Telemetry Status Bar */}
        <Reveal delay={50}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#070908] px-5 py-3 font-mono text-xs text-muted-foreground shadow-lg">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent) opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-(--accent)" />
              </span>
              <span className="text-foreground font-medium">SYS.LOC:</span>
              <span>DAMIETTA, EG</span>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <span>TIME (UTC+2):</span>
              <span className="text-(--accent) tabular-nums font-semibold tracking-wider">
                {timeStr || "16:00:00"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/50">
              <span className="hidden sm:inline">STATUS:</span>
              <span className="text-white/80 uppercase font-semibold">BUILDING & SCALING // OPEN TO ROLES</span>
            </div>
          </div>
        </Reveal>

        {/* Top row: Holographic Avatar + Interactive Terminal */}
        <Reveal delay={100}>
          <div className="mb-10 flex flex-col items-start gap-8 lg:flex-row lg:items-stretch lg:gap-8">
            
            {/* Holographic Avatar Card */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#090c0a] p-8 text-center shadow-xl w-full lg:w-72 shrink-0 group overflow-hidden">
              {/* Scanline background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(183,255,114,0.4) 2px, rgba(183,255,114,0.4) 3px)",
                  backgroundSize: "100% 6px",
                }}
              />

              {/* Glowing Monogram Avatar */}
              <div className="relative mb-5">
                <div
                  className="h-28 w-28 rounded-full md:h-32 md:w-32 flex items-center justify-center"
                  style={{
                    padding: "3px",
                    background: "linear-gradient(135deg, #B7FF72 0%, #1e2621 50%, #B7FF72 100%)",
                    boxShadow: "0 0 32px rgba(183,255,114,0.25)",
                    animation: "orb-pulse 4s ease-in-out infinite",
                  }}
                >
                  <div className="h-full w-full rounded-full bg-[#070908] flex items-center justify-center overflow-hidden">
                    <span
                      className="font-mono text-3xl font-black text-(--accent) md:text-4xl select-none tracking-tight"
                      aria-hidden="true"
                    >
                      MA
                    </span>
                  </div>
                </div>
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "0 0 0 0 rgba(183,255,114,0.4)",
                    animation: "avatar-ring 3s ease-out infinite",
                  }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-sans text-lg font-bold text-foreground">
                {content.personal.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-(--accent) tracking-wide">
                {content.personal.title}
              </p>

              <div className="mt-5 w-full pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>IDENTITY</span>
                <span className="text-white/80 font-semibold">[VERIFIED]</span>
              </div>
            </div>

            {/* Interactive Terminal Bio Card */}
            <div className="flex-1 w-full rounded-2xl border border-white/10 bg-[#090c0a] shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Terminal top header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ms-3 font-mono text-xs text-muted-foreground">
                    mohamed@damietta: ~/about (bash)
                  </span>
                </div>

                {/* Interactive command chips */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("bio")}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 ${
                      activeTab === "bio"
                        ? "border-(--accent) bg-(--accent)/10 text-(--accent)"
                        : "border-white/10 text-muted-foreground hover:text-white"
                    }`}
                  >
                    $ cat bio.txt
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("stack")}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 ${
                      activeTab === "stack"
                        ? "border-(--accent) bg-(--accent)/10 text-(--accent)"
                        : "border-white/10 text-muted-foreground hover:text-white"
                    }`}
                  >
                    $ echo $STACK
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("focus")}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 ${
                      activeTab === "focus"
                        ? "border-(--accent) bg-(--accent)/10 text-(--accent)"
                        : "border-white/10 text-muted-foreground hover:text-white"
                    }`}
                  >
                    $ echo $FOCUS
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-8 font-mono text-sm leading-relaxed flex-1 flex flex-col justify-between">
                <div>
                  {activeTab === "bio" && (
                    <div className="space-y-4">
                      <p className="text-(--accent)" dir="ltr">
                        <span className="text-white/40">&gt; </span>
                        cat bio.txt
                      </p>
                      <p className="text-secondary-foreground leading-relaxed text-sm md:text-[15px]">
                        {content.personal.bio}
                      </p>
                    </div>
                  )}

                  {activeTab === "stack" && (
                    <div className="space-y-4">
                      <p className="text-(--accent)" dir="ltr">
                        <span className="text-white/40">&gt; </span>
                        echo $STACK
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {["MongoDB", "Express.js", "React.js", "Node.js", "Next.js", "TypeScript", "REST APIs", "Tailwind CSS"].map((tech) => (
                          <div key={tech} className="flex items-center gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/90">
                            <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "focus" && (
                    <div className="space-y-4">
                      <p className="text-(--accent)" dir="ltr">
                        <span className="text-white/40">&gt; </span>
                        echo $FOCUS
                      </p>
                      <p className="text-secondary-foreground leading-relaxed text-sm md:text-[15px]">
                        Full Stack Architecture, Performance Optimization, Scalable REST APIs, Clean Code, Multilingual (i18n & RTL) Systems, and Next.js Production Engineering.
                      </p>
                    </div>
                  )}
                </div>

                {/* Prompt Cursor */}
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-white/40" dir="ltr">
                  <span>mohamed@dev:~$</span>
                  <span className="text-(--accent) animate-pulse font-bold">▮</span>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Stat counters */}
        <Reveal delay={200}>
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-white/10 bg-[#090c0a] p-6 text-center shadow-lg transition-all duration-300 hover:border-(--accent)/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(183,255,114,0.08)] overflow-hidden"
              >
                <div className="absolute top-2 inset-e-3 font-mono text-[10px] text-white/20 group-hover:text-(--accent)/50 transition-colors">
                  0{i + 1}{"//"}
                </div>
                <p className="text-3xl font-black text-foreground md:text-4xl group-hover:text-(--accent) transition-colors">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Detail cards */}
        <Reveal delay={300}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {content.details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-white/10 bg-[#090c0a] p-5 shadow-lg transition-all duration-300 hover:border-white/25"
              >
                <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-(--accent)/80">
                  <span className="opacity-40">{"//"}</span>
                  {detail.label}
                </span>
                <span className="text-sm md:text-[15px] font-medium tracking-wide text-foreground">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
