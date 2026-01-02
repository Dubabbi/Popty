import { Sparkles, Gift } from "lucide-react";
import { CapsuleMachineSVG } from "@/components/CapsuleMachine";

import type { CapsuleMascot } from "@/components/ui/capsule/types/capsule";

import { ProbabilityModal } from "@/components/ui/capsule/components/ProbabilityModal";
import { CollectionPreview } from "@/components/ui/capsule/components/CollectionPreview";

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  tickets: number;
  todayPulls: number;
  maxDailyPulls: number;

  showProbability: boolean;
  onToggleProbability: () => void;

  mascots: Record<CapsuleMascot, MascotInfo>;
  collection: CapsuleMascot[];

  onPull: () => void;
  isPullDisabled: boolean;
  isTenPullDisabled: boolean;

  isMixing: boolean;
  fallingCapsule: number;
};

export function LobbyView({
  tickets,
  todayPulls,
  maxDailyPulls,
  showProbability,
  onToggleProbability,
  mascots,
  collection,
  onPull,
  isPullDisabled,
  isTenPullDisabled,
  isMixing,
  fallingCapsule,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "var(--space-2)" }}>
          🎰
        </div>
        <h1
          style={{
            color: "white",
            marginBottom: "var(--space-2)",
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          오늘의 팝업 캡슐
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}>
          운명처럼 만나는 팝업스토어
        </p>
      </div>

      {/* Tickets & Stats */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3) var(--space-5)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <Gift size={20} color="#D9F95F" />
          <span style={{ color: "white" }}>티켓 {tickets}개</span>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3) var(--space-5)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <Sparkles size={20} color="#FF8BA0" />
          <span style={{ color: "white" }}>
            오늘 {todayPulls}/{maxDailyPulls}회
          </span>
        </div>

        <button
          onClick={onToggleProbability}
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3) var(--space-5)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.9rem",
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
          확률 보기
        </button>
      </div>

      {showProbability && <ProbabilityModal mascots={mascots} />}

      {/* Capsule Machine */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: 440,
          height: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "var(--space-4)",
        }}
      >
        <CapsuleMachineSVG mixing={isMixing} fallingCapsule={fallingCapsule} />
      </div>

      {/* Pull Buttons */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-4)",
          width: "100%",
          maxWidth: 440,
          margin: "0 auto",
          marginTop: "var(--space-6)",
        }}
      >
        <button
          onClick={onPull}
          disabled={isPullDisabled}
          style={{
            flex: 1,
            background: !isPullDisabled
              ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)"
              : "rgba(255,255,255,0.3)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-5)",
            cursor: !isPullDisabled ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            boxShadow: !isPullDisabled ? "0 8px 20px rgba(0,0,0,0.15)" : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
          onMouseDown={(e) => {
            if (!isPullDisabled)
              e.currentTarget.style.transform = "scale(0.96)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div style={{ fontSize: "2rem" }}>💎</div>
          <span
            style={{
              color: !isPullDisabled ? "#6B8AFF" : "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
            }}
          >
            1회 뽑기
          </span>
        </button>

        <button
          disabled={isTenPullDisabled}
          style={{
            flex: 1,
            background: !isTenPullDisabled
              ? "linear-gradient(135deg, #7FBFF0 0%, #6B8AFF 100%)"
              : "rgba(255,255,255,0.3)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-5)",
            cursor: !isTenPullDisabled ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            boxShadow: !isTenPullDisabled
              ? "0 8px 20px rgba(107,138,255,0.3)"
              : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
          onMouseDown={(e) => {
            if (!isTenPullDisabled)
              e.currentTarget.style.transform = "scale(0.96)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div style={{ fontSize: "2rem" }}>💫</div>
          <span
            style={{
              color: !isTenPullDisabled ? "white" : "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
            }}
          >
            10회 뽑기
          </span>
        </button>
      </div>

      <CollectionPreview mascots={mascots} collection={collection} />
    </div>
  );
}
