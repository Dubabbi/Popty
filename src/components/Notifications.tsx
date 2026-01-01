import { Bell, Clock, TrendingUp, Heart, Tag } from "lucide-react";
import { useState } from "react";
import type { ViewType } from "../App";

interface NotificationsProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

type NotificationType = "new" | "ending" | "update" | "saved" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  popupId?: string;
  image?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new",
    title: "New Pop-up Near You! 🎉",
    message: "Sanrio Cafe just opened in Seongsu. Don't miss out!",
    time: "5 min ago",
    isRead: false,
    popupId: "1",
    image:
      "https://images.unsplash.com/photo-1706282540364-962e8b1543da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2NzE2MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    type: "ending",
    title: "Ending Soon! ⏰",
    message: "BTS Pop-up Store ends in 3 days. Secure your visit!",
    time: "2 hours ago",
    isRead: false,
    popupId: "2",
    image:
      "https://images.unsplash.com/photo-1723283126758-28f2a308bc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjcxNjY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    type: "saved",
    title: "Saved Pop-up Update 💝",
    message: "Nike Sneaker Lab has extended their hours this weekend!",
    time: "5 hours ago",
    isRead: false,
    popupId: "3",
    image:
      "https://images.unsplash.com/photo-1679294176201-f9b302961f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3NjcwNDIyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    type: "update",
    title: "Trending This Week 🔥",
    message: "Harry Potter Exhibition is trending in Gangnam. Check it out!",
    time: "1 day ago",
    isRead: true,
    popupId: "4",
    image:
      "https://images.unsplash.com/photo-1714972692832-618fae83ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBncmFkaWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NjcxNjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    type: "system",
    title: "New Feature Available! ✨",
    message: "Try our new AR preview feature in the Map view.",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: "6",
    type: "new",
    title: "New Category Pop-ups 🎨",
    message: "5 new Art & Design pop-ups added to your area.",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: "7",
    type: "saved",
    title: "Reminder: Upcoming Visit 📍",
    message: "Pokemon Center opens tomorrow. Don't forget to visit!",
    time: "3 days ago",
    isRead: true,
    popupId: "5",
    image:
      "https://images.unsplash.com/photo-1686405585580-2a1f5aac9837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGNvbG9yZnVsJTIwcGFpbnR8ZW58MXx8fHwxNzY3MTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
    );

    if (notification.popupId) {
      onNavigate("detail", notification.popupId);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "new":
        return <TrendingUp size={20} color="var(--color-primary)" />;
      case "ending":
        return <Clock size={20} color="var(--color-error)" />;
      case "update":
        return <Bell size={20} color="var(--color-accent)" />;
      case "saved":
        return <Heart size={20} color="var(--color-pink)" />;
      case "system":
        return <Tag size={20} color="var(--color-text-tertiary)" />;
      default:
        return <Bell size={20} color="var(--color-text-tertiary)" />;
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-gray-50)" }}>
      {/* Filter Tabs */}
      <div
        style={{
          background: "white",
          padding: "var(--space-3) var(--space-4)",
          borderBottom: "1px solid var(--color-gray-200)",
          display: "flex",
          gap: "var(--space-2)",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-full)",
            background:
              filter === "all"
                ? "var(--color-primary)"
                : "var(--color-gray-100)",
            color: filter === "all" ? "white" : "var(--color-text-secondary)",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-full)",
            background:
              filter === "unread"
                ? "var(--color-primary)"
                : "var(--color-gray-100)",
            color:
              filter === "unread" ? "white" : "var(--color-text-secondary)",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          Unread
          {unreadCount > 0 && (
            <span
              style={{
                background:
                  filter === "unread"
                    ? "rgba(255,255,255,0.3)"
                    : "var(--color-error)",
                color: filter === "unread" ? "white" : "white",
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ padding: "var(--space-4)" }}>
        {filteredNotifications.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8)",
              textAlign: "center",
            }}
          >
            <Bell
              size={48}
              color="var(--color-gray-300)"
              style={{ margin: "0 auto var(--space-4)" }}
            />
            <h3
              style={{
                margin: 0,
                marginBottom: "var(--space-2)",
                color: "var(--color-text-secondary)",
              }}
            >
              No notifications
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
              }}
            >
              You're all caught up!
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
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  background: notification.isRead
                    ? "white"
                    : "var(--color-primary-bg)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-4)",
                  cursor: notification.popupId ? "pointer" : "default",
                  transition: "all 0.2s",
                  border: notification.isRead
                    ? "1px solid var(--color-gray-200)"
                    : "1px solid var(--color-primary)",
                  position: "relative",
                  display: "flex",
                  gap: "var(--space-3)",
                }}
                onMouseEnter={(e) => {
                  if (notification.popupId) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (notification.popupId) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {/* Thumbnail or Icon */}
                <div style={{ flexShrink: 0 }}>
                  {notification.image ? (
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        background: "var(--color-gray-200)",
                      }}
                    >
                      <img
                        src={notification.image}
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
                        width: 60,
                        height: 60,
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-gray-100)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getNotificationIcon(notification.type)}
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
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                      }}
                    >
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--color-primary)",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      marginBottom: "var(--space-2)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {notification.message}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
