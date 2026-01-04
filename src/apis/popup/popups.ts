// 팝업 리스트 (지역/검색 포함)
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

type PopupsListParams = {
  regionCode?: string;
  keyword?: string;
  page?: number; // 0-based
  pageSize?: number; // default 20
};

export function usePopupsList(params: PopupsListParams) {
  const { regionCode, keyword, page = 0, pageSize = 20 } = params;

  return useQuery({
    queryKey: ["popups", "list", { regionCode, keyword, page, pageSize }],
    queryFn: async () => {
      let q = supabase
        .from("v_popups_list")
        .select("*")
        .order("end_date", { ascending: true })
        .range(page * pageSize, page * pageSize + pageSize - 1);

      if (regionCode) q = q.eq("region_code", regionCode);
      if (keyword) q = q.ilike("title", `%${keyword}%`);

      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}
