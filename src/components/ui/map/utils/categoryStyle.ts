import {
  CATEGORY_ACTIVE_BG,
  CATEGORY_COLOR,
  CATEGORY_HOVER_BG,
  DEFAULT_ACTIVE_BG,
  DEFAULT_COLOR,
  DEFAULT_HOVER_BG,
} from "@/components/ui/map/constants/categoryPalette";

export function getCategoryColor(category: string) {
  return CATEGORY_COLOR[category] ?? DEFAULT_COLOR;
}

export function getCategoryActiveBg(category: string) {
  return CATEGORY_ACTIVE_BG[category] ?? DEFAULT_ACTIVE_BG;
}

export function getCategoryHoverBg(category: string) {
  return CATEGORY_HOVER_BG[category] ?? DEFAULT_HOVER_BG;
}
