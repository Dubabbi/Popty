import { Bookmark, MapPin, Clock } from "lucide-react";
import {
  type Popup,
  calculateDday,
  formatDateRange,
  isOpenToday,
} from "@/data/popups";
import { imageMapping } from "../data/imageMapping";
import { Badge } from "./Badge";
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
          src={imageMapping[popup.thumbnail]}
          alt={popup.popupName}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
          }}
        />
        <button
          onClick={handleSaveClick}
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
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
          }}
        >
          {openingToday && <Badge variant="new">Opens Today!</Badge>}
          {dday > 0 && dday <= 3 && <Badge variant="dday">D-{dday}</Badge>}
          {popup.trending && <Badge variant="trending">🔥</Badge>}
          {popup.isNew && !openingToday && <Badge variant="new">NEW</Badge>}
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
          {popup.popupName}
        </h4>
        <p
          style={{
            margin: 0,
            marginBottom: "var(--space-2)",
            fontSize: "0.8125rem",
            color: "var(--color-text-tertiary)",
            lineHeight: "1.4",
          }}
        >
          {popup.brandName}
        </p>

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
                fontSize: "0.6875rem",
                padding: "2px var(--space-2)",
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
