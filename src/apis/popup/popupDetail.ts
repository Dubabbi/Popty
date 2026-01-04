import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export function usePopupDetail(popupId?: string) {
  return useQuery({
    queryKey: ["popups", "detail", popupId],
    enabled: !!popupId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_popup_detail")
        .select("*")
        .eq("id", popupId!)
        .single();

      if (error) throw error;
      return data;
    },
  });
}
