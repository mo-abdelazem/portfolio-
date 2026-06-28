"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Progressive enhancement: content ships visible (`.reveal`), and only the
// hidden→animate behaviour is layered on when JS is present (`html.js .reveal`,
// see globals.css). So a no-JS / pre-hydration paint never leaves the page
// blank, and the scroll-reveal is purely additive.
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-inview={inView}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
