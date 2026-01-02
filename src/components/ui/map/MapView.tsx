import { useMemo, useState } from "react";
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

import { popupsData } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { useGeolocation, type LatLng } from "@/hooks/useGeolocation";
import { MAP_CATEGORIES } from "@/components/ui/map/constants/mapCategories";
import { MapBottomSheet } from "@/components/ui/map/components/MapBottomSheet";

interface MapViewProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

type Popup = (typeof popupsData)[number];

function isPopup(p: Popup | undefined): p is Popup {
  return Boolean(p);
}

const AREA_CENTER: Record<string, LatLng> = {
  Gangnam: { lat: 37.4979, lng: 127.0276 },
  Seongsu: { lat: 37.5446, lng: 127.0557 },
  Hongdae: { lat: 37.5563, lng: 126.922 },
  Yeouido: { lat: 37.5219, lng: 126.9246 },
  Others: { lat: 37.5665, lng: 126.978 },
};

export function MapView({ onNavigate }: MapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPopups, setSelectedPopups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const fallbackCenter: LatLng = { lat: 37.5665, lng: 126.978 };

  const filteredPopups = useMemo(() => {
    let list = popupsData;

    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const hay = `${p.popupName} ${p.area} ${p.category}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const popupGroups = useMemo(() => {
    const groups: Record<string, { popupIds: string[]; position: LatLng }> = {};

    for (const popup of filteredPopups) {
      const key = popup.area || "Others";
      const position = AREA_CENTER[key] ?? AREA_CENTER.Others;

      if (!groups[key]) groups[key] = { popupIds: [], position };
      groups[key].popupIds.push(popup.id);
    }

    return groups;
  }, [filteredPopups]);

  const selectedPopupData = useMemo(() => {
    return selectedPopups
      .map((id) => popupsData.find((p) => p.id === id))
      .filter(isPopup);
  }, [selectedPopups]);

  const showBottomSheet = selectedPopupData.length > 0;

  const handlePinClick = (popupIds: string[]) => {
    setSelectedPopups(popupIds);
  };

  const handleClose = () => {
    setSelectedPopups([]);
  };

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
      {/* Header */}
      <div
        style={{
          padding: "var(--space-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </button>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-3)",
            background: "var(--color-gray-100)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Search size={18} color="var(--color-text-tertiary)" />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div
        className="filter-scroll-container"
        style={{
          padding: "var(--space-3) var(--space-4)",
          display: "flex",
          gap: "var(--space-2)",
          overflowX: "auto",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.filter-scroll-container::-webkit-scrollbar { display: none; }`}</style>

        {MAP_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category,
              )
            }
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-gray-300)",
              background:
                selectedCategory === category
                  ? "var(--color-text-primary)"
                  : "white",
              color:
                selectedCategory === category
                  ? "white"
                  : "var(--color-text-primary)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {category}
          </button>
        ))}

        <button
          style={{
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-gray-300)",
            background: "white",
            color: "var(--color-text-primary)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          필터 <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* Naver Map */}
      <div style={{ flex: 1, position: "relative" }}>
        <MapDiv
          style={{ width: "100%", height: "100%" }}
          fallback={
            <div className="grid h-full place-items-center">지도 로딩 중…</div>
          }
        >
          <NaverMap
            defaultCenter={fallbackCenter}
            center={loc ?? fallbackCenter}
            defaultZoom={14}
          >
            {loc && <Marker position={loc} />}

            {Object.entries(popupGroups).map(([areaKey, group]) => (
              <Marker
                key={areaKey}
                position={group.position}
                onClick={() => handlePinClick(group.popupIds)}
              />
            ))}
          </NaverMap>
        </MapDiv>

        {error && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.92)",
              padding: "10px 12px",
              borderRadius: 10,
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 12 }}>
              위치 권한/가져오기 실패: {error.message}
            </span>
            <button
              onClick={request}
              disabled={loading}
              style={{
                fontSize: 12,
                textDecoration: "underline",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              다시 시도
            </button>
          </div>
        )}
      </div>

      {/* ✅ BottomSheet */}
      {showBottomSheet && (
        <MapBottomSheet
          key={selectedPopups.join("|")} // 선택 그룹 바뀌면 시트 상태 리셋
          popups={selectedPopupData}
          onClose={handleClose}
          onSelect={(id) => onNavigate("detail", id)}
        />
      )}
    </div>
  );
}
