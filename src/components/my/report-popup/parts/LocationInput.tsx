import { MapPin } from "lucide-react";
import type { ChangeEvent } from "react";

export function LocationInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      <div style={{ position: "relative" }}>
        <MapPin
          size={20}
          color="var(--color-text-tertiary)"
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "var(--space-4)",
            paddingLeft: 48,
            border: "2px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            background: "white",
            transition: "all 0.3s ease",
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
    </div>
  );
}
