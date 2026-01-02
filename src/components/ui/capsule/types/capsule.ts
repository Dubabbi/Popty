import { type ViewType } from "@/routes/routes";

export interface CapsuleProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export type CapsuleMascot =
  | "ganadi"
  | "poppy"
  | "lucky"
  | "sparkle"
  | "coco"
  | "momo";

export interface CapsuleResult {
  mascot: CapsuleMascot;
  mascotName: string;
  message: string;
  popups: string[];
  color: string;
  gradient: string;
}

export const mascots: Record<
  CapsuleMascot,
  { name: string; emoji: string; color: string; gradient: string }
> = {
  ganadi: {
    name: "가나디",
    emoji: "🐰",
    color: "#FF8BA0",
    gradient: "linear-gradient(135deg, #FF8BA0 0%, #FFB3C1 100%)",
  },
  poppy: {
    name: "포피",
    emoji: "🎀",
    color: "#6B8AFF",
    gradient: "linear-gradient(135deg, #6B8AFF 0%, #A3B9FF 100%)",
  },
  lucky: {
    name: "럭키",
    emoji: "🍀",
    color: "#B8F0D9",
    gradient: "linear-gradient(135deg, #B8F0D9 0%, #4ADE80 100%)",
  },
  sparkle: {
    name: "스파클",
    emoji: "✨",
    color: "#FFF4C4",
    gradient: "linear-gradient(135deg, #FFF4C4 0%, #FBBF24 100%)",
  },
  coco: {
    name: "코코",
    emoji: "🍫",
    color: "#FFD4B8",
    gradient: "linear-gradient(135deg, #FFD4B8 0%, #FFA07A 100%)",
  },
  momo: {
    name: "모모",
    emoji: "🍑",
    color: "#D4C4FF",
    gradient: "linear-gradient(135deg, #D4C4FF 0%, #B497FF 100%)",
  },
};

export type BubbleBg = {
  w: number;
  h: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export type StarBg = {
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};
