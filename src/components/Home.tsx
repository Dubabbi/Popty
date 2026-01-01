import type { ViewType } from "@/routes/routes";
import { MapBanner } from "@/components/ui/home/MapBanner";
import { TrendingCarouselSection } from "@/components/ui/home/TrendingCarouselSection";
import { EndingSoonSection } from "@/components/ui/home/EndingSoonSection";
import { SeongsuSection } from "@/components/ui/home/SeongsuSection";
import { CategorySection } from "@/components/ui/home/CategorySection";

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
