import { User, Bell, MapPin, Settings, HelpCircle, MessageSquarePlus } from "lucide-react";
import type { ViewType } from "@/routes/routes";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type MenuItem = {
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
  gradient: string;
  badge?: string;
  action: () => void;
};

export function buildDefaultMenuItems(onNavigate: (view: ViewType) => void): MenuItem[] {
  return [
    {
      icon: User,
      label: "프로필 편집",
      description: "내 정보 수정하기",
      color: "#FFB6D9",
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
      action: () => onNavigate("profile-edit"),
    },
    {
      icon: Bell,
      label: "알림 설정",
      description: "새로운 팝업 소식 받기",
      color: "#A3B9FF",
      gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
      badge: "3",
      action: () => onNavigate("notification-settings"),
    },
    {
      icon: MapPin,
      label: "나의 여행 기록",
      description: "방문한 팝업 타임라인",
      color: "#D9F95F",
      gradient: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
      action: () => onNavigate("roadmap"),
    },
    {
      icon: MessageSquarePlus,
      label: "팝업 제보하기",
      description: "새로운 팝업 정보 공유",
      color: "#FFD4B8",
      gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
      action: () => onNavigate("report-popup"),
    },
    {
      icon: Settings,
      label: "설정",
      description: "앱 환경 설정",
      color: "#D4C4FF",
      gradient: "linear-gradient(135deg, #E4D4FF 0%, #D4C4FF 100%)",
      action: () => onNavigate("settings"),
    },
    {
      icon: HelpCircle,
      label: "도움말",
      description: "FAQ 및 문의하기",
      color: "#B8F0D9",
      gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
      action: () => onNavigate("help"),
    },
  ];
}
