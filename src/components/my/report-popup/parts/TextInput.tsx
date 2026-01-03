import type { ChangeEvent } from "react";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  focusBorder = "#FFD4B8",
  focusShadow = "rgba(255, 212, 184, 0.1)",
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  focusBorder?: string;
  focusShadow?: string;
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
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "var(--space-4)",
          border: "2px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "var(--radius-xl)",
          fontSize: "1rem",
          background: "white",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = focusBorder;
          e.currentTarget.style.boxShadow = `0 0 0 4px ${focusShadow}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
