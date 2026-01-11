import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { PopupsPage } from "@/apis/popup/popupList";
import type { PopupListItem } from "@/data/popupList";
import type { PopupDetailItem } from "@/apis/popup/popupDetail";

import { setBookmark, type SetBookmarkResult } from "./bookmark";

type ToggleArgs = { popupId: string; next: boolean };

type Snapshot<T> = { key: QueryKey; data: T | undefined };

type Ctx = {
  prevList: Snapshot<PopupsPage>[];
  prevDetail: PopupDetailItem | null | undefined;
  prevCalendarPopupsOnDate: Snapshot<unknown>[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function readString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function readNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function readBoolean(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}

// ------------------- popups list optimistic -------------------
function patchListItemOptimistic(
  item: PopupListItem,
  popupId: string,
  next: boolean
): PopupListItem {
  if (item.id !== popupId) return item;

  const curr = !!item.bookmarked;
  if (curr === next) return item;

  return {
    ...item,
    bookmarked: next,
    bookmarksCount: Math.max(0, (item.bookmarksCount ?? 0) + (next ? 1 : -1)),
  };
}

function patchListPageOptimistic(
  old: PopupsPage | undefined,
  popupId: string,
  next: boolean
): PopupsPage | undefined {
  if (!old) return old;
  return { ...old, items: old.items.map((it) => patchListItemOptimistic(it, popupId, next)) };
}

// ------------------- detail optimistic -------------------
function patchDetailOptimistic(
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

// ------------------- server reconcile -------------------
function patchListPageServer(
  old: PopupsPage | undefined,
  popupId: string,
  bookmarked: boolean,
  bookmarksCount: number
): PopupsPage | undefined {
  if (!old) return old;
  return {
    ...old,
    items: old.items.map((it) => (it.id === popupId ? { ...it, bookmarked, bookmarksCount } : it)),
  };
}

function patchDetailServer(
  old: PopupDetailItem | null | undefined,
  bookmarked: boolean,
  bookmarksCount: number
): PopupDetailItem | null | undefined {
  if (!old) return old;
  return { ...old, bookmarked, bookmarksCount };
}

// ------------------- calendar popupsOnDate patch -------------------
/**
 * 캘린더 쿼리 데이터가 배열이라고 가정하고,
 * 각 row가 { id }를 가지고 있으면 bookmarked / count를 패치.
 * - row.bookmarks_count (snake) / row.bookmarksCount (camel) 둘 다 지원
 */
function patchCalendarPopupsOnDateOptimistic(
  old: unknown,
  popupId: string,
  next: boolean
): unknown {
  if (!Array.isArray(old)) return old;

  return old.map((row) => {
    if (!isRecord(row)) return row;

    const id = readString(row.id);
    if (id !== popupId) return row;

    const currBookmarked = readBoolean(row.bookmarked) ?? !next;
    if (currBookmarked === next) return row;

    const currCountSnake = readNumber(row.bookmarks_count);
    const currCountCamel = readNumber(row.bookmarksCount);
    const currCount = currCountSnake ?? currCountCamel;

    const nextCount = currCount !== null ? Math.max(0, currCount + (next ? 1 : -1)) : null;

    const patched: Record<string, unknown> = { ...row, bookmarked: next };

    // count가 원래 있던 경우에만 낙관적으로 갱신
    if (nextCount !== null) {
      if ("bookmarks_count" in row) patched.bookmarks_count = nextCount;
      if ("bookmarksCount" in row) patched.bookmarksCount = nextCount;
    }

    return patched;
  });
}

function patchCalendarPopupsOnDateServer(
  old: unknown,
  popupId: string,
  bookmarked: boolean,
  bookmarksCount: number
): unknown {
  if (!Array.isArray(old)) return old;

  return old.map((row) => {
    if (!isRecord(row)) return row;

    const id = readString(row.id);
    if (id !== popupId) return row;

    const patched: Record<string, unknown> = { ...row, bookmarked };

    // 서버 값으로는 확정이니까 둘 다 있으면 둘 다 갱신
    if ("bookmarks_count" in row) patched.bookmarks_count = bookmarksCount;
    if ("bookmarksCount" in row) patched.bookmarksCount = bookmarksCount;

    return patched;
  });
}

export function useBookmarkToggle() {
  const qc = useQueryClient();

  return useMutation<SetBookmarkResult, Error, ToggleArgs, Ctx>({
    mutationFn: ({ popupId, next }) => setBookmark(popupId, next),

    onMutate: async ({ popupId, next }) => {
      // 1) popups list 캐시 스냅샷
      const listQueries = qc.getQueryCache().findAll({ queryKey: ["popups", "list"] });

      const prevList: Snapshot<PopupsPage>[] = listQueries.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<PopupsPage>(q.queryKey),
      }));

      // 리스트 낙관적 업데이트
      listQueries.forEach((q) => {
        qc.setQueryData<PopupsPage>(q.queryKey, (old: PopupsPage | undefined) =>
          patchListPageOptimistic(old, popupId, next)
        );
      });

      // 2) 디테일 낙관적 업데이트
      const detailKey: QueryKey = ["popups", "detail", popupId];
      const prevDetail = qc.getQueryData<PopupDetailItem | null>(detailKey);

      qc.setQueryData<PopupDetailItem | null>(
        detailKey,
        (old: PopupDetailItem | null | undefined) => patchDetailOptimistic(old, next)
      );

      // 3) 캘린더 날짜별 리스트(popupsOnDate) 낙관적 업데이트 + 스냅샷
      const calQueries = qc.getQueryCache().findAll({ queryKey: ["calendar", "popupsOnDate"] });

      const prevCalendarPopupsOnDate: Snapshot<unknown>[] = calQueries.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<unknown>(q.queryKey),
      }));

      calQueries.forEach((q) => {
        qc.setQueryData<unknown>(q.queryKey, (old: unknown) =>
          patchCalendarPopupsOnDateOptimistic(old, popupId, next)
        );
      });

      return { prevList, prevDetail, prevCalendarPopupsOnDate };
    },

    onError: (_err, vars, ctx) => {
      // 리스트 롤백
      ctx?.prevList.forEach(({ key, data }) => {
        if (data === undefined) qc.removeQueries({ queryKey: key, exact: true });
        else qc.setQueryData<PopupsPage>(key, data);
      });

      // 디테일 롤백
      const detailKey: QueryKey = ["popups", "detail", vars.popupId];
      if (ctx?.prevDetail === undefined) qc.removeQueries({ queryKey: detailKey, exact: true });
      else qc.setQueryData<PopupDetailItem | null>(detailKey, ctx?.prevDetail ?? null);

      // 캘린더 롤백
      ctx?.prevCalendarPopupsOnDate.forEach(({ key, data }) => {
        if (data === undefined) qc.removeQueries({ queryKey: key, exact: true });
        else qc.setQueryData<unknown>(key, data);
      });
    },

    onSuccess: (res, vars) => {
      const { popupId } = vars;
      const bookmarked = res.bookmarked;
      const bookmarksCount = res.bookmarks_count;

      const listQueries = qc.getQueryCache().findAll({ queryKey: ["popups", "list"] });
      listQueries.forEach((q) => {
        qc.setQueryData<PopupsPage>(q.queryKey, (old: PopupsPage | undefined) =>
          patchListPageServer(old, popupId, bookmarked, bookmarksCount)
        );
      });

      const detailKey: QueryKey = ["popups", "detail", popupId];
      qc.setQueryData<PopupDetailItem | null>(
        detailKey,
        (old: PopupDetailItem | null | undefined) =>
          patchDetailServer(old, bookmarked, bookmarksCount)
      );

      const calQueries = qc.getQueryCache().findAll({ queryKey: ["calendar", "popupsOnDate"] });
      calQueries.forEach((q) => {
        qc.setQueryData<unknown>(q.queryKey, (old: unknown) =>
          patchCalendarPopupsOnDateServer(old, popupId, bookmarked, bookmarksCount)
        );
      });
    },

    onSettled: (_d, _e, vars) => {
      qc.invalidateQueries({ queryKey: ["bookmarks", "my"] });
      qc.invalidateQueries({ queryKey: ["popups", "detail", vars.popupId] });
      qc.invalidateQueries({ queryKey: ["calendar"] });
    },
  });
}
