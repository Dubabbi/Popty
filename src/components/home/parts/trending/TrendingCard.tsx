import * as React from "react";
import { trendingStyles } from "@/components/home/parts/trending/trendingStyles";

type Props<T = unknown> = {
  popup: T;
  popupName: string;
  area: string;
  startDate: string | number | Date;
  cardImage: string;
  isActive: boolean;
  counterText: string;
  onClick: () => void;
};

export const TrendingCard = React.forwardRef<HTMLDivElement, Props>(function TrendingCard(
  { popupName, area, startDate, cardImage, isActive, counterText, onClick },
  ref
) {
  return (
    <div ref={ref} onClick={onClick} style={trendingStyles.cardWrap(isActive)}>
      <div style={trendingStyles.cardImage(cardImage)} />
      <div style={trendingStyles.cardOverlay} />

      <div style={trendingStyles.cardContent}>
        <div>
          <div style={trendingStyles.badge}>오픈 예정</div>
        </div>

        <div style={trendingStyles.bottomRow}>
          <div>
            <h2 style={trendingStyles.title}>{popupName}</h2>
            <div style={trendingStyles.area}>{area}</div>
            <div style={trendingStyles.date}>
              {new Date(startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </div>

          <div style={trendingStyles.counterPill}>{counterText}</div>
        </div>
      </div>
    </div>
  );
});
