import { Bell } from "lucide-react";

export function NotificationStatusCard({
  enabledCount,
  total,
}: {
  enabledCount: number;
  total: number;
}) {
  return (
    <div
      style={{
        margin: "var(--space-4)",
        padding: "var(--space-5)",
        background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        boxShadow: "0 4px 24px rgba(217, 249, 95, 0.3)",
        border: "2px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "var(--radius-md)",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Bell size={28} color="#000" strokeWidth={2.5} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, marginBottom: "var(--space-1)", color: "#000" }}>
          {enabledCount}개 활성화
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          총 {total}개 중
        </p>
      </div>
    </div>
  );
}
