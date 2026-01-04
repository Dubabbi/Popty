import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export function useMyBookmarks() {
  return useQuery({
    queryKey: ["bookmarks", "my"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_my_bookmarks")
        .select("*")
        .order("bookmarked_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
