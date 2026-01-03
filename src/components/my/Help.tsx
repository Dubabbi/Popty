import { useState } from "react";
import { ChevronDown, MessageCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { Mascot } from "@/components/Mascot";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export function Help() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");

  const faqs: FAQ[] = [
    {
      category: "일반",
      question: "PopUp!은 무엇인가요?",
      answer:
        "PopUp!은 전국의 팝업스토어 정보를 한눈에 확인하고, 나만의 팝업 여행을 계획할 수 있는 서비스입니다. 실시간으로 업데이트되는 팝업 정보를 확인하고, 관심 있는 팝업을 저장해보세요!",
    },
    {
      category: "기능",
      question: "팝업을 저장하려면 어떻게 하나요?",
      answer:
        "팝업 카드의 하트 아이콘을 탭하면 저장됩니다. 저장된 팝업은 마이페이지에서 확인할 수 있어요.",
    },
    {
      category: "기능",
      question: "알림은 어떻게 설정하나요?",
      answer:
        "마이페이지 > 알림 설정에서 원하는 알림 종류를 선택할 수 있습니다. 새로운 팝업, 근처 팝업, 일정 알림 등 다양한 알림을 제공해요.",
    },
    {
      category: "캡슐",
      question: "캡슐 뽑기는 무엇인가요?",
      answer:
        "오늘의 팝업 운세를 확인할 수 있는 재미있는 기능이에요! 하루에 한 번 캡슐을 뽑아 추천 팝업과 귀여운 마스코트를 만나보세요.",
    },
    {
      category: "제보",
      question: "새로운 팝업을 제보하고 싶어요",
      answer:
        "마이페이지 > 팝업 제보하기에서 새로운 팝업 정보를 공유해주세요. 여러분의 제보가 PopUp! 커뮤니티를 더욱 풍성하게 만듭니다!",
    },
    {
      category: "계정",
      question: "프로필 정보를 변경하려면?",
      answer: "마이페이지 > 프로필 편집에서 이름, 이메일, 위치 등의 정보를 수정할 수 있습니다.",
    },
    {
      category: "일반",
      question: "지도에서 팝업을 찾으려면?",
      answer:
        "지도 탭에서 현재 위치 주변의 팝업을 확인할 수 있어요. 색상별로 카테고리가 구분되어 있어 원하는 팝업을 쉽게 찾을 수 있습니다.",
    },
    {
      category: "기능",
      question: "여행 로드맵은 어떻게 사용하나요?",
      answer:
        "로드맵 탭에서 방문 예정인 팝업들의 일정을 타임라인으로 확인할 수 있어요. 효율적인 팝업 투어를 계획해보세요!",
    },
  ];

  const categories = ["전체", ...Array.from(new Set(faqs.map((f) => f.category)))];
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredFAQs =
    selectedCategory === "전체" ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  const contactMethods = [
    {
      icon: Mail,
      label: "이메일",
      value: "support@popup.app",
      color: "#A3B9FF",
      gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
    },
    {
      icon: MessageCircle,
      label: "카카오톡",
      value: "@popup_official",
      color: "#FFD4B8",
      gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
    },
    {
      icon: Phone,
      label: "전화",
      value: "1234-5678",
      color: "#B8F0D9",
      gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
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
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Mascot pose="recommend" size="large" />
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: "var(--space-1)" }}>무엇을 도와드릴까요?</h4>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            자주 묻는 질문을 확인하거나
            <br />
            언제든 문의해주세요!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          padding: "0 var(--space-4)",
          marginBottom: "var(--space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            background: "rgba(0, 0, 0, 0.02)",
            padding: "var(--space-1)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <button
            onClick={() => setActiveTab("faq")}
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: activeTab === "faq" ? "white" : "transparent",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "0.938rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: activeTab === "faq" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
            }}
          >
            자주 묻는 질문
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: activeTab === "contact" ? "white" : "transparent",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "0.938rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: activeTab === "contact" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
            }}
          >
            문의하기
          </button>
        </div>
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div style={{ padding: "0 var(--space-4)" }}>
          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
              overflowX: "auto",
              paddingBottom: "var(--space-2)",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  background:
                    selectedCategory === cat
                      ? "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)"
                      : "white",
                  border: `2px solid ${selectedCategory === cat ? "transparent" : "rgba(0, 0, 0, 0.08)"}`,
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  color: selectedCategory === cat ? "#000" : "var(--color-text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {filteredFAQs.map((faq, idx) => {
              const isExpanded = expandedFAQ === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${isExpanded ? "#D9F95F" : "rgba(0, 0, 0, 0.04)"}`,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    boxShadow: isExpanded ? "0 4px 16px rgba(217, 249, 95, 0.2)" : "none",
                  }}
                >
                  <button
                    onClick={() => setExpandedFAQ(isExpanded ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "var(--space-4)",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--space-3)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "2px var(--space-2)",
                          background: "rgba(217, 249, 95, 0.2)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#000",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        {faq.category}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "0.938rem" }}>{faq.question}</div>
                    </div>
                    <ChevronDown
                      size={20}
                      color="var(--color-text-tertiary)"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </button>

                  {isExpanded && (
                    <div
                      style={{
                        padding: "0 var(--space-4) var(--space-4)",
                        fontSize: "0.938rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div style={{ padding: "0 var(--space-4)" }}>
          <p
            style={{
              marginBottom: "var(--space-4)",
              fontSize: "0.938rem",
              color: "var(--color-text-secondary)",
              paddingLeft: "var(--space-2)",
            }}
          >
            편한 방법으로 문의해주세요!
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.label}
                  style={{
                    background: "white",
                    border: "2px solid rgba(0, 0, 0, 0.04)",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = method.color;
                    e.currentTarget.style.boxShadow = `0 4px 16px ${method.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-lg)",
                      background: method.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color="white" strokeWidth={2.5} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "2px",
                        fontSize: "0.938rem",
                      }}
                    >
                      {method.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {method.value}
                    </div>
                  </div>

                  <ExternalLink size={20} color="var(--color-text-tertiary)" />
                </button>
              );
            })}
          </div>

          {/* Office Hours */}
          <div
            style={{
              marginTop: "var(--space-6)",
              padding: "var(--space-4)",
              background: "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(217, 249, 95, 0.3)",
            }}
          >
            <h4
              style={{
                margin: 0,
                marginBottom: "var(--space-2)",
                fontSize: "0.938rem",
              }}
            >
              운영 시간
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              평일: 10:00 - 18:00
              <br />
              주말 및 공휴일: 휴무
              <br />
              평균 응답 시간: 24시간 이내
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
