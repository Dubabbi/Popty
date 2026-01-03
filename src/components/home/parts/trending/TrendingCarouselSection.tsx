import { HERO_IMAGES } from "@/constants/heroImages";
import { getTrendingPopups } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";
import { useMouseDragCarousel } from "@/hooks/useMouseDragCarousel";
import { TrendingSectionHeader } from "@/components/home/parts/trending/TrendingSectionHeader";
import { TrendingCard } from "@/components/home/parts/trending/TrendingCard";
import { trendingStyles } from "@/components/home/parts/trending/trendingStyles";
import { DRAG_THRESHOLD_PX } from "@/components/home/parts/constants/trendingStyle";

type TrendingPopup = ReturnType<typeof getTrendingPopups>[number];

interface TrendingCarouselSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function TrendingCarouselSection({ onNavigate }: TrendingCarouselSectionProps) {
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
    idleMs: 300,
  });

  const { blockClickUntilRef, handlers } = useMouseDragCarousel(carouselRef, {
    dragThresholdPx: DRAG_THRESHOLD_PX,
  });

  if (realLen <= 0) return null;

  return (
    <>
      <section style={trendingStyles.section}>
        <div style={trendingStyles.bg(activeBackgroundImage)} />

        <div style={trendingStyles.contentWrap}>
          <TrendingSectionHeader onViewAll={() => onNavigate("browse")} />

          <div
            ref={carouselRef}
            className="trending-carousel scrollbar-hide"
            style={trendingStyles.carousel}
            {...handlers}
          >
            {infiniteItems.map((popup, index) => {
              const actualIndex = getActualIndex(index);
              const cardImage = HERO_IMAGES[actualIndex] ?? HERO_IMAGES[0];
              const isActive = index === currentIndex;

              const onClick = () => {
                if (Date.now() < blockClickUntilRef.current) return;
                onNavigate("detail", popup.id);
              };

              return (
                <TrendingCard
                  key={`${popup.id}-${index}`}
                  ref={setItemRef(index)}
                  popup={popup}
                  popupName={popup.popupName}
                  area={popup.area}
                  startDate={popup.startDate}
                  cardImage={cardImage}
                  isActive={isActive}
                  counterText={`${actualIndex + 1} / ${Math.max(1, realLen)}`}
                  onClick={onClick}
                />
              );
            })}
          </div>
        </div>
      </section>

      <div id="home-trending-sentinel" style={{ height: 1 }} />
    </>
  );
}
