import type { CSSProperties, ComponentProps } from "react";
import { PopupCard } from "@/components/popup-card/PopupCard";

type Popup = ComponentProps<typeof PopupCard>["popup"];

interface PopupGridProps {
  popups: readonly Popup[];
  onClickPopup: (popupId: string) => void;
  style?: CSSProperties;
}

export function PopupGrid({ popups, onClickPopup, style }: PopupGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" style={style}>
      {popups.map((popup) => (
        <PopupCard key={popup.id} popup={popup} onClick={() => onClickPopup(popup.id)} />
      ))}
    </div>
  );
}
