export type RandOut<T> = { seed: number; value: T };

export function nextSeed(seed: number) {
  return (Math.imul(1664525, seed) + 1013904223) >>> 0;
}

export function rand01(seed: number): RandOut<number> {
  const s = nextSeed(seed);
  return { seed: s, value: s / 0x100000000 };
}

export function randFloat(
  seed: number,
  min: number,
  max: number,
): RandOut<number> {
  const r = rand01(seed);
  return { seed: r.seed, value: min + r.value * (max - min) };
}

export function randInt(
  seed: number,
  min: number,
  max: number,
): RandOut<number> {
  const r = rand01(seed);
  const span = max - min + 1;
  return { seed: r.seed, value: min + Math.floor(r.value * span) };
}
