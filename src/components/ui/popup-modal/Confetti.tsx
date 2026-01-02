import { useEffect, useMemo, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
  emoji?: string;
  borderRadius: string | number;
}

type RandOut<T> = { seed: number; value: T };

function nextSeed(seed: number) {
  return (Math.imul(1664525, seed) + 1013904223) >>> 0;
}
function rand01(seed: number): RandOut<number> {
  const s = nextSeed(seed);
  return { seed: s, value: s / 0x100000000 };
}
function randFloat(seed: number, min: number, max: number): RandOut<number> {
  const r = rand01(seed);
  return { seed: r.seed, value: min + r.value * (max - min) };
}
function randInt(seed: number, min: number, max: number): RandOut<number> {
  const r = rand01(seed);
  const span = max - min + 1;
  return { seed: r.seed, value: min + Math.floor(r.value * span) };
}

function buildPieces(seed0: number): ConfettiPiece[] {
  const confettiColors = [
    "var(--color-primary)",
    "#FF6B9D",
    "#C77DFF",
    "#4CC9F0",
    "#FFD60A",
    "#06FFA5",
    "#FF9E00",
  ];
  const emojis = ["🎉", "✨", "🎊", "⭐", "💫", "🌟"];

  type Acc = { seed: number; list: ConfettiPiece[] };

  return Array.from({ length: 60 }, (_, id) => id).reduce<Acc>(
    (acc, id) => {
      const rIs = rand01(acc.seed);
      const isEmoji = rIs.value > 0.7;
      const rLeft = randFloat(rIs.seed, 0, 100);
      const rColorIdx = randInt(rLeft.seed, 0, confettiColors.length - 1);
      const color = confettiColors[rColorIdx.value];
      const rDelay = randFloat(rColorIdx.seed, 0, 0.3);
      const rDur = randFloat(rDelay.seed, 1.5, 2.5);
      const rRot = randFloat(rDur.seed, -360, 360);

      const rSize = isEmoji
        ? ({ seed: rRot.seed, value: 24 } as RandOut<number>)
        : randFloat(rRot.seed, 8, 16);

      const rEmojiIdx = isEmoji
        ? randInt(rSize.seed, 0, emojis.length - 1)
        : ({ seed: rSize.seed, value: -1 } as RandOut<number>);
      const emoji = isEmoji ? emojis[rEmojiIdx.value] : undefined;

      const rBR = rand01(rEmojiIdx.seed);
      const borderRadius: string | number = isEmoji
        ? 0
        : rBR.value > 0.5
          ? "50%"
          : "2px";

      const piece: ConfettiPiece = {
        id,
        left: rLeft.value,
        color,
        delay: rDelay.value,
        duration: rDur.value,
        rotation: rRot.value,
        size: rSize.value,
        emoji,
        borderRadius,
      };

      return { seed: rBR.seed, list: [...acc.list, piece] };
    },
    { seed: seed0 >>> 0, list: [] },
  ).list;
}

interface ConfettiProps {
  seed?: number;
  durationMs?: number;
  onDone?: () => void;
}

export function Confetti({
  seed = 0x1234abcd,
  durationMs = 3000,
  onDone,
}: ConfettiProps) {
  const pieces = useMemo(() => buildPieces(seed), [seed]);
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setAlive(false);
      onDone?.();
    }, durationMs);

    return () => clearTimeout(t);
  }, [durationMs, onDone]);

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
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            top: -20,
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            background: piece.emoji ? "transparent" : piece.color,
            borderRadius: piece.borderRadius,
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
            transform: `rotate(${piece.rotation}deg)`,
            fontSize: piece.emoji ? piece.size : undefined,
            lineHeight: piece.emoji ? `${piece.size}px` : undefined,
            opacity: 0.9,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
