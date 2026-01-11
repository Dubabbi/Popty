import { Button } from "@/components/Button";
import { Mascot } from "@/components/Mascot";
import { BottomSheet } from "./BottomSheet";

type Props = {
  open: boolean;
  onClose: () => void;
  onPick: (kind: "OPENING_MINUS_1" | "OPENING_MORNING" | "CLOSING_MINUS_2") => void;
};

export function ReminderSheet({ open, onClose, onPick }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          marginBottom: "var(--space-4)",
        }}
      >
        <Mascot pose="reminder" size="medium" />
        <h3 style={{ margin: 0 }}>Set a Reminder</h3>
      </div>

      <p style={{ marginBottom: "var(--space-4)", color: "var(--color-text-secondary)" }}>
        Save it and I'll remind you!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <Button variant="secondary" onClick={() => onPick("OPENING_MINUS_1")}>
          1 day before opening
        </Button>
        <Button variant="secondary" onClick={() => onPick("OPENING_MORNING")}>
          Morning of opening
        </Button>
        <Button variant="secondary" onClick={() => onPick("CLOSING_MINUS_2")}>
          2 days before closing
        </Button>
      </div>
    </BottomSheet>
  );
}
