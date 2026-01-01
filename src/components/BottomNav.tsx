import {
  Home,
  List,
  Calendar as CalendarIcon,
  Map,
  Bookmark,
  User,
} from "lucide-react";
import type { ViewType } from "@/routes/routes";

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home" as ViewType, icon: Home, label: "Home" },
    { id: "browse" as ViewType, icon: List, label: "Browse" },
    { id: "calendar" as ViewType, icon: CalendarIcon, label: "Calendar" },
    { id: "map" as ViewType, icon: Map, label: "Map" },
    { id: "saved" as ViewType, icon: Bookmark, label: "Saved" },
    { id: "my" as ViewType, icon: User, label: "My" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        background: "white",
        borderTop: "1px solid var(--color-gray-200)",
        padding: "var(--space-2) 0",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-1)",
              padding: "var(--space-2)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-tertiary)",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--color-text-tertiary)";
              }
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
