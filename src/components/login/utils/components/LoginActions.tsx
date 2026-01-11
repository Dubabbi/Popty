import { useSyncExternalStore } from "react";
import { KakaoLoginButton } from "./KakaoLoginButton";
import { AppleLoginButton } from "./AppleLoginButton";
import { TermsText } from "./TermsText";

type Props = {
  loading: boolean;
  errorMsg: string | null;
  onKakaoLogin: () => void;
};

function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;

  type MQLLegacy = MediaQueryList & {
    addListener?: (cb: () => void) => void;
    removeListener?: (cb: () => void) => void;
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

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

export function LoginActions({ loading, errorMsg, onKakaoLogin }: Props) {
  const isWide = useMinWidth(600);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        paddingBottom: "var(--space-8)",
        animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
      }}
    >
      {errorMsg && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            background: "#FFF2F0",
            color: "#D92D20",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {errorMsg}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: isWide ? "row" : "column",
          gap: "var(--space-3)",
        }}
      >
        <div style={{ flex: isWide ? 1 : undefined }}>
          <KakaoLoginButton loading={loading} onClick={onKakaoLogin} />
        </div>
        <div style={{ flex: isWide ? 1 : undefined }}>
          <AppleLoginButton />
        </div>
      </div>

      <TermsText />
    </div>
  );
}
