import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis/auth/profile";

export const myProfileQueryKey = ["auth", "myProfile"] as const;

export function useMyProfileQuery() {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
  });
}
