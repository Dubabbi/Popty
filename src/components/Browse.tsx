import { useState } from "react";
import { SlidersHorizontal, Grid3x3, List as ListIcon } from "lucide-react";
import { PopupCard } from "@/components/PopupCard";
import { FilterChip } from "@/components/FilterChip";
import { FilterModal } from "@/components/home/parts/FilterModal";
import { popupsData } from "@/data/popups";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";

interface BrowseProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function Browse({ onNavigate, breakpoint }: BrowseProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const gridCols = breakpoint === "desktop" ? 3 : breakpoint === "tablet" ? 2 : 1;

  // Simulated filter
  const filteredPopups = popupsData.filter((popup) => {
    if (selectedArea.length > 0 && !selectedArea.includes(popup.area)) return false;
    if (selectedCategory.length > 0 && !selectedCategory.includes(popup.category)) return false;
    return true;
  });

  type Filters = {
    areas: string[];
    categories: string[];
  };

  const handleApplyFilters = (filters: Filters) => {
    setSelectedArea(filters.areas);
    setSelectedCategory(filters.categories);
    setShowFilters(false);

    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <>
      <div
        style={{
          position: "sticky",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
          padding: "var(--space-4)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-3)",
          }}
        >
          <button
            onClick={() => setShowFilters(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--color-primary)",
              background: "white",
              color: "var(--color-primary)",
              cursor: "pointer",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "var(--space-2)",
              overflowX: "auto",
              minWidth: 0,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {selectedArea.map((area) => (
              <FilterChip
                key={area}
                label={area}
                selected
                onRemove={() => setSelectedArea(selectedArea.filter((a) => a !== area))}
              />
            ))}
            {selectedCategory.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                selected
                onRemove={() => setSelectedCategory(selectedCategory.filter((c) => c !== cat))}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--space-1)",
              borderLeft: "1px solid var(--color-gray-200)",
              paddingLeft: "var(--space-2)",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setLayout("grid")}
              style={{
                padding: "var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: layout === "grid" ? "var(--color-primary-bg)" : "transparent",
                cursor: "pointer",
              }}
            >
              <Grid3x3
                size={20}
                color={layout === "grid" ? "var(--color-primary)" : "var(--color-gray-400)"}
              />
            </button>
            <button
              onClick={() => setLayout("list")}
              style={{
                padding: "var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: layout === "list" ? "var(--color-primary-bg)" : "transparent",
                cursor: "pointer",
              }}
            >
              <ListIcon
                size={20}
                color={layout === "list" ? "var(--color-primary)" : "var(--color-gray-400)"}
              />
            </button>
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-tertiary)",
          }}
        >
          {filteredPopups.length} pop-ups found
        </p>
      </div>

      {/* Results */}
      <div
        style={{
          padding: "var(--space-4)",
          paddingBottom: "var(--space-8)",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)",
              padding: "var(--space-16) 0",
            }}
          >
            <Mascot pose="explore" size="large" />
            <div
              style={{
                width: 40,
                height: 40,
                border: "4px solid var(--color-gray-200)",
                borderTopColor: "var(--color-primary)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ color: "var(--color-text-tertiary)" }}>
              Finding the best pop-ups for you...
            </p>
          </div>
        ) : filteredPopups.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)",
              padding: "var(--space-16) 0",
            }}
          >
            <Mascot pose="empty" size="large" />
            <h3 style={{ margin: 0 }}>No pop-ups found</h3>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-tertiary)",
                textAlign: "center",
              }}
            >
              Try adjusting your filters or check back later!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: layout === "grid" ? "grid" : "flex",
              gridTemplateColumns: layout === "grid" ? `repeat(${gridCols}, 1fr)` : undefined,
              flexDirection: layout === "list" ? "column" : undefined,
              gap: "var(--space-4)",
            }}
          >
            {filteredPopups.map((popup) => (
              <PopupCard
                key={popup.id}
                popup={popup}
                onClick={() => onNavigate("detail", popup.id)}
                layout={layout}
              />
            ))}
          </div>
        )}
      </div>

      {showFilters && (
        <FilterModal
          onClose={() => setShowFilters(false)}
          onApply={handleApplyFilters}
          initialFilters={{
            areas: selectedArea,
            categories: selectedCategory,
          }}
        />
      )}
    </>
  );
}
