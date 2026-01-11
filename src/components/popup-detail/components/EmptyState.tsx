import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/Button";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: ReactNode;
  actionLabel: string;
  onAction: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-16) var(--space-4)",
        textAlign: "center",
      }}
    >
      <Mascot pose="empty" size="large" />
      <h3 style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-2)" }}>{title}</h3>
      {description ? (
        <div style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
          {description}
        </div>
      ) : null}
      <Button variant="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
