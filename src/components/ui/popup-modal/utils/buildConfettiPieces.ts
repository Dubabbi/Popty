import type { ConfettiPiece } from "@/components/ui/popup-modal/types/confetti";
import {
  CONFETTI_COLORS,
  CONFETTI_EMOJIS,
  CONFETTI_PIECE_COUNT,
  EMOJI_THRESHOLD,
} from "@/components/ui/popup-modal/constants/confetti";
import {
  rand01,
  randFloat,
  randInt,
} from "@/components/ui/popup-modal/utils/seededRng";

type Acc = { seed: number; list: ConfettiPiece[] };

export function buildConfettiPieces(seed0: number): ConfettiPiece[] {
  return Array.from(
    { length: CONFETTI_PIECE_COUNT },
    (_, id) => id,
  ).reduce<Acc>(
    (acc, id) => {
      const rIs = rand01(acc.seed);
      const isEmoji = rIs.value > EMOJI_THRESHOLD;

      const rLeft = randFloat(rIs.seed, 0, 100);

      const rColorIdx = randInt(rLeft.seed, 0, CONFETTI_COLORS.length - 1);
      const color = CONFETTI_COLORS[rColorIdx.value];

      const rDelay = randFloat(rColorIdx.seed, 0, 0.3);
      const rDur = randFloat(rDelay.seed, 1.5, 2.5);
      const rRot = randFloat(rDur.seed, -360, 360);

      const rSize = isEmoji
        ? ({ seed: rRot.seed, value: 24 } as const)
        : randFloat(rRot.seed, 8, 16);

      const rEmojiIdx = isEmoji
        ? randInt(rSize.seed, 0, CONFETTI_EMOJIS.length - 1)
        : ({ seed: rSize.seed, value: -1 } as const);

      const emoji = isEmoji ? CONFETTI_EMOJIS[rEmojiIdx.value] : undefined;

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
