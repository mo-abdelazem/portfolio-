import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/animated-counter";

interface AboutProps {
  content: SiteContent;
}

const STATS = [
  { label: "Years experience", target: 1, suffix: "+" },
  { label: "Projects shipped", target: 20, suffix: "+" },
  { label: "Lighthouse score", target: 85, suffix: "+" },
  { label: "Frameworks", target: 4, suffix: "" },
];

export function About({ content }: AboutProps) {
  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeading
          id="about-heading"
          label={content.sections.about.label}
          title={content.sections.about.title}
        />

        {/* Top row: avatar + terminal bio */}
        <Reveal delay={100}>
          <div className="mb-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
            {/* Avatar with glow ring */}
            <div className="relative flex-shrink-0">
              <div
                className="h-24 w-24 rounded-full md:h-32 md:w-32"
                style={{
                  padding: "3px",
                  background: "linear-gradient(135deg, #B7FF72 0%, #34443A 60%, #B7FF72 100%)",
                  boxShadow: "0 0 24px rgba(183,255,114,0.35), 0 0 48px rgba(183,255,114,0.12)",
                  animation: "orb-pulse 4s ease-in-out infinite",
                }}
              >
                <div className="h-full w-full rounded-full bg-[var(--card)] flex items-center justify-center overflow-hidden">
                  <span
                    className="font-mono text-3xl font-bold text-[var(--accent)] md:text-4xl select-none"
                    aria-hidden="true"
                  >
                    {content.personal.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 0 0 rgba(183,255,114,0.5)",
                  animation: "avatar-ring 3s ease-out infinite",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Terminal bio card */}
            <div className="flex-1 rounded-[var(--radius-xl)] border border-[var(--border)] bg-card shadow-[var(--shadow-card)] overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-[var(--text-muted)]">
                  ~/about — bash
                </span>
              </div>
              {/* Terminal body */}
              <div className="px-5 py-4 font-mono text-sm leading-[1.8]">
                <p className="text-[var(--accent)]">
                  <span className="text-secondary-foreground">$ </span>
                  cat bio.txt
                </p>
                <p className="mt-1 text-secondary-foreground">{content.personal.bio}</p>
                <p className="mt-3 text-[var(--accent)]">
                  <span className="text-secondary-foreground">$ </span>
                  echo $LOCATION
                </p>
                <p className="mt-1 text-secondary-foreground">{content.personal.location}</p>
                <p className="mt-3">
                  <span className="text-secondary-foreground">$ </span>
                  <span className="text-[var(--accent)]">▮</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stat counters */}
        <Reveal delay={200}>
          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-card p-5 text-center shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[rgba(183,255,114,0.3)] hover:shadow-[0_0_20px_rgba(183,255,114,0.06)]"
              >
                <p className="text-3xl font-light text-[var(--accent)] md:text-4xl">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
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
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[rgba(183,255,114,0.3)]"
              >
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {detail.label}
                </span>
                <span className="text-[15px] font-medium tracking-[0.15px] text-foreground">
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
