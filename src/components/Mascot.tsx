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
        {/* Main body - round soft shape */}
        <circle cx="50" cy="55" r="35" fill="#FFB3C1" />
        <circle cx="50" cy="55" r="35" fill="url(#mascot-gradient)" />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="mascot-gradient" x1="50" y1="20" x2="50" y2="90">
            <stop offset="0%" stopColor="#FFD4E5" />
            <stop offset="100%" stopColor="#FF8BA0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Calendar marking on body */}
        <rect x="38" y="45" width="24" height="20" rx="3" fill="white" opacity="0.8" />
        <rect x="38" y="45" width="24" height="6" rx="3" fill="#FF6B85" />
        <circle cx="44" cy="55" r="1.5" fill="#FF8BA0" />
        <circle cx="50" cy="55" r="1.5" fill="#FF8BA0" />
        <circle cx="56" cy="55" r="1.5" fill="#FF8BA0" />
        <circle cx="44" cy="60" r="1.5" fill="#FF8BA0" />
        <circle cx="50" cy="60" r="1.5" fill="#FF8BA0" />
        <circle cx="56" cy="60" r="1.5" fill="#FF8BA0" />

        {pose === "welcome" && (
          <>
            {/* Waving arm */}
            <ellipse cx="75" cy="50" rx="8" ry="12" fill="#FFB3C1" transform="rotate(-20 75 50)" />
            {/* Happy eyes */}
            <circle cx="42" cy="48" r="3" fill="#404040" />
            <circle cx="58" cy="48" r="3" fill="#404040" />
            {/* Smile */}
            <path
              d="M 40 58 Q 50 63 60 58"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Blush */}
            <circle cx="35" cy="58" r="4" fill="#FF6B85" opacity="0.3" />
            <circle cx="65" cy="58" r="4" fill="#FF6B85" opacity="0.3" />
          </>
        )}

        {pose === "recommend" && (
          <>
            {/* Pointing arm */}
            <ellipse cx="20" cy="45" rx="8" ry="12" fill="#FFB3C1" transform="rotate(-45 20 45)" />
            {/* Star eyes */}
            <path
              d="M 42 48 L 43 45 L 44 48 L 47 48 L 44 50 L 45 53 L 42 51 L 39 53 L 40 50 L 37 48 Z"
              fill="#FFD700"
            />
            <path
              d="M 58 48 L 59 45 L 60 48 L 63 48 L 60 50 L 61 53 L 58 51 L 55 53 L 56 50 L 53 48 Z"
              fill="#FFD700"
            />
            {/* Excited mouth */}
            <ellipse cx="50" cy="60" rx="6" ry="4" fill="#404040" opacity="0.8" />
          </>
        )}

        {pose === "explore" && (
          <>
            {/* Magnifying glass */}
            <circle cx="72" cy="40" r="8" fill="none" stroke="#6B8AFF" strokeWidth="2" />
            <line
              x1="66"
              y1="46"
              x2="60"
              y2="52"
              stroke="#6B8AFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Curious eyes */}
            <circle cx="40" cy="48" r="4" fill="#404040" />
            <circle cx="58" cy="48" r="4" fill="#404040" />
            <circle cx="41" cy="47" r="1.5" fill="white" />
            <circle cx="59" cy="47" r="1.5" fill="white" />
            {/* Small smile */}
            <path
              d="M 43 58 Q 50 61 57 58"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {pose === "reminder" && (
          <>
            {/* Bell */}
            <path
              d="M 73 35 Q 73 30 78 30 Q 83 30 83 35 L 83 42 Q 83 47 78 47 Q 73 47 73 42 Z"
              fill="#FFD700"
            />
            <circle cx="78" cy="49" r="2" fill="#FFD700" />
            <path d="M 76 32 L 80 32" stroke="#404040" strokeWidth="1" />
            {/* Happy closed eyes */}
            <path
              d="M 38 48 Q 42 50 46 48"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 54 48 Q 58 50 62 48"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Big smile */}
            <path
              d="M 38 58 Q 50 65 62 58"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Blush */}
            <circle cx="33" cy="58" r="5" fill="#FF6B85" opacity="0.3" />
            <circle cx="67" cy="58" r="5" fill="#FF6B85" opacity="0.3" />
          </>
        )}

        {pose === "empty" && (
          <>
            {/* Sad eyes */}
            <circle cx="42" cy="50" r="3" fill="#404040" />
            <circle cx="58" cy="50" r="3" fill="#404040" />
            <path
              d="M 38 48 Q 42 46 46 48"
              stroke="#404040"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 54 48 Q 58 46 62 48"
              stroke="#404040"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Sad mouth */}
            <path
              d="M 40 62 Q 50 58 60 62"
              stroke="#404040"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tear */}
            <ellipse cx="35" cy="55" rx="2" ry="3" fill="#60A5FA" opacity="0.6" />
          </>
        )}

        {pose === "success" && (
          <>
            {/* Sparkles */}
            <path
              d="M 25 30 L 26 27 L 27 30 L 30 30 L 27 31 L 28 34 L 25 32 L 22 34 L 23 31 L 20 30 Z"
              fill="#FFD700"
              filter="url(#glow)"
            />
            <path
              d="M 75 60 L 76 57 L 77 60 L 80 60 L 77 61 L 78 64 L 75 62 L 72 64 L 73 61 L 70 60 Z"
              fill="#FFD700"
              filter="url(#glow)"
            />
            {/* Star eyes */}
            <path
              d="M 42 48 L 43 45 L 44 48 L 47 48 L 44 50 L 45 53 L 42 51 L 39 53 L 40 50 L 37 48 Z"
              fill="#FFD700"
            />
            <path
              d="M 58 48 L 59 45 L 60 48 L 63 48 L 60 50 L 61 53 L 58 51 L 55 53 L 56 50 L 53 48 Z"
              fill="#FFD700"
            />
            {/* Happy open mouth */}
            <ellipse cx="50" cy="61" rx="8" ry="5" fill="#404040" opacity="0.8" />
            <ellipse cx="50" cy="61" rx="5" ry="3" fill="#FF6B85" />
            {/* Blush */}
            <circle cx="32" cy="58" r="5" fill="#FF6B85" opacity="0.4" />
            <circle cx="68" cy="58" r="5" fill="#FF6B85" opacity="0.4" />
          </>
        )}

        {/* Antenna with map pin */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="30"
          stroke="#FF8BA0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="18" r="4" fill="#FF6B85" />
        <circle cx="50" cy="18" r="2" fill="white" opacity="0.8" />
      </svg>
    </div>
  );
}

// Mascot names: Poppy, Cali, PinPin
// We'll use "Poppy" - the Pop-up Pal!
