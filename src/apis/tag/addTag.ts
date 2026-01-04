import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

type TagInput = { categoryCode: string; name: string };

export function useSetMyTags() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (tags: TagInput[]) => {
      const { data, error } = await supabase.rpc("set_my_tags_v2", { p_tags: tags });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tags", "recommendations"] });
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}
