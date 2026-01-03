export function FAQCategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
}) {
  const scrollClass = "faq-scroll-hide";

  return (
    <>
      <div
        className={scrollClass}
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
          overflowX: "auto",
          paddingBottom: "var(--space-2)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {categories.map((cat) => {
          const isActive = selected === cat;
          const borderColor = isActive ? "transparent" : "rgba(0, 0, 0, 0.08)";
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              style={{
                padding: "var(--space-2) var(--space-4)",
                background: isActive
                  ? "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)"
                  : "white",
                border: "none",
                boxShadow: `inset 0 0 0 2px ${borderColor}`,
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
                color: isActive ? "#000" : "var(--color-text-secondary)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <style>{`
        .${scrollClass} {
          -ms-overflow-style: none;  /* IE and old Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .${scrollClass}::-webkit-scrollbar {
          display: none;             /* Chrome, Safari, Opera */
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  );
}
