import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { PopupsPage } from "@/apis/popup/popupList";
import type { PopupListItem } from "@/data/popupList";
import type { PopupDetailItem } from "@/apis/popup/popupDetail";

import { addBookmark, removeBookmark } from "./bookmark";

type ToggleArgs = { popupId: string; next: boolean };

type Snapshot<T> = { key: QueryKey; data: T | undefined };

type Ctx = {
  prevList: Snapshot<PopupsPage>[];
  prevDetail: PopupDetailItem | null | undefined;
};

function patchListItem(item: PopupListItem, popupId: string, next: boolean): PopupListItem {
  if (item.id !== popupId) return item;

  const curr = !!item.bookmarked;
  if (curr === next) return item;

  return {
    ...item,
    bookmarked: next,
    bookmarksCount: Math.max(0, (item.bookmarksCount ?? 0) + (next ? 1 : -1)),
  };
}

function patchListPage(
  old: PopupsPage | undefined,
  popupId: string,
  next: boolean
): PopupsPage | undefined {
  if (!old) return old;
  return {
    ...old,
    items: old.items.map((it) => patchListItem(it, popupId, next)),
  };
}

function patchDetail(
  old: PopupDetailItem | null | undefined,
  next: boolean
): PopupDetailItem | null | undefined {
  if (!old) return old;

  const curr = !!old.bookmarked;
  if (curr === next) return old;

  return {
    ...old,
    bookmarked: next,
    bookmarksCount: Math.max(0, (old.bookmarksCount ?? 0) + (next ? 1 : -1)),
  };
}

export function useBookmarkToggle() {
  const qc = useQueryClient();

  return useMutation<void, Error, ToggleArgs, Ctx>({
    mutationFn: async ({ popupId, next }) => {
      if (next) await addBookmark(popupId);
      else await removeBookmark(popupId);
    },

    onMutate: async ({ popupId, next }) => {
      // popups list 캐시 스냅샷
      const listQueries = qc.getQueryCache().findAll({ queryKey: ["popups", "list"] });

      const prevList: Snapshot<PopupsPage>[] = listQueries.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<PopupsPage>(q.queryKey),
      }));

      // 리스트 낙관적 업데이트
      listQueries.forEach((q) => {
        qc.setQueryData<PopupsPage>(q.queryKey, (old) => patchListPage(old, popupId, next));
      });

      // 디테일 낙관적 업데이트
      const detailKey: QueryKey = ["popups", "detail", popupId];
      const prevDetail = qc.getQueryData<PopupDetailItem | null>(detailKey);

      qc.setQueryData<PopupDetailItem | null>(detailKey, (old) => patchDetail(old, next));

      return { prevList, prevDetail };
    },

    onError: (_err, vars, ctx) => {
      // 리스트 롤백
      ctx?.prevList.forEach(({ key, data }) => {
        if (data === undefined) {
          qc.removeQueries({ queryKey: key, exact: true });
        } else {
          qc.setQueryData<PopupsPage>(key, data);
        }
      });

      // 디테일 롤백
      const detailKey: QueryKey = ["popups", "detail", vars.popupId];
      if (ctx?.prevDetail === undefined) {
        qc.removeQueries({ queryKey: detailKey, exact: true });
      } else {
        qc.setQueryData<PopupDetailItem | null>(detailKey, ctx?.prevDetail ?? null);
      }
    },

    onSettled: (_d, _e, vars) => {
      qc.invalidateQueries({ queryKey: ["bookmarks", "my"] });
      qc.invalidateQueries({ queryKey: ["popups", "detail", vars.popupId] });
    },
  });
}
