import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  content: SiteContent;
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Hero({ content }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-[var(--px)] py-24 lg:pt-24 lg:pb-8 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[length:32px_32px]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(183,255,114,0.1) 1px, transparent 0)`,
          maskImage: `radial-gradient(circle at 50% 50%, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, black, transparent 80%)`,
        }}
      />

      {/* Cyber Dashboard Bento Layout */}
      <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(200px,auto)_minmax(120px,auto)] gap-4 mt-8">
        
        {/* Panel 1: Main Headline & CTAs (Spans 2 cols, 2 rows) */}
        <Reveal delay={100} className="md:col-span-2 md:row-span-2">
          <div className="h-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-8 md:p-12 shadow-[var(--shadow-card)] flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 end-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            
            <h1 className="relative z-10 mb-6 text-[clamp(40px,5vw,64px)] font-light leading-[1.1] tracking-[-0.96px] bg-gradient-to-br from-foreground to-[var(--accent)] bg-clip-text text-transparent">
              {content.personal.heroHeadline}
            </h1>
            
            <p className="relative z-10 mb-10 max-w-[480px] text-lg leading-[1.6] tracking-[0.18px] text-secondary-foreground">
              {content.personal.heroDescription}
            </p>
            
            <div className="relative z-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "group w-full sm:w-auto",
                )}
              >
                {content.copy.heroPrimaryCta}
                <svg
                  className="transition-transform duration-[250ms] ease-[var(--ease-spring)] group-hover:translate-x-[3px] rtl:-scale-x-100 rtl:group-hover:-translate-x-[3px]"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto",
                )}
              >
                {content.copy.heroSecondaryCta}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Panel 2: Status Panel */}
        <Reveal delay={200} className="md:col-span-1 md:row-span-1">
          <div className="h-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-6 shadow-[var(--shadow-card)] flex flex-col justify-between hover:border-[var(--accent)] transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-0 end-0 p-4 font-mono text-[10px] text-muted-foreground opacity-50">
              SYS.ID: 01
            </div>
            <div>
              <span className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">{content.heroDashboard.statusLabel}</span>
              <div className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                </span>
                {content.heroDashboard.available}
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2">
              <a
                href={content.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(0,0,0,0.2)] text-secondary-foreground transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_rgba(183,255,114,0.2)]"
              >
                <GitHubIcon />
              </a>
              <a
                href={content.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(0,0,0,0.2)] text-secondary-foreground transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_rgba(183,255,114,0.2)]"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Panel 3: Tech Stack */}
        <Reveal delay={300} className="md:col-span-1 md:row-span-1">
          <div className="h-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-6 shadow-[var(--shadow-card)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 end-0 p-4 font-mono text-[10px] text-muted-foreground opacity-50">
              SYS.ID: 02
            </div>
            <span className="block font-mono text-xs text-muted-foreground mb-4 uppercase tracking-wider">{content.heroDashboard.techStackLabel}</span>
            
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-2 py-1.5 font-mono text-[10px] text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> React
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-2 py-1.5 font-mono text-[10px] text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> Next.js
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-2 py-1.5 font-mono text-[10px] text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> TS
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-2 py-1.5 font-mono text-[10px] text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> Tailwind
              </div>
            </div>
            
            {/* Subtle Grid overlay */}
            <div className="absolute -bottom-6 -end-6 w-32 h-32 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          </div>
        </Reveal>

        {/* Panel 4: System Stats (Spans full width) */}
        <Reveal delay={400} className="md:col-span-3">
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-4 shadow-[var(--shadow-card)] flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">{content.heroDashboard.uptimeLabel}</span>
                <span className="font-mono text-xs text-[var(--accent)] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> {content.heroDashboard.uptimeValue}
                </span>
              </div>
              
              <div className="hidden sm:block h-6 w-px bg-[var(--border)]" />
              
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">{content.heroDashboard.coffeeLabel}</span>
                <span className="font-mono text-xs text-foreground">{content.heroDashboard.coffeeValue}</span>
              </div>
              
              <div className="hidden sm:block h-6 w-px bg-[var(--border)]" />
              
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">{content.heroDashboard.commitsLabel}</span>
                <span className="font-mono text-xs text-foreground">{content.heroDashboard.commitsValue}</span>
              </div>
            </div>

            <div className="font-mono text-[10px] text-muted-foreground hidden md:block uppercase tracking-wider">
              {content.heroDashboard.initSequence}
            </div>

          </div>
        </Reveal>

      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">{content.copy.scrollLabel}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
