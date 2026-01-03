import { useState } from "react";
import { DEFAULT_NOTIFICATIONS } from "@/components/my/data/defaultNotifications";
import { NotificationStatusCard } from "@/components/my/notifications/parts/NotificationStatusCard";
import { NotificationItemRow } from "@/components/my/notifications/parts/NotificationItemRow";
import type { NotificationItem } from "@/components/my/types/my";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const enabledCount = notifications.filter((n) => n.enabled).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      {/* Status Card */}
      <NotificationStatusCard enabledCount={enabledCount} total={notifications.length} />

      {/* Notification List */}
      <div style={{ padding: "0 var(--space-4)" }}>
        <h4
          style={{
            marginBottom: "var(--space-3)",
            color: "var(--color-text-secondary)",
            fontSize: "0.813rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            paddingLeft: "var(--space-2)",
          }}
        >
          알림 종류
        </h4>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {notifications.map((item) => (
            <NotificationItemRow key={item.id} item={item} onToggle={toggleNotification} />
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          margin: "var(--space-4)",
          marginTop: "var(--space-6)",
          padding: "var(--space-4)",
          background: "linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 100%)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid rgba(255, 182, 217, 0.3)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          💡 알림은 기기 설정에서 허용되어 있어야 받을 수 있어요
        </p>
      </div>
    </div>
  );
}
