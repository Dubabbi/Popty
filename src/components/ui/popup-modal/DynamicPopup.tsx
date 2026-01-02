import { useState, useEffect } from "react";

interface DynamicPopupProps {
  onAllow: () => void;
}

export function DynamicPopup({ onAllow }: DynamicPopupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAllow = () => {
    setIsDismissed(true);
    setTimeout(() => {
      onAllow();
    }, 300);
  };

  const handleDeny = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: isExpanded ? 16 : 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        width: isExpanded ? 340 : 140,
        height: isExpanded ? "auto" : 36,
        background: isExpanded
          ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
          : "#000000",
        borderRadius: isExpanded ? 32 : 18,
        overflow: "hidden",
        boxShadow: isExpanded
          ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : "0 8px 24px rgba(0, 0, 0, 0.4)",
      }}
    >
      {!isExpanded ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-secondary)",
              boxShadow: "0 0 8px var(--color-secondary)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            PopUp!
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "24px 20px 20px",
            animation: "slideDown 0.4s ease-out 0.2s backwards",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, var(--color-secondary) 0%, #b8e858 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              boxShadow: "0 8px 24px rgba(217, 249, 95, 0.3)",
            }}
          >
            🎉
          </div>

          <div
            style={{
              fontSize: 17,
              color: "#ffffff",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            팝업을 허용하시겠습니까?
          </div>

          <div
            style={{
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: "center",
              marginBottom: 20,
              lineHeight: 1.4,
            }}
          >
            PopUp!이 재밌는 팝업 스토어를
            <br />
            찾아드릴게요 ✨
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            <button
              onClick={handleDeny}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 12,
                border: "none",
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            >
              나중에
            </button>
            <button
              onClick={handleAllow}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 12,
                border: "none",
                background: "var(--color-secondary)",
                color: "#000000",
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 16px rgba(217, 249, 95, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(217, 249, 95, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(217, 249, 95, 0.3)";
              }}
            >
              허용 🎈
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
