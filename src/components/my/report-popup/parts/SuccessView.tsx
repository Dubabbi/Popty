import { Mascot } from "@/components/Mascot";
import type { ReportPopupProps } from "@/components/my/types/reportPopup";

export function SuccessView({ onNavigate }: Pick<ReportPopupProps, "onNavigate">) {
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

      <h2 style={{ margin: 0, marginBottom: "var(--space-2)", color: "#1A5F44" }}>제보 완료! 🎉</h2>
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
