export function Tabs({
  active,
  onChange,
}: {
  active: "faq" | "contact";
  onChange: (next: "faq" | "contact") => void;
}) {
  return (
    <div style={{ padding: "0 var(--space-4)", marginBottom: "var(--space-4)" }}>
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          background: "rgba(0, 0, 0, 0.02)",
          padding: "var(--space-1)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <button
          onClick={() => onChange("faq")}
          style={{
            flex: 1,
            padding: "var(--space-3)",
            background: active === "faq" ? "white" : "transparent",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "0.938rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: active === "faq" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
          }}
        >
          자주 묻는 질문
        </button>
        <button
          onClick={() => onChange("contact")}
          style={{
            flex: 1,
            padding: "var(--space-3)",
            background: active === "contact" ? "white" : "transparent",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "0.938rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: active === "contact" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
          }}
        >
          문의하기
        </button>
      </div>
    </div>
  );
}
