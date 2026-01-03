interface LoginProps {
  onLogin: () => void;
  breakpoint?: "mobile" | "tablet" | "desktop";
}

export function Login({ onLogin }: LoginProps) {
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
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 390 844"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top Left Triangle */}
        <path
          d="M0 80 L0 150 L70 80 Z"
          fill="#FF7B6B"
          style={{
            animation: "shapeFloatTL 6s ease-in-out infinite",
          }}
        />

        {/* Top Right Pencil Shape */}
        <g transform="translate(280, 80)">
          <rect
            x="0"
            y="20"
            width="90"
            height="120"
            rx="4"
            fill="#FFB3A7"
            style={{
              animation: "shapeFloatTR 7s ease-in-out infinite",
            }}
          />
          <path d="M 20,20 L 45,0 L 70,20 Z" fill="#FF7B6B" />
        </g>

        {/* Middle Left Pinwheel */}
        <g transform="translate(50, 380)">
          <path d="M 0,-20 L -20,0 L 0,5 Z" fill="#FFD4D4" opacity="0.8" />
          <path d="M 0,-20 L 20,0 L 0,5 Z" fill="#FFB3A7" opacity="0.8" />
          <path d="M 0,20 L -20,0 L 0,-5 Z" fill="#FFDBDB" opacity="0.8" />
          <path d="M 0,20 L 20,0 L 0,-5 Z" fill="#FFC4C4" opacity="0.8" />
          <circle cx="0" cy="0" r="4" fill="white" />
          <g style={{ animation: "rotate 12s linear infinite", transformOrigin: "center" }}>
            <path d="M 0,-20 L -20,0 L 0,5 Z" fill="#FFD4D4" opacity="0.6" />
            <path d="M 0,-20 L 20,0 L 0,5 Z" fill="#FFB3A7" opacity="0.6" />
            <path d="M 0,20 L -20,0 L 0,-5 Z" fill="#FFDBDB" opacity="0.6" />
            <path d="M 0,20 L 20,0 L 0,-5 Z" fill="#FFC4C4" opacity="0.6" />
          </g>
        </g>

        {/* Bottom Left Pinwheel */}
        <g transform="translate(40, 550)">
          <path d="M 0,-15 L -15,0 L 0,4 Z" fill="#FFE5CC" opacity="0.7" />
          <path d="M 0,-15 L 15,0 L 0,4 Z" fill="#FFC4A7" opacity="0.7" />
          <path d="M 0,15 L -15,0 L 0,-4 Z" fill="#FFEEDD" opacity="0.7" />
          <path d="M 0,15 L 15,0 L 0,-4 Z" fill="#FFD4B8" opacity="0.7" />
          <circle cx="0" cy="0" r="3" fill="white" />
          <g style={{ animation: "rotate 10s linear infinite reverse", transformOrigin: "center" }}>
            <path d="M 0,-15 L -15,0 L 0,4 Z" fill="#FFE5CC" opacity="0.5" />
            <path d="M 0,-15 L 15,0 L 0,4 Z" fill="#FFC4A7" opacity="0.5" />
            <path d="M 0,15 L -15,0 L 0,-4 Z" fill="#FFEEDD" opacity="0.5" />
            <path d="M 0,15 L 15,0 L 0,-4 Z" fill="#FFD4B8" opacity="0.5" />
          </g>
        </g>

        {/* Bottom Right Triangle */}
        <g transform="translate(280, 600)">
          <path d="M 0,0 L 60,0 L 30,50 Z" fill="#FF7B6B" opacity="0.9" />
          <path d="M 15,50 L 45,50 L 30,15 Z" fill="#FFB3A7" opacity="0.8" />
        </g>

        {/* Right Middle Shape */}
        <g transform="translate(320, 450)">
          <path d="M 0,0 L 50,10 L 45,30 L 5,25 Z" fill="#FFD4B8" opacity="0.7" />
        </g>

        {/* Curved Line */}
        <path
          d="M -50,380 Q 100,450 200,400 T 450,480"
          stroke="#FF7B6B"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
          style={{
            animation: "pathDraw 2s ease-out both",
          }}
        />
      </svg>

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
        {/* Logo & Title */}
        <div
          style={{
            marginBottom: "auto",
            animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Small Logo Icon */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            style={{ marginBottom: "var(--space-3)" }}
          >
            <path d="M6 6 L6 30 L24 6 Z" fill="#FF7B6B" />
            <rect x="27" y="18" width="18" height="18" fill="#D9F95F" />
            <path d="M30 39 L39 39 L39 30 Z" fill="#FFB3A7" />
          </svg>

          <h1
            style={{
              margin: 0,
              marginBottom: "var(--space-2)",
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            팝업
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

        {/* Login Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            paddingBottom: "var(--space-8)",
            animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
          }}
        >
          {/* Kakao Login */}
          <button
            onClick={onLogin}
            style={{
              width: "100%",
              height: 56,
              background: "#FEE500",
              border: "none",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(254, 229, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.477 0 0 3.71 0 8.29c0 2.847 1.883 5.343 4.7 6.753-.195.705-.737 2.67-.847 3.086-.138.528.194.521.41.378.17-.113 2.743-1.87 3.776-2.574.648.088 1.315.136 1.993.136 5.523 0 10-3.71 10-8.29C20 3.71 15.523 0 10 0z"
                fill="#000000"
                fillOpacity="0.9"
              />
            </svg>
            <span
              style={{
                fontSize: "0.938rem",
                fontWeight: 700,
                color: "#000000",
                opacity: 0.85,
              }}
            >
              카카오로 시작하기
            </span>
          </button>

          {/* Apple Login */}
          <button
            onClick={onLogin}
            style={{
              width: "100%",
              height: 56,
              background: "#000000",
              border: "none",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.928 17.067c-.784 1.125-1.644 2.236-2.959 2.258-1.293.022-1.712-.766-3.192-.766-1.48 0-1.943.744-3.17.788-1.272.044-2.261-1.21-3.055-2.33C1.73 14.287.616 9.761 2.481 6.673c.925-1.534 2.581-2.506 4.378-2.528 1.227-.022 2.387.827 3.137.827.749 0 2.155-1.022 3.633-.872.619.026 2.356.25 3.471 1.884-.09.056-2.073 1.21-2.051 3.613.022 2.866 2.513 3.827 2.535 3.838-.022.056-.396 1.355-1.305 2.688l-.351-.056zm-2.994-14.4c.661-.799 1.105-1.907 0.984-3.012-.95.039-2.1.633-2.783 1.432-.613.71-1.15 1.845-1.006 2.933 1.062.083 2.146-.538 2.805-1.354z"
                fill="white"
              />
            </svg>
            <span
              style={{
                fontSize: "0.938rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Apple로 시작하기
            </span>
          </button>

          {/* Terms */}
          <p
            style={{
              margin: 0,
              marginTop: "var(--space-2)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#999999",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            로그인 시{" "}
            <span style={{ textDecoration: "underline", color: "#666666" }}>이용약관</span> 및{" "}
            <span style={{ textDecoration: "underline", color: "#666666" }}>개인정보처리방침</span>
            에 동의하게 됩니다
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shapeFloatTL {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, 15px);
          }
        }

        @keyframes shapeFloatTR {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pathDraw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
