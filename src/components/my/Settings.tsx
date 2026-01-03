import { useState } from "react";
import { ChevronRight, Globe, Moon, MapPin, Trash2, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SettingItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  onClick: () => void;
  danger?: boolean;
};

type SettingsGroup = {
  title: string;
  items: SettingItem[];
};

export function Settings() {
  const [language, setLanguage] = useState("ko");
  const [theme, setTheme] = useState("light");
  const [mapStyle, setMapStyle] = useState("default");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const settingsGroups: SettingsGroup[] = [
    {
      title: "표시",
      items: [
        {
          icon: Globe,
          label: "언어",
          value: language === "ko" ? "한국어" : "English",
          color: "#A3B9FF",
          onClick: () => setLanguage(language === "ko" ? "en" : "ko"),
        },
        {
          icon: Moon,
          label: "테마",
          value: theme === "light" ? "라이트" : "다크",
          color: "#D4C4FF",
          onClick: () => setTheme(theme === "light" ? "dark" : "light"),
        },
      ],
    },
    {
      title: "지도",
      items: [
        {
          icon: MapPin,
          label: "지도 스타일",
          value: mapStyle === "default" ? "기본" : "미니멀",
          color: "#D9F95F",
          onClick: () => setMapStyle(mapStyle === "default" ? "minimal" : "default"),
        },
      ],
    },
    {
      title: "데이터",
      items: [
        {
          icon: Trash2,
          label: "캐시 삭제",
          value: "",
          color: "#FFD4B8",
          onClick: () => alert("캐시가 삭제되었습니다!"),
        },
      ],
    },
    {
      title: "계정",
      items: [
        {
          icon: LogOut,
          label: "로그아웃",
          value: "",
          color: "#FFB6D9",
          onClick: () => setShowDeleteDialog(true),
          danger: true,
        },
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      {/* Settings Groups */}
      <div style={{ padding: "var(--space-4)" }}>
        {settingsGroups.map((group, idx) => (
          <div key={group.title} style={{ marginTop: idx > 0 ? "var(--space-6)" : 0 }}>
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
              {group.title}
            </h4>

            <div
              style={{
                background: "white",
                borderRadius: "var(--radius-xl)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
              }}
            >
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      padding: "var(--space-4)",
                      border: "none",
                      borderTop: itemIdx > 0 ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
                      background: "transparent",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${item.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
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
                      <Icon
                        size={20}
                        color={item.danger ? "#FF6B85" : item.color}
                        strokeWidth={2.5}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.938rem",
                          color: item.danger ? "#FF6B85" : "#000",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>

                    {item.value && (
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-tertiary)",
                          marginRight: "var(--space-2)",
                        }}
                      >
                        {item.value}
                      </div>
                    )}

                    <ChevronRight size={20} color="var(--color-gray-300)" strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Version Info */}
      <div
        style={{
          margin: "var(--space-4)",
          marginTop: "var(--space-6)",
          padding: "var(--space-4)",
          background: "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)",
          borderRadius: "var(--radius-xl)",
          textAlign: "center",
          border: "1px solid rgba(217, 249, 95, 0.3)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
          }}
        >
          PopUp! v1.0.0
        </p>
        <p
          style={{
            margin: 0,
            marginTop: "var(--space-1)",
            fontSize: "0.75rem",
            color: "var(--color-text-tertiary)",
          }}
        >
          © 2026 PopUp! All rights reserved.
        </p>
      </div>

      {/* Logout Confirmation Dialog */}
      {showDeleteDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "var(--space-4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-6)",
              maxWidth: 320,
              width: "100%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <h3 style={{ margin: 0, marginBottom: "var(--space-2)" }}>로그아웃 하시겠어요?</h3>
            <p
              style={{
                margin: 0,
                marginBottom: "var(--space-6)",
                fontSize: "0.938rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              언제든지 다시 로그인할 수 있어요
            </p>

            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
              }}
            >
              <button
                onClick={() => setShowDeleteDialog(false)}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  background: "rgba(0, 0, 0, 0.04)",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "0.938rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert("로그아웃되었습니다");
                  setShowDeleteDialog(false);
                }}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  background: "linear-gradient(135deg, #FF6B85 0%, #FF8BA0 100%)",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "0.938rem",
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255, 107, 133, 0.3)",
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
