export function AppleLoginButton() {
  return (
    <button
      onClick={() => alert("Apple 로그인은 2차에서 추가해도 돼요!")}
      disabled
      style={{
        width: "100%",
        height: 56,
        background: "#000000",
        border: "none",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        cursor: "not-allowed",
        opacity: 0.5,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M15.928 17.067c-.784 1.125-1.644 2.236-2.959 2.258-1.293.022-1.712-.766-3.192-.766-1.48 0-1.943.744-3.17.788-1.272.044-2.261-1.21-3.055-2.33C1.73 14.287.616 9.761 2.481 6.673c.925-1.534 2.581-2.506 4.378-2.528 1.227-.022 2.387.827 3.137.827.749 0 2.155-1.022 3.633-.872.619.026 2.356.25 3.471 1.884-.09.056-2.073 1.21-2.051 3.613.022 2.866 2.513 3.827 2.535 3.838-.022.056-.396 1.355-1.305 2.688l-.351-.056zm-2.994-14.4c.661-.799 1.105-1.907 0.984-3.012-.95.039-2.1.633-2.783 1.432-.613.71-1.15 1.845-1.006 2.933 1.062.083 2.146-.538 2.805-1.354z"
          fill="white"
        />
      </svg>
      <span style={{ fontSize: "0.938rem", fontWeight: 700, color: "#FFFFFF" }}>
        Apple로 시작하기
      </span>
    </button>
  );
}
