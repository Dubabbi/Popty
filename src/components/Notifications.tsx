import { Bell, Clock, TrendingUp, Heart, Tag, Check } from "lucide-react";
import { useMemo, useState } from "react";
import type { ViewType } from "@/routes/routes";
import {
  mockNotifications,
  type Notification,
  type NotificationType,
} from "@/constants/mockNotifications";

interface NotificationsProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

type Filter = "all" | "unread";

const typeLabel: Record<NotificationType, string> = {
  new: "New",
  ending: "Ending",
  update: "Update",
  saved: "Saved",
  system: "System",
};

function NotificationIcon({ type }: { type: NotificationType }) {
  const common = { size: 18, color: "var(--color-text-secondary)" as const };
  switch (type) {
    case "new":
      return <TrendingUp {...common} />;
    case "ending":
      return <Clock {...common} />;
    case "update":
      return <Bell {...common} />;
    case "saved":
      return <Heart {...common} />;
    case "system":
      return <Tag {...common} />;
    default:
      return <Bell {...common} />;
  }
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<Filter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !n.isRead);
    return notifications;
  }, [filter, notifications]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClick = (n: Notification) => {
    markAsRead(n.id);
    if (n.popupId) onNavigate("detail", n.popupId);
  };

  const pageBg = "var(--color-gray-50)";
  const surface = "white";
  const border = "1px solid var(--color-gray-200)";

  return (
    <div style={{ minHeight: "100vh", background: pageBg }}>
      {/* Top controls (tabs like screenshot) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          borderBottom: border,
        }}
      >
        <div
          style={{
            padding: "var(--space-3) var(--space-4)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "var(--space-1)",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "15px",
            }}
          >
            <TabButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="전체"
            />

            <TabButton
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
              label="안 읽음"
              badge={unreadCount}
            />
          </div>

          {/* Right action */}
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 12px",
              borderRadius: "999px",
              border,
              background: surface,
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: unreadCount === 0 ? "not-allowed" : "pointer",
              opacity: unreadCount === 0 ? 0.5 : 1,
            }}
          >
            <Check size={16} />
            모두 읽음
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: "var(--space-4)" }}>
        {filteredNotifications.length === 0 ? (
          <div
            style={{
              background: surface,
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8)",
              textAlign: "center",
              border,
            }}
          >
            <Bell
              size={44}
              color="var(--color-gray-300)"
              style={{ margin: "0 auto var(--space-4)" }}
            />
            <h3
              style={{
                margin: 0,
                marginBottom: "var(--space-2)",
                color: "var(--color-text-secondary)",
                fontWeight: 700,
              }}
            >
              No notifications
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                lineHeight: 1.5,
              }}
            >
              You're all caught up.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {filteredNotifications.map((n) => {
              const isHover = hoveredId === n.id;
              const isClickable = Boolean(n.popupId);

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleClick(n)}
                  onMouseEnter={() => setHoveredId(n.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  disabled={!isClickable}
                  style={{
                    textAlign: "left",
                    width: "100%",
                    background: surface,
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-4)",
                    border,
                    cursor: isClickable ? "pointer" : "default",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    transform:
                      isClickable && isHover
                        ? "translateY(-2px)"
                        : "translateY(0)",
                    boxShadow:
                      isClickable && isHover
                        ? "0 10px 26px rgba(0,0,0,0.08)"
                        : "none",
                    display: "flex",
                    gap: "var(--space-3)",
                    opacity: isClickable ? 1 : 0.85,
                    position: "relative",
                    outline: "none",
                  }}
                >
                  {/* unread indicator (subtle) */}
                  {!n.isRead && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 12,
                        bottom: 12,
                        width: 3,
                        borderRadius: 999,
                        background: "var(--color-primary)",
                        opacity: 0.6,
                      }}
                    />
                  )}

                  {/* Thumbnail / Icon */}
                  <div style={{ flexShrink: 0 }}>
                    {n.image ? (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          background: "var(--color-gray-200)",
                          border: "1px solid var(--color-gray-200)",
                        }}
                      >
                        <img
                          src={n.image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-gray-100)",
                          border: "1px solid var(--color-gray-200)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <NotificationIcon type={n.type} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "var(--space-2)",
                        marginBottom: 6,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {n.title}
                        </h4>

                        <div
                          style={{
                            marginTop: 6,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            color: "var(--color-text-tertiary)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 999,
                              border: "1px solid var(--color-gray-200)",
                              background: "var(--color-gray-50)",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            <NotificationIcon type={n.type} />
                            {typeLabel[n.type]}
                          </span>

                          <span aria-hidden="true">•</span>
                          <span>{n.time}</span>
                        </div>
                      </div>

                      {!n.isRead && (
                        <span
                          aria-label="unread"
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--color-primary)",
                            opacity: 0.85,
                            flexShrink: 0,
                            marginTop: 6,
                          }}
                        />
                      )}
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.55,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {n.message}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* focus-visible 스타일 (인라인 한계 보완용) */}
      <style>
        {`
          button:focus-visible {
            outline: 2px solid rgba(0,0,0,0.18);
            outline-offset: 2px;
          }
        `}
      </style>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        border: "none",
        background: "transparent",
        padding: "1px 2px 8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: active ? "#B0D655" : "var(--color-text-primary)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {label}

        {typeof badge === "number" && badge > 0 && (
          <span
            style={{
              minWidth: 20,
              height: 18,
              padding: "0 6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: "var(--color-gray-200)",
              color: "var(--color-text-primary)",
              fontSize: "0.75rem",
              fontWeight: 800,
            }}
          >
            {badge}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: active ? "#B0D655" : "transparent",
        }}
      />
    </button>
  );
}
