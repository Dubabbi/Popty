type Props = {
  tags?: string[] | null;
};

export function PopupTags({ tags }: Props) {
  const list = tags ?? [];

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <h4 style={{ marginBottom: "var(--space-3)" }}>Tags</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {list.length === 0 ? (
          <span style={{ color: "var(--color-text-tertiary)", fontSize: "0.875rem" }}>
            태그 없음
          </span>
        ) : (
          list.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              style={{
                padding: "var(--space-2) var(--space-3)",
                background: "white",
                border: "1px solid var(--color-gray-300)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {tag}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
