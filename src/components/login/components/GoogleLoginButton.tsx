export function GoogleLoginButton() {
  return (
    <button
      onClick={() => alert("Google 로그인은 2차에서 추가해도 돼요!")}
      disabled
      style={{
        width: "100%",
        height: 56,
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(254, 229, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.662 32.657 29.303 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.852 6.053 29.661 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 19.01 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.852 6.053 29.661 4 24 4c-7.682 0-14.344 4.34-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.552 0 10.646-2.02 14.447-5.303l-6.665-5.64C29.742 34.61 27.005 36 24 36c-5.281 0-9.63-3.323-11.29-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303a11.98 11.98 0 0 1-3.521 5.057l.003-.002 6.665 5.64C36.063 41.083 44 36 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>

      <span style={{ fontSize: "0.938rem", fontWeight: 700, color: "#1A1A1A" }}>
        Google로 시작하기
      </span>
    </button>
  );
}
