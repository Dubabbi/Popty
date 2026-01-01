import { MapPin } from "lucide-react";
import { popupsData } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/ui/home/PopupGrid";

interface SeongsuSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function SeongsuSection({ onNavigate }: SeongsuSectionProps) {
  const seongsuPopups = popupsData
    .filter((p) => p.area === "Seongsu")
    .slice(0, 4);

  return (
    <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <MapPin size={24} color="var(--color-accent)" />
          <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
        </div>
      </div>

      <PopupGrid
        popups={seongsuPopups}
        onClickPopup={(id) => onNavigate("detail", id)}
      />
    </section>
  );
}
