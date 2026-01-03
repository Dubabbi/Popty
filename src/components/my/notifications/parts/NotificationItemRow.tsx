import type { NotificationItem } from "@/components/my/types/my";

export function NotificationItemRow({
  item,
  onToggle,
}: {
  item: NotificationItem;
  onToggle: (id: string) => void;
}) {
  const Icon = item.icon;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-4)",
        border: `2px solid ${item.enabled ? item.color + "40" : "rgba(0, 0, 0, 0.04)"}`,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        transition: "all 0.3s ease",
        boxShadow: item.enabled ? `0 4px 16px ${item.color}20` : "0 2px 8px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-lg)",
          background: item.enabled ? item.gradient : "rgba(0, 0, 0, 0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
        }}
      >
        <Icon
          size={22}
          color={item.enabled ? "white" : "var(--color-text-tertiary)"}
          strokeWidth={2.5}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            marginBottom: "2px",
            fontSize: "0.938rem",
            color: item.enabled ? "#000" : "var(--color-text-tertiary)",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontSize: "0.813rem",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.4,
          }}
        >
          {item.description}
        </div>
      </div>

      {/* Toggle Switch (스타일/동작 동일) */}
      <button
        onClick={() => onToggle(item.id)}
        style={{
          width: 52,
          height: 30,
          borderRadius: "var(--radius-full)",
          background: item.enabled ? item.gradient : "rgba(0, 0, 0, 0.1)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            top: 3,
            left: item.enabled ? 25 : 3,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </button>
    </div>
  );
}
