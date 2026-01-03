export function OfficeHours() {
  return (
    <div
      style={{
        marginTop: "var(--space-6)",
        padding: "var(--space-4)",
        background: "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid rgba(217, 249, 95, 0.3)",
      }}
    >
      <h4 style={{ margin: 0, marginBottom: "var(--space-2)", fontSize: "0.938rem" }}>운영 시간</h4>
      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        평일: 10:00 - 18:00
        <br />
        주말 및 공휴일: 휴무
        <br />
        평균 응답 시간: 24시간 이내
      </p>
    </div>
  );
}
