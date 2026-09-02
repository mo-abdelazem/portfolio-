"use client";

import type { SiteContent } from "@/lib/types";
import { ParticleWave } from "@/components/particle-wave";
import { Reveal } from "./reveal";

interface HeroProps {
  content: SiteContent;
}

export function Hero({ content }: HeroProps) {
  const isArabic = content.locale === "ar";

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full px-3 pt-24 pb-6 md:px-6 md:pt-28 md:pb-8 lg:px-8 lg:pt-32 lg:pb-10 flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero Section"
    >
      {/* Outer Cyber Card Frame matching the reference style */}
      <div className="relative flex flex-col justify-between w-full max-w-(--max-width) min-h-[85vh] rounded-[24px] md:rounded-[32px] border border-white/10 bg-[#070908] p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        {/* Interactive 3D Particle Wave Mesh Background */}
        <ParticleWave particleColor="230, 245, 235" />

        {/* Ambient subtle vignette & depth gradient */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_45%,rgba(183,255,114,0.03),transparent_65%)]" 
          aria-hidden="true"
        />

        {/* Top Status / Metadata Bar inside Hero Frame */}
        <div className="relative z-20 flex items-center justify-between gap-4 pb-6 border-b border-white/5 font-mono text-[11px] text-white/50 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
            <span>{"SYS.LOC: DAMIETTA // EGYPT"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/40">
            <span>FULL STACK MERN ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-2 text-(--accent)">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent) opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--accent)" />
            </span>
            <span>AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Centerpiece Typographic Block */}
        <div className="relative z-20 my-auto py-10 md:py-16">
          <Reveal delay={100}>
            <div className="flex flex-col select-none">
              {/* Line 1: CREATIVE */}
              <h1 className="font-sans font-black tracking-[-0.04em] text-white leading-[0.88] text-[clamp(3.8rem,11.5vw,9.8rem)] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                CREATIVE
              </h1>

              {/* Line 2: DEVELOPER with left accent indicator bar */}
              <div className="flex items-center gap-3 md:gap-6 mt-1 md:mt-2">
                <div 
                  className="w-1.5 md:w-3 h-[0.72em] bg-white/40 rounded-full shrink-0" 
                  aria-hidden="true" 
                />
                <span className="font-sans font-black tracking-[-0.04em] text-[#4d5651] hover:text-[#6a756f] transition-colors duration-500 leading-[0.88] text-[clamp(3.8rem,11.5vw,9.8rem)] uppercase">
                  DEVELOPER
                </span>
              </div>
            </div>
          </Reveal>

          {/* Middle Meta Row with Real Personal Data */}
          <Reveal delay={250}>
            <div className="mt-8 md:mt-14 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left Tag */}
              <div className="font-mono text-xs md:text-sm font-semibold tracking-widest text-white/70 uppercase">
                {"// SCALABLE WEB SOLUTIONS."}
              </div>

              {/* Middle-Right Tag: Author / Title */}
              <div className="font-mono text-xs md:text-sm tracking-wide text-white/70 md:text-right">
                {content.personal.name} <span className="text-white/30">/</span> {content.personal.title}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Framing Row */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/5">
          {/* Bottom Left: EXPLORE MY WORK CTA */}
          <Reveal delay={350}>
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group inline-flex items-center gap-2 font-mono text-xs md:text-sm font-bold tracking-widest text-white/90 hover:text-(--accent) transition-colors duration-300 py-2"
            >
              <span>{isArabic ? "استكشف أعمالي" : "EXPLORE MY WORK"}</span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-y-1 text-(--accent)">
                ↓
              </span>
            </a>
          </Reveal>

          {/* Bottom Right: Real Portfolio Description */}
          <Reveal delay={400}>
            <div className="max-w-[460px] text-xs sm:text-sm leading-relaxed text-white/80 font-mono">
              <p className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-lg">
                {content.personal.heroDescription || content.personal.bio}
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
