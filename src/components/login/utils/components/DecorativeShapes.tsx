export function DecorativeShapes() {
  return (
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
        d="M0 40 L0 100 L70 40 Z"
        fill="#FF7B6B"
        style={{ animation: "shapeFloatTL 6s ease-in-out infinite" }}
      />

      {/* Top Right Pencil Shape */}
      <g transform="translate(280, 20)">
        <rect
          x="0"
          y="20"
          width="90"
          height="120"
          rx="4"
          fill="#FFB3A7"
          style={{ animation: "shapeFloatTR 7s ease-in-out infinite" }}
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
        style={{ animation: "pathDraw 2s ease-out both" }}
      />
    </svg>
  );
}
