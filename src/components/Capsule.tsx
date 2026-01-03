import { useState } from "react";
import { popupsData } from "@/data/popups";

import type {
  CapsuleMascot,
  CapsuleProps,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";

import { mascots } from "@/components/ui/capsule/types/capsule";

import {
  capsuleColors,
  capsuleColorMap,
  messages,
  categories,
} from "@/components/ui/capsule/constants/capsule";

import { useCryptoSeededRng } from "@/hooks/useCryptoSeededRng";
import { useCapsuleBackground } from "@/hooks/useCapsuleBackground";
import { generateCapsuleResult } from "@/components/ui/capsule/utils/generateCapsuleResult";

import { AnimatedBackground } from "@/components/ui/capsule/components/AnimatedBackground";
import { LobbyView } from "@/components/ui/capsule/components/LobbyView";
import { PullingOverlay } from "@/components/ui/capsule/components/PullingOverlay";
import { FallingOverlay } from "@/components/ui/capsule/components/FallingOverlay";
import { RevealOverlay } from "@/components/ui/capsule/components/RevealOverlay";
import { ResultView } from "@/components/ui/capsule/components/ResultView";

export function Capsule({ onNavigate, breakpoint }: CapsuleProps) {
  const [tickets, setTickets] = useState(5);
  const [todayPulls, setTodayPulls] = useState(3);
  const maxDailyPulls = 3;

  const [phase, setPhase] = useState<"lobby" | "pulling" | "falling" | "reveal" | "result">(
    "lobby"
  );

  const [currentResult, setCurrentResult] = useState<CapsuleResult | null>(null);
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);

  const [collection, setCollection] = useState<CapsuleMascot[]>(["ganadi", "poppy", "lucky"]);

  const [showProbability, setShowProbability] = useState(false);
  const [isMixing, setIsMixing] = useState(false);
  const [fallingCapsule, setFallingCapsule] = useState(-1);
  const [fallingColor, setFallingColor] = useState("");

  const { nextInt, shuffle } = useCryptoSeededRng(0x1234abcd);
  const bg = useCapsuleBackground(0x9e3779b9);

  const handlePull = () => {
    if (todayPulls <= 0 || tickets <= 0) return;

    const randomCapsule = nextInt(1, 15);
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
      const result = generateCapsuleResult({
        nextInt,
        shuffle,
        mascots,
        categories,
        messages,
        popupsData,
      });

      setCurrentResult(result);
      setPhase("result");
      setTickets((prev) => prev - 1);
      setTodayPulls((prev) => prev - 1);

      setCollection((prev) => (prev.includes(result.mascot) ? prev : [...prev, result.mascot]));

      setFallingCapsule(-1);
    }, 2500);
  };

  const handleReset = () => {
    setPhase("lobby");
    setCurrentResult(null);
    setSelectedPopup(null);
  };

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
        background: "linear-gradient(180deg, #6B8AFF 0%, #8BA3FF 50%, #A3B9FF 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "70px",
      }}
    >
      <AnimatedBackground bg={bg} capsuleColors={capsuleColors} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "var(--space-6)",
        }}
      >
        {phase === "lobby" && (
          <LobbyView
            tickets={tickets}
            todayPulls={todayPulls}
            maxDailyPulls={maxDailyPulls}
            showProbability={showProbability}
            onToggleProbability={() => setShowProbability((p) => !p)}
            mascots={mascots}
            collection={collection}
            onPull={handlePull}
            isPullDisabled={todayPulls <= 0 || tickets <= 0}
            isTenPullDisabled={tickets < 10}
            isMixing={isMixing}
            fallingCapsule={fallingCapsule}
          />
        )}

        {phase === "result" && currentResult && (
          <ResultView
            breakpoint={breakpoint}
            currentResult={currentResult}
            selectedPopup={selectedPopup}
            popupsData={popupsData}
            mascots={mascots}
            messages={messages}
            onCardSelect={handleCardSelect}
            onReset={handleReset}
          />
        )}
      </div>

      {phase === "pulling" && <PullingOverlay />}

      {phase === "falling" && (
        <FallingOverlay fallingColor={fallingColor} capsuleColors={capsuleColors} />
      )}

      {phase === "reveal" && currentResult && (
        <RevealOverlay currentResult={currentResult} mascots={mascots} />
      )}
    </div>
  );
}
