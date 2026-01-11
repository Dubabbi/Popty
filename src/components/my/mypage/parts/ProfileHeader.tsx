import { Sparkles } from "lucide-react";
import { Mascot } from "@/components/Mascot";

const ProfileHeader = ({ name, email }: { name?: string; email?: string }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFF5F7 0%, #F0E7FF 50%, #E7F5FF 100%)",
        padding: "var(--space-8) var(--space-4) var(--space-10)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217, 249, 95, 0.15) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 182, 217, 0.15) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ position: "relative", marginBottom: "var(--space-4)" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "var(--radius-full)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(217, 249, 95, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.8)",
              position: "relative",
            }}
          >
            <Mascot pose="welcome" size="medium" />
            <div
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                border: "3px solid white",
              }}
            >
              <Sparkles size={14} color="#000" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <h3
          style={{
            margin: 0,
            marginBottom: "var(--space-1)",
            fontSize: "1.375rem",
          }}
        >
          {name ?? "팝업 탐험가"}
        </h3>
        <p
          style={{
            margin: 0,
            color: "var(--color-text-secondary)",
            fontSize: "0.875rem",
            opacity: 0.8,
          }}
        >
          {email ?? "popup.lover@email.com"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
