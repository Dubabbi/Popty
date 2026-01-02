import { ChevronLeft, Search } from "lucide-react";
import type { ViewType } from "@/routes/routes";

type Props = {
  onNavigate: (view: ViewType) => void;
  searchQuery: string;
  onChangeSearch: (v: string) => void;
};

export function MapHeader({ onNavigate, searchQuery, onChangeSearch }: Props) {
  return (
    <div
      style={{
        padding: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        background: "white",
        borderBottom: "1px solid var(--color-gray-200)",
      }}
    >
      <button
        onClick={() => onNavigate("home")}
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-md)",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={24} color="var(--color-text-primary)" />
      </button>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          padding: "var(--space-2) var(--space-3)",
          background: "var(--color-gray-100)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Search size={18} color="var(--color-text-tertiary)" />
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontSize: "0.875rem",
            color: "var(--color-text-primary)",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
