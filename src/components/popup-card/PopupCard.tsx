import { Bookmark, MapPin, Clock } from "lucide-react";
import Img from "@/assets/popup-img.png";
import type { PopupListItem } from "@/data/popupList";
import {
  calculateDday,
  formatDateRange,
  isOpenToday,
  REGION_ZONE_LABEL_KO,
} from "@/data/popupList";

import { imageMapping } from "../../data/imageMapping";
import { Badge } from "../Badge";

import { useBookmarkToggle } from "@/apis/bookmark/useBookmarkToggle";
export type PopupCardItem = Pick<
  PopupListItem,
  | "id"
  | "title"
  | "thumbnailUrl"
  | "startDate"
  | "endDate"
  | "tags"
  | "regionZoneCode"
  | "bookmarksCount"
  | "bookmarked"
  | "dday"
>;

interface PopupCardProps {
  popup: PopupCardItem;
  onClick: () => void;
  layout?: "grid" | "list";
}

const DEFAULT_THUMB = Img;

function resolveThumb(src: string | null): string {
  if (!src) return DEFAULT_THUMB;
  if (src.startsWith("http")) return src;
  return imageMapping[src] ?? src;
}

function regionLabel(regionZoneCode: PopupListItem["regionZoneCode"]): string {
  if (!regionZoneCode) return "기타";
  if (regionZoneCode === "OTHERS") return "기타";
  return REGION_ZONE_LABEL_KO[regionZoneCode] ?? regionZoneCode;
}

export function PopupCard({ popup, onClick, layout = "grid" }: PopupCardProps) {
  const bookmarkToggle = useBookmarkToggle();

  const saved = popup.bookmarked;
  const dday = popup.dday ?? calculateDday(popup.endDate);
  const openingToday = isOpenToday(popup.startDate);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkToggle.isPending) return;

    bookmarkToggle.mutate({
      popupId: popup.id,
      next: !saved,
    });
  };

  const renderImageTagsOverlay = (max: number) => {
    const tags = popup.tags?.slice(0, max) ?? [];
    if (!tags.length) return null;

    return (
      <div
        style={{
          position: "absolute",
          left: "var(--space-2)",
          bottom: "var(--space-2)",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-1)",
          zIndex: 3,
          maxWidth: "calc(100% - var(--space-4))",
        }}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            style={{
              fontSize: "0.6875rem",
              padding: "2px var(--space-2)",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              color: "var(--color-text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const renderBottomGradient = () => (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 54,
        background: "linear-gradient(to top, rgba(0,0,0,0.28), rgba(0,0,0,0))",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );

  const thumbSrc = resolveThumb(popup.thumbnailUrl);
  const title = popup.title;
  const areaText = regionLabel(popup.regionZoneCode);

  if (layout === "list") {
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
          padding: "var(--space-4)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.10)";
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.10)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
        }}
      >
        {/* thumb */}
        <div
          style={{
            position: "relative",
            width: 108,
            height: 140,
            flexShrink: 0,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            background: "var(--color-gray-100)",
          }}
        >
          <img
            src={thumbSrc}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_THUMB;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: "scale(1)",
              transition: "transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />

          {renderBottomGradient()}
          {renderImageTagsOverlay(2)}

          <button
            onClick={handleSaveClick}
            type="button"
            aria-label={saved ? "북마크 해제" : "북마크"}
            aria-pressed={saved}
            disabled={bookmarkToggle.isPending}
            style={{
              position: "absolute",
              top: "var(--space-2)",
              right: "var(--space-2)",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: bookmarkToggle.isPending ? "not-allowed" : "pointer",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
              zIndex: 4,
              opacity: bookmarkToggle.isPending ? 0.7 : 1,
            }}
          >
            <Bookmark
              size={16}
              fill={saved ? "var(--color-primary)" : "none"}
              color={saved ? "var(--color-primary)" : "var(--color-gray-600)"}
            />
          </button>
        </div>

        {/* content */}
        <div
          style={{
            flex: 1,
            minWidth: 0, // ✅ line-clamp 안정화
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
            <h4
              style={{
                margin: 0,
                fontSize: "1rem",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {title}
            </h4>
          </div>

          {/* meta (기간/지역) — ✅ 한 줄에 욱여넣지 말고 2줄로 정리 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <Clock size={14} color="var(--color-text-tertiary)" />
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                {formatDateRange(popup.startDate, popup.endDate)}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <MapPin size={14} color="var(--color-text-tertiary)" />
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                {areaText}
              </span>
            </div>
          </div>

          {/* badges + count (하단 정렬) */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-3)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {openingToday && <Badge variant="new">Opens Today!</Badge>}
              {dday > 0 && dday <= 3 && <Badge variant="ending">D-{dday}</Badge>}
              {popup.bookmarksCount >= 30 && <Badge variant="trending">🔥 Trending</Badge>}
            </div>

            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-tertiary)",
                whiteSpace: "nowrap",
              }}
            >
              저장 {popup.bookmarksCount}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // grid
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
      <div style={{ position: "relative" }}>
        <img
          src={thumbSrc}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_THUMB;
          }}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            display: "block",
          }}
        />

        {renderBottomGradient()}
        {renderImageTagsOverlay(2)}

        <button
          onClick={handleSaveClick}
          type="button"
          aria-label={saved ? "북마크 해제" : "북마크"}
          disabled={bookmarkToggle.isPending}
          style={{
            position: "absolute",
            top: "var(--space-2)",
            right: "var(--space-2)",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-full)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: bookmarkToggle.isPending ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 4,
            opacity: bookmarkToggle.isPending ? 0.7 : 1,
          }}
        >
          <Bookmark
            size={16}
            fill={saved ? "var(--color-primary)" : "none"}
            color={saved ? "var(--color-primary)" : "var(--color-gray-600)"}
          />
        </button>

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
          {openingToday && <Badge variant="new">Opens Today!</Badge>}
          {dday > 0 && dday <= 3 && <Badge variant="dday">D-{dday}</Badge>}
          {popup.bookmarksCount >= 30 && <Badge variant="trending">🔥</Badge>}
        </div>
      </div>

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            marginBottom: "var(--space-1)",
            fontSize: "0.8125rem",
          }}
        >
          <Clock size={12} color="var(--color-text-tertiary)" />
          <span style={{ color: "var(--color-text-secondary)" }}>
            {formatDateRange(popup.startDate, popup.endDate)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            marginBottom: "var(--space-2)",
            fontSize: "0.8125rem",
          }}
        >
          <MapPin size={12} color="var(--color-text-tertiary)" />
          <span style={{ color: "var(--color-text-secondary)" }}>{areaText}</span>
        </div>
      </div>
    </div>
  );
}
