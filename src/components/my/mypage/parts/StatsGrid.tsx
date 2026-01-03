import { MapPin, Heart, Award } from "lucide-react";

export function StatsGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
        marginTop: "-32px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* 방문 */}
      <div
        style={{
          background: "white",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-4)",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 100%)";
          e.currentTarget.style.borderColor = "#FFB6D9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            margin: "0 auto var(--space-2)",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapPin size={16} color="white" strokeWidth={2.5} />
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--space-1)",
          }}
        >
          12
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-tertiary)",
            fontWeight: 600,
          }}
        >
          방문
        </div>
      </div>

      {/* 저장 */}
      <div
        style={{
          background: "white",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-4)",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #E7F5FF 0%, #FFFFFF 100%)";
          e.currentTarget.style.borderColor = "#A3B9FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            margin: "0 auto var(--space-2)",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heart size={16} color="white" strokeWidth={2.5} />
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--space-1)",
          }}
        >
          3
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-tertiary)",
            fontWeight: 600,
          }}
        >
          저장
        </div>
      </div>

      {/* 제보 */}
      <div
        style={{
          background: "white",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-4)",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #F0FFE7 0%, #FFFFFF 100%)";
          e.currentTarget.style.borderColor = "#D9F95F";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            margin: "0 auto var(--space-2)",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Award size={16} color="#000" strokeWidth={2.5} />
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--space-1)",
          }}
        >
          5
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-tertiary)",
            fontWeight: 600,
          }}
        >
          제보
        </div>
      </div>
    </div>
  );
}
