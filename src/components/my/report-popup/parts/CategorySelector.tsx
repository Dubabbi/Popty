import type { ReportCategory } from "@/components/my/types/reportPopup";

export function CategorySelector({
  categories,
  selected,
  onSelect,
}: {
  categories: ReportCategory[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "var(--space-2)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          paddingLeft: "var(--space-2)",
        }}
      >
        카테고리 *
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-2)",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              padding: "var(--space-3)",
              border: `2px solid ${selected === cat.id ? cat.color : "rgba(0, 0, 0, 0.08)"}`,
              borderRadius: "var(--radius-lg)",
              background: selected === cat.id ? cat.color + "15" : "white",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: selected === cat.id ? cat.color : "var(--color-text-secondary)",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
