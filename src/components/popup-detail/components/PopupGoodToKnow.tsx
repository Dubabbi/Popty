import { AlertCircle, Car } from "lucide-react";

type Props = {
  transitInfo?: string | null;
  parkingInfo?: string | null;
};

export function PopupGoodToKnow({ transitInfo, parkingInfo }: Props) {
  if (!transitInfo && !parkingInfo) return null;

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <h4 style={{ marginBottom: "var(--space-3)" }}>Good to Know</h4>
      <div
        style={{
          background: "var(--color-sky)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        {transitInfo ? (
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <AlertCircle size={18} color="var(--color-text-secondary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "0.875rem" }}>{transitInfo}</div>
          </div>
        ) : null}

        {parkingInfo ? (
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <Car size={18} color="var(--color-text-secondary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "0.875rem" }}>{parkingInfo}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
