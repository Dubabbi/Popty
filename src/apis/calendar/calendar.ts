import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export type PopupOnDateRow = {
  id: string;
  title: string | null;
  thumbnail_url: string | null;
  region_zone_code: string | null;
  region_name_ko: string | null;
  start_date: string;
  end_date: string;
  bookmarks_count: number;
  bookmarked: boolean;
};

export type PopupCalendarMarkerRow = {
  day: string; // YYYY-MM-DD
  count: number;
};

const normalizeRegionParam = (v?: string | null) => (v && v.length ? v : null);

export const calendarQueryKeys = {
  markers: (monthFirstDay: string, regionZoneCode?: string | null) =>
    ["calendar", "markers", monthFirstDay, normalizeRegionParam(regionZoneCode) ?? "ALL"] as const,
  popupsOnDate: (date: string, regionZoneCode?: string | null) =>
    ["calendar", "popupsOnDate", date, normalizeRegionParam(regionZoneCode) ?? "ALL"] as const,
};

export async function fetchPopupCalendarMarkers(params: {
  monthFirstDay: string; // YYYY-MM-01
  regionZoneCode?: string | null;
}) {
  const { monthFirstDay, regionZoneCode } = params;

  const { data, error } = await supabase.rpc("get_popup_calendar_markers", {
    p_month: monthFirstDay,
    p_region_zone_code: normalizeRegionParam(regionZoneCode),
  });

  if (error) throw error;
  return (data ?? []) as PopupCalendarMarkerRow[];
}

export async function fetchPopupsOnDate(params: {
  date: string; // YYYY-MM-DD
  regionZoneCode?: string | null;
}) {
  const { date, regionZoneCode } = params;

  const { data, error } = await supabase.rpc("get_popups_on_date", {
    p_date: date,
    p_region_zone_code: normalizeRegionParam(regionZoneCode),
  });

  if (error) throw error;
  return (data ?? []) as PopupOnDateRow[];
}

export function usePopupCalendarMarkersQuery(params: {
  monthFirstDay: string; // YYYY-MM-01
  regionZoneCode?: string | null;
}) {
  const { monthFirstDay, regionZoneCode } = params;

  return useQuery({
    queryKey: calendarQueryKeys.markers(monthFirstDay, regionZoneCode),
    queryFn: () => fetchPopupCalendarMarkers({ monthFirstDay, regionZoneCode }),
    staleTime: 60_000,
  });
}

export function usePopupsOnDateQuery(params: {
  date: string | null; // YYYY-MM-DD
  regionZoneCode?: string | null;
}) {
  const { date, regionZoneCode } = params;

  return useQuery({
    queryKey: date
      ? calendarQueryKeys.popupsOnDate(date, regionZoneCode)
      : ["calendar", "popupsOnDate", "DISABLED"],
    queryFn: () => fetchPopupsOnDate({ date: date!, regionZoneCode }),
    enabled: Boolean(date),
    staleTime: 10_000,
  });
}
