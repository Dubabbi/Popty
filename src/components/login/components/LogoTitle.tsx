import { useSyncExternalStore } from "react";
import LogoImg from "@/assets/logo.svg";

function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;
  type MQLLegacy = MediaQueryList & {
    addListener?: (cb: () => void) => void;
    removeListener?: (cb: () => void) => void;
  };

  const getSnapshot = () =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches;

  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};

    const mql = window.matchMedia(query) as MQLLegacy;
    const handler = () => onStoreChange();

    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener?.(handler);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener?.(handler);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function LogoTitle() {
  const isWide = useMinWidth(600);

  return (
    <div
      style={{
        marginBottom: "auto",
        animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        paddingLeft: isWide ? "48px" : 0,
      }}
    >
      <img src={LogoImg} width="48px" alt="Popty logo" />

      <h1
        style={{
          margin: 0,
          marginBottom: "var(--space-2)",
          fontSize: "2rem",
          fontWeight: 800,
          color: "#1A1A1A",
          letterSpacing: "-0.02em",
        }}
      >
        Popty!
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: "0.938rem",
          fontWeight: 500,
          color: "#666666",
          letterSpacing: "0.01em",
        }}
      >
        나만의 팝업 스토어 탐험
      </p>
    </div>
  );
}
