"use client";

import React, { useState, useRef } from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/** Surface card matching the portfolio elevation system. Set `interactive`
 *  for the lift-on-hover behaviour used by project/skill/detail cards. Use
 *  `as` to render a semantic element (e.g. "article"). */
export function Card({
  className,
  interactive = false,
  as: Comp = "div",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  as?: ElementType;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Comp
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl bg-card text-card-foreground shadow-card",
        interactive &&
          "transition-[transform,box-shadow] duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-ring",
        className,
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(183,255,114,.08), transparent 40%)`,
        }}
      />
      {props.children}
    </Comp>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[22px] font-light leading-tight tracking-[-0.4px] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-base leading-[1.6] tracking-[0.16px] text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}
