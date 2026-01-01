import { useMemo, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { PopupCard } from "@/components/PopupCard";
import { FilterChip } from "@/components/FilterChip";
import { popupsData } from "@/data/popups";
import type { ViewType } from "@/routes/routes";

interface MapViewProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

function hashToUnitFloat(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MapView({ onNavigate }: MapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPopupId, setSelectedPopupId] = useState<string | null>(null);

  const categories = [
    "All",
    "Character",
    "Food",
    "Fashion",
    "Beauty",
    "Exhibition",
    "Goods",
  ];

  const filteredPopups =
    selectedCategory && selectedCategory !== "All"
      ? popupsData.filter((p) => p.category === selectedCategory)
      : popupsData;

  const categoryColors: Record<string, string> = {
    Character: "var(--color-primary)",
    Food: "var(--color-peach)",
    Fashion: "var(--color-lavender)",
    Beauty: "var(--color-mint)",
    Exhibition: "var(--color-accent)",
    Goods: "var(--color-lemon)",
  };

  const pinPositions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};

    popupsData.forEach((popup, index) => {
      const baseX = 20 + (index % 4) * 23;
      const baseY = 20 + Math.floor(index / 4) * 25;

      const jx = hashToUnitFloat(`${popup.id}-x`) * 10;
      const jy = hashToUnitFloat(`${popup.id}-y`) * 10;

      const x = clamp(baseX + jx, 8, 92);
      const y = clamp(baseY + jy, 10, 90);

      map[popup.id] = { x, y };
    });

    return map;
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 60,
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
          padding: "var(--space-3)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            overflowX: "auto",
            paddingBottom: "var(--space-1)",
          }}
        >
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={
                selectedCategory === category ||
                (category === "All" && !selectedCategory)
              }
              onClick={() =>
                setSelectedCategory(category === "All" ? null : category)
              }
            />
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          background: "var(--color-gray-100)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #E8F4F8 0%, #F0F4F8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            {filteredPopups.map((popup, index) => {
              const pos = pinPositions[popup.id] ?? {
                x: 20 + (index % 4) * 23,
                y: 20 + Math.floor(index / 4) * 25,
              };

              const x = pos.x;
              const y = pos.y;

              const color =
                categoryColors[popup.category] || "var(--color-primary)";
              const isSelected = selectedPopupId === popup.id;

              return (
                <g
                  key={popup.id}
                  onClick={() => setSelectedPopupId(popup.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={isSelected ? "20" : "16"}
                    fill={color}
                    opacity="0.3"
                  />
                  <path
                    d={`M ${x - 1.5} ${y - 2} Q ${x} ${y - 3} ${x + 1.5} ${y - 2} L ${x + 1.5} ${y + 0.5} Q ${x} ${y + 2} ${x - 1.5} ${y + 0.5} Z`}
                    fill={color}
                    stroke="white"
                    strokeWidth="0.3"
                    transform={`translate(0, ${isSelected ? -2 : 0})`}
                    style={{ transition: "all 0.2s" }}
                  />
                  <circle cx={`${x}%`} cy={`${y - 1}%`} r="0.5" fill="white" />
                </g>
              );
            })}
          </svg>

          {/* Location button */}
          <button
            style={{
              position: "absolute",
              top: "var(--space-4)",
              right: "var(--space-4)",
              width: 48,
              height: 48,
              borderRadius: "var(--radius-full)",
              background: "white",
              border: "none",
              boxShadow: "var(--shadow-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            type="button"
          >
            <Navigation size={24} color="var(--color-accent)" />
          </button>
        </div>
      </div>

      {/* Bottom Card Strip */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid var(--color-gray-200)",
          padding: "var(--space-4)",
          maxHeight: "50%",
          overflowY: "auto",
        }}
      >
        {selectedPopupId ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-3)",
              }}
            >
              <h4 style={{ margin: 0 }}>Selected Pop-up</h4>
              <button
                onClick={() => setSelectedPopupId(null)}
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: "var(--color-gray-100)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
                type="button"
              >
                Clear
              </button>
            </div>

            <PopupCard
              popup={popupsData.find((p) => p.id === selectedPopupId)!}
              onClick={() => onNavigate("detail", selectedPopupId)}
              layout="list"
            />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                marginBottom: "var(--space-3)",
              }}
            >
              <MapPin size={20} color="var(--color-primary)" />
              <h4 style={{ margin: 0 }}>Nearby Pop-ups</h4>
            </div>
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                overflowX: "auto",
                paddingBottom: "var(--space-2)",
              }}
            >
              {filteredPopups.slice(0, 5).map((popup) => (
                <div key={popup.id} style={{ minWidth: 280, maxWidth: 280 }}>
                  <PopupCard
                    popup={popup}
                    onClick={() => onNavigate("detail", popup.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
