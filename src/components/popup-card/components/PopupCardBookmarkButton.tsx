import { Bookmark } from "lucide-react";

type Props = {
  saved: boolean;
  pending: boolean;
  onClick: (e: React.MouseEvent) => void;
  variant?: "ghost" | "floating";
};

export function PopupCardBookmarkButton({ saved, pending, onClick, variant = "floating" }: Props) {
  const commonIcon = (
    <Bookmark
      size={variant === "floating" ? 16 : 20}
      fill={saved ? "var(--color-primary)" : "none"}
      color={
        saved
          ? "var(--color-primary)"
          : variant === "floating"
            ? "var(--color-gray-600)"
            : "var(--color-gray-400)"
      }
    />
  );

  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        type="button"
        aria-label={saved ? "북마크 해제" : "북마크"}
        disabled={pending}
        style={{
          background: "none",
          border: "none",
          cursor: pending ? "not-allowed" : "pointer",
          padding: "var(--space-2)",
          opacity: pending ? 0.6 : 1,
        }}
      >
        {commonIcon}
      </button>
    );
  }

  // floating
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={saved ? "북마크 해제" : "북마크"}
      disabled={pending}
      style={{
        position: "absolute",
        top: "var(--space-2)",
        right: "var(--space-2)",
        width: 32,
        height: 32,
        borderRadius: "var(--radius-full)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: pending ? "not-allowed" : "pointer",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 4,
        opacity: pending ? 0.7 : 1,
      }}
    >
      {commonIcon}
    </button>
  );
}
