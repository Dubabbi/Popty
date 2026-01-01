import {
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { MapPin, ChevronLeft, Search, SlidersHorizontal } from "lucide-react";
import { popupsData } from "@/data/popups";
import { imageMapping } from "@/data/imageMapping";
import type { ViewType } from "@/routes/routes";

interface MapViewProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

type Popup = (typeof popupsData)[number];

function isPopup(p: Popup | undefined): p is Popup {
  return Boolean(p);
}

function hashStringToSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand01(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function MapView({ onNavigate }: MapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPopups, setSelectedPopups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    "All",
    "Character",
    "Goods",
    "Exhibition",
    "Beauty",
    "Food",
    "Fashion",
  ];

  const areaPositions: Record<string, { x: number; y: number }> = {
    Gangnam: { x: 70, y: 65 },
    Seongsu: { x: 60, y: 50 },
    Hongdae: { x: 30, y: 45 },
    Yeouido: { x: 50, y: 55 },
    Others: { x: 48, y: 58 },
  };

  const fixedPositions = useMemo(
    () => [
      { x: 17, y: 32 },
      { x: 17, y: 32 },
      { x: 17, y: 32 },
      { x: 29, y: 27 },
      { x: 50, y: 37 },
      { x: 80, y: 30 },
    ],
    [],
  );

  const filteredPopups = useMemo(() => {
    let list = popupsData;

    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const hay = `${p.popupName} ${p.area} ${p.category}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const popupGroups = useMemo(() => {
    const groups: Record<
      string,
      { popupIds: string[]; position: { x: number; y: number } }
    > = {};

    filteredPopups.slice(0, 8).forEach((popup, index) => {
      const base = areaPositions[popup.area] ?? { x: 50, y: 50 };

      const position =
        fixedPositions[index] ??
        (() => {
          const seed = hashStringToSeed(popup.id);
          const jx = (rand01(seed) - 0.5) * 15;
          const jy = (rand01(seed ^ 0x9e3779b9) - 0.5) * 15;
          return { x: base.x + jx, y: base.y + jy };
        })();

      const key = `${Math.round(position.x)}-${Math.round(position.y)}`;

      if (!groups[key]) groups[key] = { popupIds: [], position };
      groups[key].popupIds.push(popup.id);
    });

    return groups;
  }, [filteredPopups, fixedPositions]);

  const buildingRects = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const x = (i % 6) * 16 + 2;
      const y = Math.floor(i / 6) * 20 + 2;

      const w = 10 + rand01(i + 100) * 5;
      const h = 12 + rand01(i + 200) * 5;

      return { x, y, w, h, key: `b-${i}` };
    });
  }, []);

  const selectedPopupData = useMemo(() => {
    return selectedPopups
      .map((id) => popupsData.find((p) => p.id === id))
      .filter(isPopup);
  }, [selectedPopups]);

  const showBottomSheet = selectedPopupData.length > 0;

  const handlePinClick = (popupIds: string[]) => {
    setSelectedPopups(popupIds);
    setIsCollapsed(false);

    // 스크롤 위치 초기화 (ref 사용)
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  };

  const handleClose = () => {
    setSelectedPopups([]);
    setIsCollapsed(false);
  };

  const handleDragStart = (
    e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>,
  ) => {
    if (selectedPopupData.length < 3) return;

    e.preventDefault();
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentY =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientY
          : moveEvent.clientY;

      const diff = currentY - startY;

      if (diff > 100 && !isCollapsed) setIsCollapsed(true);
      else if (diff < -50 && isCollapsed) setIsCollapsed(false);
    };

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "var(--space-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </button>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-3)",
            background: "var(--color-gray-100)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Search size={18} color="var(--color-text-tertiary)" />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div
        className="filter-scroll-container"
        style={{
          padding: "var(--space-3) var(--space-4)",
          display: "flex",
          gap: "var(--space-2)",
          overflowX: "auto",
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .filter-scroll-container::-webkit-scrollbar { display: none; }
          `}
        </style>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category,
              )
            }
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-gray-300)",
              background:
                selectedCategory === category
                  ? "var(--color-text-primary)"
                  : "white",
              color:
                selectedCategory === category
                  ? "white"
                  : "var(--color-text-primary)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {category}
          </button>
        ))}

        <button
          style={{
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-gray-300)",
            background: "white",
            color: "var(--color-text-primary)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          필터
          <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "#F5F5F5" }}>
          {/* Streets */}
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", opacity: 0.6 }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 7}%`}
                x2="100%"
                y2={`${i * 7}%`}
                stroke="#E0E0E0"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 7}%`}
                y1="0"
                x2={`${i * 7}%`}
                y2="100%"
                stroke="#E0E0E0"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
              />
            ))}
            <line
              x1="10%"
              y1="0"
              x2="60%"
              y2="100%"
              stroke="#E0E0E0"
              strokeWidth="2"
            />
            <line
              x1="40%"
              y1="0"
              x2="90%"
              y2="100%"
              stroke="#E0E0E0"
              strokeWidth="2"
            />
          </svg>

          {/* Buildings (✅ deterministic) */}
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", opacity: 0.3 }}
          >
            {buildingRects.map((b) => (
              <rect
                key={b.key}
                x={`${b.x}%`}
                y={`${b.y}%`}
                width={`${b.w}%`}
                height={`${b.h}%`}
                fill="#D8D8D8"
                rx="1"
              />
            ))}
          </svg>

          {/* parks */}
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", opacity: 0.5 }}
          >
            <ellipse cx="80%" cy="30%" rx="8%" ry="12%" fill="#C8E6C9" />
            <ellipse cx="25%" cy="70%" rx="10%" ry="8%" fill="#C8E6C9" />
          </svg>

          {/* Pins */}
          {Object.entries(popupGroups).map(([key, group]) => {
            const position = group.position;
            const popupCount = group.popupIds.length;
            const isSelected = group.popupIds.some((id) =>
              selectedPopups.includes(id),
            );

            return (
              <div
                key={key}
                onClick={() => handlePinClick(group.popupIds)}
                style={{
                  position: "absolute",
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -100%)",
                  cursor: "pointer",
                  zIndex: isSelected ? 20 : 10,
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: isSelected ? 44 : 36,
                    height: isSelected ? 44 : 36,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 4,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.2)",
                      filter: "blur(2px)",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#D9F95F",
                      borderRadius: "50% 50% 50% 0",
                      transform: "rotate(-45deg)",
                      border: "3px solid white",
                      boxShadow: "0 4px 12px rgba(217, 249, 95, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin
                      size={isSelected ? 18 : 14}
                      color="white"
                      style={{ transform: "rotate(45deg)" }}
                    />
                  </div>

                  {popupCount > 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#FFF",
                        border: "2px solid #D9F95F",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#D9F95F",
                        transform: "rotate(45deg)",
                      }}
                    >
                      {popupCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop */}
      {showBottomSheet && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        />
      )}

      {/* BottomSheet */}
      {showBottomSheet && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "white",
            borderTopLeftRadius: "var(--radius-xl)",
            borderTopRightRadius: "var(--radius-xl)",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
            maxHeight: isCollapsed
              ? "80px"
              : selectedPopupData.length >= 3
                ? "70vh"
                : "auto",
            display: "flex",
            flexDirection: "column",
            transition: "max-height 0.3s ease",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              padding: "var(--space-4)",
              paddingBottom: "var(--space-3)",
            }}
            onMouseDown={
              selectedPopupData.length >= 3 ? handleDragStart : undefined
            }
            onTouchStart={
              selectedPopupData.length >= 3 ? handleDragStart : undefined
            }
          >
            {selectedPopupData.length >= 3 && (
              <div
                style={{
                  width: 40,
                  height: 4,
                  background: "var(--color-gray-300)",
                  borderRadius: "var(--radius-full)",
                  margin: "0 auto var(--space-3)",
                  cursor: "grab",
                }}
              />
            )}

            {selectedPopupData.length > 1 && !isCollapsed && (
              <h3 style={{ margin: 0, fontSize: "1rem" }}>
                {selectedPopupData.length}개의 팝업스토어
              </h3>
            )}
          </div>

          {!isCollapsed && (
            <div
              ref={scrollRef}
              className="bottomsheet-scroll"
              style={{
                padding: "0 var(--space-4) var(--space-4)",
                overflowY: selectedPopupData.length >= 3 ? "auto" : "visible",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                  .bottomsheet-scroll::-webkit-scrollbar { display: none; }
                `}
              </style>

              {selectedPopupData.map((popup) => (
                <div
                  key={popup.id}
                  onClick={() => onNavigate("detail", popup.id)}
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
                      src={imageMapping[popup.thumbnail]}
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
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                          }}
                        >
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
      )}
    </div>
  );
}
