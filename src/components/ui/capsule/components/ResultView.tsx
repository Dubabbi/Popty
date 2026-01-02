import type {
  CapsuleMascot,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";
import {
  PopupCard,
  type PopupData,
} from "@/components/ui/capsule/components/PopupCard";

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  breakpoint: "mobile" | "tablet" | "desktop";
  currentResult: CapsuleResult;
  selectedPopup: string | null;

  popupsData: readonly PopupData[];
  mascots: Record<CapsuleMascot, MascotInfo>;
  messages: readonly string[];

  onCardSelect: (popupId: string) => void;
  onReset: () => void;
};

export function ResultView({
  breakpoint,
  currentResult,
  selectedPopup,
  popupsData,
  mascots,
  messages,
  onCardSelect,
  onReset,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "var(--space-5)",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "var(--space-2)" }}>
          {mascots[currentResult.mascot].emoji}
        </div>
        <h2 style={{ color: "white", marginBottom: "var(--space-2)" }}>
          {currentResult.mascotName}가 골라준 3곳
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)" }}>
          카드를 선택하면 상세 정보를 볼 수 있어요!
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            breakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)",
          gap: "var(--space-4)",
        }}
      >
        {currentResult.popups.map((popupId, index) => {
          const popup = popupsData.find((p) => p.id === popupId);
          if (!popup) return null;

          return (
            <PopupCard
              key={popupId}
              popup={popup}
              index={index}
              currentResult={currentResult}
              isSelected={selectedPopup === popupId}
              onSelect={() => onCardSelect(popupId)}
              mascots={mascots}
              messages={messages}
            />
          );
        })}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onReset}
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4) var(--space-6)",
            color: "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
        >
          다시 뽑기
        </button>
      </div>
    </div>
  );
}
