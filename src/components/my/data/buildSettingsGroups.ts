import { Globe, Moon, MapPin, Trash2, LogOut } from "lucide-react";
import type { SettingsGroup } from "@/components/my/types/settings";

export function buildSettingsGroups(opts: {
  language: string;
  setLanguage: (v: string) => void;
  theme: string;
  setTheme: (v: string) => void;
  mapStyle: string;
  setMapStyle: (v: string) => void;
  onClearCache: () => void;
  onRequestLogout: () => void;
}): SettingsGroup[] {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    mapStyle,
    setMapStyle,
    onClearCache,
    onRequestLogout,
  } = opts;

  return [
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
          onClick: onClearCache,
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
          onClick: onRequestLogout,
          danger: true,
        },
      ],
    },
  ];
}
