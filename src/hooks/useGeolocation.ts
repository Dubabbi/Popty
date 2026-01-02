import { useCallback, useEffect, useRef, useState } from "react";

export type LatLng = { lat: number; lng: number };

type GeoUnsupportedError = {
  name: "GeolocationUnsupported";
  message: string;
  code: 0;
};

type GeoError = GeolocationPositionError | GeoUnsupportedError;

type Opts = {
  watch?: boolean;
  options?: PositionOptions;
  immediate?: boolean;
};

export function useGeolocation({
  watch = false,
  options,
  immediate = true,
}: Opts = {}) {
  const [loc, setLoc] = useState<LatLng | null>(null);
  const [error, setError] = useState<GeoError | null>(null);
  const [loading, setLoading] = useState(false);

  const optsRef = useRef(options);

  useEffect(() => {
    optsRef.current = options;
  }, [options]);

  const request = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError({
        name: "GeolocationUnsupported",
        message: "이 브라우저는 위치를 지원하지 않습니다.",
        code: 0,
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      optsRef.current,
    );
  }, []);

  useEffect(() => {
    if (!immediate) return;
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;

    if (watch) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setError(null);
        },
        (err) => setError(err),
        optsRef.current,
      );
      return () => navigator.geolocation.clearWatch(id);
    }

    const t = window.setTimeout(() => {
      request();
    }, 0);

    return () => window.clearTimeout(t);
  }, [watch, immediate, request]);

  return { loc, error, loading, request };
}
