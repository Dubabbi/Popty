import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

export function useInfiniteCarousel<T>({
  items,
  images,
  maxRealItems = 6,
  idleMs = 140,
}: UseInfiniteCarouselParams<T>): UseInfiniteCarouselResult<T> {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isJumpingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);

  const realItems = useMemo(
    () => items.slice(0, maxRealItems),
    [items, maxRealItems],
  );
  const realLen = realItems.length;

  const infiniteItems = useMemo(
    () => buildInfiniteItems(realItems),
    [realItems],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBackgroundImage, setActiveBackgroundImage] = useState<string>(
    () => images[0] ?? "",
  );

  const getActualIndex = useCallback(
    (infiniteIndex: number) =>
      getActualIndexFromInfinite(infiniteIndex, realLen),
    [realLen],
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  const centerToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "auto") => {
      const carousel = carouselRef.current;
      const card = itemRefs.current[index];
      if (!carousel || !card) return;

      const prev = carousel.style.scrollBehavior;
      if (behavior === "auto") carousel.style.scrollBehavior = "auto";

      const left =
        card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2;
      carousel.scrollTo({ left, behavior });

      if (behavior === "auto") {
        requestAnimationFrame(() => {
          carousel.style.scrollBehavior = prev;
        });
      }
    },
    [],
  );

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, infiniteItems.length);
  }, [infiniteItems.length]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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

      requestAnimationFrame(() => {
        centerToIndex(target, "auto");
        setCurrentIndex(target);

        const actual = getActualIndexFromInfinite(target, realLen);
        setActiveBackgroundImage(images[actual] ?? images[0] ?? "");

        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      });
    },
    [centerToIndex, images, realLen],
  );

  useEffect(() => {
    if (realLen === 0) return;

    requestAnimationFrame(() => {
      const start = getStartInfiniteIndex(realLen);
      centerToIndex(start, "auto");
      setCurrentIndex(start);

      const actual = getActualIndexFromInfinite(start, realLen);
      setActiveBackgroundImage(images[actual] ?? images[0] ?? "");
    });
  }, [centerToIndex, images, realLen]);

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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      if (isJumpingRef.current) return;

      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        const idx = findClosestIndex();
        if (idx >= 0 && idx !== currentIndexRef.current) {
          setCurrentIndex(idx);

          const actual = getActualIndexFromInfinite(idx, realLen);
          setActiveBackgroundImage(images[actual] ?? images[0] ?? "");
        }
      });

      if (scrollIdleTimerRef.current)
        window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        const idx = findClosestIndex();
        if (idx >= 0) jumpIfClone(idx);
      }, idleMs);
    };

    carousel.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (scrollIdleTimerRef.current)
        window.clearTimeout(scrollIdleTimerRef.current);
    };
  }, [findClosestIndex, images, idleMs, jumpIfClone, realLen]);

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
