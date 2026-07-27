"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "var(--font-inter)",
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.round(Math.random() * 100000)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (e) {
        console.error("Mermaid parsing error:", e);
      }
    };
    renderChart();
  }, [chart]);

  if (!svg) {
    return <div className="mermaid-placeholder animate-pulse h-32 bg-neutral-800 rounded-md" />;
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-wrapper flex justify-center my-8 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
