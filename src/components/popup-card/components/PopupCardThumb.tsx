import type { ReactNode } from "react";
import { DEFAULT_THUMB } from "@/components/popup-card/utils/popupCard";

type Props = {
  src: string;
  alt: string;
  height: number;
  width?: number | string;
  tags?: string[] | null;
  tagMax?: number;
  children?: ReactNode;
};

export function PopupCardThumb({
  src,
  alt,
  height,
  width = "100%",
  tags,
  tagMax = 2,
  children,
}: Props) {
  const overlayTags = (tags ?? []).slice(0, tagMax);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--color-gray-100)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_THUMB;
        }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* bottom gradient */}
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

      {/* tags overlay */}
      {overlayTags.length > 0 ? (
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
          {overlayTags.map((tag, index) => (
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
      ) : null}

      {/* extra overlays */}
      {children}
    </div>
  );
}
