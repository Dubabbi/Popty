import { Search, Bell, Calendar } from "lucide-react";
import type { ViewType } from "../App";
import LogoImg from "../assets/logo.svg";

interface AppBarProps {
  title: string;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function AppBar({ currentView, onNavigate }: AppBarProps) {
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
        minHeight: "60px",
      }}
    >
      {currentView === "home" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={LogoImg} style={{ width: "40px" }} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => onNavigate("home")}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={LogoImg} style={{ width: "40px" }} />
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
        }}
      >
        {currentView === "home" && (
          <>
            <button
              onClick={() => onNavigate("calendar")}
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-full)",
                background: "var(--color-gray-100)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-gray-200)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-gray-100)";
              }}
            >
              <Calendar size={20} color="var(--color-text-secondary)" />
            </button>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-full)",
                background: "var(--color-gray-100)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => onNavigate("search")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-gray-200)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-gray-100)";
              }}
            >
              <Search size={20} color="var(--color-text-secondary)" />
            </button>
          </>
        )}
        <button
          onClick={() => onNavigate("notifications")}
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-full)",
            background: "var(--color-gray-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-gray-200)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-gray-100)";
          }}
        >
          <Bell size={20} color="var(--color-text-secondary)" />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-error)",
              border: "2px solid white",
            }}
          />
        </button>
      </div>
    </header>
  );
}
