import { Save } from "lucide-react";

export function SaveButton({
  isSaving,
  showSuccess,
  onClick,
}: {
  isSaving: boolean;
  showSuccess: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isSaving}
      style={{
        width: "100%",
        marginTop: "var(--space-6)",
        padding: "var(--space-4)",
        background: showSuccess
          ? "linear-gradient(135deg, #B8F0D9 0%, #A3E0C9 100%)"
          : "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
        border: "none",
        borderRadius: "var(--radius-xl)",
        fontSize: "1rem",
        fontWeight: 700,
        color: showSuccess ? "#1A5F44" : "#000",
        cursor: isSaving ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        boxShadow: "0 4px 16px rgba(217, 249, 95, 0.4)",
        transition: "all 0.3s ease",
        opacity: isSaving ? 0.7 : 1,
      }}
    >
      {showSuccess ? (
        <>
          <span>✓</span>
          저장 완료!
        </>
      ) : (
        <>
          <Save size={20} strokeWidth={2.5} />
          {isSaving ? "저장 중..." : "변경사항 저장"}
        </>
      )}
    </button>
  );
}
