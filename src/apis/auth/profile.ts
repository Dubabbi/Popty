import { supabase } from "@/supabase/client";

export type MyProfile = {
  id: string;
  nickname: string | null;
  location: string | null;
  bio: string | null;
};

export type UpdateMyProfileInput = {
  nickname?: string | null;
  location?: string | null;
  bio?: string | null;
};

export async function getMyProfile(): Promise<MyProfile | null> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;

  const user = authData.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, nickname, location, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) return { id: user.id, nickname: null, location: null, bio: null };

  return data as MyProfile;
}

export async function upsertMyProfile(input: UpdateMyProfileInput): Promise<MyProfile> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;

  const user = authData.user;
  if (!user) throw new Error("Not authenticated");

  const payload: MyProfile = {
    id: user.id,
    nickname: input.nickname ?? null,
    location: input.location ?? null,
    bio: input.bio ?? null,
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select("id, nickname, location, bio")
    .single();

  if (error) throw error;

  return data as MyProfile;
}
