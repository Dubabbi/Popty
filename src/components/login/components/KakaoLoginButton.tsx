type Props = {
  loading: boolean;
  onClick: () => void;
};

export function KakaoLoginButton({ loading, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        height: 56,
        background: "#FEE500",
        border: "none",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: loading ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (loading) return;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(254, 229, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0C4.477 0 0 3.71 0 8.29c0 2.847 1.883 5.343 4.7 6.753-.195.705-.737 2.67-.847 3.086-.138.528.194.521.41.378.17-.113 2.743-1.87 3.776-2.574.648.088 1.315.136 1.993.136 5.523 0 10-3.71 10-8.29C20 3.71 15.523 0 10 0z"
          fill="#000000"
          fillOpacity="0.9"
        />
      </svg>
      <span style={{ fontSize: "0.938rem", fontWeight: 700, color: "#000000", opacity: 0.85 }}>
        {loading ? "로그인 중..." : "카카오로 시작하기"}
      </span>
    </button>
  );
}
