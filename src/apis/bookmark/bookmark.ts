import { supabase } from "@/supabase/client";

export type SetBookmarkResult = {
  bookmarked: boolean;
  bookmarks_count: number;
};

export async function setBookmark(popupId: string, next: boolean): Promise<SetBookmarkResult> {
  const { data, error } = (await supabase.rpc("set_bookmark", {
    p_popup_id: popupId,
    p_next: next,
  })) as {
    data: SetBookmarkResult[] | null;
    error: { message: string } | null;
  };

  if (error) throw new Error(error.message);

  const row = data?.[0];
  return {
    bookmarked: row?.bookmarked ?? next,
    bookmarks_count: row?.bookmarks_count ?? 0,
  };
}
