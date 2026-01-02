import { useState } from "react";
import {
  ChevronRight,
  User,
  Bell,
  MapPin,
  Settings,
  HelpCircle,
  MessageSquarePlus,
  Sparkles,
  Award,
  Heart,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";

interface MyProps {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function My({ onNavigate }: MyProps) {
  const [activeRipple, setActiveRipple] = useState<string | null>(null);

  const menuItems = [
    {
      icon: User,
      label: "프로필 편집",
      description: "내 정보 수정하기",
      color: "#FFB6D9",
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
      action: () => onNavigate("profile-edit"),
    },
    {
      icon: Bell,
      label: "알림 설정",
      description: "새로운 팝업 소식 받기",
      color: "#A3B9FF",
      gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
      badge: "3",
      action: () => onNavigate("notification-settings"),
    },
    {
      icon: MapPin,
      label: "나의 여행 기록",
      description: "방문한 팝업 타임라인",
      color: "#D9F95F",
      gradient: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
      action: () => onNavigate("roadmap"),
    },
    {
      icon: MessageSquarePlus,
      label: "팝업 제보하기",
      description: "새로운 팝업 정보 공유",
      color: "#FFD4B8",
      gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
      action: () => onNavigate("report-popup"),
    },
    {
      icon: Settings,
      label: "설정",
      description: "앱 환경 설정",
      color: "#D4C4FF",
      gradient: "linear-gradient(135deg, #E4D4FF 0%, #D4C4FF 100%)",
      action: () => onNavigate("settings"),
    },
    {
      icon: HelpCircle,
      label: "도움말",
      description: "FAQ 및 문의하기",
      color: "#B8F0D9",
      gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
      action: () => onNavigate("help"),
    },
  ];

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    setActiveRipple(item.label);
    setTimeout(() => setActiveRipple(null), 600);
    if (item.action) {
      item.action();
    }
  };

  return (
    <div
      style={{
        paddingBottom: "var(--space-8)",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Profile Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #FFF5F7 0%, #F0E7FF 50%, #E7F5FF 100%)",
          padding: "var(--space-8) var(--space-4) var(--space-10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217, 249, 95, 0.15) 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 182, 217, 0.15) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Avatar with glow effect */}
          <div
            style={{
              position: "relative",
              marginBottom: "var(--space-4)",
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "var(--radius-full)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 8px 32px rgba(217, 249, 95, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.8)",
                position: "relative",
              }}
            >
              <Mascot pose="welcome" size="medium" />

              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  border: "3px solid white",
                }}
              >
                <Sparkles size={14} color="#000" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              marginBottom: "var(--space-1)",
              fontSize: "1.375rem",
            }}
          >
            팝업 탐험가
          </h3>
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            popup.lover@email.com
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-3)",
          padding: "var(--space-4)",
          marginTop: "-32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4)",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 100%)";
            e.currentTarget.style.borderColor = "#FFB6D9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              margin: "0 auto var(--space-2)",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin size={16} color="white" strokeWidth={2.5} />
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "var(--space-1)",
            }}
          >
            12
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              fontWeight: 600,
            }}
          >
            방문
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4)",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #E7F5FF 0%, #FFFFFF 100%)";
            e.currentTarget.style.borderColor = "#A3B9FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              margin: "0 auto var(--space-2)",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart size={16} color="white" strokeWidth={2.5} />
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "var(--space-1)",
            }}
          >
            3
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              fontWeight: 600,
            }}
          >
            저장
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4)",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)";
            e.currentTarget.style.borderColor = "#D9F95F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              margin: "0 auto var(--space-2)",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Award size={16} color="#000" strokeWidth={2.5} />
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "var(--space-1)",
            }}
          >
            5
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              fontWeight: 600,
            }}
          >
            제보
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ padding: "var(--space-4)" }}>
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
          메뉴
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
            const isActive = activeRipple === item.label;

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
                    ".icon-container",
                  ) as HTMLElement;
                  if (iconContainer) {
                    iconContainer.style.transform = "rotate(5deg) scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.background = "white";
                  const iconContainer = e.currentTarget.querySelector(
                    ".icon-container",
                  ) as HTMLElement;
                  if (iconContainer) {
                    iconContainer.style.transform = "rotate(0deg) scale(1)";
                  }
                }}
                onClick={() => handleMenuClick(item)}
              >
                {/* Ripple effect */}
                {isActive && (
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
                      background:
                        "linear-gradient(135deg, #FF6B85 0%, #FF8BA0 100%)",
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
                <ChevronRight
                  size={20}
                  color="var(--color-gray-300)"
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievement Card */}
      <div
        style={{
          margin: "var(--space-4)",
          padding: "var(--space-6)",
          background: "linear-gradient(135deg, #B8F0D9 0%, #A3E0C9 100%)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 4px 24px rgba(184, 240, 217, 0.3)",
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "var(--radius-lg)",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Mascot pose="success" size="large" />
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <h4
            style={{
              margin: 0,
              marginBottom: "var(--space-1)",
              color: "#1A5F44",
              fontSize: "1.063rem",
            }}
          >
            멋진 탐험가예요! 🎉
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "#2A6F54",
              lineHeight: 1.5,
            }}
          >
            팝업을 사랑하는 우리 커뮤니티의 소중한 멤버입니다
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          to {
            transform: translateY(-50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
