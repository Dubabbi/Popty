import type { ChangeEvent } from "react";
import type { LucideIcon } from "@/components/my/types/profileEdit";

export function InputWithIcon({
  label,
  type = "text",
  value,
  onChange,
  gradient,
  icon: Icon,
  focusBorderColor,
  focusShadowRgba,
  iconColor = "white",
}: {
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gradient: string; // 아이콘 배경 그라데이션
  icon: LucideIcon;
  focusBorderColor: string; // 포커스 시 보더 색
  focusShadowRgba: string; // 포커스 시 아웃라인(박스섀도) rgba
  iconColor?: string; // 아이콘 색 (기본 white)
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

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            left: 16,
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={iconColor} strokeWidth={2.5} />
        </div>

        <input
          type={type}
          readOnly={type === "email"}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "var(--space-4)",
            paddingLeft: 68,
            border: "2px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            background: "white",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = focusBorderColor;
            e.currentTarget.style.boxShadow = `0 0 0 4px ${focusShadowRgba}`;
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
