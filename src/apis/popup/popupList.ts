import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import type { PopupListItem } from "@/data/popupList";

export type PopupRow = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  start_date: string;
  end_date: string;
  address: string | null;
  region_zone_code: string | null;
  lat: number | null;
  lng: number | null;
  bookmarks_count: number;
  created_at: string;
  updated_at: string;

  // ✅ Supabase / View / 타입 상황에 따라 string[] | string | null 로 올 수도 있어서 방어적으로 처리
  tags: unknown;
};

export type PopupsSort = "end_date_asc" | "created_desc" | "bookmarks_desc";
export type PopupsStatus = "upcoming" | "ongoing" | "ended";
export type TagsMatchMode = "overlaps" | "contains";

export type ListPopupsParams = {
  limit?: number;
  offset?: number;
  q?: string | null;
  regionZoneCode?: string | null;
  status?: PopupsStatus | null;
  sort?: PopupsSort;

  // ✅ tags 기반 필터
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

/** ✅ tags가 어떤 형태로 와도 string[]로 정규화 */
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
        // ignore
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
  return {
    id: row.id,
    title: row.title,
    thumbnailUrl: row.thumbnail_url,

    startDate: row.start_date,
    endDate: row.end_date,

    address: row.address,
    regionZoneCode: row.region_zone_code,

    // ✅ 핵심
    tags: normalizeTags(row.tags),

    bookmarksCount: row.bookmarks_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    lat: row.lat,
    lng: row.lng,
  };
}

export async function listPopups(params: ListPopupsParams): Promise<PopupsPage> {
  const limit = params.limit ?? 20;
  const offset = params.offset ?? 0;
  const sort = params.sort ?? "end_date_asc";
  const today = todayLocalISODate();
  const tagsMatchMode: TagsMatchMode = params.tagsMatchMode ?? "overlaps";

  let q = supabase.from("popups").select(
    `
      id,
      title,
      thumbnail_url,
      start_date,
      end_date,
      address,
      region_zone_code,
      lat,
      lng,
      bookmarks_count,
      created_at,
      updated_at,
      tags
    `,
    { count: "exact" }
  );

  if (params.q && params.q.trim().length) {
    q = q.ilike("title", `%${params.q.trim()}%`);
  }

  if (params.regionZoneCode) {
    q = q.eq("region_zone_code", params.regionZoneCode);
  }

  // ✅ tags 필터
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
    q = q.order("created_at", { ascending: false }).order("id", { ascending: true });
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
  return usePopupsListQuery({
    limit,
    offset: 0,
    sort: "end_date_asc",
    status: "ongoing",
  });
}

export function useRegionPopupsQuery(regionZoneCode: string, limit = 4) {
  return usePopupsListQuery({ limit, offset: 0, regionZoneCode, sort: "end_date_asc" });
}
