import type { ChangeEvent } from "react";

export function DescriptionTextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "var(--space-2)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          paddingLeft: "var(--space-2)",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        style={{
          width: "100%",
          padding: "var(--space-4)",
          border: "2px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "var(--radius-xl)",
          fontSize: "1rem",
          background: "white",
          transition: "all 0.3s ease",
          resize: "none",
          fontFamily: "inherit",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#FFD4B8";
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 212, 184, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
