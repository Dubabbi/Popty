import { ChevronRight, TrendingUp, Clock, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { PopupCard } from "@/components/PopupCard";
import { Mascot } from "@/components/Mascot";
import { HERO_IMAGES } from "@/constants/heroImages";
import {
  getTrendingPopups,
  getEndingSoonPopups,
  popupsData,
} from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import mapIcon from "@/assets/mapIcon.svg";

interface HomeProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

/** ✅ CSS 변수 타입 안전하게 (any 없음) */
type CSSVarName = `--${string}`;
type StyleWithVars = CSSProperties & Partial<Record<CSSVarName, string>>;

export function Home({ onNavigate }: HomeProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [activeBackgroundImage, setActiveBackgroundImage] = useState("");

  const isJumpingRef = useRef(false);
  const currentIndexRef = useRef(1);
  const scrollRafRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const trending = getTrendingPopups();
  const endingSoon = getEndingSoonPopups();

  const seongsuPopups = popupsData
    .filter((p) => p.area === "Seongsu")
    .slice(0, 4);
  const categoryPopups = {
    Character: popupsData.filter((p) => p.category === "Character").slice(0, 3),
    Food: popupsData.filter((p) => p.category === "Food").slice(0, 3),
    Fashion: popupsData.filter((p) => p.category === "Fashion").slice(0, 3),
  };

  /** ✅ 실제 카드(최대 6개) */
  const realCards = useMemo(() => trending.slice(0, 6), [trending]);
  const realLen = realCards.length;

  /** ✅ 무한 배열: [lastClone, ...real, firstClone, secondClone] */
  const infiniteCards = useMemo(() => {
    if (realLen === 0) return [];
    if (realLen === 1) return [realCards[0]];
    return [
      realCards[realLen - 1],
      ...realCards,
      realCards[0],
      realCards[1 % realLen],
    ];
  }, [realCards, realLen]);

  /** index(무한배열) -> actual(실제배열 0..len-1) */
  const getActualIndex = useCallback(
    (index: number) => {
      if (realLen <= 0) return 0;
      if (realLen === 1) return 0;
      if (index === 0) return realLen - 1;
      if (index <= realLen) return index - 1;
      return index - realLen - 1; // len+1=>0, len+2=>1...
    },
    [realLen],
  );

  /** ✅ 중앙으로 보내기 (iOS에서 scrollIntoView보다 안정적) */
  const centerToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "auto") => {
      const carousel = carouselRef.current;
      const card = cardRefs.current[index];
      if (!carousel || !card) return;

      // 일부 모바일 사파리에서 CSS scroll-behavior가 scrollTo behavior를 덮는 경우 방지
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

  /** ✅ 현재 index ref 동기화 */
  useEffect(() => {
    currentIndexRef.current = currentCardIndex;
  }, [currentCardIndex]);

  /** ✅ cardRefs 길이 정리(데이터 바뀔 때) */
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, infiniteCards.length);
  }, [infiniteCards.length]);

  /** ✅ 스크롤 위치 기준으로 “가장 가운데 카드” 찾기 (IO보다 모바일 안정적) */
  const findClosestIndex = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return -1;

    const centerX = carousel.scrollLeft + carousel.clientWidth / 2;

    let bestIdx = -1;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < cardRefs.current.length; i += 1) {
      const el = cardRefs.current[i];
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

  /** ✅ clone에 도달하면 실제 카드로 순간이동 */
  const jumpIfClone = useCallback(
    (idx: number) => {
      if (realLen < 2) return;

      const lastReal = realLen; // 무한배열에서 실제 마지막 카드 index
      const firstClone = realLen + 1;
      const secondClone = realLen + 2;

      let target: number | null = null;

      if (idx === 0)
        target = lastReal; // 앞 clone(last) -> 실제 마지막
      else if (idx === firstClone)
        target = 1; // 뒤 clone(first) -> 실제 첫
      else if (idx === secondClone) target = 2; // 뒤 clone(second) -> 실제 둘째

      if (target === null) return;

      isJumpingRef.current = true;

      requestAnimationFrame(() => {
        centerToIndex(target!, "auto");
        setCurrentCardIndex(target!);

        const actual = getActualIndex(target!);
        setActiveBackgroundImage(HERO_IMAGES[actual] ?? HERO_IMAGES[0]);

        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      });
    },
    [centerToIndex, getActualIndex, HERO_IMAGES, realLen],
  );

  /** ✅ 초기 위치: “실제 첫 카드”(index 1)를 중앙으로 */
  useEffect(() => {
    if (realLen === 0) return;

    requestAnimationFrame(() => {
      const startIndex = realLen >= 2 ? 1 : 0;
      centerToIndex(startIndex, "auto");
      setCurrentCardIndex(startIndex);

      const actual = getActualIndex(startIndex);
      setActiveBackgroundImage(HERO_IMAGES[actual] ?? HERO_IMAGES[0]);
    });
  }, [centerToIndex, getActualIndex, HERO_IMAGES, realLen]);

  /** ✅ 리사이즈(회전/주소창) 시에도 중앙 유지 */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const ro = new ResizeObserver(() => {
      centerToIndex(currentIndexRef.current, "auto");
    });

    ro.observe(carousel);
    return () => ro.disconnect();
  }, [centerToIndex]);

  /** ✅ 스크롤 중 active index 추적 + 스크롤 멈춘 뒤 clone 점프 */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      if (isJumpingRef.current) return;

      // rAF로 throttle
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        const idx = findClosestIndex();
        if (idx >= 0 && idx !== currentIndexRef.current) {
          setCurrentCardIndex(idx);
          const actual = getActualIndex(idx);
          setActiveBackgroundImage(HERO_IMAGES[actual] ?? HERO_IMAGES[0]);
        }
      });

      // idle(관성 스크롤) 끝난 뒤 clone jump
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        const idx = findClosestIndex();
        if (idx >= 0) jumpIfClone(idx);
      }, 140);
    };

    carousel.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, [findClosestIndex, getActualIndex, HERO_IMAGES, jumpIfClone]);

  /** ✅ 캐러셀 스타일 (any 없음) */
  const carouselStyle: StyleWithVars = {
    "--peek": "clamp(18px, 6vw, 72px)",
    "--cardMax": "720px",
    "--cardH": "clamp(380px, 62vh, 560px)",

    display: "flex",
    gap: "var(--space-4)",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",

    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",

    // ✅ 중앙 틀어짐 방지: padding과 scrollPadding을 같은 값으로
    padding: "0 var(--peek)",
    scrollPaddingLeft: "var(--peek)",
    scrollPaddingRight: "var(--peek)",

    // 스크롤바 숨김(FF/old MS)
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  /** grid도 breakpoint 없이 반응형(원하면 min값만 조절) */
  const responsiveGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "var(--space-4)",
  };

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Trending Carousel */}
      <section
        style={{
          padding: "var(--space-6) var(--space-4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Overlay */}
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

          {/* Carousel Container */}
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
              style={carouselStyle}
            >
              {infiniteCards.map((popup, index) => {
                const actualIndex = getActualIndex(index);
                const cardImage = HERO_IMAGES[actualIndex] ?? HERO_IMAGES[0];
                const isActive = index === currentCardIndex;

                return (
                  <div
                    key={`${popup.id}-${index}`}
                    onClick={() => onNavigate("detail", popup.id)}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    style={{
                      position: "relative",
                      flexShrink: 0,

                      // ✅ 폭: 양옆 peek만큼 빼고, 너무 커지면 max 제한
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
                    {/* Background Image */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${cardImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Bottom Gradient Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
                      }}
                    />

                    {/* Content */}
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
                      {/* Top Left Pill */}
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

                      {/* Bottom */}
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

      {/* Ending Soon */}
      <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
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
            <Clock size={24} color="var(--color-error)" />
            <h3 style={{ margin: 0 }}>곧 종료! 😮</h3>
          </div>
        </div>

        <div style={responsiveGridStyle}>
          {endingSoon.map((popup) => (
            <PopupCard
              key={popup.id}
              popup={popup}
              onClick={() => onNavigate("detail", popup.id)}
            />
          ))}
        </div>
      </section>

      {/* This Week in Seongsu */}
      <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
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
            <MapPin size={24} color="var(--color-accent)" />
            <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
          </div>
        </div>

        <div style={responsiveGridStyle}>
          {seongsuPopups.map((popup) => (
            <PopupCard
              key={popup.id}
              popup={popup}
              onClick={() => onNavigate("detail", popup.id)}
            />
          ))}
        </div>
      </section>

      {/* By Category */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-4)",
          }}
        >
          <Mascot pose="recommend" size="medium" />
          <h3 style={{ margin: 0 }}>카테고리별 추천</h3>
        </div>

        {Object.entries(categoryPopups).map(([category, popups], index) => (
          <div key={category}>
            <div style={{ padding: "0 var(--space-4) var(--space-6)" }}>
              <h4
                style={{
                  marginBottom: "var(--space-3)",
                  marginTop: "var(--space-4)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {category === "Character"
                  ? "🎀 캐릭터"
                  : category === "Food"
                    ? "🍰 음식"
                    : "👗 패션"}
              </h4>

              <div style={responsiveGridStyle}>
                {popups.map((popup) => (
                  <PopupCard
                    key={popup.id}
                    popup={popup}
                    onClick={() => onNavigate("detail", popup.id)}
                  />
                ))}
              </div>
            </div>

            {index < Object.entries(categoryPopups).length - 1 && (
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  background: "var(--color-gray-100)",
                }}
              />
            )}
          </div>
        ))}
      </section>

      {/* Map Banner */}
      <div
        onClick={() => onNavigate("map")}
        style={{
          margin: "0 var(--space-4) var(--space-6)",
          padding: "var(--space-5)",
          background: "linear-gradient(135deg, #D4F4DD 0%, #B8E8C5 100%)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          border: "1px solid rgba(176, 214, 85, 0.2)",
          cursor: "pointer",
        }}
      >
        <img
          src={mapIcon}
          alt="Map"
          style={{ width: "80px", height: "80px", flexShrink: 0 }}
        />
        <div>
          <h4
            style={{
              margin: 0,
              marginBottom: "var(--space-1)",
              color: "var(--color-text-primary)",
            }}
          >
            찾으시는 팝업이 없나요?
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            지도에서 찾아보거나 새로운 팝업을 제보해 주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
