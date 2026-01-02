import { useMemo, useRef, useState } from "react";
import { popupsData } from "@/data/popups";
import { imageMapping } from "@/data/imageMapping";

type Popup = (typeof popupsData)[number];

type Props = {
  popups: Popup[];
  onClose: () => void;
  onSelect: (popupId: string) => void;
};

const COLLAPSED_HEIGHT = 84; // px (핸들 + 제목 정도)
const EXPANDED_VH = 0.7; // 70vh
const SNAP_THRESHOLD = 0.45; // 스냅 임계값(0~1)

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MapBottomSheet({ popups, onClose, onSelect }: Props) {
  const canDrag = popups.length >= 3;

  // ✅ effect 없이 한번 계산 (dev 환경 setState 경고 회피)
  const expandedPx = useMemo(() => {
    if (typeof window === "undefined") return 560;
    return Math.round(window.innerHeight * EXPANDED_VH);
  }, []);

  const collapseOffset = canDrag
    ? Math.max(0, expandedPx - COLLAPSED_HEIGHT)
    : 0;

  // 0 = fully expanded, collapseOffset = collapsed
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const movedRef = useRef(false);

  const isCollapsed = canDrag && offsetY >= collapseOffset - 1;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag) return;

    movedRef.current = false;
    setDragging(true);
    startYRef.current = e.clientY;
    startOffsetRef.current = offsetY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag || !dragging) return;

    const dy = e.clientY - startYRef.current;
    if (Math.abs(dy) > 3) movedRef.current = true;

    const next = clamp(startOffsetRef.current + dy, 0, collapseOffset);
    setOffsetY(next);
  };

  const onPointerUp = () => {
    if (!canDrag) return;

    setDragging(false);

    // 스냅(접힘/펼침)
    const shouldCollapse = offsetY > collapseOffset * SNAP_THRESHOLD;
    setOffsetY(shouldCollapse ? collapseOffset : 0);
  };

  const toggle = () => {
    if (!canDrag) return;
    setOffsetY(isCollapsed ? 0 : collapseOffset);
  };

  const onHandleClick = () => {
    if (!canDrag) return;
    if (movedRef.current) return; // 드래그 후 클릭 토글 방지
    toggle();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 999,
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "white",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          height: canDrag ? expandedPx : "auto",
          maxHeight: canDrag ? expandedPx : "70vh",
          transform: canDrag ? `translateY(${offsetY}px)` : undefined,
          transition: canDrag
            ? dragging
              ? "none"
              : "transform 240ms cubic-bezier(0.2,0,0.2,1)"
            : undefined,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Handle / Header */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={onHandleClick}
          style={{
            padding: "var(--space-4)",
            paddingBottom: "var(--space-3)",
            cursor: canDrag ? (dragging ? "grabbing" : "grab") : "default",
            userSelect: "none",
            touchAction: "none", // ✅ 모바일에서 drag가 스크롤보다 우선
          }}
        >
          {canDrag && (
            <div
              style={{
                width: 40,
                height: 4,
                background: "var(--color-gray-300)",
                borderRadius: "var(--radius-full)",
                margin: "0 auto var(--space-3)",
              }}
            />
          )}

          <h3 style={{ margin: 0, fontSize: "1rem" }}>
            {popups.length}개의 팝업스토어
          </h3>

          {canDrag && (
            <div
              style={{
                fontSize: 12,
                color: "var(--color-text-tertiary)",
                marginTop: 6,
              }}
            >
              {isCollapsed
                ? "위로 드래그해서 펼치기"
                : "아래로 드래그해서 접기"}
            </div>
          )}
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div
            className="bottomsheet-scroll"
            style={{
              padding: "0 var(--space-4) var(--space-4)",
              overflowY: popups.length >= 3 ? "auto" : "visible",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`.bottomsheet-scroll::-webkit-scrollbar { display: none; }`}</style>

            {popups.map((popup) => (
              <div
                key={popup.id}
                onClick={() => onSelect(popup.id)}
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  cursor: "pointer",
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-gray-50)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-gray-100)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-gray-50)";
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--color-gray-200)",
                  }}
                >
                  <img
                    src={
                      imageMapping[popup.thumbnail as keyof typeof imageMapping]
                    }
                    alt={popup.popupName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {popup.category}
                  </div>

                  <h4
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {popup.popupName}
                  </h4>

                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {popup.area}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "var(--space-2)",
                    }}
                  >
                    {popup.entryFee === "paid" && popup.entryFeeAmount ? (
                      <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                        {popup.entryFeeAmount}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "var(--color-primary)",
                        }}
                      >
                        무료
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    🕐 {popup.openHours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
