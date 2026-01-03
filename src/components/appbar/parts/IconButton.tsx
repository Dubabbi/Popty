import type { ReactNode } from "react";

export function IconButton({
  children,
  onClick,
  ariaLabel,
  hasDot,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  hasDot?: boolean;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-full)",
        background: "var(--color-gray-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-gray-200)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-gray-100)";
      }}
    >
      {children}
      {hasDot && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-error)",
            border: "2px solid white",
          }}
        />
      )}
    </button>
  );
}
