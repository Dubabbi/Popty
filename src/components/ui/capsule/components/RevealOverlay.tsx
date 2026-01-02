import type {
  CapsuleMascot,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  currentResult: CapsuleResult;
  mascots: Record<CapsuleMascot, MascotInfo>;
};

export function RevealOverlay({ currentResult, mascots }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.9)",
        zIndex: 100,
        animation: "fadeIn 0.3s ease-out",
        gap: "var(--space-6)",
      }}
    >
      <div style={{ position: "relative", animation: "scaleIn 0.5s ease-out" }}>
        <div
          style={{
            fontSize: "8rem",
            filter: "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
            animation: "float 2s ease-in-out infinite",
          }}
        >
          {mascots[currentResult.mascot].emoji}
        </div>

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 8,
              height: 8,
              background: currentResult.color,
              borderRadius: "50%",
              animation: `particle ${1 + (i % 4) * 0.25}s ease-out forwards`,
              animationDelay: `${i * 0.05}s`,
              transform: `rotate(${i * 30}deg) translateY(-100px)`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          animation: "slideUp 0.5s ease-out 0.3s backwards",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "2rem",
            marginBottom: "var(--space-2)",
            textShadow: `0 0 20px ${currentResult.color}`,
          }}
        >
          {currentResult.mascotName} 등장!
        </h2>
        <p style={{ color: currentResult.color, fontSize: "1.1rem" }}>
          ✨ {currentResult.message}
        </p>
      </div>
    </div>
  );
}
