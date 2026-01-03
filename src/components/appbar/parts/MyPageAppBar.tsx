import { Bell, ChevronLeft } from "lucide-react";
import { APPBAR_HEIGHT } from "@/components/appbar/constants/header";
import type { AppBarProps } from "@/components/appbar/types/appbar";
import { IconButton } from "@/components/appbar/parts/IconButton";

export function MyPageAppBar({ onNavigate }: AppBarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        borderBottom: "1px solid var(--color-gray-200)",
        padding: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: `${APPBAR_HEIGHT}px`,
      }}
    >
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Back"
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={24} color="var(--color-text-secondary)" />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <IconButton ariaLabel="Notifications" onClick={() => onNavigate("notifications")} hasDot>
          <Bell size={20} color="var(--color-text-secondary)" />
        </IconButton>
      </div>
    </header>
  );
}
