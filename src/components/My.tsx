import {
  ChevronRight,
  User,
  Bell,
  MapPin,
  Settings,
  HelpCircle,
  MessageSquarePlus,
} from "lucide-react";
import { Mascot } from "./Mascot";

export function My() {
  const menuItems = [
    {
      icon: User,
      label: "Profile",
      description: "Edit your profile info",
      color: "var(--color-primary)",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage notification settings",
      color: "var(--color-accent)",
      badge: "3",
    },
    {
      icon: MapPin,
      label: "My Locations",
      description: "Favorite areas & preferences",
      color: "var(--color-mint)",
    },
    {
      icon: MessageSquarePlus,
      label: "Submit a Tip",
      description: "Report new pop-ups or updates",
      color: "var(--color-peach)",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences",
      color: "var(--color-gray-500)",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "FAQs and contact us",
      color: "var(--color-lavender)",
    },
  ];

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Profile Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-bg) 0%, var(--color-lavender) 100%)",
          padding: "var(--space-8) var(--space-4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "var(--radius-full)",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--space-3)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Mascot pose="welcome" size="medium" />
        </div>
        <h3 style={{ margin: 0, marginBottom: "var(--space-1)" }}>
          Pop-up Explorer
        </h3>
        <p
          style={{
            margin: 0,
            color: "var(--color-text-secondary)",
            fontSize: "0.875rem",
          }}
        >
          popup.lover@email.com
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-4)",
          padding: "var(--space-6) var(--space-4)",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-primary)",
              marginBottom: "var(--space-1)",
            }}
          >
            12
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            Visited
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              marginBottom: "var(--space-1)",
            }}
          >
            3
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            Saved
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-success)",
              marginBottom: "var(--space-1)",
            }}
          >
            5
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            Tips Shared
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ padding: "var(--space-4)" }}>
        <h4
          style={{
            marginBottom: "var(--space-3)",
            color: "var(--color-text-tertiary)",
          }}
        >
          Account
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: "var(--space-4)",
                  background: "white",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    background: `${item.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={item.color} />
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div
                    style={{ fontWeight: 600, marginBottom: "var(--space-1)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
                {item.badge && (
                  <div
                    style={{
                      minWidth: 20,
                      height: 20,
                      borderRadius: "var(--radius-full)",
                      background: "var(--color-error)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 var(--space-1)",
                    }}
                  >
                    {item.badge}
                  </div>
                )}
                <ChevronRight size={20} color="var(--color-gray-400)" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mascot Message */}
      <div
        style={{
          margin: "var(--space-4)",
          padding: "var(--space-6)",
          background: "var(--color-mint)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
        }}
      >
        <Mascot pose="success" size="large" />
        <div>
          <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>
            You're awesome! 🎉
          </h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Thanks for being part of our pop-up loving community!
          </p>
        </div>
      </div>
    </div>
  );
}
