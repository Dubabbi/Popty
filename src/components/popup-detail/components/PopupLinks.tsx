import { ExternalLink, Instagram, MapPin } from "lucide-react";
import { instagramLabel } from "../utils/popupDetailUtils";

type Props = {
  websiteUrl?: string | null;
  instagramUrl?: string | null;
  naverMapUrl?: string | null;
};

function LinkItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-3)",
        background: "white",
        border: "1px solid var(--color-gray-300)",
        borderRadius: "var(--radius-md)",
        color: "var(--color-accent)",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      {icon}
      {label}
    </a>
  );
}

export function PopupLinks({ websiteUrl, instagramUrl, naverMapUrl }: Props) {
  if (!websiteUrl && !instagramUrl && !naverMapUrl) return null;

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <h4 style={{ marginBottom: "var(--space-3)" }}>Links</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {websiteUrl ? (
          <LinkItem href={websiteUrl} icon={<ExternalLink size={18} />} label="Official Website" />
        ) : null}
        {instagramUrl ? (
          <LinkItem
            href={instagramUrl}
            icon={<Instagram size={18} />}
            label={instagramLabel(instagramUrl)}
          />
        ) : null}
        {naverMapUrl ? (
          <LinkItem href={naverMapUrl} icon={<MapPin size={18} />} label="Naver Map" />
        ) : null}
      </div>
    </div>
  );
}
