import { ChevronRight, TrendingUp } from "lucide-react";
import { useCallback, useRef } from "react";
import { HERO_IMAGES } from "@/constants/heroImages";
import { getTrendingPopups } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";
import { carouselStyle } from "@/utils/homeStyles";

type TrendingPopup = ReturnType<typeof getTrendingPopups>[number];

interface TrendingCarouselSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

const APPBAR_HEIGHT = 60;
const DRAG_THRESHOLD_PX = 10;

export function TrendingCarouselSection({
  onNavigate,
}: TrendingCarouselSectionProps) {
  const trending = getTrendingPopups();

  const {
    carouselRef,
    setItemRef,
    infiniteItems,
    realLen,
    currentIndex,
    activeBackgroundImage,
    getActualIndex,
  } = useInfiniteCarousel<TrendingPopup>({
    items: trending,
    images: HERO_IMAGES,
    maxRealItems: 6,
    idleMs: 140,
  });

  const pointerDownRef = useRef(false);
  const draggingRef = useRef(false);

  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const prevSnapRef = useRef<string | null>(null);
  const prevScrollBehaviorRef = useRef<string | null>(null);

  const blockClickUntilRef = useRef(0);

  const snapToClosestCard = useCallback((el: HTMLDivElement) => {
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

  const beginDragging = useCallback((el: HTMLDivElement, pointerId: number) => {
    draggingRef.current = true;

    el.setPointerCapture(pointerId);

    prevSnapRef.current = el.style.scrollSnapType || "";
    prevScrollBehaviorRef.current = el.style.scrollBehavior || "";

    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.style.cursor = "default";
    el.style.userSelect = "none";
  }, []);

  const endDragging = useCallback(
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
    [carouselRef, snapToClosestCard],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // ✅ mouse만 커스텀 드래그
      if (e.pointerType !== "mouse") return;
      if (e.button !== 0) return;

      const el = carouselRef.current;
      if (!el) return;

      pointerDownRef.current = true;
      draggingRef.current = false;

      startXRef.current = e.clientX;
      startScrollLeftRef.current = el.scrollLeft;
    },
    [carouselRef],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      if (!pointerDownRef.current) return;

      const el = carouselRef.current;
      if (!el) return;

      const dx = e.clientX - startXRef.current;

      if (!draggingRef.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
        beginDragging(el, e.pointerId);
      }

      el.scrollLeft = startScrollLeftRef.current - dx;
    },
    [carouselRef, beginDragging],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      else pointerDownRef.current = false;
    },
    [endDragging],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      pointerDownRef.current = false;
    },
    [endDragging],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;

      if (draggingRef.current) endDragging(e.pointerId);
      pointerDownRef.current = false;
    },
    [endDragging],
  );

  if (realLen <= 0) return null;

  return (
    <>
      <section
        style={{
          padding: `calc(var(--space-6) + ${APPBAR_HEIGHT}px) var(--space-4) var(--space-6)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-50px",
            backgroundImage: activeBackgroundImage
              ? `url(${activeBackgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            filter: "blur(40px)",
            transition: "background-image 0.5s ease, opacity 0.5s ease",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--space-4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <TrendingUp size={24} color="var(--color-primary)" />
              <h3 style={{ margin: 0 }}>이번 주 트렌딩</h3>
            </div>

            <button
              onClick={() => onNavigate("browse")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                background: "none",
                border: "none",
                color: "var(--color-text-tertiary)",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              전체보기 <ChevronRight size={16} />
            </button>
          </div>

          <div
            style={{
              position: "relative",
              margin: "0 -16px",
              overflow: "visible",
            }}
          >
            <div
              ref={carouselRef}
              className="trending-carousel"
              style={{
                ...carouselStyle,
                cursor: "default",
                WebkitOverflowScrolling: "touch",
                overscrollBehaviorX: "contain",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onPointerLeave={handlePointerLeave}
              onDragStart={(e) => e.preventDefault()}
            >
              {infiniteItems.map((popup, index) => {
                const actualIndex = getActualIndex(index);
                const cardImage = HERO_IMAGES[actualIndex] ?? HERO_IMAGES[0];
                const isActive = index === currentIndex;

                return (
                  <div
                    key={`${popup.id}-${index}`}
                    ref={setItemRef(index)}
                    onClick={() => {
                      if (Date.now() < blockClickUntilRef.current) return;
                      onNavigate("detail", popup.id);
                    }}
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      width:
                        "min(var(--cardMax), calc(100% - (var(--peek) * 2)))",
                      height: "var(--cardH)",
                      borderRadius: "15px",
                      overflow: "hidden",
                      cursor: "pointer",
                      scrollSnapAlign: "center",
                      scrollSnapStop: "always",
                      transform: isActive ? "scale(1)" : "scale(0.92)",
                      opacity: isActive ? 1 : 0.5,
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${cardImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        height: "100%",
                        padding: "24px",
                        paddingBottom: "28px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 16px",
                            background: "rgba(0, 0, 0, 0.35)",
                            border: "2px solid #B0D655",
                            borderRadius: "50px",
                            color: "#B0D655",
                            fontSize: "17px",
                            fontWeight: 700,
                          }}
                        >
                          오픈 예정
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              margin: 0,
                              marginBottom: "16px",
                              color: "#FFFFFF",
                              fontSize: "clamp(30px, 7vw, 52px)",
                              fontWeight: 800,
                              lineHeight: 1.1,
                              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                            }}
                          >
                            {popup.popupName}
                          </h2>

                          <div
                            style={{
                              marginBottom: "6px",
                              color: "#FFFFFF",
                              fontSize: "19px",
                              fontWeight: 700,
                            }}
                          >
                            {popup.area}
                          </div>

                          <div
                            style={{
                              color: "#B8BABC",
                              fontSize: "19px",
                              fontWeight: 600,
                            }}
                          >
                            {new Date(popup.startDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              },
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            padding: "8px 14px",
                            background: "rgba(0, 0, 0, 0.3)",
                            borderRadius: "999px",
                            color: "#FFFFFF",
                            fontSize: "15px",
                            fontWeight: 600,
                            flexShrink: 0,
                            marginLeft: "16px",
                          }}
                        >
                          {actualIndex + 1} / {Math.max(1, realLen)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div id="home-trending-sentinel" style={{ height: 1 }} />
    </>
  );
}
