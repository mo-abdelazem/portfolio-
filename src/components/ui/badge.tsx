import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full text-[13px] font-medium tracking-[0.14px]",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary px-3.5 py-[5px] text-secondary-foreground shadow-[var(--shadow-inset)]",
        solid: "bg-primary px-3.5 py-[5px] text-primary-foreground",
        outline:
          "px-3.5 py-[5px] text-muted-foreground shadow-[var(--shadow-ring)]",
      },
    },
    defaultVariants: { variant: "secondary" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
