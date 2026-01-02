import { SlidersHorizontal } from "lucide-react";
import { MAP_CATEGORIES } from "@/components/ui/map/constants/mapCategories";
import { CategoryChip } from "./CategoryChip";

type Props = {
  selectedCategory: string | null;
  onSelect: (next: string | null) => void;
  onOpenFilter?: () => void;
};

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
        return (
          <CategoryChip
            key={category}
            category={category}
            active={active}
            onClick={() => onSelect(active ? null : category)}
          />
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
        }}
      >
        <span
          aria-hidden
          style={{
            width: 16,
            height: 16,
            background: "#EDEDED",
            borderRadius: 3,
            display: "flex",
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
