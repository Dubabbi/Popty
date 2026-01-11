import { Calendar as CalendarIcon, Clock, DollarSign, MapPin } from "lucide-react";

type Props = {
  durationText: string;
  hoursText?: string | null;
  locationText: string;
  priceText?: string | null;
};

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "var(--space-3)" }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-1)",
          }}
        >
          {label}
        </div>
        <div style={{ fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}

export function PopupSummaryCard({ durationText, hoursText, locationText, priceText }: Props) {
  return (
    <div
      style={{
        background: "var(--color-bg-tertiary)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        marginBottom: "var(--space-6)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <Row
          icon={<CalendarIcon size={20} color="var(--color-text-tertiary)" />}
          label="Duration"
          value={durationText}
        />
        <Row
          icon={<Clock size={20} color="var(--color-text-tertiary)" />}
          label="Hours"
          value={hoursText?.trim() ? hoursText : "정보 없음"}
        />
        <Row
          icon={<MapPin size={20} color="var(--color-text-tertiary)" />}
          label="Location"
          value={locationText}
        />
        <Row
          icon={<DollarSign size={20} color="var(--color-text-tertiary)" />}
          label="Entry Fee"
          value={priceText?.trim() ? priceText : "정보 없음"}
        />
      </div>
    </div>
  );
}
