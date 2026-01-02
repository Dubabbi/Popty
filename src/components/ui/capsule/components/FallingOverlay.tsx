type Props = {
  fallingColor: string;
  capsuleColors: string[];
};

export function FallingOverlay({ fallingColor, capsuleColors }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.8)",
        zIndex: 100,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        style={{
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
          animation: "bounce 0.6s ease-out",
        }}
      >
        <defs>
          <radialGradient id="fallCapsuleSky" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#E8F4FF" />
            <stop offset="50%" stopColor="#A8D8FF" />
            <stop offset="100%" stopColor="#7FBFF0" />
          </radialGradient>

          <radialGradient id="fallCapsulePink" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#FFE8F0" />
            <stop offset="50%" stopColor="#FFB8D8" />
            <stop offset="100%" stopColor="#F0A0C0" />
          </radialGradient>

          <radialGradient id="fallCapsulePurple" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#F0E8FF" />
            <stop offset="50%" stopColor="#D8BFEB" />
            <stop offset="100%" stopColor="#C0A0E0" />
          </radialGradient>

          <radialGradient id="fallCapsuleMint" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#E8FFF8" />
            <stop offset="50%" stopColor="#A8E8D8" />
            <stop offset="100%" stopColor="#81C7C2" />
          </radialGradient>

          <radialGradient id="fallCapsuleYellow" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#FFFBE8" />
            <stop offset="50%" stopColor="#FFE8A8" />
            <stop offset="100%" stopColor="#F2D080" />
          </radialGradient>

          <radialGradient id="fallCapsulePeach" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#FFF0E8" />
            <stop offset="50%" stopColor="#FFDBB8" />
            <stop offset="100%" stopColor="#FFB890" />
          </radialGradient>

          <filter id="fallSoftBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <circle
          cx="70"
          cy="70"
          r="45"
          fill={
            fallingColor === capsuleColors[0]
              ? "url(#fallCapsulePink)"
              : fallingColor === capsuleColors[1]
                ? "url(#fallCapsuleSky)"
                : fallingColor === capsuleColors[2]
                  ? "url(#fallCapsuleMint)"
                  : fallingColor === capsuleColors[3]
                    ? "url(#fallCapsuleYellow)"
                    : fallingColor === capsuleColors[4]
                      ? "url(#fallCapsulePeach)"
                      : "url(#fallCapsulePurple)"
          }
        />

        <ellipse
          cx="55"
          cy="55"
          rx="16"
          ry="24"
          fill="#ffffff"
          opacity="0.8"
          filter="url(#fallSoftBlur)"
        />
        <ellipse
          cx="80"
          cy="80"
          rx="11"
          ry="14"
          fill="#000000"
          opacity="0.12"
          filter="url(#fallSoftBlur)"
        />
        <path
          d="M 45 53 Q 52 60 45 70"
          stroke="#ffffff"
          strokeWidth="2.5"
          opacity="0.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
