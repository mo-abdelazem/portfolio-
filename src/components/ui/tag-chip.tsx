import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Pill used for blog tags. `filter` is the interactive form (buttons/links,
 *  supports `active`); `static` is the muted, non-interactive card tag. */
export const tagChipVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-medium transition-[color,background-color] duration-200",
  {
    variants: {
      variant: {
        filter:
          "px-3.5 py-1.5 text-sm text-secondary-foreground shadow-[var(--shadow-ring)] hover:bg-secondary hover:text-foreground",
        static: "bg-secondary px-[11px] py-1 text-[13px] text-muted-foreground",
      },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      {
        variant: "filter",
        active: true,
        class:
          "bg-primary text-primary-foreground shadow-none hover:bg-primary hover:text-primary-foreground",
      },
    ],
    defaultVariants: { variant: "filter", active: false },
  },
);

/** Non-interactive tag (card tags). */
export function TagChip({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(tagChipVariants({ variant: "static" }), className)}
      {...props}
    />
  );
}

/** Count suffix shown inside a filter chip; dims to match the active state. */
export function TagCount({
  active = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        active ? "text-primary-foreground/70" : "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export type { VariantProps };
