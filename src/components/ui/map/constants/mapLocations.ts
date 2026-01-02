import type { LatLng } from "@/hooks/useGeolocation";

export const FALLBACK_CENTER: LatLng = { lat: 37.5665, lng: 126.978 };

export const AREA_CENTER: Record<string, LatLng> = {
  Gangnam: { lat: 37.4979, lng: 127.0276 },
  Seongsu: { lat: 37.5446, lng: 127.0557 },
  Hongdae: { lat: 37.5563, lng: 126.922 },
  Yeouido: { lat: 37.5219, lng: 126.9246 },
  Others: { lat: 37.5665, lng: 126.978 },
};
