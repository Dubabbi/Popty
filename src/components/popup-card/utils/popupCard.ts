import Img from "@/assets/popup-img.png";
import type { PopupListItem } from "@/data/popupList";
import { REGION_ZONE_LABEL_KO } from "@/data/popupList";
import { imageMapping } from "@/data/imageMapping";

export const DEFAULT_THUMB = Img;

export function resolveThumb(src: string | null): string {
  if (!src) return DEFAULT_THUMB;
  if (src.startsWith("http")) return src;
  return imageMapping[src] ?? src;
}

export function regionLabel(regionZoneCode: PopupListItem["regionZoneCode"]): string {
  if (!regionZoneCode) return "기타";
  if (regionZoneCode === "OTHERS") return "기타";
  return REGION_ZONE_LABEL_KO[regionZoneCode] ?? regionZoneCode;
}
