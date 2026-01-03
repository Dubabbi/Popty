import { ChevronRight } from "lucide-react";
import type { SettingsGroup } from "@/components/my/types/settings";

export function SettingsGroups({ groups }: { groups: SettingsGroup[] }) {
  return (
    <>
      {groups.map((group, idx) => (
        <div key={group.title} style={{ marginTop: idx > 0 ? "var(--space-6)" : 0 }}>
          <h4
            style={{
              marginBottom: "var(--space-3)",
              color: "var(--color-text-secondary)",
              fontSize: "0.813rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              paddingLeft: "var(--space-2)",
            }}
          >
            {group.title}
          </h4>

          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              overflow: "hidden",
            }}
          >
            {group.items.map((item, itemIdx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-4)",
                    border: "none",
                    borderTop: itemIdx > 0 ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${item.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: `${item.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={20}
                      color={item.danger ? "#FF6B85" : item.color}
                      strokeWidth={2.5}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.938rem",
                        color: item.danger ? "#FF6B85" : "#000",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>

                  {item.value && (
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-tertiary)",
                        marginRight: "var(--space-2)",
                      }}
                    >
                      {item.value}
                    </div>
                  )}

                  <ChevronRight size={20} color="var(--color-gray-300)" strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
