import { SlidersHorizontal } from "lucide-react";
import { MAP_CATEGORIES } from "@/components/ui/map/constants/mapCategories";

type Props = {
  selectedCategory: string | null;
  onSelect: (next: string | null) => void;
};

export function CategoryChips({ selectedCategory, onSelect }: Props) {
  return (
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
            onSelect(selectedCategory === category ? null : category)
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
  );
}
