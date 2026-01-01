import { ChevronRight, TrendingUp, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { PopupCard } from "@/components/PopupCard";
import { Mascot } from "@/components/Mascot";
import { HERO_IMAGES } from "@/constants/heroImages";
import {
  getTrendingPopups,
  getEndingSoonPopups,
  popupsData,
} from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";
import type { StyleWithVars } from "@/types/cssVars";
import { MapBanner } from "@/components/ui/home/MapBanner";

interface HomeProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function Home({ onNavigate }: HomeProps) {
  const trending = getTrendingPopups();
  const endingSoon = getEndingSoonPopups();

  const seongsuPopups = popupsData
    .filter((p) => p.area === "Seongsu")
    .slice(0, 4);

  const categoryPopups = useMemo(
    () => ({
      Character: popupsData
        .filter((p) => p.category === "Character")
        .slice(0, 3),
      Food: popupsData.filter((p) => p.category === "Food").slice(0, 3),
      Fashion: popupsData.filter((p) => p.category === "Fashion").slice(0, 3),
    }),
    [],
  );

  const {
    carouselRef,
    setItemRef,
    infiniteItems,
    realLen,
    currentIndex,
    activeBackgroundImage,
    getActualIndex,
  } = useInfiniteCarousel({
    items: trending,
    images: HERO_IMAGES,
    maxRealItems: 6,
    idleMs: 140,
  });

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

    padding: "0 var(--peek)",
    scrollPaddingLeft: "var(--peek)",
    scrollPaddingRight: "var(--peek)",

    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  const responsiveGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "var(--space-4)",
  };

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Trending Carousel */}
      {realLen > 0 && (
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
                {infiniteItems.map((popup, index) => {
                  const actualIndex = getActualIndex(index);
                  const cardImage = HERO_IMAGES[actualIndex] ?? HERO_IMAGES[0];
                  const isActive = index === currentIndex;

                  return (
                    <div
                      key={`${popup.id}-${index}`}
                      onClick={() => onNavigate("detail", popup.id)}
                      ref={setItemRef(index)}
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
      )}

      <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
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

      <MapBanner onClick={() => onNavigate("map")} />
    </div>
  );
}
