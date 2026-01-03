import type { LucideIcon } from "lucide-react";

export type SettingItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  onClick: () => void;
  danger?: boolean;
};

export type SettingsGroup = {
  title: string;
  items: SettingItem[];
};
