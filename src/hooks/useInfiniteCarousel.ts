import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  buildInfiniteItems,
  getActualIndexFromInfinite,
  getJumpTarget,
  getStartInfiniteIndex,
} from "@/utils/infiniteCarousel";

interface UseInfiniteCarouselParams<T> {
  items: readonly T[];
  images: readonly string[];
  maxRealItems?: number;
  idleMs?: number;
  initialActualIndex?: number;
}

interface UseInfiniteCarouselResult<T> {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  setItemRef: (index: number) => (el: HTMLDivElement | null) => void;

  realItems: T[];
  infiniteItems: T[];
  realLen: number;

  currentIndex: number;
  activeBackgroundImage: string;

  getActualIndex: (infiniteIndex: number) => number;
  centerToIndex: (index: number, behavior?: ScrollBehavior) => void;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useInfiniteCarousel<T>({
  items,
  images,
  maxRealItems = 6,
  idleMs = 140,
  initialActualIndex = 0,
}: UseInfiniteCarouselParams<T>): UseInfiniteCarouselResult<T> {
  const safeItems = items ?? [];
  const safeImages = images ?? [];

  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isJumpingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const scrollRafRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);

  const realItems = useMemo(() => safeItems.slice(0, maxRealItems), [safeItems, maxRealItems]);
  const realLen = realItems.length;

  const infiniteItems = useMemo(() => buildInfiniteItems(realItems), [realItems]);

  const startIndex = useMemo(
    () => getStartInfiniteIndex(realLen, initialActualIndex),
    [realLen, initialActualIndex]
  );

  const [currentIndex, setCurrentIndex] = useState(() => startIndex);

  const [activeBackgroundImage, setActiveBackgroundImage] = useState<string>("");

  const getActualIndex = useCallback(
    (infiniteIndex: number) => getActualIndexFromInfinite(infiniteIndex, realLen),
    [realLen]
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    []
  );

  const centerToIndex = useCallback((index: number, behavior: ScrollBehavior = "auto") => {
    const carousel = carouselRef.current;
    const card = itemRefs.current[index];
    if (!carousel || !card) return;

    const prev = carousel.style.scrollBehavior;
    if (behavior === "auto") carousel.style.scrollBehavior = "auto";

    const left = card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2;
    carousel.scrollTo({ left, behavior });

    if (behavior === "auto") {
      requestAnimationFrame(() => {
        carousel.style.scrollBehavior = prev;
      });
    }
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, infiniteItems.length);
  }, [infiniteItems.length]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useIsomorphicLayoutEffect(() => {
    if (realLen === 0) return;

    let cancelled = false;

    const tryCenter = () => {
      if (cancelled) return;

      const carousel = carouselRef.current;
      const card = itemRefs.current[startIndex];

      if (!carousel || !card) {
        requestAnimationFrame(tryCenter);
        return;
      }

      centerToIndex(startIndex, "auto");
    };

    tryCenter();

    return () => {
      cancelled = true;
    };
  }, [centerToIndex, realLen, startIndex]);

  useEffect(() => {
    if (realLen === 0) return;

    const id = requestAnimationFrame(() => {
      const actual = getActualIndexFromInfinite(currentIndexRef.current, realLen);
      setActiveBackgroundImage(safeImages[actual] ?? safeImages[0] ?? "");
    });

    return () => cancelAnimationFrame(id);
  }, [realLen, safeImages]);

  useEffect(() => {
    if (realLen === 0) return;

    const id = requestAnimationFrame(() => {
      const actual = getActualIndexFromInfinite(currentIndex, realLen);
      setActiveBackgroundImage(safeImages[actual] ?? safeImages[0] ?? "");
    });

    return () => cancelAnimationFrame(id);
  }, [currentIndex, realLen, safeImages]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      centerToIndex(currentIndexRef.current, "auto");
    });

    ro.observe(carousel);
    return () => ro.disconnect();
  }, [centerToIndex]);

  const findClosestIndex = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return -1;

    const centerX = carousel.scrollLeft + carousel.clientWidth / 2;

    let bestIdx = -1;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < itemRefs.current.length; i += 1) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(cardCenter - centerX);

      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    return bestIdx;
  }, []);

  const jumpIfClone = useCallback(
    (idx: number) => {
      const target = getJumpTarget(idx, realLen);
      if (target === null) return;

      isJumpingRef.current = true;

      centerToIndex(target, "auto");
      setCurrentIndex(target);

      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
    },
    [centerToIndex, realLen]
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      if (isJumpingRef.current) return;

      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        const idx = findClosestIndex();
        if (idx >= 0 && idx !== currentIndexRef.current) {
          setCurrentIndex(idx); // ✅ index만 바꿈
        }
      });

      if (scrollIdleTimerRef.current) window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        const idx = findClosestIndex();
        if (idx >= 0) jumpIfClone(idx);
      }, idleMs);
    };

    carousel.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (scrollIdleTimerRef.current) window.clearTimeout(scrollIdleTimerRef.current);
    };
  }, [findClosestIndex, idleMs, jumpIfClone]);

  return {
    carouselRef,
    setItemRef,
    realItems,
    infiniteItems,
    realLen,
    currentIndex,
    activeBackgroundImage,
    getActualIndex,
    centerToIndex,
  };
}
