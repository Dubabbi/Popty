type Props = {
  message: string;
  onRetry: () => void;
  loading: boolean;
};

export function LocationErrorToast({ message, onRetry, loading }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.92)",
        padding: "10px 12px",
        borderRadius: 10,
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 10,
      }}
    >
      <span style={{ fontSize: 12 }}>위치 권한/가져오기 실패: {message}</span>
      <button
        onClick={onRetry}
        disabled={loading}
        style={{
          fontSize: 12,
          textDecoration: "underline",
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
