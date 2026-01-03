import type { ViewType } from "@/routes/routes";

export type ReportCategory = {
  id: string;
  label: string;
  color: string;
};

export type ReportPopupProps = {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
};
