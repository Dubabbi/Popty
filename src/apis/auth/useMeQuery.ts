import { useQuery } from "@tanstack/react-query";
import { getMe } from "./me";

export const meQueryKey = ["auth", "me"] as const;

export function useMeQuery() {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });
}
