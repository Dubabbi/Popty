import { Send } from "lucide-react";

export function SubmitButton({
  isSubmitting,
  onClick,
}: {
  isSubmitting: boolean;
  onClick: () => void;
}) {
  return (
    <>
      <button
        onClick={onClick}
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

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
