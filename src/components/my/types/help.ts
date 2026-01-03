import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export type ContactMethod = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  gradient: string;
};
