import { useMemo } from "react";
import { popupsData } from "@/data/popups";
import { filterPopups } from "@/components/ui/map/utils/popupFilter";

export function useFilteredPopups(
  selectedCategory: string | null,
  searchQuery: string,
) {
  return useMemo(() => {
    return filterPopups(popupsData, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);
}
