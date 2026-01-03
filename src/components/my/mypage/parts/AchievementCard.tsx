import { Mascot } from "@/components/Mascot";

export function AchievementCard() {
  return (
    <div
      style={{
        margin: "var(--space-4)",
        padding: "var(--space-6)",
        background: "linear-gradient(135deg, #B8F0D9 0%, #A3E0C9 100%)",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 4px 24px rgba(184, 240, 217, 0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "var(--radius-lg)",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Mascot pose="success" size="large" />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <h4
          style={{
            margin: 0,
            marginBottom: "var(--space-1)",
            color: "#1A5F44",
            fontSize: "1.063rem",
          }}
        >
          멋진 탐험가예요! 🎉
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "#2A6F54",
            lineHeight: 1.5,
          }}
        >
          팝업을 사랑하는 우리 커뮤니티의 소중한 멤버입니다
        </p>
      </div>
    </div>
  );
}
