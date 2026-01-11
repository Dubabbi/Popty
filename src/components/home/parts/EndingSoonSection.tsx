import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/home/parts/PopupGrid";
import { useEndingSoonPopupsQuery } from "@/apis/popup/popupList";

interface EndingSoonSectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

export function EndingSoonSection({ onNavigate }: EndingSoonSectionProps) {
  const { data, isLoading, isError } = useEndingSoonPopupsQuery(6);

  if (isLoading) {
    return <section style={{ padding: "0 var(--space-4) var(--space-6)", marginTop: 20 }} />;
  }

  if (isError) {
    return <section style={{ padding: "0 var(--space-4) var(--space-6)", marginTop: 20 }} />;
  }

  const endingSoon = data?.items ?? [];
  if (endingSoon.length === 0) {
    return <section style={{ padding: "0 var(--space-4) var(--space-6)", marginTop: 20 }} />;
  }

  return (
    <section style={{ padding: "0 var(--space-4) var(--space-6)", marginTop: 20 }}>
      <PopupGrid popups={endingSoon} onClickPopup={(id) => onNavigate("detail", id)} />
    </section>
  );
}
