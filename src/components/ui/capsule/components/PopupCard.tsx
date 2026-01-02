import type {
  CapsuleMascot,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";

export type PopupData = {
  id: string;
  popupName: string;
  category: string;
  area: string;
  startDate: string;
  endDate: string;
};

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  popup: PopupData;
  index: number;

  currentResult: CapsuleResult;
  isSelected: boolean;
  onSelect: () => void;

  mascots: Record<CapsuleMascot, MascotInfo>;
  messages: readonly string[];
};

export function PopupCard({
  popup,
  index,
  currentResult,
  isSelected,
  onSelect,
  mascots,
  messages,
}: Props) {
  return (
    <button
      onClick={onSelect}
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: `2px solid ${isSelected ? currentResult.color : "rgba(255,255,255,0.2)"}`,
        borderRadius: "var(--radius-xl)",
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        boxShadow: isSelected
          ? `0 20px 40px ${currentResult.color}40`
          : "0 10px 30px rgba(0,0,0,0.3)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
          e.currentTarget.style.borderColor = currentResult.color;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }
      }}
    >
      {/* Capsule Opening Animation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Top Half */}
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `capsuleTopOpen 0.6s ease-out ${index * 0.1}s forwards`,
            opacity: 0,
          }}
        >
          <defs>
            <radialGradient id={`capsuleGrad${index}Top`} cx="35%" cy="80%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="15%" stopColor={`${currentResult.color}40`} />
              <stop offset="50%" stopColor={currentResult.color} />
              <stop offset="100%" stopColor={`${currentResult.color}dd`} />
            </radialGradient>
          </defs>
          <path
            d="M 10 50 Q 10 20, 30 10 L 90 10 Q 110 20, 110 50 L 10 50 Z"
            fill={`url(#capsuleGrad${index}Top)`}
          />
          <ellipse
            cx="35"
            cy="25"
            rx="15"
            ry="12"
            fill="#ffffff"
            opacity="0.6"
          />
        </svg>

        {/* Bottom Half */}
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `capsuleBottomOpen 0.6s ease-out ${index * 0.1}s forwards`,
            opacity: 0,
          }}
        >
          <defs>
            <radialGradient id={`capsuleGrad${index}Bottom`} cx="35%" cy="20%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="15%" stopColor={`${currentResult.color}40`} />
              <stop offset="50%" stopColor={currentResult.color} />
              <stop offset="100%" stopColor={`${currentResult.color}dd`} />
            </radialGradient>
          </defs>
          <path
            d="M 10 10 L 110 10 Q 110 40, 90 50 L 30 50 Q 10 40, 10 10 Z"
            fill={`url(#capsuleGrad${index}Bottom)`}
          />
          <ellipse
            cx="70"
            cy="35"
            rx="10"
            ry="8"
            fill="#000000"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          background: `linear-gradient(135deg, ${currentResult.color}20 0%, ${currentResult.color}10 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            animation: `emojiPopOut 0.6s ease-out ${index * 0.1 + 0.3}s backwards`,
          }}
        >
          {mascots[currentResult.mascot].emoji}
        </div>

        <div
          style={{
            position: "absolute",
            top: "var(--space-3)",
            left: "var(--space-3)",
            background: currentResult.gradient,
            color: "white",
            padding: "var(--space-1) var(--space-3)",
            borderRadius: "var(--radius-full)",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          {popup.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "var(--space-4)", textAlign: "left" }}>
        <h3
          style={{
            color: "white",
            marginBottom: "var(--space-2)",
            fontSize: "1.1rem",
          }}
        >
          {popup.popupName}
        </h3>

        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            marginBottom: "var(--space-3)",
          }}
        >
          📍 {popup.area} · {popup.startDate.slice(5)} ~{" "}
          {popup.endDate.slice(5)}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-3)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.8)",
            fontStyle: "italic",
            borderLeft: `3px solid ${currentResult.color}`,
          }}
        >
          "{messages[index % messages.length]}"
        </div>
      </div>
    </button>
  );
}
