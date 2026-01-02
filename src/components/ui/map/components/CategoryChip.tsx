import { useChipBackground } from "../hooks/useChipBackground";
import { getCategoryColor } from "../utils/categoryStyle";

type Props = {
  category: string;
  active: boolean;
  onClick: () => void;
};

export function CategoryChip({ category, active, onClick }: Props) {
  const color = getCategoryColor(category);
  const { background, onMouseEnter, onMouseLeave } = useChipBackground(
    category,
    active,
  );

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 33,
        padding: "8px 13px",
        background,
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.08)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        flexShrink: 0,
        transition: "transform 0.12s ease, background 0.2s ease",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
}
