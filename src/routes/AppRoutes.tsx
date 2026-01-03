import { Route, Routes } from "react-router-dom";
import type { ViewType } from "@/routes/routes";

import { Home } from "@/components/Home";
import { Browse } from "@/components/Browse";
import { Calendar } from "@/components/Calendar";
import { MapView } from "@/components/ui/map/MapView";
import { Saved } from "@/components/Saved";
import { PopupDetail } from "@/components/PopupDetail";
import { Notifications } from "@/components/Notifications";
import { Search } from "@/components/Search";
import { Capsule } from "@/components/Capsule";
import { Roadmap } from "@/components/ui/roadmap/Roadmap";
import { NotFound } from "@/components/ui/error/NotFound";
import { My } from "@/components/my";
import { Help } from "@/components/my";
import { Settings } from "@/components/my";
import { NotificationSettings } from "@/components/my";
import { ProfileEdit } from "@/components/my";
import { ReportPopup } from "@/components/my";

type Breakpoint = "mobile" | "tablet" | "desktop";

type AppRoutesProps = {
  breakpoint: Breakpoint;
  onNavigate: (view: ViewType, popupId?: string) => void;
};

export function AppRoutes({ breakpoint, onNavigate }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={onNavigate} />} />
      <Route path="/browse" element={<Browse onNavigate={onNavigate} breakpoint={breakpoint} />} />
      <Route
        path="/calendar"
        element={<Calendar onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="/map" element={<MapView onNavigate={onNavigate} breakpoint={breakpoint} />} />
      <Route
        path="/roadmap"
        element={<Roadmap onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="/saved" element={<Saved onNavigate={onNavigate} />} />
      <Route path="/my" element={<My onNavigate={onNavigate} breakpoint={breakpoint} />} />
      <Route path="/my/profile-edit" element={<ProfileEdit />} />
      <Route path="/my/notification-settings" element={<NotificationSettings />} />
      <Route
        path="/my/report-popup"
        element={<ReportPopup onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="/my/settings" element={<Settings />} />
      <Route path="/my/help" element={<Help />} />
      <Route
        path="/capsule"
        element={<Capsule onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route
        path="/detail/:popupId"
        element={<PopupDetail onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route
        path="/notifications"
        element={<Notifications onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="/search" element={<Search onNavigate={onNavigate} breakpoint={breakpoint} />} />
      <Route path="*" element={<NotFound onNavigate={onNavigate} breakpoint={breakpoint} />} />
    </Routes>
  );
}
