import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

interface BadgeProps {
  variant:
    | "dday"
    | "reservation"
    | "free"
    | "ending"
    | "new"
    | "trending"
    | "reminder";
  children: ReactNode;
  size?: "small" | "medium";
  className?: string;
}

const variantClasses: Record<BadgeProps["variant"], string> = {
  dday: "bg-error text-white",
  reservation: "bg-accent text-white",
  free: "bg-success text-white",
  ending: "bg--warning text--gray-900",
  new: "bg--lavender text--gray-900",
  trending:
    "bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100% text-white",
  reminder: "bg--peach text--gray-900",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  small: "px-[var(--space-2 py-[var(--space-1 text-[0.75rem]",
  medium: "px-[var(--space-3 py-[var(--space-2 text-[0.875rem]",
};

export function Badge({
  variant,
  children,
  size = "small",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-space-1 rounded-radius-md font-semibold whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
