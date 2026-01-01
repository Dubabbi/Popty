interface MascotProps {
  pose: "welcome" | "recommend" | "explore" | "reminder" | "empty" | "success";
  size?: "small" | "medium" | "large";
}

export function Mascot({ pose, size = "medium" }: MascotProps) {
  const sizes = {
    small: 40,
    medium: 80,
    large: 120,
  };

  const dimension = sizes[size];

  // Poppy the Pop-up Pal - A round, friendly calendar-themed character
  return (
    <div className="mascot" style={{ width: dimension, height: dimension }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="pin-gradient" x1="50" y1="20" x2="50" y2="70">
            <stop offset="0%" stopColor="#E8FD7A" />
            <stop offset="100%" stopColor="#D9F95F" />
          </linearGradient>
          <linearGradient id="accent-gradient" x1="50" y1="30" x2="50" y2="50">
            <stop offset="0%" stopColor="#FF6B85" />
            <stop offset="100%" stopColor="#FF8BA0" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main pin shape - lime green */}
        <g filter="url(#shadow)">
          <circle cx="50" cy="42" r="20" fill="url(#pin-gradient)" />
          <path
            d="M 50 62 Q 50 70 50 75 L 50 75 Q 50 70 50 62"
            fill="url(#pin-gradient)"
          />
          <ellipse cx="50" cy="62" rx="8" ry="4" fill="url(#pin-gradient)" />
        </g>

        {/* Inner accent circle */}
        <circle cx="50" cy="42" r="12" fill="white" opacity="0.3" />

        {/* Center icon based on pose - no faces */}
        {pose === "welcome" && (
          <>
            {/* Sparkle/Star */}
            <path
              d="M 50 34 L 51.5 39 L 56.5 40 L 52 43.5 L 53 48.5 L 50 45.5 L 47 48.5 L 48 43.5 L 43.5 40 L 48.5 39 Z"
              fill="white"
              filter="url(#glow)"
            />
            <circle cx="50" cy="42" r="3" fill="white" opacity="0.8" />
          </>
        )}

        {pose === "recommend" && (
          <>
            {/* Thumbs up / Heart */}
            <path
              d="M 50 36 C 45 36 42 39 42 43 C 42 49 50 53 50 53 C 50 53 58 49 58 43 C 58 39 55 36 50 36 Z"
              fill="white"
            />
          </>
        )}

        {pose === "explore" && (
          <>
            {/* Search magnifying glass */}
            <circle
              cx="48"
              cy="40"
              r="6"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <line
              x1="52.5"
              y1="44.5"
              x2="57"
              y2="49"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        )}

        {pose === "reminder" && (
          <>
            {/* Calendar icon */}
            <rect x="43" y="37" width="14" height="12" rx="2" fill="white" />
            <rect
              x="43"
              y="37"
              width="14"
              height="3"
              rx="1"
              fill="url(#accent-gradient)"
            />
            <line
              x1="47"
              y1="35"
              x2="47"
              y2="38"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="53"
              y1="35"
              x2="53"
              y2="38"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="46" cy="43" r="1" fill="#FF8BA0" />
            <circle cx="50" cy="43" r="1" fill="#FF8BA0" />
            <circle cx="54" cy="43" r="1" fill="#FF8BA0" />
            <circle cx="46" cy="46" r="1" fill="#FF8BA0" />
            <circle cx="50" cy="46" r="1" fill="#FF8BA0" />
            <circle cx="54" cy="46" r="1" fill="#FF8BA0" />
          </>
        )}

        {pose === "empty" && (
          <>
            {/* Question mark */}
            <path
              d="M 47 37 Q 47 34 50 34 Q 53 34 53 37 Q 53 39 50 40.5 L 50 43"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="50" cy="47" r="1.5" fill="white" />
          </>
        )}

        {pose === "success" && (
          <>
            {/* Checkmark in circle */}
            <circle cx="50" cy="42" r="9" fill="white" />
            <path
              d="M 45 42 L 48.5 46 L 56 38"
              stroke="url(#accent-gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sparkles around */}
            <circle
              cx="35"
              cy="35"
              r="1.5"
              fill="#FFD700"
              filter="url(#glow)"
            />
            <circle
              cx="65"
              cy="40"
              r="1.5"
              fill="#FFD700"
              filter="url(#glow)"
            />
            <path
              d="M 68 32 L 69 29 L 70 32 L 73 32 L 70 33 L 71 36 L 68 34 L 65 36 L 66 33 L 63 32 Z"
              fill="#FFD700"
              filter="url(#glow)"
            />
          </>
        )}

        {/* Bottom shadow */}
        <ellipse cx="50" cy="77" rx="10" ry="3" fill="#000000" opacity="0.1" />
      </svg>
    </div>
  );
}
