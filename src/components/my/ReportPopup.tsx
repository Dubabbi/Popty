import { useState } from "react";
import { ChevronLeft, MapPin, Send } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";

interface ReportPopupProps {
  onNavigate: (view: ViewType) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function ReportPopup({ onNavigate }: ReportPopupProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: "art", label: "아트/전시", color: "#FFB6D9" },
    { id: "food", label: "푸드/음료", color: "#FFD4B8" },
    { id: "fashion", label: "패션/뷰티", color: "#D4C4FF" },
    { id: "character", label: "캐릭터", color: "#A3B9FF" },
    { id: "lifestyle", label: "라이프스타일", color: "#B8F0D9" },
    { id: "etc", label: "기타", color: "#D9F95F" },
  ];

  const handleSubmit = () => {
    if (!title || !location || !startDate || !endDate || !category) {
      alert("필수 정보를 모두 입력해주세요!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #B8F0D9 0%, #A3E0C9 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-6)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--space-6)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            animation: "successPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        >
          <Mascot pose="success" size="large" />
        </div>

        <h2
          style={{
            margin: 0,
            marginBottom: "var(--space-2)",
            color: "#1A5F44",
          }}
        >
          제보 완료! 🎉
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: "var(--space-6)",
            fontSize: "1rem",
            color: "#2A6F54",
            lineHeight: 1.6,
          }}
        >
          소중한 정보 감사합니다!
          <br />
          검토 후 빠르게 등록할게요
        </p>

        <button
          onClick={() => onNavigate("my")}
          style={{
            padding: "var(--space-4) var(--space-6)",
            background: "white",
            border: "none",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1A5F44",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
          }}
        >
          마이페이지로 돌아가기
        </button>

        <style>{`
          @keyframes successPop {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
          padding: "var(--space-4)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => onNavigate("my")}
            style={{
              background: "white",
              border: "none",
              borderRadius: "var(--radius-lg)",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <ChevronLeft size={20} color="#333" />
          </button>
          <h3 style={{ margin: 0 }}>팝업 제보하기</h3>
          <div style={{ width: 40 }} />
        </div>
      </div>

      {/* Intro Card */}
      <div
        style={{
          margin: "var(--space-4)",
          padding: "var(--space-5)",
          background: "linear-gradient(135deg, #FFF5F7 0%, #F0E7FF 100%)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Mascot pose="explore" size="medium" />
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>
            새로운 팝업을 발견하셨나요?
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            여러분의 제보로 더 풍성해집니다!
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "0 var(--space-4)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          {/* Title */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              팝업 이름 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 디즈니 100주년 팝업스토어"
              style={{
                width: "100%",
                padding: "var(--space-4)",
                border: "2px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "var(--radius-xl)",
                fontSize: "1rem",
                background: "white",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FFD4B8";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(255, 212, 184, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Location */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              위치 *
            </label>
            <div style={{ position: "relative" }}>
              <MapPin
                size={20}
                color="var(--color-text-tertiary)"
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 성수동 서울숲길 44"
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  paddingLeft: 48,
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "1rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFD4B8";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(255, 212, 184, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Dates */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-3)",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "var(--space-2)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  paddingLeft: "var(--space-2)",
                }}
              >
                시작일 *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "0.938rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFD4B8";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(255, 212, 184, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "var(--space-2)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  paddingLeft: "var(--space-2)",
                }}
              >
                종료일 *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "0.938rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFD4B8";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(255, 212, 184, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              카테고리 *
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-2)",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: "var(--space-3)",
                    border: `2px solid ${category === cat.id ? cat.color : "rgba(0, 0, 0, 0.08)"}`,
                    borderRadius: "var(--radius-lg)",
                    background:
                      category === cat.id ? cat.color + "15" : "white",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    color:
                      category === cat.id
                        ? cat.color
                        : "var(--color-text-secondary)",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              상세 설명 (선택)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="팝업에 대한 추가 정보를 자유롭게 작성해주세요"
              rows={4}
              style={{
                width: "100%",
                padding: "var(--space-4)",
                border: "2px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "var(--radius-xl)",
                fontSize: "1rem",
                background: "white",
                transition: "all 0.3s ease",
                resize: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FFD4B8";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(255, 212, 184, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            marginTop: "var(--space-6)",
            padding: "var(--space-4)",
            background: "linear-gradient(135deg, #FFD4B8 0%, #FFB6A0 100%)",
            border: "none",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
            boxShadow: "0 4px 16px rgba(255, 212, 184, 0.4)",
            transition: "all 0.3s ease",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              제보 중...
            </>
          ) : (
            <>
              <Send size={20} strokeWidth={2.5} />
              제보하기
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
