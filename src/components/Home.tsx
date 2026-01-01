import { ChevronRight, TrendingUp, Clock, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { PopupCard } from "./PopupCard";
import { Mascot } from "./Mascot";
import { getTrendingPopups, getEndingSoonPopups, popupsData } from "../data/popups";
import type { ViewType } from "../App";

interface HomeProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function Home({ onNavigate, breakpoint }: HomeProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(1); // 초기값을 1로 설정 (실제 첫 번째 카드)

  const heroImages = [
    "https://images.unsplash.com/photo-1706282540364-962e8b1543da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2NzE2MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1723283126758-28f2a308bc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjcxNjY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1679294176201-f9b302961f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3NjcwNDIyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1714972692832-618fae83ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBncmFkaWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NjcxNjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1686405585580-2a1f5aac9837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGNvbG9yZnVsJTIwcGFpbnR8ZW58MXx8fHwxNzY3MTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1566419834777-c0e4c5e7870f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwZGVzaWdufGVufDF8fHx8MTc2NzE1MDc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const [activeBackgroundImage, setActiveBackgroundImage] = useState(heroImages[0]);

  const trending = getTrendingPopups();
  const endingSoon = getEndingSoonPopups();
  const seongsuPopups = popupsData.filter((p) => p.area === "Seongsu").slice(0, 4);
  const categoryPopups = {
    Character: popupsData.filter((p) => p.category === "Character").slice(0, 3),
    Food: popupsData.filter((p) => p.category === "Food").slice(0, 3),
    Fashion: popupsData.filter((p) => p.category === "Fashion").slice(0, 3),
  };

  // 초기 스크롤 위치를 두 번째 카드(실제 첫 번째 카드)로 설정
  useEffect(() => {
    if (carouselRef.current && cardRefs.current[1]) {
      // 실제 첫 번째 카드(인덱스 1)로 스크롤
      setTimeout(() => {
        cardRefs.current[1]?.scrollIntoView({
          inline: "center",
          block: "nearest",
          behavior: "auto",
        });
        setCurrentCardIndex(1);
      }, 100);
    }
  }, [breakpoint]);

  // IntersectionObserver로 현재 활성 카드 추적
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // requestAnimationFrame으로 상태 업데이트를 다음 프레임으로 지연
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          // 가장 많이 보이는 카드 찾기
          let maxRatio = 0;
          let maxIndex = -1;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                maxRatio = entry.intersectionRatio;
                maxIndex = index;
              }
            }
          });

          if (maxIndex !== -1 && maxIndex !== currentCardIndex) {
            setCurrentCardIndex(maxIndex);

            // 실제 카드 인덱스 계산
            let actualIndex = maxIndex - 1;
            if (actualIndex < 0) actualIndex = 5;
            if (actualIndex > 5) actualIndex = 0;

            setActiveBackgroundImage(heroImages[actualIndex]);
          }
        });
      },
      {
        root: carousel,
        threshold: [0.5, 0.75, 1.0],
        rootMargin: "0px",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [breakpoint, currentCardIndex]);

  const gridCols = breakpoint === "desktop" ? 4 : breakpoint === "tablet" ? 3 : 2;

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Hero Section with Mascot */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-bg) 0%, var(--color-lavender) 100%)",
          padding: "var(--space-6) var(--space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
            marginBottom: "var(--space-4)",
          }}
        >
          <Mascot pose="welcome" size="large" />
          <div>
            <h2 style={{ margin: 0, marginBottom: "var(--space-1)" }}>안녕하세요! 👋</h2>
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
              방문할 가치가 있는 모든 팝업을 한곳에서!
            </p>
          </div>
        </div>
        <SearchBar />
      </div>

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
            backgroundImage: `url(${activeBackgroundImage})`,
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
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
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
              전체보기
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Carousel Container with Peek */}
          <div
            style={{
              position: "relative",
              margin: "0 -16px",
              overflow: "visible",
            }}
          >
            <div
              ref={carouselRef}
              style={{
                display: "flex",
                gap: "var(--space-4)",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "0 16px",
                paddingRight: "16px",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
              className="trending-carousel"
            >
              {(() => {
                const cards = trending.slice(0, 6);
                // 무한 반복 효과: 마지막 카드를 앞에, 첫 2개 카드를 뒤에 추가
                const infiniteCards = [cards[cards.length - 1], ...cards, cards[0], cards[1]];

                return infiniteCards.map((popup, index) => {
                  // 실제 인덱스 계산
                  let actualIndex;
                  if (index === 0) {
                    actualIndex = cards.length - 1; // 첫 번째는 마지막 카드 복제
                  } else if (index <= cards.length) {
                    actualIndex = index - 1; // 실제 카드들
                  } else {
                    actualIndex = index - cards.length - 1; // 뒤에 복제된 카드들
                  }
                  const cardImage = heroImages[actualIndex];

                  // 현재 활성 카드인지 확인
                  const isActive = index === currentCardIndex;

                  return (
                    <div
                      key={`${popup.id}-${index}`}
                      onClick={() => onNavigate("detail", popup.id)}
                      style={{
                        position: "relative",
                        flexShrink: 0,
                        width:
                          breakpoint === "mobile"
                            ? "calc(100% - 64px)"
                            : breakpoint === "tablet"
                              ? "calc(100% - 120px)"
                              : "calc(100% - 200px)",
                        borderRadius: "32px",
                        overflow: "hidden",
                        height: breakpoint === "mobile" ? 520 : breakpoint === "tablet" ? 600 : 680,
                        cursor: "pointer",
                        scrollSnapAlign: "center",
                        scrollSnapStop: "always",
                        transform: isActive ? "scale(1)" : "scale(0.92)",
                        opacity: isActive ? 1 : 0.5,
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                        willChange: "transform, opacity",
                      }}
                      ref={(el) => (cardRefs.current[index] = el)}
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
                              padding: "8px 16px",
                              background: "rgba(0, 0, 0, 0.35)",
                              border: "2px solid #B0D655",
                              borderRadius: "999px",
                              color: "#B0D655",
                              fontSize: "17px",
                              fontWeight: 700,
                            }}
                          >
                            오픈 예정
                          </div>
                        </div>

                        {/* Bottom Content */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                          }}
                        >
                          {/* Left: Title, Location, Date */}
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginBottom: "16px",
                                color: "#FFFFFF",
                                fontSize:
                                  breakpoint === "mobile"
                                    ? "44px"
                                    : breakpoint === "tablet"
                                      ? "48px"
                                      : "52px",
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                              }}
                            >
                              {popup.title}
                            </h2>
                            <div
                              style={{
                                marginBottom: "6px",
                                color: "#FFFFFF",
                                fontSize: "19px",
                                fontWeight: 700,
                              }}
                            >
                              {popup.location}
                            </div>
                            <div
                              style={{
                                color: "#B8BABC",
                                fontSize: "19px",
                                fontWeight: 600,
                              }}
                            >
                              {new Date(popup.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </div>
                          </div>

                          {/* Right: Page Indicator */}
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
                            {actualIndex + 1} / 6
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <Clock size={24} color="var(--color-error)" />
            <h3 style={{ margin: 0 }}>곧 종료! 😮</h3>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: "var(--space-4)",
          }}
        >
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MapPin size={24} color="var(--color-accent)" />
            <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: "var(--space-4)",
          }}
        >
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gap: "var(--space-4)",
                }}
              >
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
              <div style={{ width: "100%", height: "5px", background: "var(--color-gray-100)" }} />
            )}
          </div>
        ))}
      </section>

      {/* Mascot Message */}
      <div
        style={{
          margin: "0 var(--space-4) var(--space-6)",
          padding: "var(--space-5)",
          background: "linear-gradient(135deg, #E8F4FD 0%, #D4E9FA 100%)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          border: "1px solid rgba(100, 149, 237, 0.1)",
        }}
      >
        <Mascot pose="explore" size="large" />
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
