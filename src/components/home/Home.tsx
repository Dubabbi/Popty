import type { ViewType } from "@/routes/routes";
import { MapBanner } from "@/components/home/parts/MapBanner";
import { TrendingCarouselSection } from "@/components/home/parts/trending/TrendingCarouselSection";
import { EndingSoonSection } from "@/components/home/parts/EndingSoonSection";
import { SeongsuSection } from "@/components/home/parts/SeongsuSection";
import { CategorySection } from "@/components/home/parts/CategorySection";

interface HomeProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="pb-8">
      <TrendingCarouselSection onNavigate={onNavigate} />
      <EndingSoonSection onNavigate={onNavigate} />
      <SeongsuSection onNavigate={onNavigate} />
      <CategorySection onNavigate={onNavigate} />
      <MapBanner onClick={() => onNavigate("map")} />
    </div>
  );
}
