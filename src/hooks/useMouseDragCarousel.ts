import * as React from "react";

type Options = {
  dragThresholdPx: number;
};

export function useMouseDragCarousel(
  carouselRef: React.RefObject<HTMLDivElement | null>,
  { dragThresholdPx }: Options
) {
  const blockClickUntilRef = React.useRef(0);

  const pointerDownRef = React.useRef(false);
  const draggingRef = React.useRef(false);

  const startXRef = React.useRef(0);
  const startScrollLeftRef = React.useRef(0);

  const prevSnapRef = React.useRef<string | null>(null);
  const prevScrollBehaviorRef = React.useRef<string | null>(null);

  const snapToClosestCard = React.useCallback((el: HTMLDivElement) => {
    const children = Array.from(el.children) as HTMLDivElement[];
    if (children.length === 0) return;

    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let bestDelta = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const child of children) {
      const r = child.getBoundingClientRect();
      const childCenter = r.left + r.width / 2;
      const delta = childCenter - containerCenter;
      const dist = Math.abs(delta);

      if (dist < bestDist) {
        bestDist = dist;
        bestDelta = delta;
      }
    }

    el.scrollTo({ left: el.scrollLeft + bestDelta, behavior: "smooth" });
  }, []);

  const beginDragging = React.useCallback((el: HTMLDivElement, pointerId: number) => {
    draggingRef.current = true;
    el.setPointerCapture(pointerId);

    prevSnapRef.current = el.style.scrollSnapType || "";
    prevScrollBehaviorRef.current = el.style.scrollBehavior || "";

    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.style.cursor = "default";
    el.style.userSelect = "none";
  }, []);

  const endDragging = React.useCallback(
    (pointerId: number) => {
      const el = carouselRef.current;
      if (!el) return;

      try {
        el.releasePointerCapture(pointerId);
      } catch {
        // ignore
      }

      pointerDownRef.current = false;
      const didDrag = draggingRef.current;
      draggingRef.current = false;

      el.style.cursor = "default";
      el.style.userSelect = "";

      el.style.scrollSnapType = prevSnapRef.current ?? "";
      el.style.scrollBehavior = prevScrollBehaviorRef.current ?? "";

      prevSnapRef.current = null;
      prevScrollBehaviorRef.current = null;

      if (didDrag) {
        blockClickUntilRef.current = Date.now() + 250;
        requestAnimationFrame(() => snapToClosestCard(el));
      }
    },
    [carouselRef, snapToClosestCard]
  );

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      if (e.button !== 0) return;

      const el = carouselRef.current;
      if (!el) return;

      pointerDownRef.current = true;
      draggingRef.current = false;

      startXRef.current = e.clientX;
      startScrollLeftRef.current = el.scrollLeft;
    },
    [carouselRef]
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      if (!pointerDownRef.current) return;

      const el = carouselRef.current;
      if (!el) return;

      const dx = e.clientX - startXRef.current;

      if (!draggingRef.current) {
        if (Math.abs(dx) < dragThresholdPx) return;
        beginDragging(el, e.pointerId);
      }

      el.scrollLeft = startScrollLeftRef.current - dx;
    },
    [carouselRef, beginDragging, dragThresholdPx]
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      else pointerDownRef.current = false;
    },
    [endDragging]
  );

  const onPointerCancel = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      pointerDownRef.current = false;
    },
    [endDragging]
  );

  const onPointerLeave = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      pointerDownRef.current = false;
    },
    [endDragging]
  );

  return {
    blockClickUntilRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
    },
  };
}
