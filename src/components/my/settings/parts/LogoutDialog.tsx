export function LogoutDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "var(--space-4)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-6)",
          maxWidth: 320,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        <h3 style={{ margin: 0, marginBottom: "var(--space-2)" }}>로그아웃 하시겠어요?</h3>
        <p
          style={{
            margin: 0,
            marginBottom: "var(--space-6)",
            fontSize: "0.938rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          언제든지 다시 로그인할 수 있어요
        </p>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: "rgba(0, 0, 0, 0.04)",
              border: "none",
              borderRadius: "var(--radius-lg)",
              fontSize: "0.938rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: "linear-gradient(135deg, #FF6B85 0%, #FF8BA0 100%)",
              border: "none",
              borderRadius: "var(--radius-lg)",
              fontSize: "0.938rem",
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(255, 107, 133, 0.3)",
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
