import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

type Props = {
  onBack: () => void;
  onOpenShare: () => void;
  onToggleSave: () => void;
  saved: boolean;
  saving: boolean;
};

function iconButtonStyle(params?: { active?: boolean; disabled?: boolean }) {
  const active = params?.active ?? false;
  const disabled = params?.disabled ?? false;

  return {
    width: 40,
    height: 40,
    borderRadius: "var(--radius-full)",
    background: active ? "var(--color-primary-bg)" : "var(--color-gray-100)",
    border: "none",
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? ("none" as const) : ("auto" as const),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
}

export function PopupHeader({ onBack, onOpenShare, onToggleSave, saved, saving }: Props) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-gray-200)",
        padding: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <button onClick={onBack} style={iconButtonStyle()}>
        <ArrowLeft size={20} />
      </button>

      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <button onClick={onOpenShare} style={iconButtonStyle()}>
          <Share2 size={20} />
        </button>

        <button
          onClick={onToggleSave}
          style={iconButtonStyle({ active: saved, disabled: saving })}
          aria-pressed={saved}
          aria-label={saved ? "Unsave" : "Save"}
        >
          <Bookmark
            size={20}
            fill={saved ? "var(--color-primary)" : "none"}
            color={saved ? "var(--color-primary)" : "var(--color-text-secondary)"}
          />
        </button>
      </div>
    </div>
  );
}
