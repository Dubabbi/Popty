import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, MapPin, Calendar, Star, Gift, MessageSquare, Sparkles } from "lucide-react";

interface NotificationItem {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  enabled: boolean;
  color: string;
  gradient: string;
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "new-popup",
      icon: Sparkles,
      label: "새로운 팝업",
      description: "관심 지역에 새 팝업이 열리면 알려드려요",
      enabled: true,
      color: "#D9F95F",
      gradient: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
    },
    {
      id: "nearby",
      icon: MapPin,
      label: "근처 팝업",
      description: "현재 위치 근처의 팝업을 알려드려요",
      enabled: true,
      color: "#FFB6D9",
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
    },
    {
      id: "schedule",
      icon: Calendar,
      label: "일정 알림",
      description: "저장한 팝업의 시작/종료일을 알려드려요",
      enabled: true,
      color: "#A3B9FF",
      gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
    },
    {
      id: "recommend",
      icon: Star,
      label: "추천 팝업",
      description: "취향 기반 맞춤 팝업을 추천해드려요",
      enabled: false,
      color: "#FFD4B8",
      gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
    },
    {
      id: "event",
      icon: Gift,
      label: "이벤트 소식",
      description: "특별 이벤트와 혜택을 알려드려요",
      enabled: false,
      color: "#D4C4FF",
      gradient: "linear-gradient(135deg, #E4D4FF 0%, #D4C4FF 100%)",
    },
    {
      id: "community",
      icon: MessageSquare,
      label: "커뮤니티",
      description: "댓글과 좋아요 알림을 받아요",
      enabled: true,
      color: "#B8F0D9",
      gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
    },
  ]);

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
            borderRadius: "var(--radius-lg)",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
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
            총 {notifications.length}개 중
          </p>
        </div>
      </div>

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
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: "white",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-4)",
                  border: `2px solid ${item.enabled ? item.color + "40" : "rgba(0, 0, 0, 0.04)"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  transition: "all 0.3s ease",
                  boxShadow: item.enabled
                    ? `0 4px 16px ${item.color}20`
                    : "0 2px 8px rgba(0, 0, 0, 0.02)",
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

                {/* Toggle Switch */}
                <button
                  onClick={() => toggleNotification(item.id)}
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
          })}
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
