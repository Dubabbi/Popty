import Img from "@/assets/popup-img.png";
import { imageMapping } from "@/data/imageMapping";

export const DEFAULT_THUMB = Img;

export function resolveImage(src?: string | null): string {
  if (!src) return DEFAULT_THUMB;
  if (src.startsWith("http")) return src;
  return imageMapping[src] ?? src;
}

export function isFreePriceText(priceText: string | null): boolean {
  if (!priceText) return false;
  const t = priceText.trim();
  return t.includes("무료") || t === "0원" || t.toLowerCase() === "free";
}

export function instagramLabel(url: string) {
  try {
    const u = new URL(url);
    const handle = u.pathname.replace(/\//g, "");
    return handle ? `@${handle}` : url;
  } catch {
    return url;
  }
}
