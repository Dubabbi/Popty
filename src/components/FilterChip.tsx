import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export function FilterChip({
  label,
  selected = false,
  disabled = false,
  onRemove,
  onClick,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-full)",
        border: `2px solid ${selected ? "var(--color-primary)" : "var(--color-gray-300)"}`,
        background: selected ? "var(--color-primary-bg)" : "white",
        color: selected
          ? "var(--color-primary)"
          : disabled
            ? "var(--color-gray-400)"
            : "var(--color-text-secondary)",
        fontSize: "0.875rem",
        fontWeight: selected ? 600 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = "var(--color-gray-400)";
          e.currentTarget.style.background = "var(--color-gray-50)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = "var(--color-gray-300)";
          e.currentTarget.style.background = "white";
        }
      }}
    >
      {label}
      {selected && onRemove && (
        <X
          size={14}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </button>
  );
}
