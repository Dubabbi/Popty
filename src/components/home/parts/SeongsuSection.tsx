import { MapPin } from "lucide-react";
import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/home/parts/PopupGrid";
import { useRegionPopupsQuery } from "@/apis/popup/popupList";

interface SeongsuSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function SeongsuSection({ onNavigate }: SeongsuSectionProps) {
  const { data, isLoading, isError } = useRegionPopupsQuery("SEONGSU", 4);

  if (isLoading) {
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MapPin size={24} color="var(--color-accent)" />
            <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MapPin size={24} color="var(--color-accent)" />
            <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
          </div>
        </div>
      </section>
    );
  }

  const seongsuPopups = data?.items ?? [];
  if (seongsuPopups.length === 0) {
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MapPin size={24} color="var(--color-accent)" />
            <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
          </div>
        </div>
      </section>
    );
  }

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
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <MapPin size={24} color="var(--color-accent)" />
          <h3 style={{ margin: 0 }}>성수동 이번 주</h3>
        </div>
      </div>

      <PopupGrid popups={seongsuPopups} onClickPopup={(id) => onNavigate("detail", id)} />
    </section>
  );
}
