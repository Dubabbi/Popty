import type { CapsuleMascot } from "@/components/ui/capsule/types/capsule";

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  mascots: Record<CapsuleMascot, MascotInfo>;
};

export function ProbabilityModal({ mascots }: Props) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-5)",
        animation: "slideUp 0.3s ease-out",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "var(--space-4)" }}>
        마스코트 확률
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        {Object.entries(mascots).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.9rem",
            }}
          >
            <span>
              {value.emoji} {value.name}
            </span>
            <span style={{ color: value.color }}>16.7%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
