import { useEffect, useMemo, useRef, useState } from "react";
import { popupsData } from "@/data/popups";
import { Sparkles, Gift } from "lucide-react";
import { CapsuleMachineSVG } from "@/components/CapsuleMachine";
import type {
  CapsuleMascot,
  CapsuleProps,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";
import type { BubbleBg, StarBg } from "@/components/ui/capsule/types/capsule";

import { mascots } from "@/components/ui/capsule/types/capsule";

import {
  capsuleColors,
  messages,
  categories,
} from "@/components/ui/capsule/constants/capsule";

import { randFloat, randInt } from "@/components/ui/capsule/utils/capsule";

export function Capsule({ onNavigate, breakpoint }: CapsuleProps) {
  const [tickets, setTickets] = useState(5);
  const [todayPulls, setTodayPulls] = useState(3);
  const maxDailyPulls = 3;

  const [phase, setPhase] = useState<
    "lobby" | "pulling" | "falling" | "reveal" | "result"
  >("lobby");
  const [currentResult, setCurrentResult] = useState<CapsuleResult | null>(
    null,
  );
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);
  const [collection, setCollection] = useState<string[]>([
    "ganadi",
    "poppy",
    "lucky",
  ]);

  const [showProbability, setShowProbability] = useState(false);
  const [isMixing, setIsMixing] = useState(false);
  const [fallingCapsule, setFallingCapsule] = useState(-1);
  const [fallingColor, setFallingColor] = useState("");

  const rngRef = useRef<number>(0x1234abcd);

  useEffect(() => {
    try {
      const c = globalThis.crypto;
      if (c && "getRandomValues" in c) {
        const buf = new Uint32Array(1);
        c.getRandomValues(buf);
        rngRef.current = buf[0] || 0x1234abcd;
      }
    } catch {
      //
    }
  }, []);

  const randIntFromRef = (min: number, max: number) => {
    const out = randInt(rngRef.current, min, max);
    rngRef.current = out.seed;
    return out.value;
  };
  const shuffleWithRef = <T,>(arr: T[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = randIntFromRef(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const bg = useMemo(() => {
    type BubbleAcc = { seed: number; list: BubbleBg[] };
    type StarAcc = { seed: number; list: StarBg[] };

    const bubbleRes = Array.from({ length: 30 }, (_, i) => i).reduce<BubbleAcc>(
      (acc) => {
        const r1 = randFloat(acc.seed, 100, 250);
        const r2 = randFloat(r1.seed, 100, 250);
        const r3 = randFloat(r2.seed, 0, 100);
        const r4 = randFloat(r3.seed, 0, 100);
        const r5 = randFloat(r4.seed, 15, 30);
        const r6 = randFloat(r5.seed, 0, 5);

        const bubble: BubbleBg = {
          w: r1.value,
          h: r2.value,
          left: r3.value,
          top: r4.value,
          duration: r5.value,
          delay: r6.value,
        };

        return { seed: r6.seed, list: [...acc.list, bubble] };
      },
      { seed: 0x9e3779b9, list: [] },
    );

    const starRes = Array.from({ length: 50 }, (_, i) => i).reduce<StarAcc>(
      (acc) => {
        const r1 = randFloat(acc.seed, 0, 100);
        const r2 = randFloat(r1.seed, 0, 100);
        const r3 = randFloat(r2.seed, 0.3, 0.8);
        const r4 = randFloat(r3.seed, 2, 5);
        const r5 = randFloat(r4.seed, 0, 2);

        const star: StarBg = {
          left: r1.value,
          top: r2.value,
          opacity: r3.value,
          duration: r4.value,
          delay: r5.value,
        };

        return { seed: r5.seed, list: [...acc.list, star] };
      },
      { seed: bubbleRes.seed, list: [] },
    );

    return { bubbles: bubbleRes.list, stars: starRes.list };
  }, []);

  const handlePull = () => {
    if (todayPulls <= 0 || tickets <= 0) return;

    const randomCapsule = randIntFromRef(1, 15);

    const capsuleColorMap: Record<number, string> = {
      1: capsuleColors[2], // Mint
      2: capsuleColors[4], // Peach
      3: capsuleColors[1], // Sky
      4: capsuleColors[0], // Pink
      5: capsuleColors[5], // Purple
      6: capsuleColors[0], // Candy Stripe Pink
      7: capsuleColors[3], // Yellow
      8: capsuleColors[5], // Lavender
      9: capsuleColors[0], // Large Pink
      10: capsuleColors[1], // Sky
      11: capsuleColors[5], // Candy Stripe Lavender
      12: capsuleColors[2], // Mint
      13: capsuleColors[4], // Peach
      14: capsuleColors[3], // Yellow
      15: capsuleColors[2], // Candy Stripe Mint
    };
    const selectedColor = capsuleColorMap[randomCapsule] || capsuleColors[0];
    setFallingColor(selectedColor);

    setIsMixing(true);

    setTimeout(() => {
      setIsMixing(false);
      setFallingCapsule(randomCapsule);
      setPhase("falling");
    }, 1200);

    setTimeout(() => setPhase("reveal"), 2000);
    setTimeout(() => {
      const result = generateResult();
      setCurrentResult(result);
      setPhase("result");
      setTickets((prev) => prev - 1);
      setTodayPulls((prev) => prev - 1);

      if (!collection.includes(result.mascot)) {
        setCollection((prev) => [...prev, result.mascot]);
      }

      setFallingCapsule(-1);
    }, 2500);
  };

  // 랜덤 결과 생성
  const generateResult = (): CapsuleResult => {
    const mascotKeys = Object.keys(mascots) as CapsuleMascot[];
    const randomMascot = mascotKeys[randIntFromRef(0, mascotKeys.length - 1)];
    const mascotData = mascots[randomMascot];

    const randomCategory = categories[randIntFromRef(0, categories.length - 1)];

    const categoryPopups = popupsData.filter(
      (p) => p.category === randomCategory,
    );

    const selectedPopups = shuffleWithRef(categoryPopups)
      .slice(0, 3)
      .map((p) => p.id);

    const randomMessage = messages[randIntFromRef(0, messages.length - 1)];

    return {
      mascot: randomMascot,
      mascotName: mascotData.name,
      message: randomMessage,
      popups: selectedPopups.length > 0 ? selectedPopups : ["1", "2", "3"],
      color: mascotData.color,
      gradient: mascotData.gradient,
    };
  };

  // 다시 뽑기
  const handleReset = () => {
    setPhase("lobby");
    setCurrentResult(null);
    setSelectedPopup(null);
  };

  // 카드 선택
  const handleCardSelect = (popupId: string) => {
    setSelectedPopup(popupId);
    setTimeout(() => {
      onNavigate("detail", popupId);
      handleReset();
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        background:
          "linear-gradient(180deg, #6B8AFF 0%, #8BA3FF 50%, #A3B9FF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        {bg.bubbles.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: b.w,
              height: b.h,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${capsuleColors[i % capsuleColors.length]}60 0%, ${capsuleColors[i % capsuleColors.length]}20 50%, transparent 70%)`,
              left: `${b.left}%`,
              top: `${b.top}%`,
              filter: "blur(50px)",
              animation: `float ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {/* Stars */}
        {bg.stars.map((st, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: "absolute",
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "white",
              left: `${st.left}%`,
              top: `${st.top}%`,
              opacity: st.opacity,
              animation: `pulse ${st.duration}s ease-in-out infinite`,
              animationDelay: `${st.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "var(--space-6)",
          minHeight: "100vh",
        }}
      >
        {phase === "lobby" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "var(--space-2)",
                }}
              >
                🎰
              </div>
              <h1
                style={{
                  color: "white",
                  marginBottom: "var(--space-2)",
                  textShadow: "0 0 20px rgba(255,255,255,0.3)",
                }}
              >
                오늘의 팝업 캡슐
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.95rem",
                }}
              >
                운명처럼 만나는 팝업스토어
              </p>
            </div>

            {/* Tickets & Stats */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-3) var(--space-5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <Gift size={20} color="#D9F95F" />
                <span style={{ color: "white" }}>티켓 {tickets}개</span>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-3) var(--space-5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <Sparkles size={20} color="#FF8BA0" />
                <span style={{ color: "white" }}>
                  오늘 {todayPulls}/{maxDailyPulls}회
                </span>
              </div>

              <button
                onClick={() => setShowProbability(!showProbability)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-3) var(--space-5)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                확률 보기
              </button>
            </div>

            {/* Probability Modal */}
            {showProbability && (
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-5)",
                  animation: "slideUp 0.3s ease-out",
                }}
              >
                <h3 style={{ color: "white", marginBottom: "var(--space-4)" }}>
                  마스코트 확률
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  {Object.entries(mascots).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span>
                        {value.emoji} {value.name}
                      </span>
                      <span style={{ color: value.color }}>16.7%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capsule Machine */}
            <div
              style={{
                position: "relative",
                margin: "0 auto",
                width: "100%",
                maxWidth: 440,
                height: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: "var(--space-4)",
              }}
            >
              <CapsuleMachineSVG
                mixing={isMixing}
                fallingCapsule={fallingCapsule}
              />
            </div>

            {/* Pull Buttons */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-4)",
                width: "100%",
                maxWidth: 440,
                margin: "0 auto",
                marginTop: "var(--space-6)",
              }}
            >
              <button
                onClick={handlePull}
                disabled={todayPulls <= 0 || tickets <= 0}
                style={{
                  flex: 1,
                  background:
                    todayPulls > 0 && tickets > 0
                      ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)"
                      : "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-5)",
                  cursor:
                    todayPulls > 0 && tickets > 0 ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  boxShadow:
                    todayPulls > 0 && tickets > 0
                      ? "0 8px 20px rgba(0,0,0,0.15)"
                      : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
                onMouseDown={(e) => {
                  if (todayPulls > 0 && tickets > 0) {
                    e.currentTarget.style.transform = "scale(0.96)";
                  }
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div style={{ fontSize: "2rem" }}>💎</div>
                <span
                  style={{
                    color:
                      todayPulls > 0 && tickets > 0
                        ? "#6B8AFF"
                        : "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                  }}
                >
                  1회 뽑기
                </span>
              </button>

              <button
                disabled={tickets < 10}
                style={{
                  flex: 1,
                  background:
                    tickets >= 10
                      ? "linear-gradient(135deg, #7FBFF0 0%, #6B8AFF 100%)"
                      : "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-5)",
                  cursor: tickets >= 10 ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  boxShadow:
                    tickets >= 10 ? "0 8px 20px rgba(107,138,255,0.3)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
                onMouseDown={(e) => {
                  if (tickets >= 10) {
                    e.currentTarget.style.transform = "scale(0.96)";
                  }
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div style={{ fontSize: "2rem" }}>💫</div>
                <span
                  style={{
                    color: tickets >= 10 ? "white" : "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                  }}
                >
                  10회 뽑기
                </span>
              </button>
            </div>

            {/* Collection Preview */}
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-5)",
                maxWidth: 440,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-4)",
                }}
              >
                <h3 style={{ color: "white" }}>나의 컬렉션</h3>
                <span
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}
                >
                  {collection.length}/6
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: "var(--space-3)",
                }}
              >
                {(Object.keys(mascots) as CapsuleMascot[]).map((mascotKey) => {
                  const isCollected = collection.includes(mascotKey);
                  const mascot = mascots[mascotKey];
                  return (
                    <div
                      key={mascotKey}
                      style={{
                        aspectRatio: "1",
                        background: isCollected
                          ? mascot.gradient
                          : "rgba(255,255,255,0.1)",
                        borderRadius: "var(--radius-lg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.8rem",
                        border: "2px solid rgba(255,255,255,0.2)",
                        boxShadow: isCollected
                          ? `0 4px 12px ${mascot.color}40`
                          : "none",
                        filter: isCollected
                          ? "none"
                          : "grayscale(1) opacity(0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isCollected ? mascot.emoji : "?"}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Pulling Animation */}
        {phase === "pulling" && (
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
            <div
              style={{ fontSize: "4rem", animation: "spin 1s linear infinite" }}
            >
              🎰
            </div>
          </div>
        )}

        {/* Falling Capsule */}
        {phase === "falling" && (
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
        )}

        {/* Reveal Animation */}
        {phase === "reveal" && currentResult && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.9)",
              zIndex: 100,
              animation: "fadeIn 0.3s ease-out",
              gap: "var(--space-6)",
            }}
          >
            <div
              style={{
                position: "relative",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              <div
                style={{
                  fontSize: "8rem",
                  filter: "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
                  animation: "float 2s ease-in-out infinite",
                }}
              >
                {mascots[currentResult.mascot].emoji}
              </div>

              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 8,
                    height: 8,
                    background: currentResult.color,
                    borderRadius: "50%",
                    animation: `particle ${1 + (i % 4) * 0.25}s ease-out forwards`,
                    animationDelay: `${i * 0.05}s`,
                    transform: `rotate(${i * 30}deg) translateY(-100px)`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                animation: "slideUp 0.5s ease-out 0.3s backwards",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "2rem",
                  marginBottom: "var(--space-2)",
                  textShadow: `0 0 20px ${currentResult.color}`,
                }}
              >
                {currentResult.mascotName} 등장!
              </h2>
              <p
                style={{
                  color: currentResult.color,
                  fontSize: "1.1rem",
                }}
              >
                ✨ {currentResult.message}
              </p>
            </div>
          </div>
        )}

        {/* Result Cards */}
        {phase === "result" && currentResult && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {/* Header */}
            <div
              style={{
                textAlign: "center",
                padding: "var(--space-5)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "var(--space-2)" }}>
                {mascots[currentResult.mascot].emoji}
              </div>
              <h2 style={{ color: "white", marginBottom: "var(--space-2)" }}>
                {currentResult.mascotName}가 골라준 3곳
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                카드를 선택하면 상세 정보를 볼 수 있어요!
              </p>
            </div>

            {/* Popup Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  breakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)",
                gap: "var(--space-4)",
              }}
            >
              {currentResult.popups.map((popupId, index) => {
                const popup = popupsData.find((p) => p.id === popupId);
                if (!popup) return null;

                const isSelected = selectedPopup === popupId;

                return (
                  <button
                    key={popupId}
                    onClick={() => handleCardSelect(popupId)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(20px)",
                      border: `2px solid ${
                        isSelected
                          ? currentResult.color
                          : "rgba(255,255,255,0.2)"
                      }`,
                      borderRadius: "var(--radius-xl)",
                      padding: 0,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      transform: isSelected ? "scale(1.05)" : "scale(1)",
                      boxShadow: isSelected
                        ? `0 20px 40px ${currentResult.color}40`
                        : "0 10px 30px rgba(0,0,0,0.3)",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform =
                          "translateY(-8px) scale(1.02)";
                        e.currentTarget.style.borderColor = currentResult.color;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.2)";
                      }
                    }}
                  >
                    {/* Capsule Opening Animation */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Half */}
                      <svg
                        width="120"
                        height="60"
                        viewBox="0 0 120 60"
                        style={{
                          position: "absolute",
                          top: "30%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          animation: `capsuleTopOpen 0.6s ease-out ${
                            index * 0.1
                          }s forwards`,
                          opacity: 0,
                        }}
                      >
                        <defs>
                          <radialGradient
                            id={`capsuleGrad${index}Top`}
                            cx="35%"
                            cy="80%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#ffffff"
                              stopOpacity="1"
                            />
                            <stop
                              offset="15%"
                              stopColor={`${currentResult.color}40`}
                            />
                            <stop
                              offset="50%"
                              stopColor={currentResult.color}
                            />
                            <stop
                              offset="100%"
                              stopColor={`${currentResult.color}dd`}
                            />
                          </radialGradient>
                        </defs>
                        <path
                          d="M 10 50 Q 10 20, 30 10 L 90 10 Q 110 20, 110 50 L 10 50 Z"
                          fill={`url(#capsuleGrad${index}Top)`}
                        />
                        <ellipse
                          cx="35"
                          cy="25"
                          rx="15"
                          ry="12"
                          fill="#ffffff"
                          opacity="0.6"
                        />
                      </svg>

                      {/* Bottom Half */}
                      <svg
                        width="120"
                        height="60"
                        viewBox="0 0 120 60"
                        style={{
                          position: "absolute",
                          top: "30%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          animation: `capsuleBottomOpen 0.6s ease-out ${
                            index * 0.1
                          }s forwards`,
                          opacity: 0,
                        }}
                      >
                        <defs>
                          <radialGradient
                            id={`capsuleGrad${index}Bottom`}
                            cx="35%"
                            cy="20%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#ffffff"
                              stopOpacity="1"
                            />
                            <stop
                              offset="15%"
                              stopColor={`${currentResult.color}40`}
                            />
                            <stop
                              offset="50%"
                              stopColor={currentResult.color}
                            />
                            <stop
                              offset="100%"
                              stopColor={`${currentResult.color}dd`}
                            />
                          </radialGradient>
                        </defs>
                        <path
                          d="M 10 10 L 110 10 Q 110 40, 90 50 L 30 50 Q 10 40, 10 10 Z"
                          fill={`url(#capsuleGrad${index}Bottom)`}
                        />
                        <ellipse
                          cx="70"
                          cy="35"
                          rx="10"
                          ry="8"
                          fill="#000000"
                          opacity="0.1"
                        />
                      </svg>
                    </div>

                    {/* Image */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",
                        background: `linear-gradient(135deg, ${currentResult.color}20 0%, ${currentResult.color}10 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          animation: `emojiPopOut 0.6s ease-out ${
                            index * 0.1 + 0.3
                          }s backwards`,
                        }}
                      >
                        {mascots[currentResult.mascot].emoji}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          top: "var(--space-3)",
                          left: "var(--space-3)",
                          background: currentResult.gradient,
                          color: "white",
                          padding: "var(--space-1) var(--space-3)",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-1)",
                        }}
                      >
                        {popup.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div
                      style={{
                        padding: "var(--space-4)",
                        textAlign: "left",
                      }}
                    >
                      <h3
                        style={{
                          color: "white",
                          marginBottom: "var(--space-2)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {popup.popupName}
                      </h3>

                      <div
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.85rem",
                          marginBottom: "var(--space-3)",
                        }}
                      >
                        📍 {popup.area} · {popup.startDate.slice(5)} ~{" "}
                        {popup.endDate.slice(5)}
                      </div>

                      <div
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "var(--radius-md)",
                          padding: "var(--space-3)",
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)",
                          fontStyle: "italic",
                          borderLeft: `3px solid ${currentResult.color}`,
                        }}
                      >
                        "{messages[index % messages.length]}"
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleReset}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-4) var(--space-6)",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                다시 뽑기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
