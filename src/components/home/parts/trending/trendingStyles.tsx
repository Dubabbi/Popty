import {
  APPBAR_HEIGHT,
  CARD_HEIGHT,
  CARD_MAX_WIDTH,
  GAP,
  INACTIVE_OPACITY,
  INACTIVE_SCALE,
  SIDE_PADDING,
} from "@/components/home/parts/constants/trendingStyle";

export const trendingStyles = {
  section: {
    padding: `calc(var(--space-6) + ${APPBAR_HEIGHT}px) 0 var(--space-6)`,
    position: "relative" as const,
    overflow: "hidden" as const,
  },

  bg(activeBackgroundImage?: string) {
    return {
      position: "absolute" as const,
      inset: -20,
      backgroundImage: activeBackgroundImage ? `url(${activeBackgroundImage})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.3,
      filter: "blur(18px) saturate(1.5) contrast(1.2)",
      transition: "background-image 0.5s ease, opacity 0.5s ease",
      zIndex: 0,
      pointerEvents: "none" as const,
      transform: "translateZ(0)",
      WebkitTransform: "translateZ(0)",
      backfaceVisibility: "hidden" as const,
    };
  },

  contentWrap: { position: "relative" as const, zIndex: 1 },

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "var(--space-4)",
    padding: `0 ${SIDE_PADDING}px`,
  },

  headerLeft: { display: "flex", alignItems: "center", gap: "var(--space-2)" },

  viewAllBtn: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
    background: "none",
    border: "none",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    fontSize: "0.875rem",
  },

  carousel: {
    display: "flex",
    gap: `${GAP}px`,
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
    WebkitOverflowScrolling: "touch" as const,
    overscrollBehaviorX: "contain" as const,
    scrollSnapType: "x mandatory" as const,
    scrollPaddingLeft: `${SIDE_PADDING}px`,
    scrollPaddingRight: `${SIDE_PADDING}px`,
    padding: `0 ${SIDE_PADDING}px`,
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
  },

  cardWrap(isActive: boolean) {
    return {
      position: "relative" as const,
      flex: "0 0 auto",
      width: `min(${CARD_MAX_WIDTH}px, calc(100% - ${SIDE_PADDING * 2}px))`,
      height: `${CARD_HEIGHT}px`,
      borderRadius: 15,
      overflow: "hidden" as const,
      cursor: "pointer",
      scrollSnapAlign: "center" as const,
      scrollSnapStop: "always" as const,

      opacity: isActive ? 1 : INACTIVE_OPACITY,
      transform: `translateZ(0) scale(${isActive ? 1 : INACTIVE_SCALE})`,
      WebkitTransform: `translateZ(0) scale(${isActive ? 1 : INACTIVE_SCALE})`,
      transition: "transform 0.28s ease, opacity 0.28s ease",
      willChange: "transform, opacity",
      isolation: "isolate" as const,
      backfaceVisibility: "hidden" as const,
      contain: "paint" as const,

      background: "rgba(0,0,0,0.08)",
    };
  },

  cardImage(cardImage: string) {
    return {
      position: "absolute" as const,
      inset: 0,
      backgroundImage: `url(${cardImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0,
      pointerEvents: "none" as const,
    };
  },

  cardOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
    zIndex: 1,
    pointerEvents: "none" as const,
  },

  cardContent: {
    position: "relative" as const,
    zIndex: 2,
    height: "100%",
    padding: 24,
    paddingBottom: 28,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 16px",
    background: "rgba(0, 0, 0, 0.35)",
    border: "2px solid #B0D655",
    borderRadius: 50,
    color: "#B0D655",
    fontSize: 17,
    fontWeight: 700,
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  title: {
    margin: 0,
    marginBottom: 16,
    color: "#FFFFFF",
    fontSize: "1.5rem",
    fontWeight: 600,
    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },

  area: {
    marginBottom: 6,
    color: "#eeeeee",
    fontSize: "1.1rem",
    fontWeight: 600,
  },

  date: { color: "#B8BABC", fontSize: "0.8rem", fontWeight: 600 },

  counterPill: {
    padding: "5px 14px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    color: "#FFFFFF",
    fontSize: "0.8rem",
    fontWeight: 500,
    flexShrink: 0,
    marginLeft: 16,
  },
} as const;
