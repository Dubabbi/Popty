import type { ReportCategory } from "@/components/my/types/reportPopup";

type InvalidReason = "max" | "min";

type Props = {
  categories: ReportCategory[];
  selected: string[];
  onChange: (next: string[]) => void;
  maxSelected?: number;
  minSelected?: number;
  label?: string;
  onInvalid?: (reason: InvalidReason) => void;
};

export function CategorySelector({
  categories,
  selected,
  onChange,
  maxSelected = 5,
  minSelected = 1,
  label = "카테고리 *",
  onInvalid,
}: Props) {
  const selectedSet = new Set(selected);
  const isFull = selected.length >= maxSelected;

  const handleClick = (id: string) => {
    const isSelected = selectedSet.has(id);

    if (isSelected) {
      if (selected.length <= minSelected) {
        onInvalid?.("min");
        return;
      }
      onChange(selected.filter((x) => x !== id));
      return;
    }

    if (selected.length >= maxSelected) {
      onInvalid?.("max");
      return;
    }

    onChange([...selected, id]);
  };

  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-2)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          paddingLeft: "var(--space-2)",
        }}
      >
        <span>{label}</span>

        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-text-tertiary)",
            paddingRight: "var(--space-1)",
          }}
        >
          {selected.length}/{maxSelected}
        </span>
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-2)",
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedSet.has(cat.id);
          const disableAdd = !isSelected && isFull;
          const disableRemove = isSelected && selected.length <= minSelected;
          const disabled = disableAdd || disableRemove;

          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => handleClick(cat.id)}
              style={{
                padding: "var(--space-3)",
                border: `2px solid ${isSelected ? cat.color : "rgba(0, 0, 0, 0.08)"}`,
                borderRadius: "var(--radius-lg)",
                background: isSelected ? `${cat.color}15` : "white",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                color: isSelected ? cat.color : "var(--color-text-secondary)",
                userSelect: "none",
                opacity: disabled ? 0.55 : 1,
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {isFull && (
        <p
          style={{
            marginTop: "var(--space-2)",
            paddingLeft: "var(--space-2)",
            fontSize: "0.75rem",
            color: "var(--color-text-tertiary)",
          }}
        >
          최대 {maxSelected}개까지 선택할 수 있어요.
        </p>
      )}
    </div>
  );
}
