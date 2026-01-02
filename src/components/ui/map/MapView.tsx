import { useState } from "react";
import type { ViewType } from "@/routes/routes";
import { useGeolocation } from "@/hooks/useGeolocation";

import { useFilteredPopups } from "@/components/ui/map/hooks/useFilteredPopups";
import { usePopupGroups } from "@/components/ui/map/hooks/usePopupGroups";
import { useSelectedPopups } from "@/components/ui/map/hooks/useSelectedPopups";

import { MapHeader } from "@/components/ui/map/components/MapHeader";
import { CategoryChips } from "@/components/ui/map/components/CategoryChips";
import { NaverMapCanvas } from "@/components/ui/map/components/NaverMapCanvas";
import { LocationErrorToast } from "@/components/ui/map/components/LocationErrorToast";
import { MapBottomSheet } from "@/components/ui/map/components/MapBottomSheet";

interface MapViewProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function MapView({ onNavigate }: MapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPopups, setSelectedPopups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const filteredPopups = useFilteredPopups(selectedCategory, searchQuery);
  const popupGroups = usePopupGroups(filteredPopups);
  const selectedPopupData = useSelectedPopups(selectedPopups);

  const showBottomSheet = selectedPopupData.length > 0;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "white",
      }}
    >
      <MapHeader
        onNavigate={(v) => onNavigate(v)}
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
      />

      <CategoryChips
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div style={{ flex: 1, position: "relative" }}>
        <NaverMapCanvas
          loc={loc}
          groups={popupGroups}
          onClickGroup={(popupIds) => setSelectedPopups(popupIds)}
        />

        {error && (
          <LocationErrorToast
            message={error.message}
            onRetry={request}
            loading={loading}
          />
        )}
      </div>

      {showBottomSheet && (
        <MapBottomSheet
          key={selectedPopups.join("|")}
          popups={selectedPopupData}
          onClose={() => setSelectedPopups([])}
          onSelect={(id) => onNavigate("detail", id)}
        />
      )}
    </div>
  );
}
