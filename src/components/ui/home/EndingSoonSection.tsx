import { getEndingSoonPopups } from "@/data/popups";
import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/ui/home/PopupGrid";

interface EndingSoonSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function EndingSoonSection({ onNavigate }: EndingSoonSectionProps) {
  const endingSoon = getEndingSoonPopups();

  return (
    <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
      <PopupGrid
        popups={endingSoon}
        onClickPopup={(id) => onNavigate("detail", id)}
      />
    </section>
  );
}
