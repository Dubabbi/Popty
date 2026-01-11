import { useState } from "react";
import { signInWithKakao } from "@/apis/auth/kakaoLogin";
import { getErrorMessage } from "./utils/getErrorMessage";
import { DecorativeShapes } from "./utils/components/DecorativeShapes";
import { LogoTitle } from "./utils/components/LogoTitle";
import { LoginActions } from "./utils/components/LoginActions";
import { LoginKeyframes } from "./utils/components/LoginKeyframes";

interface LoginProps {
  onLogin?: () => void;
  breakpoint?: "mobile" | "tablet" | "desktop";
}

export function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      await signInWithKakao();
      onLogin?.();
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(getErrorMessage(err));
    } finally {
      // 리다이렉트가 안 일어난 케이스(에러 등) 대비
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Geometric Shapes */}
      <DecorativeShapes />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "var(--space-6)",
          paddingTop: 80,
        }}
      >
        <LogoTitle />
        <LoginActions loading={loading} errorMsg={errorMsg} onKakaoLogin={handleKakaoLogin} />
      </div>

      <LoginKeyframes />
    </div>
  );
}
