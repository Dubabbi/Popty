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
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Mascot pose="recommend" size="large" />
      </div>
      <div>
        <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>무엇을 도와드릴까요?</h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
          }}
        >
          자주 묻는 질문을 확인하거나
          <br />
          언제든 문의해주세요!
        </p>
      </div>
    </div>
  );
}
