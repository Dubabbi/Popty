export function buildInfiniteItems<T>(realItems: readonly T[]): T[] {
  const len = realItems.length;
  if (len === 0) return [];
  if (len === 1) return [realItems[0]];

  return [realItems[len - 1], ...realItems, realItems[0], realItems[1 % len]];
}

export function getActualIndexFromInfinite(
  infiniteIndex: number,
  realLen: number,
): number {
  if (realLen <= 0) return 0;
  if (realLen === 1) return 0;

  if (infiniteIndex === 0) return realLen - 1;

  if (infiniteIndex <= realLen) return infiniteIndex - 1;

  return infiniteIndex - realLen - 1;
}

export function getStartInfiniteIndex(realLen: number): number {
  if (realLen <= 0) return 0;
  return realLen >= 2 ? 1 : 0;
}

export function getJumpTarget(
  infiniteIndex: number,
  realLen: number,
): number | null {
  if (realLen < 2) return null;

  const lastReal = realLen;
  const firstClone = realLen + 1;
  const secondClone = realLen + 2;

  if (infiniteIndex === 0) return lastReal;
  if (infiniteIndex === firstClone) return 1;
  if (infiniteIndex === secondClone) return 2;

  return null;
}
