import { DEFAULT_THUMB, resolveImage } from "../utils/popupDetailUtils";

type Props = {
  title: string;
  images: Array<string | null | undefined>;
  breakpoint: "mobile" | "tablet" | "desktop";
};

export function PopupGallery({ title, images, breakpoint }: Props) {
  const safeImages = images.length > 0 ? images : [DEFAULT_THUMB];
  const height = breakpoint === "mobile" ? 300 : 400;

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-2)",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
      }}
    >
      {safeImages.map((img, index) => (
        <img
          key={`${index}-${img ?? "null"}`}
          src={resolveImage(img ?? undefined)}
          alt={`${title} ${index + 1}`}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_THUMB;
          }}
          style={{
            width: "100%",
            height,
            objectFit: "cover",
            scrollSnapAlign: "start",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
