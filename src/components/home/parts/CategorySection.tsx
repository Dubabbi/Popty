import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";
import { PopupGrid } from "@/components/home/parts/PopupGrid";
import { listPopups } from "@/apis/popup/popupList";

interface CategorySectionProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

type CategorySectionConfig = {
  tag: string;
  label: string;
};

export function CategorySection({ onNavigate }: CategorySectionProps) {
  const sections: CategorySectionConfig[] = useMemo(
    () => [
      { tag: "캐릭터", label: "🎀 캐릭터" },
      { tag: "음식", label: "🍰 음식" },
      { tag: "패션", label: "👗 패션" },
    ],
    []
  );

  const results = useQueries({
    queries: sections.map((s) => ({
      queryKey: ["popups", "tag", s.tag, { limit: 3, sort: "bookmarks_desc", status: "ongoing" }],
      queryFn: () =>
        listPopups({
          limit: 3,
          offset: 0,
          sort: "bookmarks_desc",
          status: "ongoing",

          tags: [s.tag],
          tagsMatchMode: "overlaps",
        }),
      staleTime: 30_000,
    })),
  });

  const anyHasItems = results.some((r) => (r.data?.items?.length ?? 0) > 0);
  const allError = results.every((r) => r.isError);

  if (allError || !anyHasItems) return null;

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
        <h3 style={{ margin: 0 }}>태그별 추천</h3>
      </div>

      {sections.map((s, index) => {
        const r = results[index];
        const popups = r.data?.items ?? [];
        const isLoading = r.isLoading;

        if (!isLoading && popups.length === 0) return null;

        return (
          <div key={s.tag}>
            <div style={{ padding: "0 var(--space-4) var(--space-6)" }}>
              <h4
                style={{
                  marginBottom: "var(--space-3)",
                  marginTop: "var(--space-4)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {s.label}
              </h4>

              {isLoading ? (
                <div style={{ height: 180 }} />
              ) : (
                <PopupGrid popups={popups} onClickPopup={(id) => onNavigate("detail", id)} />
              )}
            </div>

            {index < sections.length - 1 && (
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  background: "var(--color-gray-100)",
                }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
