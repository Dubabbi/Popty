export function FAQCategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-2)",
        marginBottom: "var(--space-4)",
        overflowX: "auto",
        paddingBottom: "var(--space-2)",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background:
              selected === cat ? "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)" : "white",
            border: `2px solid ${selected === cat ? "transparent" : "rgba(0, 0, 0, 0.08)"}`,
            borderRadius: "var(--radius-full)",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease",
            color: selected === cat ? "#000" : "var(--color-text-secondary)",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
