import { useState } from "react";
import { Globe, Moon, MapPin, Trash2, LogOut } from "lucide-react";
import type { SettingsGroup } from "@/components/my/types/settings";
import { SettingsGroups } from "@/components/my/settings/parts/SettingsGroups";
import { VersionCard } from "@/components/my/settings/parts/VersionCard";
import { LogoutDialog } from "@/components/my/settings/parts/LogoutDialog";

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
      <div style={{ padding: "var(--space-4)" }}>
        <SettingsGroups groups={settingsGroups} />
      </div>

      <VersionCard version="PopUp! v1.0.0" year={2026} />

      <LogoutDialog
        open={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          alert("로그아웃되었습니다");
          setShowDeleteDialog(false);
        }}
      />
    </div>
  );
}
