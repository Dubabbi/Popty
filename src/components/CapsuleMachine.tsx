interface CapsuleMachineSVGProps {
  mixing?: boolean;
  fallingCapsule?: number;
}

export function CapsuleMachineSVG({
  mixing = false,
  fallingCapsule = -1,
}: CapsuleMachineSVGProps = {}) {
  return (
    <svg
      viewBox="0 0 440 508"
      style={{
        width: "100%",
        maxWidth: 440,
        height: "auto",
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
      }}
    >
      <defs>
        {/* Gradients for Glass Dome */}
        <radialGradient id="glassGradient" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#b8d4ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#7585ff" stopOpacity="0.2" />
        </radialGradient>

        {/* Glass Highlight */}
        <radialGradient id="glassHighlight" cx="30%" cy="20%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#e8d4ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Base Gradient - Lavender to Mint */}
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8B5EA" />
          <stop offset="50%" stopColor="#D0CAED" />
          <stop offset="100%" stopColor="#B8E4EA" />
        </linearGradient>

        {/* Coin Slot Metallic Gradient */}
        <radialGradient id="coinSlotGradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#8A9BCF" />
          <stop offset="50%" stopColor="#6B7CB5" />
          <stop offset="100%" stopColor="#5A6BA0" />
        </radialGradient>

        {/* Capsule Gradients - More 3D */}
        <radialGradient id="capsuleSky" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#E8F4FF" />
          <stop offset="50%" stopColor="#A8D8FF" />
          <stop offset="100%" stopColor="#7FBFF0" />
        </radialGradient>

        <radialGradient id="capsulePink" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#FFE8F0" />
          <stop offset="50%" stopColor="#FFB8D8" />
          <stop offset="100%" stopColor="#F0A0C0" />
        </radialGradient>

        <radialGradient id="capsulePurple" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#F0E8FF" />
          <stop offset="50%" stopColor="#D8BFEB" />
          <stop offset="100%" stopColor="#C0A0E0" />
        </radialGradient>

        <radialGradient id="capsuleMint" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#E8FFF8" />
          <stop offset="50%" stopColor="#A8E8D8" />
          <stop offset="100%" stopColor="#81C7C2" />
        </radialGradient>

        <radialGradient id="capsuleYellow" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#FFFBE8" />
          <stop offset="50%" stopColor="#FFE8A8" />
          <stop offset="100%" stopColor="#F2D080" />
        </radialGradient>

        <radialGradient id="capsulePeach" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#FFF0E8" />
          <stop offset="50%" stopColor="#FFDBB8" />
          <stop offset="100%" stopColor="#FFB890" />
        </radialGradient>

        <radialGradient id="capsuleLavender" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#F0E8FF" />
          <stop offset="50%" stopColor="#D8C4FF" />
          <stop offset="100%" stopColor="#C0A8F0" />
        </radialGradient>

        {/* Stripe Patterns - Diagonal Wrap */}
        <pattern
          id="candyStripe1"
          patternUnits="userSpaceOnUse"
          width="30"
          height="30"
          patternTransform="rotate(-45)"
        >
          <rect width="30" height="30" fill="url(#capsulePink)" />
          <rect
            x="0"
            y="0"
            width="12"
            height="30"
            fill="#E8B5EB"
            opacity="0.6"
          />
        </pattern>

        <pattern
          id="candyStripe2"
          patternUnits="userSpaceOnUse"
          width="30"
          height="30"
          patternTransform="rotate(45)"
        >
          <rect width="30" height="30" fill="url(#capsuleLavender)" />
          <rect
            x="0"
            y="0"
            width="12"
            height="30"
            fill="#B8E8FF"
            opacity="0.6"
          />
        </pattern>

        <pattern
          id="candyStripe3"
          patternUnits="userSpaceOnUse"
          width="30"
          height="30"
          patternTransform="rotate(60)"
        >
          <rect width="30" height="30" fill="url(#capsuleMint)" />
          <rect
            x="0"
            y="0"
            width="12"
            height="30"
            fill="#FFE8B8"
            opacity="0.5"
          />
        </pattern>

        {/* Blur Filters */}
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        <filter id="mediumBlur">
          <feGaussianBlur stdDeviation="10" />
        </filter>

        <filter id="heavyBlur">
          <feGaussianBlur stdDeviation="20" />
        </filter>

        <filter id="capsuleShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>

        {/* Floating Animations */}
        <style>
          {`
            @keyframes capsuleFloat1 {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-3px, -5px) rotate(1deg); }
              50% { transform: translate(2px, -8px) rotate(-1deg); }
              75% { transform: translate(-2px, -4px) rotate(0.5deg); }
            }
            @keyframes capsuleFloat2 {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(4px, -6px) rotate(-1deg); }
              50% { transform: translate(-3px, -10px) rotate(1.5deg); }
              75% { transform: translate(3px, -5px) rotate(-0.5deg); }
            }
            @keyframes capsuleFloat3 {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-2px, -4px) rotate(0.5deg); }
              50% { transform: translate(3px, -7px) rotate(-1deg); }
              75% { transform: translate(-4px, -6px) rotate(1deg); }
            }
            @keyframes capsuleFloat4 {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(5px, -5px) rotate(-1.5deg); }
              50% { transform: translate(-4px, -9px) rotate(1deg); }
              75% { transform: translate(2px, -4px) rotate(-0.5deg); }
            }
            @keyframes capsuleFloat5 {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-4px, -7px) rotate(1deg); }
              50% { transform: translate(4px, -6px) rotate(-1.5deg); }
              75% { transform: translate(-3px, -5px) rotate(0.5deg); }
            }

            /* 믹싱 애니메이션 - 다같이 빙글빙글! */
            @keyframes capsulesSpinTogether {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            /* 떨어지는 애니메이션 */
            @keyframes capsuleFall {
              0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
              100% { transform: translate(0, 200px) rotate(180deg); opacity: 0; }
            }

            .capsule-anim-1 { animation: capsuleFloat1 6s ease-in-out infinite; }
            .capsule-anim-2 { animation: capsuleFloat2 7s ease-in-out infinite 0.5s; }
            .capsule-anim-3 { animation: capsuleFloat3 6.5s ease-in-out infinite 1s; }
            .capsule-anim-4 { animation: capsuleFloat4 7.5s ease-in-out infinite 1.5s; }
            .capsule-anim-5 { animation: capsuleFloat5 6.8s ease-in-out infinite 2s; }
            .capsule-anim-6 { animation: capsuleFloat1 7.2s ease-in-out infinite 0.8s; }
            .capsule-anim-7 { animation: capsuleFloat2 6.3s ease-in-out infinite 1.2s; }
            .capsule-anim-8 { animation: capsuleFloat3 7.8s ease-in-out infinite 0.3s; }
            .capsule-anim-9 { animation: capsuleFloat4 6.6s ease-in-out infinite 1.8s; }
            .capsule-anim-10 { animation: capsuleFloat5 7.4s ease-in-out infinite 0.6s; }
            .capsule-anim-11 { animation: capsuleFloat1 6.9s ease-in-out infinite 1.4s; }
            .capsule-anim-12 { animation: capsuleFloat2 7.6s ease-in-out infinite 2.2s; }
            .capsule-anim-13 { animation: capsuleFloat3 6.4s ease-in-out infinite 0.9s; }
            .capsule-anim-14 { animation: capsuleFloat4 7.1s ease-in-out infinite 1.6s; }

            /* 캡슐 그룹 회전 */
            .capsules-container.mixing {
              animation: capsulesSpinTogether 1s linear infinite;
              transform-origin: 220px 240px;
            }
          `}
        </style>
      </defs>

      {/* Background Bubbles */}
      <circle
        cx="360"
        cy="60"
        r="50"
        fill="url(#glassHighlight)"
        opacity="0.25"
        filter="url(#mediumBlur)"
      />
      <circle
        cx="380"
        cy="40"
        r="35"
        fill="#ffffff"
        opacity="0.12"
        filter="url(#softBlur)"
      />
      <circle
        cx="60"
        cy="100"
        r="40"
        fill="#ffffff"
        opacity="0.08"
        filter="url(#softBlur)"
      />

      {/* Machine Base Body - Much Lower */}
      <path
        d="M 150 380 L 290 380 L 310 480 L 130 480 Z"
        fill="url(#baseGradient)"
        opacity="0.98"
      />

      {/* Base Top Rim Light */}
      <ellipse
        cx="220"
        cy="380"
        rx="70"
        ry="6"
        fill="#ffffff"
        opacity="0.35"
        filter="url(#softBlur)"
      />

      {/* Base Metallic Strips */}
      <rect
        x="170"
        y="390"
        width="12"
        height="80"
        fill="#ffffff"
        opacity="0.18"
        filter="url(#softBlur)"
        rx="2"
      />
      <rect
        x="210"
        y="390"
        width="10"
        height="80"
        fill="#8A9BCF"
        opacity="0.25"
        filter="url(#softBlur)"
        rx="2"
      />
      <rect
        x="260"
        y="390"
        width="12"
        height="80"
        fill="#ffffff"
        opacity="0.18"
        filter="url(#softBlur)"
        rx="2"
      />

      {/* Base Shadow Gradient */}
      <linearGradient id="baseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
      </linearGradient>
      <path
        d="M 150 380 L 290 380 L 310 480 L 130 480 Z"
        fill="url(#baseShadow)"
      />

      {/* Glass Dome Container - Larger */}
      <ellipse
        cx="220"
        cy="240"
        rx="160"
        ry="155"
        fill="url(#glassGradient)"
        opacity="0.85"
      />

      {/* Glass Edge Refraction */}
      <ellipse
        cx="220"
        cy="240"
        rx="160"
        ry="155"
        fill="none"
        stroke="#9FB8FF"
        strokeWidth="3"
        opacity="0.35"
      />
      <ellipse
        cx="220"
        cy="240"
        rx="157"
        ry="152"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.25"
      />

      {/* All Capsules in one group */}
      <g
        className={`capsules-container ${mixing ? "mixing" : ""}`}
        filter="url(#capsuleShadow)"
      >
        {/* Capsules - Bottom Layer (Larger, More 3D) */}
        {/* Bottom Left - Mint */}
        <g
          className={`capsule-anim-1 ${fallingCapsule === 1 ? "capsule-falling" : ""}`}
        >
          <circle cx="160" cy="320" r="35" fill="url(#capsuleMint)" />
          <ellipse
            cx="145"
            cy="305"
            rx="12"
            ry="18"
            fill="#ffffff"
            opacity="0.75"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="170"
            cy="325"
            rx="8"
            ry="10"
            fill="#000000"
            opacity="0.12"
            filter="url(#softBlur)"
          />
          <path
            d="M 140 305 Q 145 310 140 320"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Bottom Right - Peach */}
        <g
          className={`capsule-anim-2 ${fallingCapsule === 2 ? "capsule-falling" : ""}`}
        >
          <circle cx="280" cy="325" r="32" fill="url(#capsulePeach)" />
          <ellipse
            cx="267"
            cy="312"
            rx="10"
            ry="16"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="288"
            cy="330"
            rx="7"
            ry="9"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 262 310 Q 267 315 262 323"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.35"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Bottom Center - Sky Blue */}
        <g
          className={`capsule-anim-3 ${fallingCapsule === 3 ? "capsule-falling" : ""}`}
        >
          <circle cx="220" cy="335" r="38" fill="url(#capsuleSky)" />
          <ellipse
            cx="205"
            cy="320"
            rx="14"
            ry="20"
            fill="#ffffff"
            opacity="0.8"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="230"
            cy="342"
            rx="10"
            ry="12"
            fill="#000000"
            opacity="0.15"
            filter="url(#softBlur)"
          />
          <path
            d="M 198 318 Q 205 325 198 335"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.45"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Capsules - Middle Layer */}
        {/* Middle Left - Pink */}
        <g
          className={`capsule-anim-4 ${fallingCapsule === 4 ? "capsule-falling" : ""}`}
        >
          <circle cx="140" cy="260" r="40" fill="url(#capsulePink)" />
          <ellipse
            cx="123"
            cy="243"
            rx="15"
            ry="22"
            fill="#ffffff"
            opacity="0.8"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="150"
            cy="270"
            rx="10"
            ry="13"
            fill="#000000"
            opacity="0.12"
            filter="url(#softBlur)"
          />
          <path
            d="M 115 240 Q 122 248 115 258"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Middle Right - Purple */}
        <g
          className={`capsule-anim-5 ${fallingCapsule === 5 ? "capsule-falling" : ""}`}
        >
          <circle cx="300" cy="265" r="37" fill="url(#capsulePurple)" />
          <ellipse
            cx="285"
            cy="250"
            rx="13"
            ry="20"
            fill="#ffffff"
            opacity="0.75"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="310"
            cy="273"
            rx="9"
            ry="11"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 278 248 Q 285 255 278 265"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Candy Stripe 1 - Center Left */}
        <g
          className={`capsule-anim-6 ${fallingCapsule === 6 ? "capsule-falling" : ""}`}
        >
          <circle cx="190" cy="270" r="42" fill="url(#candyStripe1)" />
          <ellipse
            cx="173"
            cy="253"
            rx="16"
            ry="23"
            fill="#ffffff"
            opacity="0.75"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="200"
            cy="280"
            rx="11"
            ry="14"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 165 250 Q 173 258 165 268"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Center - Yellow */}
        <g
          className={`capsule-anim-7 ${fallingCapsule === 7 ? "capsule-falling" : ""}`}
        >
          <circle cx="250" cy="280" r="35" fill="url(#capsuleYellow)" />
          <ellipse
            cx="237"
            cy="267"
            rx="12"
            ry="18"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="258"
            cy="287"
            rx="8"
            ry="10"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 230 265 Q 237 272 230 280"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Capsules - Top Layer */}
        {/* Top Left - Lavender */}
        <g
          className={`capsule-anim-8 ${fallingCapsule === 8 ? "capsule-falling" : ""}`}
        >
          <circle cx="160" cy="200" r="38" fill="url(#capsuleLavender)" />
          <ellipse
            cx="145"
            cy="185"
            rx="14"
            ry="21"
            fill="#ffffff"
            opacity="0.8"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="170"
            cy="210"
            rx="10"
            ry="12"
            fill="#000000"
            opacity="0.12"
            filter="url(#softBlur)"
          />
          <path
            d="M 138 183 Q 145 190 138 200"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Top Center - Large Pink */}
        <g
          className={`capsule-anim-9 ${fallingCapsule === 9 ? "capsule-falling" : ""}`}
        >
          <circle cx="220" cy="195" r="45" fill="url(#capsulePink)" />
          <ellipse
            cx="202"
            cy="177"
            rx="17"
            ry="25"
            fill="#ffffff"
            opacity="0.85"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="233"
            cy="207"
            rx="12"
            ry="15"
            fill="#000000"
            opacity="0.15"
            filter="url(#softBlur)"
          />
          <path
            d="M 193 173 Q 202 182 193 195"
            stroke="#ffffff"
            strokeWidth="3"
            opacity="0.55"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Top Right - Sky */}
        <g
          className={`capsule-anim-10 ${fallingCapsule === 10 ? "capsule-falling" : ""}`}
        >
          <circle cx="280" cy="205" r="40" fill="url(#capsuleSky)" />
          <ellipse
            cx="263"
            cy="188"
            rx="15"
            ry="22"
            fill="#ffffff"
            opacity="0.8"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="290"
            cy="215"
            rx="10"
            ry="13"
            fill="#000000"
            opacity="0.12"
            filter="url(#softBlur)"
          />
          <path
            d="M 255 185 Q 263 193 255 205"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Candy Stripe 2 - Top Center Left */}
        <g
          className={`capsule-anim-11 ${fallingCapsule === 11 ? "capsule-falling" : ""}`}
        >
          <circle cx="185" cy="165" r="35" fill="url(#candyStripe2)" />
          <ellipse
            cx="172"
            cy="152"
            rx="13"
            ry="19"
            fill="#ffffff"
            opacity="0.75"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="193"
            cy="173"
            rx="9"
            ry="11"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 165 150 Q 172 157 165 167"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.45"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Top Center Right - Mint */}
        <g
          className={`capsule-anim-12 ${fallingCapsule === 12 ? "capsule-falling" : ""}`}
        >
          <circle cx="255" cy="170" r="33" fill="url(#capsuleMint)" />
          <ellipse
            cx="243"
            cy="158"
            rx="11"
            ry="17"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="263"
            cy="178"
            rx="8"
            ry="10"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 237 156 Q 243 163 237 171"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Small Top Left - Peach */}
        <g
          className={`capsule-anim-13 ${fallingCapsule === 13 ? "capsule-falling" : ""}`}
        >
          <circle cx="135" cy="150" r="28" fill="url(#capsulePeach)" />
          <ellipse
            cx="125"
            cy="140"
            rx="9"
            ry="14"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="142"
            cy="157"
            rx="6"
            ry="8"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 120 138 Q 125 143 120 151"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Small Top Right - Yellow */}
        <g
          className={`capsule-anim-14 ${fallingCapsule === 14 ? "capsule-falling" : ""}`}
        >
          <circle cx="295" cy="155" r="25" fill="url(#capsuleYellow)" />
          <ellipse
            cx="287"
            cy="147"
            rx="8"
            ry="12"
            fill="#ffffff"
            opacity="0.65"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="300"
            cy="161"
            rx="5"
            ry="7"
            fill="#000000"
            opacity="0.08"
            filter="url(#softBlur)"
          />
          <path
            d="M 282 145 Q 287 150 282 157"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.35"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Candy Stripe 3 - Small Center */}
        <g
          className={`capsule-anim-1 ${fallingCapsule === 15 ? "capsule-falling" : ""}`}
        >
          <circle cx="220" cy="145" r="30" fill="url(#candyStripe3)" />
          <ellipse
            cx="210"
            cy="135"
            rx="10"
            ry="15"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="227"
            cy="152"
            rx="7"
            ry="9"
            fill="#000000"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <path
            d="M 204 133 Q 210 139 204 148"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Glass Dome Highlight - Large Arc */}
      <ellipse
        cx="170"
        cy="180"
        rx="100"
        ry="80"
        fill="url(#glassHighlight)"
        opacity="0.45"
        filter="url(#mediumBlur)"
      />

      {/* Glass Reflection Streak - Top Right */}
      <ellipse
        cx="310"
        cy="160"
        rx="18"
        ry="95"
        fill="#ffffff"
        opacity="0.22"
        filter="url(#softBlur)"
        transform="rotate(28 310 160)"
      />

      {/* Glass Sparkles */}
      <circle cx="260" cy="140" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="190" cy="130" r="2" fill="#ffffff" opacity="0.8" />
      <circle cx="290" cy="200" r="2.5" fill="#ffffff" opacity="0.7" />
      <circle cx="150" cy="230" r="2" fill="#ffffff" opacity="0.6" />
      <circle cx="250" cy="250" r="1.5" fill="#ffffff" opacity="0.5" />

      {/* Bottom Glass Edge Blur */}
      <ellipse
        cx="220"
        cy="350"
        rx="140"
        ry="35"
        fill="#b8d4ff"
        opacity="0.18"
        filter="url(#heavyBlur)"
      />

      {/* Coin Slot - Metallic Circle */}
      <circle cx="220" cy="430" r="45" fill="#5A6BA0" opacity="0.4" />
      <circle cx="220" cy="430" r="42" fill="url(#coinSlotGradient)" />

      {/* Coin Slot Outer Ring Highlight */}
      <circle
        cx="220"
        cy="430"
        r="42"
        fill="none"
        stroke="#A8B5D8"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <circle
        cx="220"
        cy="430"
        r="39"
        fill="none"
        stroke="#4A5580"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Coin Slot Center - Vertical Slit */}
      <rect
        x="215"
        y="418"
        width="10"
        height="24"
        rx="5"
        fill="#2A3560"
        opacity="0.9"
      />

      {/* Slot Inner Shadow & Highlight */}
      <rect
        x="216"
        y="419"
        width="8"
        height="22"
        rx="4"
        fill="#000000"
        opacity="0.4"
      />
      <rect
        x="216"
        y="419"
        width="3"
        height="10"
        rx="1.5"
        fill="#6B7CB5"
        opacity="0.4"
      />

      {/* Coin Slot Top Shine */}
      <ellipse
        cx="220"
        cy="418"
        rx="15"
        ry="8"
        fill="#A8B5D8"
        opacity="0.35"
        filter="url(#softBlur)"
      />

      {/* Coin Slot Shadow */}
      <ellipse
        cx="220"
        cy="437"
        rx="40"
        ry="10"
        fill="#000000"
        opacity="0.18"
        filter="url(#softBlur)"
      />
    </svg>
  );
}
