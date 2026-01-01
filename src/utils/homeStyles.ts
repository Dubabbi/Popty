// src/components/ui/home/homeStyles.ts
import type { CSSProperties } from "react";
import type { StyleWithVars } from "@/types/cssVars";

export const carouselStyle: StyleWithVars = {
  "--peek": "clamp(18px, 6vw, 72px)",
  "--cardMax": "720px",
  "--cardH": "clamp(380px, 62vh, 560px)",

  display: "flex",
  gap: "var(--space-4)",
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",

  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",

  padding: "0 var(--peek)",
  scrollPaddingLeft: "var(--peek)",
  scrollPaddingRight: "var(--peek)",

  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

export const responsiveGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "var(--space-4)",
};
