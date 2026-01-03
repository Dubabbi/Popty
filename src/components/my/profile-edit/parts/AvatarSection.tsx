import { Camera } from "lucide-react";
import { Mascot } from "@/components/Mascot";

export function AvatarSection() {
  return (
    <div
      style={{
        padding: "var(--space-6) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", marginBottom: "var(--space-2)" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(217, 249, 95, 0.3)",
            border: "4px solid white",
          }}
        >
          <Mascot pose="welcome" size="large" />
        </div>

        <button
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Camera size={16} color="white" strokeWidth={2.5} />
        </button>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
        }}
      >
        프로필 사진 변경
      </p>
    </div>
  );
}
