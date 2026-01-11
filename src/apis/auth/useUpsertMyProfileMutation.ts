import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myProfileQueryKey } from "@/apis/auth/useMyProfileQuery";
import { upsertMyProfile, type UpdateMyProfileInput } from "@/apis/auth/profile";

export function useUpsertMyProfileMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateMyProfileInput) => upsertMyProfile(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: myProfileQueryKey });
    },
  });
}
