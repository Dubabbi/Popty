import { supabase } from "@/supabase/client";

export async function addBookmark(popupId: string) {
  const { error } = await supabase.from("bookmarks").insert({ popup_id: popupId });
  if (error) throw error;
}

export async function removeBookmark(popupId: string) {
  const { error } = await supabase.from("bookmarks").delete().eq("popup_id", popupId);
  if (error) throw error;
}

export async function isBookmarked(popupId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("popup_id")
    .eq("popup_id", popupId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function toggleBookmark(popupId: string, next: boolean) {
  if (next) return addBookmark(popupId);
  return removeBookmark(popupId);
}
