import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export function useLogRecentKeyword() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (keyword: string) => {
      const k = keyword.trim();
      if (!k) return;

      const { error } = await supabase.rpc("log_recent_keyword", { p_keyword: k });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recentKeywords"] });
    },
  });
}
