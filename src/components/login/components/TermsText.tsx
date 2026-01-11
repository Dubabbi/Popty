export function TermsText() {
  return (
    <p
      style={{
        margin: 0,
        marginTop: "var(--space-2)",
        fontSize: "0.75rem",
        fontWeight: 400,
        color: "#999999",
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      로그인 시 <span style={{ textDecoration: "underline", color: "#666666" }}>이용약관</span> 및
      <span style={{ textDecoration: "underline", color: "#666666" }}>개인정보처리방침</span>에
      동의하게 됩니다
    </p>
  );
}
