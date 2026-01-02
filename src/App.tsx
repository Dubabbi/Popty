import { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { AppBar } from "@/components/AppBar";
import { ScrollToTopFab } from "@/components/scroll-to-top/ScrollToTopFab";
import { AppRoutes } from "@/routes/AppRoutes";
import { DynamicPopup } from "@/components/ui/popup-modal/DynamicPopup";
import { Confetti } from "@/components/ui/popup-modal/Confetti";
import { BottomNav } from "@/components/BottomNav";
import {
  VIEW_PATH,
  getCurrentView,
  toTitle,
  type ViewType,
} from "@/routes/routes";

export default function App() {
  const breakpoint = useBreakpoint();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentView = getCurrentView(pathname);
  const isDetail = matchPath("/detail/:popupId", pathname) !== null;
  const [showDynamic, setshowDynamic] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const handleNavigate = (view: ViewType, popupId?: string) => {
    if (view === "detail") {
      if (!popupId) return;
      navigate(`/detail/${popupId}`);
      return;
    }
    navigate(VIEW_PATH[view]);
  };
  const handleAllowPopup = () => {
    setShowConfetti(true);
    setshowDynamic(false);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };
  return (
    <div className="app-container scrollbar-hide">
      <div
        style={{ paddingBottom: "90px" }}
        className={`viewport viewport-${breakpoint}`}
      >
        {!isDetail && (
          <AppBar
            title={toTitle(currentView)}
            currentView={currentView}
            onNavigate={handleNavigate}
            breakpoint={breakpoint}
          />
        )}

        <main className="main-content scrollbar-hide">
          <AppRoutes breakpoint={breakpoint} onNavigate={handleNavigate} />
        </main>
        <ScrollToTopFab scrollSelector=".main-content" />
        {showDynamic && <DynamicPopup onAllow={handleAllowPopup} />}

        {showConfetti && <Confetti />}
        {currentView !== "detail" && breakpoint !== "desktop" && (
          <BottomNav currentView={currentView} onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}
