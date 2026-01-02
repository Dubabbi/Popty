import { useState } from "react";
import {
  MapPin,
  Check,
  Star,
  Heart,
  Coffee,
  Sparkles,
  Zap,
  Flame,
} from "lucide-react";
import { popupsData, calculateDday } from "@/data/popups";
import { imageMapping } from "@/data/imageMapping";
import type { ViewType } from "@/routes/routes";

interface RoadmapProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

const savedPopups = popupsData.filter((p) => p.trending || p.isNew).slice(0, 8);
const sortedPopups = [...savedPopups].sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
);

const stationIcons = [Star, Heart, Coffee, Sparkles, Zap, Flame];

export function Roadmap({ onNavigate }: RoadmapProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const completedCount = checkedItems.size;
  const totalCount = sortedPopups.length;
  const progress = (completedCount / totalCount) * 100;

  // S자 곡선을 위한 위치 계산 (좌우로 흔들림)
  const getHorizontalOffset = (index: number): number => {
    // 사인파로 S자 곡선 생성
    return Math.sin(index * 0.8) * 80; // -80px ~ 80px 범위
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #FFFCF5 0%, #FFF5F8 50%, #F0F8FF 100%)",
        paddingBottom: 100,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 떠다니는 구름들 */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${60 + i * 120}px`,
            left: i % 2 === 0 ? "5%" : "auto",
            right: i % 2 === 1 ? "5%" : "auto",
            width: `${60 + i * 10}px`,
            height: `${30 + i * 5}px`,
            background: "white",
            borderRadius: "100px",
            opacity: 0.3,
            animation: `float ${20 + i * 5}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          padding: "28px 20px 32px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 24,
              background: "linear-gradient(135deg, #FFE8F0 0%, #D9F95F 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(217, 249, 95, 0.25)",
            }}
          >
            <span style={{ fontSize: "2rem" }}>🚂</span>
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.5rem",
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}
            >
              나의 팝업 여행
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#999",
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {completedCount}개 방문 완료 / 총 {totalCount}개
            </p>
          </div>
        </div>

        {/* Progress Bar with Train */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #FFE8F0 0%, #FFF9E6 50%, #E8F4FF 100%)",
            borderRadius: 100,
            height: 14,
            overflow: "visible",
            position: "relative",
            border: "2px solid rgba(0,0,0,0.06)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #FF6B9D 0%, #D9F95F 50%, #60A5FA 100%)",
              borderRadius: 100,
              transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              boxShadow: "0 2px 8px rgba(217, 249, 95, 0.4)",
            }}
          >
            {/* 기차 */}
            <div
              style={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "2rem",
                animation: "trainMove 1.5s ease-in-out infinite",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            >
              🚂
            </div>
          </div>
        </div>
      </div>

      {/* Railway Track */}
      <div
        style={{
          padding: "60px 20px",
          position: "relative",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {/* S자 곡선 레일 - 각 카드를 정확히 연결 */}
        <svg
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: 400,
            height: sortedPopups.length * 160 + 1400,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <defs>
            <linearGradient id="railGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#D9F95F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8DD9FF" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* 첫 번째 카드부터 시작 */}
          {sortedPopups.length > 0 && (
            <>
              {/* 모든 카드를 연결하는 하나의 연속된 경로 */}
              <path
                d={
                  sortedPopups
                    .map((_, index) => {
                      const y = 50 + index * 160;
                      const x = 200 + getHorizontalOffset(index);

                      if (index === 0) {
                        return `M ${x} ${y}`;
                      }

                      const prevX = 200 + getHorizontalOffset(index - 1);
                      const prevY = 50 + (index - 1) * 160;
                      const cp1x = prevX;
                      const cp1y = prevY + 80;
                      const cp2x = x;
                      const cp2y = y - 80;

                      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
                    })
                    .join(" ") +
                  // 마지막 카드에서 종착역까지
                  (() => {
                    const lastIndex = sortedPopups.length - 1;
                    const lastX = 200 + getHorizontalOffset(lastIndex);
                    const lastY = 50 + lastIndex * 160;
                    const endY = lastY + 1050;
                    return ` C ${lastX} ${lastY + 350}, 200 ${endY - 350}, 200 ${endY}`;
                  })()
                }
                stroke="url(#railGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>

        {/* Stations */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {sortedPopups.map((popup, index) => {
            const isChecked = checkedItems.has(popup.id);
            const isHovered = hoveredId === popup.id;
            const IconComponent = stationIcons[index % stationIcons.length];
            const dday = calculateDday(popup.endDate);
            const xOffset = getHorizontalOffset(index);

            return (
              <div
                key={popup.id}
                style={{
                  position: "relative",
                  marginBottom: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 60,
                }}
              >
                {/* Station Card */}
                <div
                  onClick={() => onNavigate("detail", popup.id)}
                  onMouseEnter={() => setHoveredId(popup.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    width: 130,
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHovered
                      ? `translateX(${xOffset}px) translateY(-8px) scale(1.05)`
                      : `translateX(${xOffset}px) translateY(0) scale(1)`,
                    zIndex: isHovered ? 5 : 2,
                  }}
                >
                  {/* Thumbnail Container */}
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 24,
                      overflow: "hidden",
                      border: "3px solid",
                      borderColor: isChecked
                        ? "#D9F95F"
                        : isHovered
                          ? "#FFB6D9"
                          : "white",
                      boxShadow: isHovered
                        ? "0 16px 32px rgba(0,0,0,0.2)"
                        : "0 6px 20px rgba(0,0,0,0.12)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      background: "white",
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative" }}>
                      <img
                        src={imageMapping[popup.thumbnail]}
                        alt={popup.popupName}
                        style={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 70,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Title */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          left: 10,
                          right: 10,
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {popup.popupName}
                      </div>

                      {/* Check Badge */}
                      {isChecked && (
                        <div
                          style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "#D9F95F",
                            border: "2.5px solid white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                            animation: "checkPop 0.3s ease-out",
                          }}
                        >
                          <Check size={14} color="#000" strokeWidth={3} />
                        </div>
                      )}

                      {/* D-day Badge */}
                      {dday >= 0 && dday <= 7 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 6,
                            left: 6,
                            padding: "4px 10px",
                            background:
                              dday <= 3
                                ? "linear-gradient(135deg, #FF4444 0%, #FF6B6B 100%)"
                                : "linear-gradient(135deg, #FF8800 0%, #FFAA00 100%)",
                            color: "white",
                            borderRadius: 100,
                            fontSize: "0.625rem",
                            fontWeight: 800,
                            boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          {dday === 0 ? "🔥" : "⏰"}
                          {dday === 0 ? "막방" : `D-${dday}`}
                        </div>
                      )}

                      {/* Station Number */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 6,
                          right: 6,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.95)",
                          border: "2px solid rgba(0,0,0,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.688rem",
                          fontWeight: 800,
                          color: "#666",
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Info Strip */}
                    <div
                      style={{
                        padding: "8px 10px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.625rem",
                        color: "#999",
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <MapPin size={10} strokeWidth={2.5} />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontWeight: 600,
                        }}
                      >
                        {popup.area}
                      </span>
                    </div>
                  </div>

                  {/* Station Icon */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCheck(popup.id);
                    }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: -18,
                      transform: "translateX(-50%)",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: isChecked
                        ? "linear-gradient(135deg, #D9F95F 0%, #B8F95F 100%)"
                        : "white",
                      border: "3px solid",
                      borderColor: isChecked ? "#000" : "#E0E0E0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                      zIndex: 3,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateX(-50%) scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateX(-50%) scale(1)";
                    }}
                  >
                    {isChecked ? (
                      <Check size={18} color="#000" strokeWidth={3} />
                    ) : (
                      <IconComponent size={14} color="#ccc" strokeWidth={2.5} />
                    )}
                  </div>

                  {/* Current destination pulse */}
                  {!isChecked && index === completedCount && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          top: -6,
                          left: -6,
                          right: -6,
                          bottom: -6,
                          borderRadius: 28,
                          border: "3px solid #D9F95F",
                          animation: "pulse 2s ease-in-out infinite",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background:
                            "linear-gradient(135deg, #D9F95F 0%, #B8F95F 100%)",
                          padding: "5px 12px",
                          borderRadius: 100,
                          fontSize: "0.688rem",
                          fontWeight: 800,
                          color: "#000",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✨ 다음 목적지
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Journey End */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              padding: "20px 40px",
              background: "white",
              borderRadius: 28,
              border: "4px solid #D9F95F",
              textAlign: "center",
              boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 6 }}>🏁</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 3 }}>
              여행 종착역
            </div>
            <div
              style={{ fontSize: "0.75rem", color: "#999", fontWeight: 500 }}
            >
              더 많은 팝업을 탐험해보세요!
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedPopups.length === 0 && (
        <div
          style={{
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFE8F0 0%, #FFF9E6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
              fontSize: "4rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            🗺️
          </div>
          <h3
            style={{
              marginBottom: 12,
              fontSize: "1.5rem",
              fontWeight: 800,
            }}
          >
            여행을 시작해보세요
          </h3>
          <p
            style={{
              color: "#999",
              marginBottom: 32,
              fontSize: "0.938rem",
            }}
          >
            팝업을 저장하고 나만의 여행 지도를 만들어보세요!
          </p>
          <button
            onClick={() => onNavigate("home")}
            style={{
              padding: "16px 40px",
              background: "linear-gradient(135deg, #D9F95F 0%, #B8F95F 100%)",
              border: "3px solid #000",
              borderRadius: 100,
              fontWeight: 800,
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
          >
            팝업 탐험하기 🚀
          </button>
        </div>
      )}

      {/* Completion Celebration */}
      {completedCount === totalCount && totalCount > 0 && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#000",
            padding: "12px 24px",
            borderRadius: 100,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            fontWeight: 700,
            fontSize: "0.938rem",
            animation:
              "dynamicIsland 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "white",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>🎉</span>
          모든 여행지 방문 완료!
          <span style={{ fontSize: "1.25rem" }}>✨</span>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }

        @keyframes trainMove {
          0%, 100% { transform: translateY(-50%) translateX(0) rotate(0deg); }
          25% { transform: translateY(-50%) translateX(-3px) rotate(-2deg); }
          75% { transform: translateY(-50%) translateX(3px) rotate(2deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }

        @keyframes checkPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes dynamicIsland {
          0% { transform: translateX(-50%) scale(0.5) rotate(-5deg); opacity: 0; }
          50% { transform: translateX(-50%) scale(1.1) rotate(2deg); }
          100% { transform: translateX(-50%) scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
