import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import { REGION_ZONE_LABEL_KO } from "@/data/popupList";

export type PopupDetailRow = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  start_date: string;
  end_date: string;

  address: string | null;
  region_zone_code: string | null;

  lat: number | null;
  lng: number | null;

  price_text: string | null;
  description_md: string | null;

  parking_info: string | null;
  transit_info: string | null;

  instagram_url: string | null;
  website_url: string | null;

  reservation_online_text: string | null;
  reservation_offline_text: string | null;

  naver_map_url: string | null;

  bookmarks_count: number;
  created_at: string;
  updated_at: string;

  tags: string[] | null;
};

export type PopupDetailItem = {
  id: string;
  title: string;

  thumbnailUrl: string | null;
  images: string[];

  startDate: string;
  endDate: string;

  address: string | null;
  regionZoneCode: string | null;
  regionNameKo: string;

  lat: number | null;
  lng: number | null;

  priceText: string | null;
  descriptionMd: string | null;
  bookmarked?: boolean;
  parkingInfo: string | null;
  transitInfo: string | null;

  instagramUrl: string | null;
  websiteUrl: string | null;

  reservationOnlineText: string | null;
  reservationOfflineText: string | null;

  naverMapUrl: string | null;

  tags: string[];

  bookmarksCount: number;
  createdAt: string;
  updatedAt: string;

  trending: boolean;
  isNew: boolean;
};

function regionLabelKo(code: string | null): string {
  if (!code || code === "ETC") return "기타";
  return REGION_ZONE_LABEL_KO[code] ?? code;
}

function mapRowToDetail(row: PopupDetailRow): PopupDetailItem {
  const createdAtMs = new Date(row.created_at).getTime();
  const now = Date.now();
  const days7 = 7 * 24 * 60 * 60 * 1000;

  const images = row.thumbnail_url ? [row.thumbnail_url] : [];

  return {
    id: row.id,
    title: row.title,

    thumbnailUrl: row.thumbnail_url,
    images,

    startDate: row.start_date,
    endDate: row.end_date,

    address: row.address,
    regionZoneCode: row.region_zone_code,
    regionNameKo: regionLabelKo(row.region_zone_code),

    lat: row.lat,
    lng: row.lng,

    priceText: row.price_text,
    descriptionMd: row.description_md,

    parkingInfo: row.parking_info,
    transitInfo: row.transit_info,

    instagramUrl: row.instagram_url,
    websiteUrl: row.website_url,

    reservationOnlineText: row.reservation_online_text,
    reservationOfflineText: row.reservation_offline_text,

    naverMapUrl: row.naver_map_url,

    tags: Array.isArray(row.tags) ? row.tags : [],

    bookmarksCount: row.bookmarks_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    trending: row.bookmarks_count >= 30,
    isNew: now - createdAtMs <= days7,
  };
}

export async function getPopupDetail(popupId: string): Promise<PopupDetailItem | null> {
  const { data, error } = await supabase
    .from("popups")
    .select(
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
      price_text,
      description_md,
      parking_info,
      transit_info,
      instagram_url,
      website_url,
      reservation_online_text,
      reservation_offline_text,
      naver_map_url,
      bookmarks_count,
      created_at,
      updated_at,
      tags
    `
    )
    .eq("id", popupId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapRowToDetail(data as PopupDetailRow);
}

export function usePopupDetailQuery(popupId: string | undefined) {
  return useQuery({
    queryKey: ["popups", "detail", popupId],
    queryFn: () => {
      if (!popupId) return Promise.resolve(null);
      return getPopupDetail(popupId);
    },
    enabled: !!popupId,
    staleTime: 30_000,
  });
}
