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

export function PopupCardGrid(props: Props) {
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
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid rgba(0, 0, 0, 0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
      }}
    >
      <PopupCardThumb src={thumbSrc} alt={title} height={140} tags={tags} tagMax={2}>
        <PopupCardBookmarkButton saved={saved} pending={pending} onClick={onToggleSave} />

        <div
          style={{
            position: "absolute",
            top: "var(--space-2)",
            left: "var(--space-2)",
            display: "flex",
            gap: "var(--space-1)",
            flexWrap: "wrap",
            zIndex: 4,
          }}
        >
          {openingToday ? <Badge variant="new">Opens Today!</Badge> : null}
          {showDday ? <Badge variant="dday">D-{dday}</Badge> : null}
          {trending ? <Badge variant="trending">🔥</Badge> : null}
        </div>
      </PopupCardThumb>

      <div style={{ padding: "var(--space-3)" }}>
        <h4
          style={{
            margin: 0,
            marginBottom: "var(--space-1)",
            fontSize: "0.9375rem",
            lineHeight: "1.3",
          }}
        >
          {title}
        </h4>

        <div style={{ marginBottom: "var(--space-2)" }}>
          <PopupCardMeta
            dateText={dateText}
            areaText={areaText}
            iconSize={12}
            fontSize="0.8125rem"
          />
        </div>
      </div>
    </div>
  );
}
