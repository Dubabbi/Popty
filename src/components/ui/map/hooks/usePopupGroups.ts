import { useMemo } from "react";
import { groupPopupsByArea } from "@/components/ui/map/utils/popupGroup";
import { popupsData } from "@/data/popups";

type Popup = (typeof popupsData)[number];

export function usePopupGroups(filteredPopups: Popup[]) {
  return useMemo(() => groupPopupsByArea(filteredPopups), [filteredPopups]);
}
