import { popupsData } from "@/data/popups";
import type { LatLng } from "@/hooks/useGeolocation";
import { AREA_CENTER } from "@/components/ui/map/constants/mapLocations";

type Popup = (typeof popupsData)[number];

export type PopupGroup = {
  popupIds: string[];
  position: LatLng;
};

export function groupPopupsByArea(popups: Popup[]) {
  const groups: Record<string, PopupGroup> = {};

  for (const popup of popups) {
    const key = popup.area || "Others";
    const position = AREA_CENTER[key] ?? AREA_CENTER.Others;

    if (!groups[key]) groups[key] = { popupIds: [], position };
    groups[key].popupIds.push(popup.id);
  }

  return groups;
}
