import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import type { PopupListItem, RegionZoneCode } from "@/data/popupList";

export type PopupRow = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  start_date: string;
  end_date: string;

  dday: number | null;
  region_code: string | null;
  region_name: string | null;

  tags: unknown;

  bookmarks_count: number | null;
  bookmarked: boolean | null;
};

export type PopupsSort = "end_date_asc" | "created_desc" | "bookmarks_desc";
export type PopupsStatus = "upcoming" | "ongoing" | "ended";
export type TagsMatchMode = "overlaps" | "contains";

export type ListPopupsParams = {
  limit?: number;
  offset?: number;
  q?: string | null;
  regionZoneCode?: RegionZoneCode | null;
  status?: PopupsStatus | null;
  sort?: PopupsSort;

  tags?: string[];
  tagsMatchMode?: TagsMatchMode;
};

export type PopupsPage = {
  total: number;
  items: PopupListItem[];
};

function todayLocalISODate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function normalizeTags(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
  }

  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return [];

    // JSON 배열 문자열: '["굿즈","캐릭터"]'
    if (s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) {
          return parsed.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
        }
      } catch {
        //
      }
    }

    // Postgres 배열 리터럴: '{굿즈,캐릭터}' 또는 '{"굿즈","캐릭터"}'
    if (s.startsWith("{") && s.endsWith("}")) {
      const inner = s.slice(1, -1).trim();
      if (!inner) return [];
      return inner
        .split(",")
        .map((p) => p.trim().replace(/^"+|"+$/g, ""))
        .filter((x) => x.length > 0);
    }

    // fallback: '굿즈,캐릭터'
    if (s.includes(",")) {
      return s
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    return [s];
  }

  return [];
}

function mapRow(row: PopupRow): PopupListItem {
  const fallbackISO = new Date(0).toISOString();

  return {
    id: row.id,
    title: row.title,
    thumbnailUrl: row.thumbnail_url,
    startDate: row.start_date,
    endDate: row.end_date,

    address: null,
    lat: null,
    lng: null,
    createdAt: fallbackISO,
    updatedAt: fallbackISO,

    // region
    regionZoneCode: (row.region_code ?? null) as RegionZoneCode | null,
    regionNameKo: row.region_name ?? undefined,

    // tags
    tags: normalizeTags(row.tags),

    // bookmarks
    bookmarksCount: row.bookmarks_count ?? 0,
    bookmarked: row.bookmarked ?? false,

    // optional
    dday: row.dday ?? undefined,
  };
}

export async function listPopups(params: ListPopupsParams): Promise<PopupsPage> {
  const limit = params.limit ?? 20;
  const offset = params.offset ?? 0;
  const sort = params.sort ?? "end_date_asc";
  const today = todayLocalISODate();
  const tagsMatchMode: TagsMatchMode = params.tagsMatchMode ?? "overlaps";

  let q = supabase.from("v_popups_list").select(
    `
      id,
      title,
      thumbnail_url,
      start_date,
      end_date,
      dday,
      region_code,
      region_name,
      tags,
      bookmarks_count,
      bookmarked
    `,
    { count: "exact" }
  );

  if (params.q && params.q.trim().length) {
    q = q.ilike("title", `%${params.q.trim()}%`);
  }

  if (params.regionZoneCode) {
    q = q.eq("region_code", params.regionZoneCode);
  }

  if (params.tags && params.tags.length > 0) {
    q =
      tagsMatchMode === "contains"
        ? q.contains("tags", params.tags)
        : q.overlaps("tags", params.tags);
  }

  if (params.status) {
    if (params.status === "upcoming") q = q.gt("start_date", today);
    if (params.status === "ongoing") q = q.lte("start_date", today).gte("end_date", today);
    if (params.status === "ended") q = q.lt("end_date", today);
  }

  if (sort === "end_date_asc") {
    q = q.order("end_date", { ascending: true }).order("id", { ascending: true });
  } else if (sort === "created_desc") {
    q = q.order("id", { ascending: false });
  } else if (sort === "bookmarks_desc") {
    q = q.order("bookmarks_count", { ascending: false }).order("id", { ascending: true });
  }

  q = q.range(offset, offset + limit - 1);

  const { data, error, count } = await q;
  if (error) throw error;

  const items = (data ?? []).map((r) => mapRow(r as PopupRow));
  return { total: count ?? 0, items };
}

export function usePopupsListQuery(params: ListPopupsParams) {
  return useQuery({
    queryKey: ["popups", "list", params],
    queryFn: () => listPopups(params),
    staleTime: 30_000,
  });
}

export function useTrendingPopupsQuery(limit = 10) {
  return usePopupsListQuery({ limit, offset: 0, sort: "bookmarks_desc" });
}

export function useEndingSoonPopupsQuery(limit = 6) {
  return usePopupsListQuery({ limit, offset: 0, sort: "end_date_asc", status: "ongoing" });
}

export function useRegionPopupsQuery(regionZoneCode: RegionZoneCode, limit = 4) {
  return usePopupsListQuery({ limit, offset: 0, regionZoneCode, sort: "end_date_asc" });
}
