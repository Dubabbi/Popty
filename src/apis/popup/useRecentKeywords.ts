import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export type RecentKeyword = {
  user_id: string;
  keyword: string;
  searched_at: string;
};

export function useRecentKeywords(limit = 5) {
  return useQuery({
    queryKey: ["recentKeywords", { limit }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_recent_keywords")
        .select("*")
        .order("searched_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data ?? []) as RecentKeyword[];
    },
  });
}
