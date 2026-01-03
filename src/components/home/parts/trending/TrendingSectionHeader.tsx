import { ChevronRight, TrendingUp } from "lucide-react";
import { trendingStyles } from "@/components/home/parts/trending/trendingStyles";

type TrendingSectionHeaderProps = {
  onViewAll: () => void;
};

export function TrendingSectionHeader({ onViewAll }: TrendingSectionHeaderProps) {
  return (
    <div style={trendingStyles.headerRow}>
      <div style={trendingStyles.headerLeft}>
        <TrendingUp size={24} color="var(--color-primary)" />
        <h3 style={{ margin: 0 }}>이번 주 트렌딩</h3>
      </div>

      <button onClick={onViewAll} style={trendingStyles.viewAllBtn}>
        전체보기 <ChevronRight size={16} />
      </button>
    </div>
  );
}
