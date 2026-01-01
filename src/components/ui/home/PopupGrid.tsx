import type { CSSProperties, ComponentProps } from "react";
import { PopupCard } from "@/components/PopupCard";
import { responsiveGridStyle } from "@/utils/homeStyles";

type Popup = ComponentProps<typeof PopupCard>["popup"];

interface PopupGridProps {
  popups: readonly Popup[];
  onClickPopup: (popupId: string) => void;
  style?: CSSProperties;
}

export function PopupGrid({ popups, onClickPopup, style }: PopupGridProps) {
  return (
    <div style={{ ...responsiveGridStyle, ...style }}>
      {popups.map((popup) => (
        <PopupCard
          key={popup.id}
          popup={popup}
          onClick={() => onClickPopup(popup.id)}
        />
      ))}
    </div>
  );
}
