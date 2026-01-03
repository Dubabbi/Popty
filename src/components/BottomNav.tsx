import { Home, Calendar, Map, User, Route } from "lucide-react";
import type { ViewType } from "@/routes/routes";
import {
  getEffectivePath,
  isMyRootRoute,
  isMySubRoute,
  isHomeRoute,
} from "@/components/appbar/utils/path";

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  pathname?: string;
}

export function BottomNav({ currentView, onNavigate, pathname }: BottomNavProps) {
  const navItems = [
    { view: "home" as ViewType, icon: Home, label: "홈" },
    { view: "calendar" as ViewType, icon: Calendar, label: "캘린더" },
    { view: "roadmap" as ViewType, icon: Route, label: "로드맵" },
    { view: "map" as ViewType, icon: Map, label: "지도" },
    { view: "my" as ViewType, icon: User, label: "내 정보" },
  ];

  const path = getEffectivePath(pathname);
  const isMy = isMyRootRoute(path) || isMySubRoute(path);
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        padding: "8px 0 calc(8px + env(safe-area-inset-bottom))",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      {navItems.map(({ view, icon: Icon, label }) => {
        const isActive =
          view === "my" ? isMy : view === "home" ? isHomeRoute(path) : currentView === view;

        return (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              padding: "8px 12px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              flex: 1,
              minWidth: 0,
            }}
            aria-label={label}
          >
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#D9F95F",
                  animation: "dotPulse 2s ease-in-out infinite",
                }}
              />
            )}
            {/* 아이콘 컨테이너 */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive ? "#D9F95F" : "transparent",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isActive ? "scale(1)" : "scale(0.9)",
              }}
            >
              <Icon
                size={20}
                color={isActive ? "#000" : "#999"}
                strokeWidth={isActive ? 2.5 : 2}
                style={{ transition: "all 0.3s ease" }}
              />
            </div>
            {/* 라벨 */}
            <span
              style={{
                fontSize: "0.688rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#000" : "#999",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                letterSpacing: "-0.02em",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}

      <style>{`
        @keyframes dotPulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) scale(1.5);
          }
        }
      `}</style>
    </nav>
  );
}
