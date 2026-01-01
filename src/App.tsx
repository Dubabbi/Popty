import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { AppBar } from "./components/AppBar";

import { AppRoutes } from "./routes/AppRoutes";
import {
  VIEW_PATH,
  getCurrentView,
  toTitle,
  type ViewType,
} from "./routes/routes";

export default function App() {
  const breakpoint = useBreakpoint();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentView = getCurrentView(pathname);
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
          <AppRoutes breakpoint={breakpoint} onNavigate={handleNavigate} />
        </main>
      </div>
    </div>
  );
}
