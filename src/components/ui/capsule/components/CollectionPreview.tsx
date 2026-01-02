import type { CapsuleMascot } from "@/components/ui/capsule/types/capsule";

type MascotInfo = {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
};

type Props = {
  mascots: Record<CapsuleMascot, MascotInfo>;
  collection: CapsuleMascot[];
};

export function CollectionPreview({ mascots, collection }: Props) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-5)",
        maxWidth: 440,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-4)",
        }}
      >
        <h3 style={{ color: "white" }}>나의 컬렉션</h3>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
          {collection.length}/6
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "var(--space-3)",
        }}
      >
        {(Object.keys(mascots) as CapsuleMascot[]).map((mascotKey) => {
          const isCollected = collection.includes(mascotKey);
          const mascot = mascots[mascotKey];
          return (
            <div
              key={mascotKey}
              style={{
                aspectRatio: "1",
                background: isCollected
                  ? mascot.gradient
                  : "rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                border: "2px solid rgba(255,255,255,0.2)",
                boxShadow: isCollected
                  ? `0 4px 12px ${mascot.color}40`
                  : "none",
                filter: isCollected ? "none" : "grayscale(1) opacity(0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {isCollected ? mascot.emoji : "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
