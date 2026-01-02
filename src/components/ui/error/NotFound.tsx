import { useState } from "react";
import { Home, Search, MapPin, Compass } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";

interface NotFoundProps {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function NotFound({ onNavigate }: NotFoundProps) {
  const [floatingElements] = useState<
    { x: number; y: number; delay: number; size: number }[]
  >(() =>
    Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: 40 + Math.random() * 60,
    })),
  );

  const quickLinks = [
    {
      icon: Home,
      label: "홈으로",
      description: "메인 피드 보기",
      view: "home" as ViewType,
      color: "#FFB6D9",
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
    },
    {
      icon: Search,
      label: "검색",
      description: "팝업 찾기",
      view: "search" as ViewType,
      color: "#A3B9FF",
      gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
    },
    {
      icon: MapPin,
      label: "지도",
      description: "주변 팝업",
      view: "map" as ViewType,
      color: "#D9F95F",
      gradient: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #FFF5F7 0%, #F0E7FF 50%, #E7F5FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative elements */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
            borderRadius: "50%",
            background:
              i % 4 === 0
                ? "radial-gradient(circle, rgba(217, 249, 95, 0.1) 0%, transparent 70%)"
                : i % 4 === 1
                  ? "radial-gradient(circle, rgba(255, 182, 217, 0.1) 0%, transparent 70%)"
                  : i % 4 === 2
                    ? "radial-gradient(circle, rgba(163, 185, 255, 0.1) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(184, 240, 217, 0.1) 0%, transparent 70%)",
            animation: `float ${6 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 480,
          width: "100%",
        }}
      >
        {/* Mascot */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "var(--space-6)",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "var(--radius-full)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 8px rgba(255, 255, 255, 0.5)",
            }}
          >
            <Mascot pose="confused" size="large" />
          </div>
        </div>

        {/* Message */}
        <h2
          style={{
            margin: 0,
            marginBottom: "var(--space-2)",
            fontSize: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          이런! 길을 잃었어요
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: "var(--space-8)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          찾으시는 팝업이 사라졌거나
          <br />
          잘못된 길로 들어오셨어요
        </p>

        {/* Quick Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
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
                  e.currentTarget.style.borderColor = link.color + "40";
                  e.currentTarget.style.background = `linear-gradient(90deg, ${link.color}08 0%, white 100%)`;
                  e.currentTarget.style.transform = "translateX(4px)";
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
                  e.currentTarget.style.transform = "translateX(0)";
                  const iconContainer = e.currentTarget.querySelector(
                    ".icon-container",
                  ) as HTMLElement;
                  if (iconContainer) {
                    iconContainer.style.transform = "rotate(0deg) scale(1)";
                  }
                }}
              >
                <div
                  className="icon-container"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-lg)",
                    background: link.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `0 4px 12px ${link.color}20`,
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
                    {link.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.813rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {link.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Random Fun Fact */}
        <div
          style={{
            padding: "var(--space-5)",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-2)",
            }}
          >
            <Compass size={20} color="#D9F95F" strokeWidth={2.5} />
            <h4
              style={{
                margin: 0,
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--color-text-secondary)",
              }}
            >
              팝업 탐험 TIP
            </h4>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-tertiary)",
              lineHeight: 1.6,
            }}
          >
            매일 새로운 팝업이 오픈돼요!
            <br />
            알림을 켜두면 근처 팝업 소식을 가장 먼저 받아볼 수 있어요 🔔
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
