import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { BottomSheet } from "./BottomSheet";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  metaLine: string;
  tags: string[];
  onCopyLink: () => void;
};

export function ShareSheet({ open, onClose, title, metaLine, tags, onCopyLink }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <h3 style={{ marginBottom: "var(--space-4)" }}>Share Pop-up</h3>

      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-bg) 0%, var(--color-lavender) 100%)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4)",
          marginBottom: "var(--space-4)",
        }}
      >
        <h4 style={{ margin: 0, marginBottom: "var(--space-2)" }}>{title}</h4>
        <p style={{ margin: 0, fontSize: "0.875rem", marginBottom: "var(--space-2)" }}>
          {metaLine}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)" }}>
          {tags.slice(0, 3).map((tag, i) => (
            <Badge key={`${tag}-${i}`} variant="reservation" size="small">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={onCopyLink}>
        Copy Link & Share
      </Button>
    </BottomSheet>
  );
}
