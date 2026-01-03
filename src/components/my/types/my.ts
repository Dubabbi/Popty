import type { LucideIcon } from "lucide-react";
import type { ViewType } from "@/routes/routes";

export interface NotificationItem {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  enabled: boolean;
  color: string;
  gradient: string;
}

export interface MyProps {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}
