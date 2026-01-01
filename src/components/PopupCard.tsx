import { Bookmark, MapPin, Clock } from "lucide-react";
import {
  type Popup,
  calculateDday,
  formatDateRange,
  isOpenToday,
} from "@/data/popups";
import { imageMapping } from "@/data/imageMapping";
import { Badge } from "@/components/Badge";
import { useState } from "react";

interface PopupCardProps {
  popup: Popup;
  onClick: () => void;
  layout?: "grid" | "list";
  isSaved?: boolean;
  onSaveToggle?: () => void;
}

export function PopupCard({
  popup,
  onClick,
  layout = "grid",
  isSaved = false,
  onSaveToggle,
}: PopupCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const dday = calculateDday(popup.endDate);
  const openingToday = isOpenToday(popup.startDate);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSaveToggle?.();
  };

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
          boxShadow: "var(--shadow-sm)",
          transition: "all 0.2s",
          padding: "var(--space-4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        }}
      >
        <img
          src={imageMapping[popup.thumbnail]}
          alt={popup.popupName}
          style={{
            width: 120,
            height: 120,
            borderRadius: "var(--radius-md)",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>
                {popup.popupName}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {popup.brandName}
              </p>
            </div>
            <button
              onClick={handleSaveClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--space-2)",
              }}
            >
              <Bookmark
                size={20}
                fill={saved ? "var(--color-primary)" : "none"}
                color={saved ? "var(--color-primary)" : "var(--color-gray-400)"}
              />
            </button>
          </div>

          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}
          >
            {openingToday && <Badge variant="new">Opens Today!</Badge>}
            {dday > 0 && dday <= 3 && <Badge variant="ending">D-{dday}</Badge>}
            {popup.trending && <Badge variant="trending">🔥 Trending</Badge>}
            {popup.isNew && !openingToday && <Badge variant="new">NEW</Badge>}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              fontSize: "0.875rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                color: "var(--color-text-secondary)",
              }}
            >
              <Clock size={14} />
              {formatDateRange(popup.startDate, popup.endDate)}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                color: "var(--color-text-secondary)",
              }}
            >
              <MapPin size={14} />
              {popup.area}
            </div>
          </div>

          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)" }}
          >
            {popup.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                style={{
                  fontSize: "0.75rem",
                  padding: "var(--space-1) var(--space-2)",
                  background: "var(--color-gray-100)",
                  color: "var(--color-text-secondary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={imageMapping[popup.thumbnail]}
          alt={popup.popupName}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
        />
        <button
          onClick={handleSaveClick}
          style={{
            position: "absolute",
            top: "var(--space-2)",
            right: "var(--space-2)",
            width: 36,
            height: 36,
            borderRadius: "var(--radius-full)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Bookmark
            size={18}
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
          }}
        >
          {openingToday && <Badge variant="new">Opens Today!</Badge>}
          {dday > 0 && dday <= 3 && <Badge variant="dday">D-{dday}</Badge>}
          {popup.trending && <Badge variant="trending">🔥</Badge>}
          {popup.isNew && !openingToday && <Badge variant="new">NEW</Badge>}
        </div>
      </div>

      <div style={{ padding: "var(--space-4)" }}>
        <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>
          {popup.popupName}
        </h4>
        <p
          style={{
            margin: 0,
            marginBottom: "var(--space-3)",
            fontSize: "0.875rem",
            color: "var(--color-text-tertiary)",
          }}
        >
          {popup.brandName}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            marginBottom: "var(--space-2)",
            fontSize: "0.875rem",
          }}
        >
          <Clock size={14} color="var(--color-text-tertiary)" />
          <span style={{ color: "var(--color-text-secondary)" }}>
            {formatDateRange(popup.startDate, popup.endDate)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            marginBottom: "var(--space-3)",
            fontSize: "0.875rem",
          }}
        >
          <MapPin size={14} color="var(--color-text-tertiary)" />
          <span style={{ color: "var(--color-text-secondary)" }}>
            {popup.area}
          </span>
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)" }}
        >
          {popup.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              style={{
                fontSize: "0.75rem",
                padding: "var(--space-1) var(--space-2)",
                background: "var(--color-gray-100)",
                color: "var(--color-text-secondary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
