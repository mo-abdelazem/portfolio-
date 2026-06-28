import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  content: SiteContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-[var(--px)]"
      aria-label="Introduction"
    >
      <div className="max-w-[900px] text-center">
        <Reveal>
          <p className="mb-5 text-sm font-medium tracking-[0.14px] text-muted-foreground">
            {content.personal.title}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mb-6 text-[clamp(40px,7vw,72px)] font-light leading-[1.08] tracking-[-0.96px] text-foreground">
            {content.personal.heroHeadline}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mb-10 max-w-[560px] text-lg leading-[1.6] tracking-[0.18px] text-secondary-foreground">
            {content.personal.heroDescription}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "group w-full max-w-[280px] md:w-auto md:max-w-none",
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
                "w-full max-w-[280px] md:w-auto md:max-w-none",
              )}
            >
              {content.copy.heroSecondaryCta}
            </a>
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
