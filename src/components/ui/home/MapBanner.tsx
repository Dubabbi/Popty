import type { CSSProperties } from "react";
import mapIcon from "@/assets/mapIcon.svg";

interface MapBannerProps {
  onClick: () => void;
  style?: CSSProperties;
}

export function MapBanner({ onClick, style }: MapBannerProps) {
  return (
    <div
      onClick={onClick}
      style={{
        margin: "0 var(--space-4) var(--space-6)",
        padding: "var(--space-5)",
        background: "linear-gradient(135deg, #D4F4DD 0%, #B8E8C5 100%)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        border: "1px solid rgba(176, 214, 85, 0.2)",
        cursor: "pointer",
        ...style,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <img
        src={mapIcon}
        alt="Map"
        style={{ width: "80px", height: "80px", flexShrink: 0 }}
      />
      <div>
        <h4
          style={{
            margin: 0,
            marginBottom: "var(--space-1)",
            color: "var(--color-text-primary)",
          }}
        >
          찾으시는 팝업이 없나요?
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          지도에서 찾아보거나 새로운 팝업을 제보해 주세요!
        </p>
      </div>
    </div>
  );
}
