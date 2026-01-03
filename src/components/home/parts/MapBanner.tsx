import { useRef } from "react";
import type { CSSProperties } from "react";
import mapIcon from "@/assets/mapIcon.svg";

interface MapBannerProps {
  onClick: () => void;
  style?: CSSProperties;
}

type CSSVars = CSSProperties & {
  "--mx"?: string;
  "--my"?: string;
  "--rx"?: string;
  "--ry"?: string;
  "--s"?: string;
};

export function MapBanner({ onClick, style }: MapBannerProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const setVars = (next: {
    mx: string;
    my: string;
    rx: string;
    ry: string;
  }) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", next.mx);
    el.style.setProperty("--my", next.my);
    el.style.setProperty("--rx", next.rx);
    el.style.setProperty("--ry", next.ry);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType !== "mouse") return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dx = x - 0.5;
    const dy = y - 0.5;

    const mx = `${Math.round(x * 100)}%`;
    const my = `${Math.round(y * 100)}%`;

    const tiltX = (-dy * 6).toFixed(3);
    const tiltY = (dx * 7).toFixed(3);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.dataset.hover = "1";
      setVars({
        mx,
        my,
        rx: `${tiltX}deg`,
        ry: `${tiltY}deg`,
      });
    });
  };

  const reset = () => {
    const el = cardRef.current;
    if (!el) return;
    el.dataset.hover = "0";
    setVars({
      mx: "50%",
      my: "50%",
      rx: "0deg",
      ry: "0deg",
    });
  };

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    reset();
  };

  const handlePointerEnter: React.PointerEventHandler<HTMLDivElement> = () => {
    const el = cardRef.current;
    if (!el) return;
    el.dataset.hover = "1";
  };

  const mergedStyle: CSSVars = {
    margin: "0 var(--space-4) var(--space-6)",
    padding: "var(--space-5)",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
    cursor: "pointer",
    "--mx": "30%",
    "--my": "30%",
    "--rx": "0deg",
    "--ry": "0deg",
    "--s": "1",
    ...(style as CSSVars),
  };

  return (
    <div
      ref={cardRef}
      className="mapBannerCard"
      data-hover="0"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={mergedStyle}
    >
      <img
        src={mapIcon}
        alt="Map"
        style={{ width: "80px", height: "80px", flexShrink: 0 }}
      />

      <div style={{ minWidth: 0 }}>
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
