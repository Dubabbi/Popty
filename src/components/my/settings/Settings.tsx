import { useMemo, useState } from "react";
import type { SettingsGroup } from "@/components/my/types/settings";
import { SettingsGroups } from "@/components/my/settings/parts/SettingsGroups";
import { VersionCard } from "@/components/my/settings/parts/VersionCard";
import { LogoutDialog } from "@/components/my/settings/parts/LogoutDialog";
import { Toast, type ToastType } from "@/components/Toast";
import { buildSettingsGroups } from "@/components/my/data/buildSettingsGroups";

export function Settings() {
  const [language, setLanguage] = useState("ko");
  const [theme, setTheme] = useState("light");
  const [mapStyle, setMapStyle] = useState("default");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");
  const showToast = (msg: string, type: ToastType = "info") => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  };

  const onClearCache = () => showToast("캐시가 삭제되었습니다!", "success");
  const onRequestLogout = () => setShowDeleteDialog(true);

  const settingsGroups: SettingsGroup[] = useMemo(
    () =>
      buildSettingsGroups({
        language,
        setLanguage,
        theme,
        setTheme,
        mapStyle,
        setMapStyle,
        onClearCache,
        onRequestLogout,
      }),
    [language, theme, mapStyle]
  );

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
          setShowDeleteDialog(false);
          showToast("로그아웃되었습니다", "success");
        }}
      />

      {toastOpen && (
        <Toast
          message={toastMsg}
          type={toastType}
          duration={2200}
          onClose={() => setToastOpen(false)}
        />
      )}
    </div>
  );
}
