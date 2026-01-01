import { Navigate, Route, Routes } from "react-router-dom";
import type { ViewType } from "./routes";

import { Home } from "../components/Home";
import { Browse } from "../components/Browse";
import { Calendar } from "../components/Calendar";
import { MapView } from "../components/MapView";
import { Saved } from "../components/Saved";
import { My } from "../components/My";
import { PopupDetail } from "../components/PopupDetail";
import { Notifications } from "../components/Notifications";
import { Search } from "../components/Search";

type Breakpoint = "mobile" | "tablet" | "desktop";

type AppRoutesProps = {
  breakpoint: Breakpoint;
  onNavigate: (view: ViewType, popupId?: string) => void;
};

export function AppRoutes({ breakpoint, onNavigate }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route
        path="/browse"
        element={<Browse onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route
        path="/calendar"
        element={<Calendar onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route
        path="/map"
        element={<MapView onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="/saved" element={<Saved onNavigate={onNavigate} />} />
      <Route path="/my" element={<My />} />
      <Route
        path="/detail/:popupId"
        element={
          <PopupDetail onNavigate={onNavigate} breakpoint={breakpoint} />
        }
      />
      <Route
        path="/notifications"
        element={
          <Notifications onNavigate={onNavigate} breakpoint={breakpoint} />
        }
      />
      <Route
        path="/search"
        element={<Search onNavigate={onNavigate} breakpoint={breakpoint} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
