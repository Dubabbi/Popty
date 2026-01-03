import { useMemo } from "react";
import { Mascot } from "@/components/Mascot";
import { popupsData } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/home/parts/PopupGrid";

interface CategorySectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function CategorySection({ onNavigate }: CategorySectionProps) {
  const categoryPopups = useMemo(
    () => ({
      Character: popupsData.filter((p) => p.category === "Character").slice(0, 3),
      Food: popupsData.filter((p) => p.category === "Food").slice(0, 3),
      Fashion: popupsData.filter((p) => p.category === "Fashion").slice(0, 3),
    }),
    []
  );

  const label = (category: string) =>
    category === "Character" ? "🎀 캐릭터" : category === "Food" ? "🍰 음식" : "👗 패션";

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
        }}
      >
        <Mascot pose="recommend" size="medium" />
        <h3 style={{ margin: 0 }}>카테고리별 추천</h3>
      </div>

      {Object.entries(categoryPopups).map(([category, popups], index) => (
        <div key={category}>
          <div style={{ padding: "0 var(--space-4) var(--space-6)" }}>
            <h4
              style={{
                marginBottom: "var(--space-3)",
                marginTop: "var(--space-4)",
                color: "var(--color-text-secondary)",
              }}
            >
              {label(category)}
            </h4>

            <PopupGrid popups={popups} onClickPopup={(id) => onNavigate("detail", id)} />
          </div>

          {index < Object.entries(categoryPopups).length - 1 && (
            <div
              style={{
                width: "100%",
                height: "5px",
                background: "var(--color-gray-100)",
              }}
            />
          )}
        </div>
      ))}
    </section>
  );
}
