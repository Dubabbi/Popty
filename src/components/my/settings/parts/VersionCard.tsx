export function VersionCard({ version, year }: { version: string; year: number }) {
  return (
    <div
      style={{
        margin: "var(--space-4)",
        marginTop: "var(--space-6)",
        padding: "var(--space-4)",
        background: "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)",
        borderRadius: "var(--radius-xl)",
        textAlign: "center",
        border: "1px solid rgba(217, 249, 95, 0.3)",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
        {version}
      </p>
      <p
        style={{
          margin: 0,
          marginTop: "var(--space-1)",
          fontSize: "0.75rem",
          color: "var(--color-text-tertiary)",
        }}
      >
        © {year} PopUp! All rights reserved.
      </p>
    </div>
  );
}
