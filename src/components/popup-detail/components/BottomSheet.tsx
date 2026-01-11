import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 200,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          padding: "var(--space-6) var(--space-4)",
          zIndex: 201,
          animation: "slideUp 0.3s",
        }}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  );
}
