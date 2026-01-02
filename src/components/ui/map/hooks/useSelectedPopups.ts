import { useMemo } from "react";
import { popupsData } from "@/data/popups";

type Popup = (typeof popupsData)[number];

function isPopup(p: Popup | undefined): p is Popup {
  return Boolean(p);
}

export function useSelectedPopups(selectedIds: string[]) {
  return useMemo(() => {
    return selectedIds
      .map((id) => popupsData.find((p) => p.id === id))
      .filter(isPopup);
  }, [selectedIds]);
}
