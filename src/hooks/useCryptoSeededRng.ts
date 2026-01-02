import { useEffect, useRef } from "react";
import { randInt } from "@/components/ui/capsule/utils/capsule";

export function useCryptoSeededRng(defaultSeed = 0x1234abcd) {
  const seedRef = useRef<number>(defaultSeed);

  useEffect(() => {
    try {
      const c = globalThis.crypto;
      if (c && "getRandomValues" in c) {
        const buf = new Uint32Array(1);
        c.getRandomValues(buf);
        seedRef.current = buf[0] || defaultSeed;
      }
    } catch {
      // ignore
    }
  }, [defaultSeed]);

  const nextInt = (min: number, max: number) => {
    const out = randInt(seedRef.current, min, max);
    seedRef.current = out.seed;
    return out.value;
  };

  const shuffle = <T>(arr: T[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = nextInt(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return { nextInt, shuffle };
}
