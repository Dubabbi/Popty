import type { ChangeEvent } from "react";

export function DateInputs({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEndChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-3)",
      }}
    >
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
          시작일 *
        </label>
        <input
          type="date"
          value={startDate}
          onChange={onStartChange}
          style={{
            width: "100%",
            padding: "var(--space-4)",
            border: "2px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "var(--radius-xl)",
            fontSize: "0.938rem",
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
          종료일 *
        </label>
        <input
          type="date"
          value={endDate}
          onChange={onEndChange}
          style={{
            width: "100%",
            padding: "var(--space-4)",
            border: "2px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "var(--radius-xl)",
            fontSize: "0.938rem",
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
