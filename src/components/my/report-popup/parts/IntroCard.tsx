import { Mascot } from "@/components/Mascot";

export function IntroCard() {
  return (
    <div
      style={{
        margin: "var(--space-4)",
        padding: "var(--space-5)",
        background: "linear-gradient(135deg, #FFF5F7 0%, #F0E7FF 100%)",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Mascot pose="explore" size="medium" />
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>새로운 팝업을 발견하셨나요?</h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
          }}
        >
          여러분의 제보로 더 풍성해집니다!
        </p>
      </div>
    </div>
  );
}
