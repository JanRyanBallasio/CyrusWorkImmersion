import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
        secondary:
          "border-[var(--line)] bg-[var(--surface)] text-[var(--foreground)]",
        outline: "border-[var(--line-strong)] text-[var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
