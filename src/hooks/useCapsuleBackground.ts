import { useMemo } from "react";
import type { BubbleBg, StarBg } from "@/components/ui/capsule/types/capsule";
import { randFloat } from "@/components/ui/capsule/utils/capsule";

export function useCapsuleBackground(seed = 0x9e3779b9) {
  return useMemo(() => {
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
      { seed, list: [] },
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
  }, [seed]);
}
