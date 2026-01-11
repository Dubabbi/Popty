import { useState } from "react";
import type { ViewType } from "@/routes/routes";
import { buildDefaultMenuItems } from "@/components/my/data/menuItems";
import ProfileHeader from "@/components/my/mypage/parts/ProfileHeader";
import { StatsGrid } from "@/components/my/mypage/parts/StatsGrid";
import { MenuItemButton } from "@/components/my/mypage/parts/MenuItemButton";
import { AchievementCard } from "@/components/my/mypage/parts/AchievementCard";
import { useMeQuery } from "@/apis/auth/useMeQuery";

interface MyProps {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function My({ onNavigate }: MyProps) {
  const [activeRipple, setActiveRipple] = useState<string | null>(null);
  const { data: me } = useMeQuery();
  const menuItems = buildDefaultMenuItems(onNavigate);

  const handleMenuClick = (label: string, action: () => void) => {
    setActiveRipple(label);
    setTimeout(() => setActiveRipple(null), 600);
    action();
  };

  return (
    <div
      style={{
        paddingBottom: "var(--space-8)",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        minHeight: "100vh",
      }}
    >
      <ProfileHeader name={me?.name} email={me?.email ?? undefined} />
      <StatsGrid />
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
          {menuItems.map((item) => (
            <MenuItemButton
              key={item.label}
              item={item}
              active={activeRipple === item.label}
              onClick={() => handleMenuClick(item.label, item.action)}
            />
          ))}
        </div>
      </div>

      <AchievementCard />

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
