import { Clock, MapPin } from "lucide-react";

type Props = {
  dateText: string;
  areaText: string;
  iconSize: number;
  fontSize: string;
};

export function PopupCardMeta({ dateText, areaText, iconSize, fontSize }: Props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          marginBottom: "var(--space-1)",
          fontSize,
        }}
      >
        <Clock size={iconSize} color="var(--color-text-tertiary)" />
        <span style={{ color: "var(--color-text-secondary)" }}>{dateText}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          fontSize,
        }}
      >
        <MapPin size={iconSize} color="var(--color-text-tertiary)" />
        <span style={{ color: "var(--color-text-secondary)" }}>{areaText}</span>
      </div>
    </>
  );
}
