import { supabase } from "@/supabase/client";

export type Me = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
};

type UserMetadata = {
  name?: string;
  full_name?: string;
  preferred_username?: string;
  user_name?: string;
  avatar_url?: string;
};

function isUserMetadata(value: unknown): value is UserMetadata {
  return typeof value === "object" && value !== null;
}

export async function getMe(): Promise<Me | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("getUser error:", error);
    return null;
  }

  const user = data.user;
  if (!user) return null;

  const metaUnknown: unknown = user.user_metadata;
  const meta: UserMetadata | null = isUserMetadata(metaUnknown)
    ? (metaUnknown as UserMetadata)
    : null;

  const name =
    meta?.name ?? meta?.full_name ?? meta?.preferred_username ?? meta?.user_name ?? "팝업 탐험가";

  const avatarUrl = meta?.avatar_url ?? null;

  return {
    id: user.id,
    email: user.email ?? null,
    name,
    avatarUrl,
  };
}
