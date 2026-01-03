import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Search, Bell, Calendar, Map, User, Route as RouteIcon } from "lucide-react";
import LogoImg from "@/assets/logo.svg";
import { HOME_TRENDING_SENTINEL_ID, APPBAR_HEIGHT } from "@/components/appbar/constants/header";
import type { AppBarProps } from "@/components/appbar/types/appbar";
import { IconButton } from "@/components/appbar/parts/IconButton";
import type { ViewType } from "@/routes/routes";

export function HomeAppBar({ onNavigate, breakpoint }: AppBarProps) {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let raf: number | null = null;
    let cleanup: (() => void) | null = null;

    const setup = () => {
      if (cancelled) return;

      const sentinel = document.getElementById(HOME_TRENDING_SENTINEL_ID);
      const scroller = document.querySelector<HTMLElement>(".main-content");

      if (!sentinel || !scroller) {
        raf = requestAnimationFrame(setup);
        return;
      }

      const compute = () => {
        const top = sentinel.getBoundingClientRect().top;
        const next = top > APPBAR_HEIGHT;
        setIsTransparent((prev) => (prev === next ? prev : next));
      };

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          compute();
        });
      };

      requestAnimationFrame(compute);

      scroller.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      cleanup = () => {
        scroller.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    };

    setup();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  const headerStyle = useMemo<CSSProperties>(() => {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      minHeight: `${APPBAR_HEIGHT}px`,
      padding: "var(--space-4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "background 0.25s ease, border-color 0.25s ease",
      background: isTransparent ? "transparent" : "white",
      borderBottom: isTransparent ? "1px solid transparent" : "1px solid var(--color-gray-200)",
    };
  }, [isTransparent]);

  const isDesktop = breakpoint === "desktop";

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <img src={LogoImg} alt="Logo" style={{ width: "40px" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <button
          onClick={() => onNavigate("capsule")}
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-full)",
            background: "linear-gradient(135deg, #D9F95F 0%, #B8E64C 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(217, 249, 95, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(217, 249, 95, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(217, 249, 95, 0.3)";
          }}
          aria-label="캡슐 뽑기"
        >
          <span style={{ fontSize: "1.2rem" }}>🎁</span>
        </button>

        {isDesktop && (
          <>
            <IconButton ariaLabel="Calendar" onClick={() => onNavigate("calendar")}>
              <Calendar size={20} color="var(--color-text-secondary)" />
            </IconButton>

            <IconButton ariaLabel="Map" onClick={() => onNavigate("map" as ViewType)}>
              <Map size={20} color="var(--color-text-secondary)" />
            </IconButton>

            <IconButton ariaLabel="Roadmap" onClick={() => onNavigate("roadmap" as ViewType)}>
              <RouteIcon size={20} color="var(--color-text-secondary)" />
            </IconButton>

            <IconButton ariaLabel="My Page" onClick={() => onNavigate("my" as ViewType)}>
              <User size={20} color="var(--color-text-secondary)" />
            </IconButton>
          </>
        )}

        <IconButton ariaLabel="Search" onClick={() => onNavigate("search")}>
          <Search size={20} color="var(--color-text-secondary)" />
        </IconButton>

        <IconButton ariaLabel="Notifications" onClick={() => onNavigate("notifications")} hasDot>
          <Bell size={20} color="var(--color-text-secondary)" />
        </IconButton>
      </div>
    </header>
  );
}
