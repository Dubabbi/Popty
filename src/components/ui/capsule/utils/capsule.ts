export function nextSeed(seed: number) {
  let x = seed | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x | 0;
}

export function rand01(seed: number) {
  const s = nextSeed(seed);
  return { seed: s, value: (s >>> 0) / 4294967296 }; // [0,1)
}

export function randFloat(seed: number, min: number, max: number) {
  const r = rand01(seed);
  return { seed: r.seed, value: min + (max - min) * r.value };
}

export function randInt(seed: number, min: number, max: number) {
  const r = rand01(seed);
  const value = Math.floor(r.value * (max - min + 1)) + min;
  return { seed: r.seed, value };
}
