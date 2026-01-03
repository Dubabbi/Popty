import { Sparkles, MapPin, Calendar, Star, Gift, MessageSquare } from "lucide-react";
import type { NotificationItem } from "@/components/my/types/my";

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "new-popup",
    icon: Sparkles,
    label: "새로운 팝업",
    description: "관심 지역에 새 팝업이 열리면 알려드려요",
    enabled: true,
    color: "#D9F95F",
    gradient: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
  },
  {
    id: "nearby",
    icon: MapPin,
    label: "근처 팝업",
    description: "현재 위치 근처의 팝업을 알려드려요",
    enabled: true,
    color: "#FFB6D9",
    gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
  },
  {
    id: "schedule",
    icon: Calendar,
    label: "일정 알림",
    description: "저장한 팝업의 시작/종료일을 알려드려요",
    enabled: true,
    color: "#A3B9FF",
    gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
  },
  {
    id: "recommend",
    icon: Star,
    label: "추천 팝업",
    description: "취향 기반 맞춤 팝업을 추천해드려요",
    enabled: false,
    color: "#FFD4B8",
    gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
  },
  {
    id: "event",
    icon: Gift,
    label: "이벤트 소식",
    description: "특별 이벤트와 혜택을 알려드려요",
    enabled: false,
    color: "#D4C4FF",
    gradient: "linear-gradient(135deg, #E4D4FF 0%, #D4C4FF 100%)",
  },
  {
    id: "community",
    icon: MessageSquare,
    label: "커뮤니티",
    description: "댓글과 좋아요 알림을 받아요",
    enabled: true,
    color: "#B8F0D9",
    gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
  },
];
