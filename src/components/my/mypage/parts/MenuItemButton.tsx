import { ChevronRight } from "lucide-react";
import type { MenuItem } from "@/components/my/data/menuItems";

export function MenuItemButton({
  item,
  active,
  onClick,
}: {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
}) {
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
        border: "1px solid rgba(0, 0, 0, 0.04)",
        borderRadius: "var(--radius-xl)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = item.color + "40";
        e.currentTarget.style.background = `linear-gradient(90deg, ${item.color}08 0%, white 100%)`;
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement | null;
        if (iconContainer) {
          iconContainer.style.transform = "rotate(5deg) scale(1.1)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.background = "white";
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement | null;
        if (iconContainer) {
          iconContainer.style.transform = "rotate(0deg) scale(1)";
        }
      }}
      onClick={onClick}
    >
      {/* Ripple effect */}
      {active && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
            transform: "translateY(-50%) scale(0)",
            animation: "ripple 0.6s ease-out",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        className="icon-container"
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-lg)",
          background: item.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: `0 4px 12px ${item.color}20`,
        }}
      >
        <Icon size={22} color="white" strokeWidth={2.5} />
      </div>

      <div style={{ flex: 1, textAlign: "left" }}>
        <div
          style={{
            fontWeight: 600,
            marginBottom: "2px",
            fontSize: "0.938rem",
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

      {item.badge && (
        <div
          style={{
            minWidth: 24,
            height: 24,
            borderRadius: "var(--radius-full)",
            background: "linear-gradient(135deg, #FF6B85 0%, #FF8BA0 100%)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 var(--space-2)",
            boxShadow: "0 2px 8px rgba(255, 107, 133, 0.3)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          {item.badge}
        </div>
      )}

      <ChevronRight size={20} color="var(--color-gray-300)" strokeWidth={2} />
    </button>
  );
}
