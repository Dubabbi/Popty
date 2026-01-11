import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export type CreatePopupReportInput = {
  title: string;
  locationText: string;
  startDate: Date;
  endDate: Date;
  categoryCodes: string[];
  description: string | null;
};

function toDateOnlyString(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function createPopupReport(input: CreatePopupReportInput) {
  const { title, locationText, startDate, endDate, categoryCodes, description } = input;

  const trimmedCodes = categoryCodes.map((c) => c.trim()).filter(Boolean);

  if (trimmedCodes.length < 1) {
    throw new Error("카테고리는 최소 1개 선택해야 해요.");
  }
  if (trimmedCodes.length > 5) {
    throw new Error("카테고리는 최대 5개까지 선택할 수 있어요.");
  }

  const { data, error } = await supabase.rpc("create_popup_report", {
    p_title: title,
    p_location_text: locationText,
    p_start_date: toDateOnlyString(startDate),
    p_end_date: toDateOnlyString(endDate),
    p_category_codes: trimmedCodes,
    p_description: description,
  });

  if (error) throw error;

  return { id: data as string };
}

export function useCreatePopupReportMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPopupReport,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["popup-reports", "my-count"] });
      await qc.invalidateQueries({ queryKey: ["popup-reports", "my-stats"] });
    },
  });
}
