import type { CSSProperties } from "react";
import { CONFETTI_KEYFRAMES_CSS } from "@/components/ui/popup-modal/constants/confetti";
import type { ConfettiProps } from "@/components/ui/popup-modal/types/confetti";
import { useConfetti } from "@/components/ui/popup-modal/hooks/useConfetti";

type CSSVars = { "--rot"?: number };
type ConfettiStyle = CSSProperties & CSSVars;

export function Confetti(props: ConfettiProps) {
  const { alive, pieces } = useConfetti(props);

  if (!alive) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {pieces.map((piece) => {
        const style: ConfettiStyle = {
          "--rot": piece.rotation,

          position: "absolute",
          top: -20,
          left: `${piece.left}%`,
          width: piece.size,
          height: piece.size,
          background: piece.emoji ? "transparent" : piece.color,
          borderRadius: piece.borderRadius,
          animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          fontSize: piece.emoji ? piece.size : undefined,
          lineHeight: piece.emoji ? `${piece.size}px` : undefined,
          opacity: 0.9,
        };

        return (
          <div key={piece.id} style={style}>
            {piece.emoji}
          </div>
        );
      })}

      <style>{CONFETTI_KEYFRAMES_CSS}</style>
    </div>
  );
}
