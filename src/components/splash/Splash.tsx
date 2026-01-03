import { useEffect, useState } from "react";

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-3)",
          animation: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        {/* Geometric Logo Icon */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {/* Main Triangle - Coral */}
          <path
            d="M10 10 L10 50 L40 10 Z"
            fill="#FF7B6B"
            style={{
              animation: "shapeFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
            }}
          />

          {/* Store Box - Lime */}
          <rect
            x="45"
            y="30"
            width="30"
            height="30"
            fill="#D9F95F"
            style={{
              animation: "shapeFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
            }}
          />

          {/* Accent Triangle - Light Coral */}
          <path
            d="M50 65 L65 65 L65 50 Z"
            fill="#FFB3A7"
            style={{
              animation: "shapeFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
            }}
          />
        </svg>

        {/* App Name - Korean Style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            animation: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
          }}
        >
          <span
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-0.03em",
            }}
          >
            팝업
          </span>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FF7B6B",
              marginTop: 4,
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            fontSize: "0.813rem",
            fontWeight: 500,
            color: "#666666",
            letterSpacing: "0.01em",
            animation: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
          }}
        >
          나만의 팝업 스토어 탐험
        </p>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shapeFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
