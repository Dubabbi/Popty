import { useRef } from "react";
import type { CSSProperties } from "react";
import mapIcon from "@/assets/mapIcon.svg";

interface MapBannerProps {
  onClick: () => void;
  style?: CSSProperties;
}

export function MapBanner({ onClick, style }: MapBannerProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const setVars = (next: {
    mx: string;
    my: string;
    rx: string;
    ry: string;
    scale: string;
  }) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", next.mx);
    el.style.setProperty("--my", next.my);
    el.style.setProperty("--rx", next.rx);
    el.style.setProperty("--ry", next.ry);
    el.style.setProperty("--s", next.scale);
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

    const tiltX = (-dy * 15).toFixed(3);
    const tiltY = (dx * 18).toFixed(3);

    const scale = "1.025";

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.dataset.hover = "1";
      setVars({
        mx,
        my,
        rx: `${tiltX}deg`,
        ry: `${tiltY}deg`,
        scale,
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
      scale: "1",
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

  return (
    <>
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
        style={{
          margin: "0 var(--space-4) var(--space-6)",
          padding: "var(--space-5)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          cursor: "pointer",
          // @ts-expect-error CSS vars
          "--mx": "30%",
          "--my": "30%",
          "--rx": "0deg",
          "--ry": "0deg",
          "--s": "1",
          ...style,
        }}
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

      <style>
        {`
          .mapBannerCard{
            position: relative;
            isolation: isolate;
            border: 1px solid rgba(176, 214, 85, 0.22);

            background:
              radial-gradient(900px circle at var(--mx, 50%) var(--my, 50%),
                rgba(255,255,255,0.85) 0%,
                rgba(255,255,255,0.40) 18%,
                rgba(255,255,255,0.06) 38%,
                rgba(255,255,255,0.00) 62%
              ),
              linear-gradient(135deg, #D4F4DD 0%, #B8E8C5 100%);

            box-shadow:
              0 10px 26px rgba(0,0,0,0.08),
              inset 0 1px 0 rgba(255,255,255,0.55);

            transform-style: preserve-3d;
            will-change: transform, box-shadow, background, filter;
            transition:
              transform 160ms cubic-bezier(.2,.8,.2,1),
              box-shadow 160ms cubic-bezier(.2,.8,.2,1),
              border-color 160ms ease,
              filter 160ms ease;
            user-select: none;
          }

          .mapBannerCard::before{
            content:"";
            position:absolute;
            inset:0;
            border-radius: inherit;
            pointer-events:none;
            background:
              conic-gradient(from 180deg at var(--mx, 50%) var(--my, 50%),
                rgba(255,255,255,0.0),
                rgba(255,255,255,0.35),
                rgba(255,255,255,0.0)
              );
            opacity: 0.25;
            mix-blend-mode: overlay;
            transition: opacity 160ms ease;
          }

          .mapBannerCard[data-hover="1"]{
            transform:
              perspective(800px)
              rotateX(var(--rx, 0deg))
              rotateY(var(--ry, 0deg))
              scale(var(--s, 1));
            box-shadow:
              0 24px 60px rgba(0,0,0,0.10),
              0 10px 26px rgba(0,0,0,0.10),
              inset 0 1px 0 rgba(255,255,255,0.60);
            border-color: rgba(176, 214, 85, 0.34);
            filter: saturate(1.06) contrast(1.03);
          }

          .mapBannerCard[data-hover="1"]::before{
            opacity: 0.45;
          }

          .mapBannerCard:active{
            transform:
              perspective(800px)
              rotateX(calc(var(--rx, 0deg) * 0.5))
              rotateY(calc(var(--ry, 0deg) * 0.5))
              scale(0.99);
          }

          .mapBannerCard:focus-visible{
            outline: 2px solid rgba(0,0,0,0.18);
            outline-offset: 2px;
          }

          @media (prefers-reduced-motion: reduce){
            .mapBannerCard{
              transition: none !important;
            }
            .mapBannerCard::before{
              transition: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
