import { Navigate, Route, Routes, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useBreakpoint } from "./hooks/useBreakpoint";

import { Home } from "./components/Home";
import { Browse } from "./components/Browse";
import { Calendar } from "./components/Calendar";
import { MapView } from "./components/MapView";
import { Saved } from "./components/Saved";
import { My } from "./components/My";
import { PopupDetail } from "./components/PopupDetail";
import { Notifications } from "./components/Notifications";
import { Search } from "./components/Search";
import { AppBar } from "./components/AppBar";

export type ViewType =
  | "home"
  | "browse"
  | "calendar"
  | "map"
  | "saved"
  | "my"
  | "detail"
  | "notifications"
  | "search";

const VIEW_PATH: Record<Exclude<ViewType, "detail">, string> = {
  home: "/",
  browse: "/browse",
  calendar: "/calendar",
  map: "/map",
  saved: "/saved",
  my: "/my",
  notifications: "/notifications",
  search: "/search",
};

function toTitle(view: ViewType) {
  if (view === "home") return "";
  if (view === "detail") return "";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

function useCurrentView(pathname: string): ViewType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/detail/")) return "detail";
  const key = pathname.replace("/", "") as ViewType;
  const allowed: ViewType[] = [
    "browse",
    "calendar",
    "map",
    "saved",
    "my",
    "notifications",
    "search",
  ];
  return allowed.includes(key) ? key : "home";
}

export default function App() {
  const breakpoint = useBreakpoint();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentView = useCurrentView(pathname);
  const isDetail = matchPath("/detail/:popupId", pathname) !== null;

  const handleNavigate = (view: ViewType, popupId?: string) => {
    if (view === "detail") {
      if (!popupId) return;
      navigate(`/detail/${popupId}`);
      return;
    }
    navigate(VIEW_PATH[view]);
  };

  return (
    <div className="app-container">
      <div className={`viewport viewport-${breakpoint}`}>
        {!isDetail && (
          <AppBar
            title={toTitle(currentView)}
            currentView={currentView}
            onNavigate={handleNavigate}
          />
        )}

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/browse"
              element={<Browse onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/calendar"
              element={<Calendar onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/map"
              element={<MapView onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/saved"
              element={<Saved onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/my"
              element={<My onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />

            <Route
              path="/detail/:popupId"
              element={<PopupDetail onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />

            <Route
              path="/notifications"
              element={<Notifications onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route
              path="/search"
              element={<Search onNavigate={handleNavigate} breakpoint={breakpoint} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
