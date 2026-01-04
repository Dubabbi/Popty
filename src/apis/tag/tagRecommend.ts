import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export function useTagRecommendations(limitPerTag = 10) {
  return useQuery({
    queryKey: ["tags", "recommendations", limitPerTag],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_popups_grouped_by_my_tags", {
        p_limit_per_tag: limitPerTag,
      });
      if (error) throw error;
      return data;
    },
  });
}
