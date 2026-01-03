import { matchPath, useLocation } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { AppBar } from "@/components/appbar";
import { ScrollToTopFab } from "@/components/scroll-to-top/ScrollToTopFab";
import { AppRoutes } from "@/routes/AppRoutes";
import { BottomNav } from "@/components/BottomNav";
import { VIEW_PATH, getCurrentView, toTitle } from "@/routes/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { PopupGate } from "@/components/ui/popup-modal/PopupGate";
import { AppErrorBoundary } from "@/components/ui/error/AppErrorBoundary";

export default function App() {
  const breakpoint = useBreakpoint();
  const { pathname } = useLocation();
  const { onNavigate } = useAppNavigation();

  const currentView = getCurrentView(pathname);
  const isDetail = matchPath("/detail/:popupId", pathname) !== null;

  const viewPaths = Object.values(VIEW_PATH) as readonly string[];
  const isKnownRoute = pathname === "/" || isDetail || viewPaths.includes(pathname);

  const isNotFound = !isKnownRoute;

  const showBottomNav = breakpoint !== "desktop" && !isNotFound && currentView !== "detail";

  return (
    <div className="app-container scrollbar-hide">
      <div
        style={showBottomNav ? { paddingBottom: "90px" } : undefined}
        className={`viewport viewport-${breakpoint}`}
      >
        {!isDetail && !isNotFound && (
          <AppBar
            title={toTitle(currentView)}
            currentView={currentView}
            onNavigate={onNavigate}
            breakpoint={breakpoint}
          />
        )}

        <main className="main-content scrollbar-hide">
          <AppErrorBoundary key={pathname} onGoHome={() => onNavigate("home")}>
            <AppRoutes breakpoint={breakpoint} onNavigate={onNavigate} />
          </AppErrorBoundary>
        </main>

        <ScrollToTopFab scrollSelector=".main-content" />
        <PopupGate />

        {showBottomNav && <BottomNav currentView={currentView} onNavigate={onNavigate} />}
      </div>
    </div>
  );
}
