import { Badge } from "@/components/Badge";
import { PopupCardThumb } from "@/components/popup-card/components/PopupCardThumb";
import { PopupCardBookmarkButton } from "@/components/popup-card/components/PopupCardBookmarkButton";
import { PopupCardMeta } from "@/components/popup-card/components/PopupCardMeta";

type Props = {
  title: string;
  thumbSrc: string;
  tags?: string[] | null;
  saved: boolean;
  pending: boolean;
  onClick: () => void;
  onToggleSave: (e: React.MouseEvent) => void;

  dateText: string;
  areaText: string;

  openingToday: boolean;
  showDday: boolean;
  dday: number;
  trending: boolean;
};

export function PopupCardList(props: Props) {
  const {
    title,
    thumbSrc,
    tags,
    saved,
    pending,
    onClick,
    onToggleSave,
    dateText,
    areaText,
    openingToday,
    showDday,
    dday,
    trending,
  } = props;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        gap: "var(--space-4)",
        background: "white",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s",
        padding: "var(--space-4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <PopupCardThumb src={thumbSrc} alt={title} width={120} height={200} tags={tags} tagMax={3} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>{title}</h4>
          </div>

          <PopupCardBookmarkButton
            variant="ghost"
            saved={saved}
            pending={pending}
            onClick={onToggleSave}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {openingToday ? <Badge variant="new">Opens Today!</Badge> : null}
          {showDday ? <Badge variant="ending">D-{dday}</Badge> : null}
          {trending ? <Badge variant="trending">🔥 Trending</Badge> : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <PopupCardMeta
            dateText={dateText}
            areaText={areaText}
            iconSize={14}
            fontSize="0.875rem"
          />
        </div>
      </div>
    </div>
  );
}
