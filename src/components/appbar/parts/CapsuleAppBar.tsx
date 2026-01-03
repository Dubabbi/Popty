import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Bell } from "lucide-react";
import LogoImg from "@/assets/logo.svg";
import { APPBAR_HEIGHT } from "../constants/header";
import type { AppBarProps } from "../types/appbar";
import { IconButton } from "./IconButton";

export function CapsuleAppBar({ onNavigate }: AppBarProps) {
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
