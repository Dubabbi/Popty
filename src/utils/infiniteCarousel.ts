export function buildInfiniteItems<T>(realItems: readonly T[]): T[] {
  const len = realItems?.length ?? 0;
  if (len === 0) return [];
  if (len === 1) return [realItems[0]];

  return [...realItems, ...realItems, ...realItems];
}

export function getActualIndexFromInfinite(infiniteIndex: number, realLen: number): number {
  if (realLen <= 0) return 0;
  if (realLen === 1) return 0;

  const m = infiniteIndex % realLen;
  return m < 0 ? m + realLen : m;
}

export function getStartInfiniteIndex(realLen: number, initialActualIndex = 0): number {
  if (realLen <= 0) return 0;
  if (realLen === 1) return 0;

  const actual = ((initialActualIndex % realLen) + realLen) % realLen;
  return realLen + actual;
}

export function getJumpTarget(infiniteIndex: number, realLen: number): number | null {
  if (realLen <= 1) return null;

  if (infiniteIndex < realLen) return infiniteIndex + realLen;

  if (infiniteIndex >= realLen * 2) return infiniteIndex - realLen;

  return null;
}
