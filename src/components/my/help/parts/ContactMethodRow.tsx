import { ExternalLink } from "lucide-react";
import type { ContactMethod } from "@/components/my/types/help";

export function ContactMethodRow({ method }: { method: ContactMethod }) {
  const Icon = method.icon;

  return (
    <button
      style={{
        background: "white",
        border: "2px solid rgba(0, 0, 0, 0.04)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = method.color;
        e.currentTarget.style.boxShadow = `0 4px 16px ${method.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-lg)",
          background: method.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="white" strokeWidth={2.5} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: "2px", fontSize: "0.938rem" }}>
          {method.label}
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          {method.value}
        </div>
      </div>

      <ExternalLink size={20} color="var(--color-text-tertiary)" />
    </button>
  );
}
