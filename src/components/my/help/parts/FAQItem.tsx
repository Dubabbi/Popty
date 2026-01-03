import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/components/my/types/help";

export function FAQItem({
  faq,
  expanded,
  onToggle,
}: {
  faq: FAQ;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "var(--radius-xl)",
        border: `2px solid ${expanded ? "#D9F95F" : "rgba(0, 0, 0, 0.04)"}`,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: expanded ? "0 4px 16px rgba(217, 249, 95, 0.2)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "var(--space-4)",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-block",
              padding: "2px var(--space-2)",
              background: "rgba(217, 249, 95, 0.2)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#000",
              marginBottom: "var(--space-2)",
            }}
          >
            {faq.category}
          </div>
          <div style={{ fontWeight: 600, fontSize: "0.938rem" }}>{faq.question}</div>
        </div>
        <ChevronDown
          size={20}
          color="var(--color-text-tertiary)"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {expanded && (
        <div
          style={{
            padding: "0 var(--space-4) var(--space-4)",
            fontSize: "0.938rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {faq.answer}
        </div>
      )}
    </div>
  );
}
