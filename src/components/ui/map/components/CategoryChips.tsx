import { SlidersHorizontal } from "lucide-react";
import { MAP_CATEGORIES } from "@/components/ui/map/constants/mapCategories";

type Props = {
  selectedCategory: string | null;
  onSelect: (next: string | null) => void;
  onOpenFilter?: () => void;
};

const CATEGORY_COLOR: Record<string, string> = {
  All: "#EDEDED",
  Character: "#FFD2D2",
  Goods: "#FFF7A8",
  Exhibition: "#CFF7B2",
  Beauty: "#CFEFFF",
  Food: "#FFE1B5",
  Fashion: "#E8D6FF",
};

const CATEGORY_ACTIVE_BG: Record<string, string> = {
  All: "rgba(237,237,237,0.60)",
  Character: "rgba(255,210,210,0.40)",
  Goods: "rgba(255,247,168,0.40)",
  Exhibition: "rgba(207,247,178,0.40)",
  Beauty: "rgba(207,239,255,0.40)",
  Food: "rgba(255,225,181,0.40)",
  Fashion: "rgba(232,214,255,0.40)",
};

const CATEGORY_HOVER_BG: Record<string, string> = {
  All: "rgba(237,237,237,0.75)",
  Character: "rgba(255,210,210,0.70)",
  Goods: "rgba(255,247,168,0.70)",
  Exhibition: "rgba(207,247,178,0.70)",
  Beauty: "rgba(207,239,255,0.70)",
  Food: "rgba(255,225,181,0.70)",
  Fashion: "rgba(232,214,255,0.70)",
};

function getColor(category: string) {
  return CATEGORY_COLOR[category] ?? "#EDEDED";
}

function getActiveBg(category: string) {
  return CATEGORY_ACTIVE_BG[category] ?? "rgba(237,237,237,0.40)";
}

function getHoverBg(category: string) {
  return CATEGORY_HOVER_BG[category] ?? "rgba(237,237,237,0.70)";
}

export function CategoryChips({
  selectedCategory,
  onSelect,
  onOpenFilter,
}: Props) {
  return (
    <div
      className="filter-scroll-container"
      style={{
        padding: "var(--space-3) var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        overflowX: "auto",
        background: "transparent",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`.filter-scroll-container::-webkit-scrollbar { display: none; }`}</style>

      {MAP_CATEGORIES.map((category) => {
        const active = selectedCategory === category;
        const color = getColor(category);

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(active ? null : category)}
            style={{
              height: 33,
              padding: "8px 13px",
              background: active ? getActiveBg(category) : "white",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.08)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              flexShrink: 0,
              transition: "transform 0.12s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getHoverBg(category);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = active
                ? getActiveBg(category)
                : "white";
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                background: color,
                borderRadius: 3,
                display: "inline-block",
              }}
            />

            <span
              style={{
                color: "#4B4B4B",
                fontSize: 14,
                fontFamily: "Pretendard",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {category}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onOpenFilter}
        style={{
          height: 33,
          padding: "8px 13px",
          background: "white",
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          flexShrink: 0,
          transition: "box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
        }}
      >
        <span
          aria-hidden
          style={{
            width: 16,
            height: 16,
            background: "#EDEDED",
            borderRadius: 3,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SlidersHorizontal size={12} color="#4B4B4B" />
        </span>

        <span
          style={{
            color: "#4B4B4B",
            fontSize: 14,
            fontFamily: "Pretendard",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          필터
        </span>
      </button>
    </div>
  );
}
