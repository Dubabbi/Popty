import { Search, Bell, Calendar, Map, User, Route as RouteIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import type { ViewType } from "@/routes/routes";
import LogoImg from "@/assets/logo.svg";

interface AppBarProps {
  title: string;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  pathname?: string;
  breakpoint: "mobile" | "tablet" | "desktop";
}

const HOME_TRENDING_SENTINEL_ID = "home-trending-sentinel";
const APPBAR_HEIGHT = 73;

function getEffectivePath(explicit?: string) {
  if (explicit) return explicit;
  if (typeof window === "undefined") return "";
  const { hash, pathname } = window.location;
  if (hash && hash.startsWith("#/")) return hash.slice(1);
  return pathname || "";
}

function normalizePath(path: string) {
  return path.split("?")[0].split("#")[0].replace(/\/+$/, "");
}

function isMyRoute(path?: string) {
  const p = normalizePath(getEffectivePath(path));
  return /(^|\/)my(\/|$)/.test(p);
}

export function AppBar(props: AppBarProps) {
  const path = getEffectivePath(props.pathname);

  if (isMyRoute(path)) return <DefaultAppBar {...props} />;

  if (props.currentView === "capsule") return <CapsuleAppBar {...props} />;
  if (props.currentView === "home") return <HomeAppBar {...props} />;

  return <DefaultAppBar {...props} />;
}

function CapsuleAppBar({ onNavigate }: AppBarProps) {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let raf: number | null = null;
    let cleanup: (() => void) | null = null;

    const setup = () => {
      if (cancelled) return;

      const scroller = document.querySelector<HTMLElement>(".main-content");

      const compute = () => {
        const y = scroller
          ? scroller.scrollTop
          : window.scrollY || document.documentElement.scrollTop || 0;

        const next = y <= 12;
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

      if (scroller) {
        scroller.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
      }
      window.addEventListener("resize", onScroll);

      cleanup = () => {
        if (scroller) scroller.removeEventListener("scroll", onScroll);
        else window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    };

    const wait = () => {
      if (cancelled) return;
      const scroller = document.querySelector<HTMLElement>(".main-content");
      if (!scroller) {
        raf = requestAnimationFrame(wait);
        return;
      }
      setup();
    };

    wait();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  const headerStyle = useMemo<CSSProperties>(() => {
    const glassBg = isTransparent ? "none" : "rgba(255, 255, 255, 0.82)";

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
      transition: "background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease",
      background: glassBg,
      backdropFilter: isTransparent ? "none" : "blur(14px)",
      borderBottom: isTransparent ? "1px solid transparent" : "1px solid rgba(0,0,0,0.06)",
    };
  }, [isTransparent]);

  return (
    <header style={headerStyle}>
      <div
        onClick={() => onNavigate("home")}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <img src={LogoImg} alt="Logo" style={{ width: "40px" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <IconButton ariaLabel="Notifications" onClick={() => onNavigate("notifications")} hasDot>
          <Bell size={20} color="var(--color-text-secondary)" />
        </IconButton>
      </div>
    </header>
  );
}

function HomeAppBar({ onNavigate, breakpoint }: AppBarProps) {
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

function DefaultAppBar({ onNavigate }: AppBarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        borderBottom: "1px solid var(--color-gray-200)",
        padding: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: `${APPBAR_HEIGHT}px`,
      }}
    >
      <div
        onClick={() => onNavigate("home")}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <img src={LogoImg} alt="Logo" style={{ width: "40px" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <IconButton ariaLabel="Notifications" onClick={() => onNavigate("notifications")} hasDot>
          <Bell size={20} color="var(--color-text-secondary)" />
        </IconButton>
      </div>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  ariaLabel,
  hasDot,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  hasDot?: boolean;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-full)",
        background: "var(--color-gray-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-gray-200)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-gray-100)";
      }}
    >
      {children}
      {hasDot && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-error)",
            border: "2px solid white",
          }}
        />
      )}
    </button>
  );
}
