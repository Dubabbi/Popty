import type { ViewType } from "@/routes/routes";

export interface AppBarProps {
  title: string;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  pathname?: string;
  breakpoint: "mobile" | "tablet" | "desktop";
}
